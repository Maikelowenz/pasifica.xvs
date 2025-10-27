// Langkah 1: Impor GoogleGenerativeAI dari CDN
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// -------------------------------------------------------------------
// MASUKKAN API KEY ANDA DI SINI (HANYA UNTUK UJI COBA LOKAL!)
// -------------------------------------------------------------------
const API_KEY = 'AIzaSyD4TSZPmGxZzh1H9Kow7RjfAtkZMo0fJeM';
// -------------------------------------------------------------------

// Dapatkan elemen DOM
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Inisialisasi Model Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Mulai sesi chat baru dengan history awal
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Halo" }],
        },
        {
            role: "model",
            parts: [{ text: "Halo! Saya adalah AI yang didukung oleh Gemini. Tanyakan apa saja!" }],
        },
    ],
});

// Tambahkan event listener ke formulir (jadikan async)
chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Tampilkan pesan pengguna
        appendMessage('user', userMessage);
        userInput.value = '';

        // Tampilkan indikator "mengetik..." dari bot
        appendMessage('bot', 'Mengetik...');

        try {
            // Kirim pesan ke API Gemini
            const result = await chat.sendMessage(userMessage);
            const response = result.response;
            const botResponse = response.text();
            
            // Update pesan "mengetik..." dengan respons AI
            updateLastBotMessage(botResponse);

        } catch (error) {
            console.error('Error:', error);
            updateLastBotMessage('Maaf, terjadi kesalahan. (Lihat konsol untuk detail)');
        }
    }
});

/**
 * Menambahkan pesan baru ke chat box
 * @param {string} sender - 'user' atau 'bot'
 * @param {string} message - Teks pesan
 */
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Memperbarui pesan terakhir bot (mengganti "Mengetik...")
 * @param {string} newMessage - Teks pesan baru
 */
function updateLastBotMessage(newMessage) {
    const allBotMessages = chatBox.querySelectorAll('.message.bot');
    const lastBotMessage = allBotMessages[allBotMessages.length - 1];
    
    if (lastBotMessage && lastBotMessage.textContent === 'Mengetik...') {
        lastBotMessage.textContent = newMessage;
    } else {
        // Jika tidak ada pesan "mengetik..." (misalnya error), tambahkan saja
        appendMessage('bot', newMessage);
    }
}