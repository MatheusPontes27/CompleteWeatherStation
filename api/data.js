

const express = require('express');
const app = express();

// Middleware para parsear o JSON recebido no corpo da requisição
app.use(express.json());

// Rota para receber os dados enviados pelo ESP8266
app.post('/api/data', (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { temperature, pressure, altitude } = req.body;

    // Verifica se todos os dados necessários foram recebidos
    if (temperature === undefined || pressure === undefined || altitude === undefined) {
      return res.status(400).json({ error: 'Dados incompletos recebidos.' });
    }

    // Aqui você pode adicionar lógica para salvar os dados em um banco de dados ou outra operação
    console.log('Dados recebidos:', { temperature, pressure, altitude });

    // Retorna uma resposta de sucesso
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  } catch (error) {
    // Tratamento de erro: envia uma resposta JSON de erro
    res.status(500).json({ error: 'Erro interno no servidor.', details: error.message });
  }
});

// Inicia o servidor
