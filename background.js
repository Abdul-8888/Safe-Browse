// background.js

// Function to handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PROCESS_SENTENCE') {
    // Send the sentence to the backend for prediction
    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message.sentence }),
    })
      .then(response => response.json())
      .then(prediction => {
        sendResponse({ prediction });
      })
      .catch(error => console.error('Error predicting sentence:', error));

    // Ensure sendResponse is called asynchronously
    return true;
  }
});