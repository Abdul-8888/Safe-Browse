// // content.js

// Function to extract text content from the page
function extractTextContent() {
    // Use document.body.innerText or other DOM manipulation methods to get the text content
    const textContent = document.body.innerText;
    
    let allText = [];
    
    const allTextElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
    allTextElements.forEach(item => {
        allText.push(`${item.innerText}`);
    });

    allText = allText.filter(text => text);

    const sentencesArray = []
    allText.forEach(text => {
        const sentences = text.split(/[.!?]+/);
        if (sentences.length > 1) {
            sentencesArray.push(...sentences.filter(sentence => sentence.trim().split(' ').length < 50) || '');
            return;
        }
        sentencesArray.push(text);
    });

    return sentencesArray;
  }

// Function to extract sentences from the text content
function extractSentences(textContent) {
    // Split the text content into sentences

    const sentences = textContent.split(/[.!?]+/);

    // Filter out sentences that are longer than 50 characters
    const filteredSentences = sentences.filter(sentence => sentence.trim().split(' ').length < 50);

    return filteredSentences;
}

// Function to send a single sentence to the backend for prediction
function sendSentenceToBackend(sentence) {
    chrome.runtime.sendMessage({ type: 'PROCESS_SENTENCE', sentence: sentence }, (response) => {
        // Handle the response from the backend
        if (response.prediction !== undefined) {
            // Display the prediction on the page and change the color if hateful
            displayPrediction(sentence, response.prediction);
        }
    });
}

// function displayPrediction(sentence, prediction) {

//     // Find the sentence element in the DOM
//     const sentenceElements = document.querySelectorAll(`p:contains('${sentence}')`);

//     // Iterate over all found sentence elements
//     sentenceElements.forEach(sentenceElement => {
//         // Set the text color based on the prediction value
//         if (prediction.prediction === 1) {
//             sentenceElement.style.color = 'red'; // Set the text color to red
//         } else {
//             sentenceElement.style.color = 'green'; // Set the text color to green
//         }
        
//         // Replace the original sentence with the predicted sentence
//         sentenceElement.textContent = `Sentence: ${sentence} - Prediction: ${prediction}`;
//     });
// }

// function displayPrediction(sentence, prediction) {
//     // Find all paragraph elements on the page
//     const paragraphElements = document.querySelectorAll('p');

//     // Iterate over each paragraph element
//     paragraphElements.forEach(paragraphElement => {
//         // Check if the paragraph contains the target sentence
//         if (paragraphElement.textContent.includes(sentence)) {
//             // Set the text color based on the prediction value
//             paragraphElement.style.color = prediction.prediction === 1 ? 'red' : 'green';

//             // Update the text content with the prediction
//             paragraphElement.textContent = `Sentence: ${sentence} - Prediction: ${prediction.prediction}`;
//         }
//     });
// }

function displayPrediction(sentence, prediction) {
    // Find all paragraph elements on the page
    const paragraphElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');

    // Iterate over each paragraph element
    paragraphElements.forEach(paragraphElement => {
        // Check if the paragraph contains the target sentence

        if (paragraphElement.textContent.includes(sentence) && prediction.prediction === 1) {
            const innerHTML = paragraphElement.innerHTML;

            const hatedHTML = `<p style='color: red; color: transparent; text-shadow: 0 0 5px rgba(0,0,0,0.5);'>${sentence}</p>`;
            
            const newStr = innerHTML.replace(new RegExp(sentence, 'g'), hatedHTML);
            paragraphElement.innerHTML = newStr;

            // // Split the text content of the paragraph at the target sentence
            // const parts = paragraphElement.textContent.split(sentence);

            // // Combine the parts with the prediction
            // const newTextContent = `${parts[0]}${sentence}`;

            // // Update the text content of the paragraph with the new text
            // paragraphElement.textContent = newTextContent;

            // // Set the text color based on the prediction value
            // paragraphElement.style.color = prediction.prediction === 1 ? 'red' : 'green';
        }
    });
}



// Extract the text content, split it into sentences, and send each sentence to the backend for prediction
const textArray = extractTextContent();
// const sentences = extractSentences(textContent);
textArray.forEach(sendSentenceToBackend);
