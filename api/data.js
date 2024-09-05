

const express = require('express');
const cors = require('cors'); // Importa o módulo CORS

const app = express();
app.use(cors()); // Habilita CORS para todas as requisições
app.use(express.json());

let weatherData = []; // Array para armazenar os dados enviados pelo ESP8266

// Rota para receber os dados do sensor (ESP8266 envia dados para essa rota)
app.post('/api/data', (req, res) => {
  const { temperature, pressure, altitude } = req.body;

  if (!temperature || !pressure || !altitude) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  // Adiciona os dados recebidos ao array
  weatherData.push({ temperature, pressure, altitude, timestamp: new Date() });

  // Limita a quantidade de dados armazenados para evitar uso excessivo de memória
  if (weatherData.length > 100) {
    weatherData.shift(); // Remove o item mais antigo
  }

  console.log('Dados recebidos:', { temperature, pressure, altitude });
  res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Rota para enviar os dados ao site
app.get('/api/data', (req, res) => {
  res.json(weatherData);
});

// Porta em que o servidor vai rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
