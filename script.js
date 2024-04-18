document.addEventListener("DOMContentLoaded", function() {

    //Event listener for translating text
    const translateButton = document.getElementById('translate-button');
    translateButton.addEventListener('click', translateText);

    // Event listener for selecting a language
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', translateText);

    // Event listener for toggling dark/light mode
    const toggleModeButton = document.getElementById('toggle-mode-button');
    toggleModeButton.addEventListener('click', toggleMode);
});

function translateText() {
    const inputText = document.getElementById('input-text').value;
    const targetLanguage = document.getElementById('language-selector').value;

    fetch(`https://libretranslate.de/translate`, {
       .then(res => res.JSON)
    

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.parse({
            q: inputText,
            source: 'en', // Assuming input text is in English. Change if necessary.
            target: targetLanguage
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const translatedText = data.translatedText;
        displayTranslation(translatedText);
    })
    .catch(error => {
        console.error('There was a problem with the translation request:', error);
    });
}

function displayTranslation(translation) {
    const translationResult = document.getElementById('translation-result');
    translationResult.textContent = translation;
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}