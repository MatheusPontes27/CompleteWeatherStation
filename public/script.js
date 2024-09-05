

document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
  
    // Função para buscar os dados do servidor
    async function fetchData() {
      try {
        // Fazendo uma requisição GET para o servidor
        const response = await fetch('https://complete-weather-station.vercel.app/api/data');
        
        // Checa se a resposta é bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
  
        // Converte a resposta para JSON
        const data = await response.json();
  
        // Atualiza o conteúdo da página com os dados recebidos
        dataContainer.innerHTML = `
          <p>Temperatura: ${data.temperature} °C</p>
          <p>Pressão: ${data.pressure} hPa</p>
          <p>Altitude: ${data.altitude} m</p>
        `;
      } catch (error) {
        // Exibe o erro no console e na página
        console.error('Erro ao buscar dados:', error);
        dataContainer.innerHTML = `<p>Erro ao buscar dados: ${error.message}</p>`;
      }
    }
  
    // Atualiza os dados a cada 10 segundos
    setInterval(fetchData, 10000);
  });
  