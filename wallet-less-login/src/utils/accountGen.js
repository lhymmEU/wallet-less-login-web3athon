import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { mnemonicGenerate, mnemonicValidate, signatureVerify } from "@polkadot/util-crypto";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto"

const CHAIN_LOCATION = "ws://127.0.0.1:9944";

async function init() {
    const wsProvider = new WsProvider(CHAIN_LOCATION);
    const api = await ApiPromise.create({ provider: wsProvider });
    await cryptoWaitReady();
    return api;
}

// There are two methods that can generate accounts for our users:
// - 1. using the built-in keyring account management module
// - 2. using the base functions provided by the @polkadot/util-crypto package
// for now, it seems keyring is a better choice for us
//
// Also, it seems like that if initialize keyring with 'sr25519' as the type, it should be done after api initialization
export async function generateAccounts() {
    const api = await init();
    // query the local chain information
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    console.log(`Connected to ${chain} using ${nodeName} v${nodeVersion}`);
    // 0. initialize keyring
    const keyring = new Keyring({ type: "sr25519" });
    // 1. generate mnemonic
    const mnemonic = mnemonicGenerate();
    // 2. validate the generated mnemonic
    if (!mnemonicValidate(mnemonic)) {
        throw new Error("Invalid mnemonic");
    }
    // 3. generate an account straight from mnemonic
    const pair = keyring.addFromUri(mnemonic);
 
    // TODO: handle account information properly
    console.log(`Public key: ${pair.publicKey}`);

    // TODO: not sure which part of pair is actually needed, return the whole thing for now.
    return [mnemonic, pair];
}

// !! this is just a temporary function for testing the account generated can do meaningful things
export function testGenedAccounts(pair) {
    // sign a message
    const message = stringToU8a("hello world!");
    const signature = pair.sign(message);
    const { isValid } = signatureVerify(message, signature, pair.publicKey);

    console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
}