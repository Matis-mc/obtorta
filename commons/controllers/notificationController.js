// routes/notifications.js
const express = require('express');
const router = express.Router();
const webpush = require('../../config/push');
const Subscription = require('../models/SubscriptionSchema');

const subscriptionsHardCored = [{
        "endpoint": "https://wns2-par02p.notify.windows.com/w/?token=BQYAAAC8CuXt%2bMvAaoJr81%2fEnSxjIjOYDOyXonVMLNC%2bJVPfyEpU3HC4zSfbkA4SsuKERl9zcpcnPwQBVtPuTdUBE5C1X3Zy186o2Yz%2fqnJOYvkAo1f0Jaj16hUdrhPh0O8A6GVL6SPDE%2b0PjLMKwyQMBP7j9tCqvjxFxpeBJX2M8Qir1MFb2iQj69kfL8qsTGor3%2bhLIWCeZs8zPECnnfzmr2n6pu8xGakXVgv5oNNUSk3h4i2N80y8O8OA5ZHZi05A5XXYc2svJcVpzGbIh4h0gGqAMe79ytroM5D4KuOhh0M%2b%2b6GBxcGdsp%2bPLfxohfhOljIdku0YLvJCeRIuMHpRnZ29",
        "expirationTime": null,
        "keys": {
            "p256dh": "BOOLLFfPW2gTKrNI-T_lsrl7M7mPc46yNfIBPvi7XLAsFACAW9hgHYphBoXe9miCjJUBBUdYeXkl3g548uAx5eI",
            "auth": "OOewzAZLplCpYXsfHQVA9Q"
        }
    }
]

// Sauvegarder une nouvelle subscription
router.post('/notifications/subscribe', async (req, res) => {
  try {
    const { subscription} = req.body;
    
    // Sauvegarder en DB
    const newSubscription = new Subscription({
      endpoint: subscription.endpoint,
      keys: subscription.keys
    });
    
    await newSubscription.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Subscription enregistrée' 
    });
  } catch (error) {
    console.error('Erreur subscription:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Supprimer une subscription
router.post('/notifications/unsubscribe', async (req, res) => {
  try {
    const { endpoint } = req.body;
    await Subscription.deleteOne({ endpoint });
    
    res.json({ 
      success: true,
      message: 'Subscription supprimée' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Envoyer une notification à un utilisateur
router.post('/notifications/send', async (req, res) => {
  try {
    const {body, data } = req.body;
    
    // Récupérer toutes les subscriptions de l'utilisateur
    const subscriptions = await Subscription.find();
    
    if (subscriptions.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Aucune subscription trouvée' 
      });
    }
    
    const payload = JSON.stringify({
      title: "🐗 Grouik Grouik",
      body,
      icon: '/images/logo-harde.png'
    });
    console.log("PAYLOAD : " + JSON.stringify(payload));
    // Envoyer à toutes les subscriptions
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        console.log("sending notification ...");
        console.log("subscription : " + JSON.stringify(sub));
        await webpush.sendNotification(
          sub,
          payload
        );
        console.log("res : " + JSON.stringify(res) );
        return { success: true, endpoint: sub.endpoint };
      } catch (error) {
        console.log("error : " + JSON.stringify(error) );
        console.error('Code HTTP:', error.statusCode);
        console.error('Headers:', error.headers);
        console.error('Body:', error.body);
        // Si erreur 410 (Gone), supprimer la subscription
        if (error.statusCode === 410) {
          await Subscription.deleteOne({ endpoint: sub.endpoint });
        }
        return { success: false, endpoint: sub.endpoint, error };
      }
    });
    
    const results = await Promise.all(sendPromises);
    
    res.json({ 
      success: true,
      results 
    });
  } catch (error) {
    console.error('Erreur envoi notification:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Envoyer à tous les utilisateurs (broadcast)
router.post('/broadcast', async (req, res) => {
  try {
    const { title, body, data } = req.body;
    
    const subscriptions = await Subscription.find({});
    
    const payload = JSON.stringify({
      title,
      body,
      icon: '/icon.png',
      data: data || {}
    });
    
    const results = await Promise.allSettled(
      subscriptions.map(sub =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          payload
        )
      )
    );
    
    res.json({ 
      success: true,
      sent: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;