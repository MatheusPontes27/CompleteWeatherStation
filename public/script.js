

let lastDataReceivedTime = Date.now(); // Inicializa com o tempo atual
const offlineThreshold = 15000; // Tempo máximo (em ms) sem dados antes de mostrar a mensagem de offline
let lastDataCount = 0; // Número de dados recebidos na última atualização
let repeatCount = 0; // Contador de repetições do mesmo número de dados

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Data: ${day}/${month}/${year} , Hora: ${hours}:${minutes}`;
}

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

            const currentDataCount = data.length; // Obtém o número de dados recebidos

            if (currentDataCount === lastDataCount) {
                repeatCount++; // Incrementa o contador de repetições
            } else {
                repeatCount = 0; // Reinicia o contador se o número de dados mudar
            }

            if (repeatCount < 3) { // Só atualiza se o contador for menor que 3
                if (data.length > 0) {
                    const latestData = data[data.length - 1]; // Obtém o último dado
                    console.log('Último dado recebido:', latestData); // Diagnóstico

                    if (isValidData(latestData)) { // Verifica se os dados são válidos
                        document.getElementById('timestamp').innerText = formatDate(latestData.timestamp);
                        document.getElementById('temperature').innerText = `Temperatura: ${latestData.temperature} °C`;
                        document.getElementById('humidity').innerText = `Umidade: ${latestData.humidity} %`;
                        document.getElementById('weather-info').style.display = 'block'; // Mostra os dados do tempo
                    } else {
                        console.log('Dados recebidos inválidos:', latestData); // Diagnóstico
                    }
                }
            }
            
            lastDataCount = currentDataCount; // Atualiza o último número de dados recebido
        })
        .catch(error => {
            console.error('Erro na operação fetch:', error);
        });
}

function isValidData(data) {
    // Adiciona conversão dos valores para números e valida se são números válidos
    const temperature = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);

    // Verifica se o timestamp está presente e se a temperatura e a umidade são números válidos
    return data.timestamp && !isNaN(temperature) && !isNaN(humidity);
}

function checkForOffline() {
    const currentTime = Date.now();
    if (currentTime - lastDataReceivedTime > offlineThreshold) {
        // Não exibe mensagem de offline
    }
}

// Atualizar dados a cada 5 segundos
setInterval(fetchData, 5000);

// Verificar o status de offline a cada 5 segundos (se necessário)
setInterval(checkForOffline, 10000);

// Fetch imediatamente para garantir que a página exiba dados se disponíveis
fetchData();
