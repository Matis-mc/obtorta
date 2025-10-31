// test-push.js
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:test@example.com',
  'BD9x-LFbcMQeRTQ1Eg6wbKmZZuvyzXOUNcsHJnBJcfEZ_KYWZS0Pp9A3Hbb9SkUA_D7CH-8iogwLOfuUEu0cknE',
  'HW8s-RaI-0ySSJgXc37fHJlYw9-UFQJ3UOQxaj7jGxo'
);

const subscription = {
        endpoint: "https://wns2-par02p.notify.windows.com/w/?token=BQYAAACYSmfhfMIDgvkPrSjcZJMh2gV1i68KMVGbonpcHdYSEIjs%2b%2fKuXDLueVzLtvYjozR1Av01CtnHBi93H4JQEAaVDIs5K%2fdxq%2bHBZrJrFHDP7zYZzZDezrs%2b6WIkayi57AYwlAZW1qqBXcTqVcMcLzOBhGgSiV3sLDem9w%2bs4JsH5VCXgn44hUZUiEA5oGiYW4P0VIwBTPHt80YnWK3IyrJ89tU5aPJwo7D2vAFpZiQfyzElfam1nf6ynbXIKOuYQlY53TI7lC2oo61HYzimJiPIOB%2fPxozR4HxJsOv%2bGNI5xNaA4A9Cp2L8zlGkJAMkCytp8PT1R7A5gZj62aN4bWbs",
        expirationTime: null,
        keys: {
            p256dh: "BBa98ixQlsas3SJPWmOZWVFI-Qjxi5_rKpVR__DApzb8F4s3WtNOJYHjcLbHd61diFGYM_FjrrScWamDawMd4Sk",
            auth: "-FGwJOUwRmLSBWuINan2Rw"
        }
    };

const payload = JSON.stringify({
  title: "Test",
  body: "Message"
});

console.log("=== AVANT ENVOI ===");
console.log("Subscription:", JSON.stringify(subscription, null, 2));
console.log("Payload:", payload);

webpush.sendNotification(subscription, payload)
  .then(response => {
    console.log("=== SUCCÈS ===");
    console.log("Response:", response);
    console.log("Status:", response.statusCode);
    console.log("Headers:", response.headers);
    console.log("Body:", response.body);
  })
  .catch(error => {
    console.log("=== ERREUR ===");
    console.log("Type d'erreur:", error.constructor.name);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);
    console.log("StatusCode:", error.statusCode);
    console.log("Headers:", error.headers);
    console.log("Body:", error.body);
    console.log("Erreur complète:", JSON.stringify(error, null, 2));
    
    // Afficher toutes les propriétés de l'erreur
    console.log("Toutes les propriétés:");
    for (let key in error) {
      console.log(`  ${key}:`, error[key]);
    }
  });