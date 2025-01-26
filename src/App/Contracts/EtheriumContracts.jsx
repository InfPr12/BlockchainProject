import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BrowserProvider, Contract, parseUnits } from "ethers";

const EtheriumContracts = () => {
    const [sendAddress, setSendAddress] = useState("");
    const [receiveAddress, setReceiveAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const contractAddress = "0xDAdA6de1dba7668DD187Da5879aF4895e6C93Dd4";
    const contractABI = ["function mint(address to, uint256 amount) public", "function burn(uint256 amount) public",];

    const connectWallet = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            return signer;
        }
        catch (error) {
            console.error("Error connecting to MetaMask:", error);
            setStatusMessage("Error connecting to MetaMask.");
            return null;
        }
    };

    const handleMint = async () => {
        if (!receiveAddress || !amount) {
            alert("Please enter a valid recipient address and amount.");
            return;
        }

        try {
            const signer = await connectWallet();
            if (!signer) return;

            const contract = new Contract(contractAddress, contractABI, signer);
            const tx = await contract.mint(receiveAddress, parseUnits(amount, 18));
            setStatusMessage("Minting in progress...");
            await tx.wait();
            setStatusMessage(`Minting successful! Transaction Hash: ${tx.hash}`);
        }
        catch (error) {
            console.error("Minting error:", error);
            setStatusMessage("Minting failed.");
        }
    };

    const handleBurn = async () => {
        if (!amount) {
            alert("Please enter a valid amount to burn.");
            return;
        }

        try {
            const signer = await connectWallet();
            if (!signer) return;

            const contract = new Contract(contractAddress, contractABI, signer);
            const tx = await contract.burn(parseUnits(amount, 18)); // Assuming 18 decimals
            setStatusMessage("Burning in progress...");
            await tx.wait(); // Wait for the transaction to be mined
            setStatusMessage(`Burning successful! Transaction Hash: ${tx.hash}`);
        }
        catch (error) {
            console.error("Burning error:", error);
            setStatusMessage("Burning failed.");
        }
    };

    return (
        <section>
            <h2>Ethereum Transactions</h2>
            <div>
                <label htmlFor="etherAddress">Sender Address:</label>
                <input
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    placeholder="Sender Ethereum wallet address"
                    id="etherAddress"
                />
            </div>
            <div>
                <label htmlFor="etherAddress">Recipient Address:</label>
                <input
                    value={receiveAddress}
                    onChange={(e) => setReceiveAddress(e.target.value)}
                    placeholder="Recipient Ethereum wallet address"
                    id="etherAddress"
                />
            </div>
            <div>
                <label htmlFor="tokenAmount">Amount:</label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter token amount"
                    id="tokenAmount"
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

export default EtheriumContracts;
