# wallet-less-login-web3athon
An attempt to try out the idea of login using steganography instead of web3 wallets.

## The Concept
Web3 wallets are great, they provide a clean interface for users to interact with blockchains.
But for non-tech users, the concept of downloading a brwoser extension and creating a "wallet" before using an app is not well-received.

To solve this, I propose the following two solutions from UX design point-of-view:
- wallet-less login: we normally see "login with google", "login with facebook", and "PAY with paypal" instead of "login with paypal". For me, to login with a wallet before using a web3 social app is like using paypal to login to twitter, it makes feel like I'm gonna automatically signup for twitter blue or something ;)
- access pass: if we don't use wallet, we have to use something that is familiar to the users. Access pass is an example, we are already familiar with the experience of presenting our access pass when attending an event or concert.

## The Ideal Solution
I haven't implement the full ideal solution described below, only a small proof-of-concept.
### The Registration Flow
- Step 1: user input their username and password
- Step 2: the password is used to encrypt the mnemonic phrase automatically generated using polkadot.js
- Step 3: the encrypted mnemonic is automatically embedded into a picture (access pass) showed on the registration page using steganography
- Step 4: user click "Download My Pass" to download the picture with secret information to a user specified place
### The Login Flow
- Step 1: user input their username and password
- Step 2: user select the access pass they previously downloaded
- Step 3: the front-end will extract the encrypted mnemonic phrase, decrypt mnemonic using the password for further use.

The decrypted secret should be stored in some sort of memory like metamask did (chrome extension storage), but currently I'm not sure where to store that.

## The Implemented Solution
I managed to embed the plain text mnemonic into the picture but failed to embed the encrypted one. I think the reason is: 1) my steganography algorithm is not good enough yet; 2) in order to store a large amount of data, I proabably need to find a suitable picture instead of the current one I'm using. And the username field currently is not used for anything.
- Step 1: open browser console
- Step 2: enter username and password
- Step 3: click the download button

If the mnemonic is embedded correctly, a download should start, the page is redirected, and the mnemonic is output into the browser console for future comparison.
- Step 4: enter username and password for login
- Step 5: choose the file just downloaded
- Step 6: click the verify button

Now you should see the plain text mnemonic phrase output into the browser console.