const webpush = require('web-push');

//--------------------------------- Configuration Web Push ---------------------------------\\
const vapidKeys = webpush.generateVAPIDKeys();

console.log("private key : " + vapidKeys.privateKey);
console.log("public key : " + vapidKeys.publicKey);