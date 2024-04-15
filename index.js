document.addEventListener("DOMContentLoaded", function() {
    const translateButton = document.getElementById('translate-button');
    translateButton.addEventListener('click', translateText);
});

function translateText() {
    const inputText = document.getElementById('input-text').value;
    const targetLanguage = document.getElementById('language-selector').value;

    fetch(`https://libretranslate.de/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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