# NS Storage
<img src="https://github.com/Neurosell/nsstorage/blob/develop/visual/header.png?raw=true" alt="NS Storage - cross-platform secured storage and field with device fingerprinting library for web applications" style="width: 100%" /><br/>

<p align="center"><b>NS Storage</b> - A <b>lightweight (~60KB)</b> and <b>fast</b> library written in Vanilla JS for protecting <b>local storage</b>, class fields, and cryptography in your client-side web applications. The library also includes a simple method for collecting the user's device fingerprint to generate secure storage keys.</p>

<hr>

<p align="center"><a href="#Installation">Installation</a> | <a href="#Use-Cases">Use Cases</a> | <a href="https://github.com/Neurosell/nsstorage/releases">Releases</a> | <a href="https://nuid.ru/">NUID</a></p>

<hr/>

❓**Why NS Storage?**
- Fast and Lightweight encrypted local storage;
- Simple device fingerprinting and key generation for Secured Storage;
- Secured Fields for your Objects and Classes;
- Cross-platform Support;
- Different AES Encryptors;

**Supported Platforms:**
- Web Applications and Websites (Progressive Web Apps);
- VK Mini Apps (VK Bridge);
- Telegram Web Apps;
- Electron and Cordova Apps;

<b>This library is a part of <a href="https://nuid.ru/">NUID Client</a>.

<hr/>

## Installation
The process of installing the **NS Storage library** for your web applications is quite simple.
You can <a href="https://github.com/Neurosell/nsstorage/releases">download and connect the necessary scripts from our repository latest releases page</a>, or **use our CDN:**

```html
<script src="https://s3.twcstorage.ru/e1c4c0e1-main-cdn/nstorage.js" type="text/javascript"></script>
```

**Or minified version (~60KB):**
```html
<script src="https://s3.twcstorage.ru/e1c4c0e1-main-cdn/nstorage.min.js" type="text/javascript"></script>
```

<hr/>

## Use Cases
You can use **NS Storage** library in case of:
- Secure your local storage data with device fingerprint key;
- Store Secured (Encrypted) Fields into any objects;
- Get Device fingerprinting;
- Work with objects and text AES encryption;

<hr/>

## Secured Storage Usage
The **NS Storage** Library may be used instead basic local storage with encrypted by device fingerprint keys and values.
Use this to protect your local storage objects.

**Usage Example:**
```javascript
// Create a storage instance
const exampleStorage = new NStorage();

// Save Item
exampleStorage.SetItem("exampleKey", "exampleValue"); // Will be saved in storage as "95ef95887680ac20b53f":"d2f28c846b9ca50e8627ddcc890f"

// Read Item
exampleStorage.GetItem("exampleKey"); // Returns Decrypted "exampleValue"
```

<hr/>

## Secured Fields
The **NS Storage** Library has own **Secured Fields** implementation for any your objects.
You can store **secured values** to protect memory hacking (for example with CheatEngine). This field is not store un-encrypted values.

**Example Class with Secured Fields:**
```javascript
class MyClass {
    construtor(){
        this.unencryptedField = "My Unencrypted Field";                 // Raw value can be found and changed in memory
        this.securedField = new SecuredField("My Secured Field");       // Raw value can't be found and changed in memory
    }
}
```

**Now you can use your Secured Fields:**
```javascript
// Create our Object Instance
const myObj = new MyClass();

// Get RAW Value
const rawValue = myObj.securedField.Value;

// Update Value (will be stored in memory with encryption)
myObj.securedField.Value = "new value to be encrypted";
```

<hr/>

## Device Fingerprint Class
The **NS Storage** Library has own simple Device Fingerprint Class Implementation.
Use this class to collect device information, UUID and device fingerprint by one line of code.

**Example Usage:**
```javascript
// Get Device Data, Fingerprint and UUID
const fingerprintData = NDeviceFingerprint.GetDeviceFingerprint();
console.log(fingerprintData.Data, fingerprintData.Key, fingerprintData.UUID);
```

