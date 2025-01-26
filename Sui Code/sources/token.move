module token::token {
use sui::coin::{Self, TreasuryCap, Coin};
use sui::tx_context::{Self, TxContext};
use sui::transfer;
use sui::object::{Self, UID};
use std::option;

public struct TOKEN has drop {}

public struct AdminCap has key { id: UID }

fun init(otw: TOKEN, ctx: &mut TxContext) {
    let (treasury_cap, metadata) = coin::create_currency<TOKEN>(
        otw,
        9,
        b"CT",
        b"Token",
        b"Token showcases",
        option::none(),
        ctx
    );
    transfer::public_freeze_object(metadata);

    let admin_cap = AdminCap {
        id: object::new(ctx)
    };
    transfer::transfer(admin_cap, tx_context::sender(ctx));
    transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
}

public entry fun mint(
    c: &mut TreasuryCap<TOKEN>, 
    amount: u64, 
    recipient: address, 
    _admin: &AdminCap, 
    ctx: &mut TxContext
)
{
coin::mint_and_transfer(c, amount, recipient, ctx);
}

public entry fun burn(
    c: &mut TreasuryCap<TOKEN>,
    mut coins: Coin<TOKEN>,
    _admin: &AdminCap,
    _ctx: &mut TxContext
) {
    coin::burn(c, coins);
}

}