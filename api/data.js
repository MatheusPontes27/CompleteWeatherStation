

// data.js
const express = require('express');
const app = express();
const port = 3000;

let sensorData = { temperature: null, pressure: null, altitude: null };

app.use(express.json());

// Endpoint para receber dados do ESP8266
app.post('/api/data', (req, res) => {
  const { temperature, pressure, altitude } = req.body;
  sensorData = { temperature, pressure, altitude };
  console.log('Dados recebidos:', sensorData);
  res.status(200).send('Dados recebidos com sucesso.');
});

// Endpoint para o frontend obter os dados
app.get('/api/data', (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
