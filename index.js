const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/v2', (req, res) => {
  const { action, link, quantity } = req.query;

  if (action === 'add' && link) {
    // SMM पैनल को रिप्लाई (Aryan System)
    res.json({ order: Math.floor(Math.random() * 1000000), system: "Aryan API" });

    const qty = parseInt(quantity) || 10000;
    const batchSize = 200; 
    const delay = 1000; 

    console.log(`🚀 ARYAN FAST API: Target ${qty} views for ${link}`);

    setTimeout(async () => {
      let sent = 0;
      
      while (sent < qty) {
        const currentBatch = Math.min(batchSize, qty - sent);
        const requests = [];

        for (let i = 0; i < currentBatch; i++) {
          requests.push(
            axios.get(link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
              },
              timeout: 3000
            }).catch(() => {}) 
          );
        }

        await Promise.all(requests);
        sent += currentBatch;
        console.log(`⚡ ARYAN SYSTEM Sent: ${sent} / ${qty}`);

        await new Promise(r => setTimeout(r, delay));
      }
      console.log(`✅ ARYAN TASK COMPLETE: Fired ${qty} requests!`);
    }, 0);

  } else {
    res.json({ error: "Invalid parameters or link missing" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aryan Fast API is running on port ${PORT}`);
});
