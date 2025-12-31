---
title: "In flight transaction limit reached for delegated accounts"
description: "A possible solution to an obscure EVM sequencer error I couldn't find any information for."
date: "2025-12-30"
tags: ["Programming"]
---

## Error

Are you getting this infuriating error back from an EVM node sequencer?

> in-flight transaction limit reached for delegated accounts

and you don't know why?

You may have even Googled the exact error message, and found nothing useful except [this link](https://reth.rs/docs/src/reth_transaction_pool/error.rs.html#200) showing that this is an error corresponding to EIP-7702 transactions. But as far as you're aware you're not even sending EIP-7702 transactions!

Well, if you've loaded your test wallet into Metamask, check that you've not accidentally set up a "smart account". (Read more about Metamask smart accounts: [here](https://support.metamask.io/configure/accounts/what-is-a-smart-account)). Setting up a smart account will grant your wallet certain smart functionality with EIP-7702 by delegating execution to a smart contract. This has a number of benefits as highlighted by Metamask, but a downside is that EIP-7702 transactions can only have one transaction per block, yielding the afformentioned error if you try to spam multiple transactions in the same block.

The fixes are either:

- Slow down to one transaction per block.
- Stop accidentally sending EIP-7702 transactions by turning off the "smart account" functionality.

## How can I check if my wallet has delegated execution to any contracts?

I'm developing on the Base chain, so I open up Basescan, search my wallet address, and I can see any delegated contracts here:

![A screenshot of Basescan.org showing a wallet address. There is a little box at the top showing that it has delegated execution to a contract.](/images/blog/eip-7702-transaction-limits/delegated_account.png)

## How do I turn off smart account functionality?

Open the browser extension and click on the dropdown next to your account name at the top. Click on the three dot settings button next to your wallet,

![A 3 step panel shows the menus to click on to turn smart accounts off in Metamask.](/images/blog/eip-7702-transaction-limits/how_to_fix.jpg)

## Slightly more detail.

I'm no blockchain _expert_, so I can't guarentee my wording here is 100% precise, but this should be enough information to form a mental model of what's going on:

Ethereum has two types of accounts. Externally owned accounts (EOA), and Contract accounts.

- EOA Accounts are private key controlled accounts like your wallet and can initiate transactions.
- Contract accounts contain code, and can't initiate transactions.

Over the years, many different transaction types have been added to Ethereum, extending functionality for many different reasons.

- Examples include [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).
- And more recently [EIP-7702](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md).

From the EIP itself, EIP-7702 transactions contain a:

> list of tuples that indicate what code the signer of each tuple desires to execute in the context of their EOA.

This breaks some previous core assumptions that you could make. As laid out in the "Backwards Compatibility" section of the EIP:

> This EIP breaks a few invariants:
>
> - An account balance can only decrease as a result of a transaction originating from that account.
>   - Once an account has been delegated, any call to the account may also cause the balance to decrease.
> - An EOA nonce may not increase after transaction execution has begun.
>   - Once an account has been delegated, the account may call a create operation during execution, causing the nonce to increase.
> - tx.origin == msg.sender can only be true in the topmost frame of execution.
>   - Once an account has been delegated, it can invoke multiple calls per transaction.

And then later in the "Transaction Propagation" section of the EIP:

> With this EIP, it becomes possible to cause transactions from other accounts to become stale. This is due to the fact that once an EOA has delegated to code, that code can be called by anyone at any point in a transaction. It becomes impossible to know if the balance of the account has been swept in a static manner.
>
> While there are a few mitigations for this, the authors recommend that clients do not accept more than one pending transaction for any EOA with a non-zero delegation indicator. This minimizes the number of transactions that can be invalidated by a single transaction.
