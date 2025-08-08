/**
 * NStorage Demonstartion Script
 */
/* Application Demo Class */
class MyApplication {
    constructor(options = {}){

    }

    /**
     * Run Encryptors Test
     */
    TestEncryptors(content = "TextMustBe16Byte", key = "testKey"){
        console.log("NStorage Encryptors Test Runned.");
        const testEncryptors = [
            NEncryptor.Mode.Basic, NEncryptor.Mode.CBC, NEncryptor.Mode.CFB, NEncryptor.Mode.CTR,
            NEncryptor.Mode.ECB, NEncryptor.Mode.OFB
        ];

        // Run All Encryptors
        for(let i = 0; i < testEncryptors.length; i++){
        try{
                let encryptor = new NEncryptor(key, { Mode: testEncryptors[i] });
                console.log(`NStorage Testing Encryptor: ${testEncryptors[i].Name}`);
                let encryptedData = encryptor.Encrypt(content)
                console.log(`${testEncryptors[i].Name} Encrypted Data`, encryptedData);
                console.log(`${testEncryptors[i].Name} Decrypted Data`, encryptor.Decrypt(encryptedData));
            }catch(ex){
                console.error(`${testEncryptors[i].Name} Encryptor Error:`, ex?.message ?? "Unknown Error");
            }
        }

        console.log("NStorage Encryptors Test Ended.");
    }
}

/* Run Application Demo at Page Ready */
document.addEventListener("DOMContentLoaded", function(){
    const MyApp = new MyApplication({

    });
    
    // Run Tests Before
    MyApp.TestEncryptors();
});