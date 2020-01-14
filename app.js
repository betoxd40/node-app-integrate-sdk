// Import the configuration and the SDK:
const IntegrateSDK = require("./lib/factom-harmony-integrate-js-sdk/index");
// const IntegrateSDK = require('factom-harmony-integrate');

const configure = {
    baseUrl: "https://ephemeral.api.factom.com/v1",
    accessToken: {
      appId: "4ae3600f",
      appKey: "8b67a47eed2b7a17a50365c6fc73ec0d"
    }
  };

// Instantiate the SDK Class:
const Integrate = new IntegrateSDK(configure);

// Execute an Integrate SDK Method
let claimObj = Integrate.claim.create({
  id: 'did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79',
  FullName: 'Bob Smith',
  "@context": "https://w3id.org/identity/v1"
});

let credentialVerifyObj = Integrate.credential.create({
  issuer: 'did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79',
  issuanceDate: '2010-01-01T19:23:24Z',
  "type": ["VerifiableCredential", "IdentityCredential"],
  credentialSubject: claimObj,
}).sign({
    signer: 'did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79#key-1',
    signerPrivateKey: 'idsec32vrpyBYP12MpVtrhyEgX5dqZLD4hKhorHJjs2T9qY9vWntmB6'
}).verify({
    signerPublicKey: 'idpub2nJz8MYB2gSWUCpSH6rJdnMoJxUsWd8q8hMrhLQztJvGFjoyTR',
    verbose: true,
    requiredConfirmDepth: {
      bitcoin: 6,
      ethereum: 7,
    },
});

console.log(credentialVerifyObj)