// routes/notifications.js
const express = require('express');
const router = express.Router();
const webpush = require('../../config/push');
const Subscription = require('../models/SubscriptionSchema');

// Sauvegarder une nouvelle subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { subscription, userId } = req.body;
    
    // Sauvegarder en DB
    const newSubscription = new Subscription({
      userId,
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
router.post('/unsubscribe', async (req, res) => {
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
router.post('/send', async (req, res) => {
  try {
    const { userId, title, body, data } = req.body;
    
    // Récupérer toutes les subscriptions de l'utilisateur
    const subscriptions = await Subscription.find({ userId });
    
    if (subscriptions.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Aucune subscription trouvée' 
      });
    }
    
    const payload = JSON.stringify({
      title,
      body,
      icon: '/icon.png',
      badge: '/badge.png',
      data: data || {}
    });
    
    // Envoyer à toutes les subscriptions
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          payload
        );
        return { success: true, endpoint: sub.endpoint };
      } catch (error) {
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