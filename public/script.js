

// public/script.js
async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      document.getElementById('temperature').textContent = data.temperature || '--';
      document.getElementById('pressure').textContent = data.pressure || '--';
      document.getElementById('altitude').textContent = data.altitude || '--';
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
  
  // Atualiza os dados a cada 10 segundos
  setInterval(fetchData, 10000);
  fetchData();
  