import { stringToU8a, u8aToString } from '@polkadot/util';
import { naclEncrypt, naclDecrypt, pbkdf2Encode, randomAsU8a } from '@polkadot/util-crypto';

export async function encMne(mnemonic, pwd) {
  // prepare the mnemonic for encryption
  const mnePreEnc = stringToU8a(mnemonic);

  // derive a key from the password
  const salt = randomAsU8a(); // generate new salt for each user
  const iterations = 2048;
  const isUint8 = true; // return the password as a Uint8Array
  const { password } = pbkdf2Encode(pwd, salt, iterations, isUint8);

  // The derived key length from pbkdf2Encode is 64 bytes (512 bits), but naclEncrypt and naclDecrypt require a 32-byte key.
  // We can simply use the first 32 bytes of the derived key.
  const key = password.slice(0, 32);
  // encrypt the mnemonic
  const { encrypted, nonce } = naclEncrypt(mnePreEnc, key);

  // before return the encrypted mnemonic, make sure the encryption is correct
  const decrypted = naclDecrypt(encrypted, nonce, key);
  if (!(mnemonic === u8aToString(decrypted))) {
    throw new Error ("Mnemonic encryption failed!");
  } else {
    console.log("mnemonic encryption succeed!");
  }

  console.log("In encryption, the encrypted is: ", encrypted);
  return { encrypted, nonce, salt };
}

export async function decMne(encrypted, nonce, salt, pwd) {
    // derive the key from the password
    const iterations = 2048;
    const isUint8 = true;
    const { password } = pbkdf2Encode(pwd, salt, iterations, isUint8);
    // The derived key length from pbkdf2Encode is 64 bytes (512 bits), but naclDecrypt requires a 32-byte key.
    // We can simply use the first 32 bytes of the derived key.
    const key = password.slice(0, 32);
    console.log("In decryption, the encrypted is: ", encrypted);
    // decrypt the mnemonic
    const decrypted = naclDecrypt(encrypted, nonce, key);


    if (!decrypted) {
      throw new Error ("Mnemonic decryption failed!");
    } else {
      console.log("Mnemonic decryption succeed!");
      console.log("Decrypted Mnemonic is: ", u8aToString(decrypted));
      return u8aToString(decrypted);
    }
  }