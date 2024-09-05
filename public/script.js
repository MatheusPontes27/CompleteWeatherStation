

// Função para formatar a data
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `Data: ${day}/${month}/${year} - Hora: ${hours}:${minutes}:${seconds}`;
}

// Função para verificar se os dados são válidos
function isValidData(data) {
    // Valida se todos os campos esperados estão presentes e são números válidos
    return data.timestamp && !isNaN(parseFloat(data.temperature)) && !isNaN(parseFloat(data.humidity));
}

// Função para atualizar a interface com os dados recebidos
function updateUI(data) {
    if (isValidData(data)) {
        document.getElementById('timestamp').innerText = formatDate(data.timestamp);
        document.getElementById('temperature').innerText = `Temperatura: ${data.temperature} °C`;
        document.getElementById('humidity').innerText = `Umidade: ${data.humidity} %`;
        document.getElementById('weather-info').style.display = 'block'; // Mostra os dados do tempo
        document.getElementById('offline-message').style.display = 'none'; // Esconde a mensagem de offline
    } else {
        console.error('Dados recebidos inválidos:', data);
        showOfflineMessage(); // Mostra mensagem de offline se os dados forem inválidos
    }
}

// Função para exibir a mensagem de offline
function showOfflineMessage() {
    document.getElementById('weather-info').style.display = 'none'; // Esconde os dados do tempo
    document.getElementById('offline-message').style.display = 'block'; // Mostra a mensagem de offline
}

// Função para buscar dados do servidor
function fetchData() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Diagnóstico
            if (Array.isArray(data) && data.length > 0) {
                const latestData = data[data.length - 1]; // Obtém o último dado
                updateUI(latestData); // Atualiza a interface com o último dado
            } else {
                showOfflineMessage(); // Mostra mensagem de offline se não houver dados
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            showOfflineMessage(); // Mostra mensagem de offline se houver erro na requisição
        });
}

// Atualiza os dados a cada 5 segundos
setInterval(fetchData, 5000);

// Busca dados imediatamente para garantir que a página exiba dados se disponíveis
fetchData();
