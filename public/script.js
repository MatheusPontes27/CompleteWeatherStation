

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
  
    if (!dataContainer) {
      console.error('Elemento com ID "data-container" não encontrado.');
      return;
    }
  
    async function fetchData() {
      try {
        const response = await fetch('https://complete-weather-station.vercel.app/api/data');
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        if (!data || !data.temperature || !data.pressure || !data.altitude) {
          throw new Error('Dados inválidos recebidos do servidor.');
        }
  
        dataContainer.innerHTML = `
          <p>Temperatura: ${data.temperature} °C</p>
          <p>Pressão: ${data.pressure} hPa</p>
          <p>Altitude: ${data.altitude} m</p>
        `;
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        dataContainer.innerHTML = `<p>Erro ao buscar dados: ${error.message}</p>`;
      }
    }
  
    setInterval(fetchData, 10000);
  });
  