**Collected Information:**
- User Agent;
- Browser Information (Name and Version);
- OS Information (Name and Version);
- Sceen Information (Resolution and Color Depth);
- Mobile Detection;
- Cookie Support Detection;
- HTML5 Features Detection;
- Language;
- Timezone Data;
- Device Memory;
- Do Not Track Flag;
- Browser Mime Types and Plugins List;
- WebGL Features List;
- Canvas Fingerprint;
<hr/>

## Crypto Classes
The **NS Storage** Library has own AES-Based Crypto Classes Implementation.
You can use any of these classes for your projects or **NEncryptor** helper class.

**Example Usage (with Encryptor):**
```javascript
// Create Encryptor Object
const myEncryptor = new NEncryptor("My Encryption Key", { Mode: NEncryptor.Mode.CTR });

// Get Encrypted HEX
const encryptedHEX = myEncryptor.Encrypt("My Decrypted Text");

// Get Decrypted Text
const decryptedText = myEncryptor.Decrypt(encryptedHEX);
```

**Example Usage:**
```javascript
// Prepare AES Encryption Key
const key = "myencryptionkey";
const hashedKey = new NCryptoMD5(key).GetHEX();
const bytes = new Array(16);
for (var i = 0; i < hashedKey.length;) {
    var hexByte = hashedKey[i++] + hashedKey[i++];
    var byte = parseInt(hexByte, 16);
    bytes[i / 2 - 1] = byte;
}

// Create Your Encryptor with converted to bytes array Encryption Key
const encryptor = new NCryptoCTR(bytes, new NCryptoCounter(1));

// Encrypt Some Text
const decryptedText = "My Decrypted Text";                      // Here your Decrypted Text
const decryptedBytes = encryptor._textToBytes(decryptedText);   // Convert to Decrypted Bytes Array
const encryptedBytes = encryptor.Encrypt(decryptedBytes);       // Encrypt your Decrypted Bytes Array
const encryptedHEX = encryptor._bytesToHex(encryptedBytes);     // Convert Encrypted Bytes Array to HEX String


// Decrypt Some Text
const encryptedBytes = encryptor._hexToBytes(encryptedHEX);     // Convert Encrypted HEX String to Encrypted Bytes Array
const decryptedBytes = encryptor.Decrypt(encryptedBytes);       // Decrypt Bytes Array
console.log(encryptor._bytesToText(decryptedBytes));            // Convert Decrypted Bytes to Text
```

**List of Available Classes:**
- **NEncryptor** - Multi-Method Encryption Helper;
- **NCrypto** - Base class with Utils Methods;
- **NCryptoAES** - Basic AES Implementation;
- **NCryptoECB** - AES in ECB Mode Implementation;
- **NCryptoCBC** - AES in CBC Mode Implementation;
- **NCryptoCFB** - AES in CFB Mode Implementation;
- **NCryptoOFB** - AES in OFB Mode Implementation;
- **NCryptoCTR (Recommended)** - AES in CTR Mode Implementation;
- **NCryptoCounter** - Util class for AES Counter;
- **NCryptoMD5** - MD5 Hash Implementation;

**Encryption Classes Methods:**
- **Name** - Returns {string} Encryption Method Name;
- **Encrypt** - Returns {bytes} Encrypted UTF8 Bytes Array;
- **Decrypt** - Returns {bytes} Decrypted UTF8 Bytes Array;

<hr/>

## About NS Storage Library
The **NS Storage library** was developed by the Neurosell team for secure data storage on the client side of web applications. **The library does not provide 100% protection for client data and is provided as is. Never trust client data.**

**Developer:** Elijah Rastroguev
**Website:** https://nuid.ru/
**License:** MIT

<hr />
<a href="https://nsell.tech/" target="_blank"><img src="https://github.com/Neurosell/.github/blob/main/profile/nsellfooter.png?raw=true" alt="Neurosell" style="width: 100%" /></a>