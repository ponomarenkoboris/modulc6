const geoLocation = document.querySelector('.geo-location');
const btnSend = document.querySelector('.btn-send');
const area = document.querySelector('.text-area');
// Нормаально оформить
let clickCounter;

websocket = new WebSocket('wss://echo.websocket.org/');
websocket.onopen = function(e) {
    console.log("CONNECTED");
};
websocket.onclose = function(e) {
    console.log("DISCONNECTED");
};
    
websocket.onmessage = function(e) {
    let mes = `
        <span class="message">${e.data}</span>
    `
    area.insertAdjacentHTML('beforeend', mes);
};

btnSend.addEventListener('click', () => {
    clickCounter += 1;
    let message = document.querySelector('.input').value;
    let yourmes = `
        <span class="your-mes">${message}</span>
    `;
    area.insertAdjacentHTML('beforeend', yourmes);
    websocket.send(message);
    document.querySelector('.input').value = '';
    // Открываем соединение 
});

geoLocation.addEventListener('click', () => {
    clickCounter += 1;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { coords } = position;
            let mes = `
                <a href="https://www.openstreetmap.org/#map=17/${coords.latitude}/${coords.longitude}" target="_blank" class="your-mes">Гео-локация</a>
            `;
            area.insertAdjacentHTML('beforeend', mes);
        });
    }
});

