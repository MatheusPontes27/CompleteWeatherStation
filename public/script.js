

fetch('https://complete-weather-station.vercel.app/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados recebidos:', data);
  })
  .catch(error => {
    console.error('Erro ao buscar dados:', error);
  });
