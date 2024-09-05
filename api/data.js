

// data.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let sensorData = {
  temperature: null,
  pressure: null,
  altitude: null,
};

// Rota para receber dados do sensor
app.post('/api/data', (req, res) => {
  const { temperature, pressure, altitude } = req.body;
  if (temperature !== undefined && pressure !== undefined && altitude !== undefined) {
    sensorData = { temperature, pressure, altitude };
    console.log('Dados recebidos:', sensorData);
    res.status(200).send('Dados recebidos com sucesso.');
  } else {
    res.status(400).send('Dados inválidos.');
  }
});

// Rota para enviar os dados para o site
app.get('/api/data', (req, res) => {
  if (sensorData.temperature !== null) {
    res.json(sensorData);
  } else {
    res.status(500).send('Nenhum dado disponível.');
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
