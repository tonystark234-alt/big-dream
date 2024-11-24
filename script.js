// Obtener los elementos del DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const mapButton = document.getElementById('map-button');
const mapContainer = document.getElementById('map-container');
const imageInput = document.getElementById('image-input');
const sendImageButton = document.getElementById('send-image-button');

// Función para enviar el mensaje
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Crear el nuevo mensaje
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        
        // Agregar el mensaje al chat
        chatMessages.appendChild(messageElement);
        
        // Limpiar el campo de texto
        messageInput.value = '';
        
        // Hacer scroll hacia el último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Función para enviar la imagen
function sendImage(imageUrl) {
    // Crear el nuevo mensaje con la imagen
    const imageMessageElement = document.createElement('div');
    imageMessageElement.classList.add('chat-message');
    
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('chat-image-message');
    imageMessageElement.appendChild(imageElement);
    
    // Agregar la imagen al chat
    chatMessages.appendChild(imageMessageElement);
    
    // Hacer scroll hacia el último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Evento para el botón de enviar mensaje
sendButton.addEventListener('click', sendMessage);

// Evento para enviar el mensaje con Enter
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Evento para mostrar el mapa
mapButton.addEventListener('click', () => {
    mapContainer.style.display = 'block'; // Mostrar el mapa
    initMap(); // Inicializar el mapa
});

// Función para inicializar el mapa de la Ciudad Autónoma de Buenos Aires
function iniciarMap() {
    const mapOptions = {
        center: { lat: -34.6037, lng: -58.3816 }, // Coordenadas de Buenos Aires
        zoom: 12, // Nivel de zoom
        mapTypeId: 'roadmap',
    };

    const map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

    // Marcador en el mapa
    const marker = new google.maps.Marker({
        position: { lat: -34.6037, lng: -58.3816 },
        map: map,
        title: "Ciudad Autónoma de Buenos Aires",
    });
}

// Hacer que el botón de "Enviar Imagen" active el input de imagen
sendImageButton.addEventListener('click', () => {
    imageInput.click(); // Simula un clic en el input de tipo file
});

// Evento para procesar la imagen seleccionada
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0]; // Obtener el archivo de imagen
    if (file) {
        const reader = new FileReader();
        
        // Cuando se termine de leer el archivo, enviamos la imagen al chat
        reader.onloadend = function() {
            sendImage(reader.result); // Llamamos a la función para mostrar la imagen
        };
        
        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});
