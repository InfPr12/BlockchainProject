import React, { useState } from "react";
import { Button } from "react-bootstrap";

const SUIContracts = () => {
    const [senderAddress, setSenderAddress] = useState("");
    const [recieveAddress, setRecieveAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [treasuryCapId, setTreasuryCapId] = useState("");
    const [adminCapId, setAdminCapId] = useState("");
    const [coinObjectId, setCoinObjectId] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const RPC_URL = "https://fullnode.testnet.sui.io:443";

    const handleMint = async () => {
        if (!recieveAddress || !amount || !treasuryCapId || !adminCapId) {
            alert("Please fill in all fields for minting.");
            return;
        }

        try {
            const buildPayload = {
                method: "sui_transactionBlock",
                jsonrpc: "2.0",
                id: 1,
                params: {
                    sender_address: "0x5d29cf6d3247545851f8486e802131b01069c536c4bad666e8bd6d533725cd20",
                    packageObjectId: "0x7ad544c8750a538728e5d24d993d578399c8b2d8eaff091cc6156e2294ded90b",
                    module: "token",
                    function: "mint",
                    typeArguments: ["TOKEN"],
                    arguments: [
                        treasuryCapId,
                        parseInt(amount, 10),
                        recieveAddress,
                        adminCapId,
                    ],
                    gasBudget: 1000000,
                },
            };

            const buildResponse = await fetch(RPC_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload),
            });

            const buildResult = await buildResponse.json();

            if (buildResult.error) {
                setStatusMessage(`Transaction build failed: ${buildResult.error.message}`);
                return;
            }

            const { tx_bytes } = buildResult.result;

            const signTransaction = async (tx_bytes) => {
                if (window.suiWallet) {
                    try {
                        const result = await window.suiWallet.signTransactionBlock({ txBytes: tx_bytes });
                        return result.signedTransaction;
                    } catch (error) {
                        console.error("Error signing transaction:", error);
                        throw new Error("Failed to sign the transaction with Suiet wallet.");
                    }
                } else {
                    throw new Error("Suiet wallet is not available. Please ensure the wallet is installed and connected.");
                }
            };

            const signedTransaction = await signTransaction(tx_bytes);

            const executePayload = {
                method: "sui_executeTransactionBlock",
                jsonrpc: "2.0",
                id: 1,
                params: {
                    tx_bytes: signedTransaction,
                    requestType: "WaitForEffectsCert",
                },
            };

            const executeResponse = await fetch(RPC_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(executePayload),
            });

            const executeResult = await executeResponse.json();

            if (executeResult.error) {
                setStatusMessage(`Minting failed: ${executeResult.error.message}`);
            } else {
                setStatusMessage(`Minting successful! Transaction Digest: ${executeResult.result.digest}`);
            }
        } catch (error) {
            console.error("Minting error:", error);
            setStatusMessage("Minting failed.");
        }
    };


    const handleBurn = async () => {
        if (!senderAddress || !coinObjectId || !treasuryCapId || !adminCapId) {
            alert("Please fill in all fields for burning.");
            return;
        }

        const payload = {
            method: "sui_moveCall",
            jsonrpc: "2.0",
            id: 1,
            params: {
                signer: senderAddress,
                packageObjectId: "0x<your_package_id>",
                module: "token",
                function: "burn",
                typeArguments: ["TOKEN"],
                arguments: [
                    treasuryCapId,
                    coinObjectId,
                    adminCapId,
                ],
                gasBudget: 10000,
            },
        };

        try {
            const response = await fetch(RPC_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.error) {
                setStatusMessage(`Burning failed: ${result.error.message}`);
            } else {
                setStatusMessage(`Burning successful! Transaction Digest: ${result.result.digest}`);
            }
        } catch (error) {
            console.error("Error burning tokens:", error);
            setStatusMessage("Burning failed. Check the console for details.");
        }
    };

    return (
        <section>
            <h2>SUI Transactions</h2>
            <div>
                <label htmlFor="senderAddress">Sender Address:</label>
                <input
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    placeholder="Your wallet address"
                    id="senderAddress"
                />
            </div>
            <div>
                <label htmlFor="recipientAddress">Recipient Address:</label>
                <input
                    value={recieveAddress}
                    onChange={(e) => setRecieveAddress(e.target.value)}
                    placeholder="Recipient wallet address"
                    id="recipientAddress"
                />
            </div>
            <div>
                <label htmlFor="treasuryCapId">TreasuryCap ID:</label>
                <input
                    value={treasuryCapId}
                    onChange={(e) => setTreasuryCapId(e.target.value)}
                    placeholder="TreasuryCap object ID"
                    id="treasuryCapId"
                />
            </div>
            <div>
                <label htmlFor="adminCapId">AdminCap ID:</label>
                <input
                    value={adminCapId}
                    onChange={(e) => setAdminCapId(e.target.value)}
                    placeholder="AdminCap object ID"
                    id="adminCapId"
                />
            </div>
            <div>
                <label htmlFor="coinObjectId">Coin Object ID (for burn):</label>
                <input
                    value={coinObjectId}
                    onChange={(e) => setCoinObjectId(e.target.value)}
                    placeholder="Coin object ID"
                    id="coinObjectId"
                />
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount of tokens"
                    id="amount"
                />
            </div>
            <div>
                <Button onClick={handleMint}>Mint Tokens</Button>
                <Button onClick={handleBurn}>Burn Tokens</Button>
            </div>
            <div>
                <p>Status: {statusMessage}</p>
            </div>
        </section>
    );
};

export default SUIContracts;
