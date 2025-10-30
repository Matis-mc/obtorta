// config/push.js
const webpush = require('web-push');

webpush.setVapidDetails(
  'https://la-harde.vercel.app/',
  'BD9x-LFbcMQeRTQ1Eg6wbKmZZuvyzXOUNcsHJnBJcfEZ_KYWZS0Pp9A3Hbb9SkUA_D7CH-8iogwLOfuUEu0cknE',
  'HW8s-RaI-0ySSJgXc37fHJlYw9-UFQJ3UOQxaj7jGxo'
);

module.exports = webpush;