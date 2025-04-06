const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors(
  {
    //   // origin:["emr-adityas-projects-fa7d747a.vercel.app"],
    //   origin:[process.env.ORIGIN],
    //   methods:["POST","GET"], 
    //   credentials:true
    origin: process.env.ORIGIN || "*", // Fallback to '*' if ORIGIN is not set
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Access-Control-Allow-Origin"]
  }

));
app.use(express.json());
const PORT = process.env.PORT || 5000;

const controllersPath = path.join(__dirname, 'controllers');
fs.readdirSync(controllersPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const router = require(path.join(controllersPath, file));
    app.use('/api', router);
  }
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

