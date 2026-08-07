document.getElementById('checkBtn').addEventListener('click', async () => {
    // Select the main container to change its background color
    const mainContainer = document.getElementById('mainContainer');
    const messageText = document.getElementById('messageInput').value.trim();
    const resultDiv = document.getElementById('result');

    // 1. Reset previous states (remove old green/red classes)
    if (mainContainer) {
        mainContainer.classList.remove('is-safe', 'is-spam');
    }
    resultDiv.style.display = 'none';

    // 2. Validation Check
    if (!messageText) {
        alert('Please enter a message first!');
        return;
    }

    // 3. Loading state UI
    resultDiv.style.display = 'block';
    resultDiv.className = 'result-box loading';
    resultDiv.innerText = 'Analyzing with AI...';

    try {
        // 4. Make HTTP POST request to local Flask API
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageText })
        });

        const data = await response.json();

        // 5. Update UI based on API response
        if (response.ok) {
            // Check if backend returned Spam (handles label, result, or numerical prediction)
            const isSpam = data.label === 'Spam' || data.result === 'Spam' || data.prediction === 1;

            if (isSpam) {
                // TURN ENTIRE CARD RED
                if (mainContainer) mainContainer.classList.add('is-spam');
                
                const matchText = data.confidence ? ` (${data.confidence} Match)` : '';
                resultDiv.innerHTML = `🚨 ALERT: SPAM DETECTED!${matchText}`;
            } else {
                // TURN ENTIRE CARD GREEN
                if (mainContainer) mainContainer.classList.add('is-safe');
                
                const matchText = data.confidence ? ` (${data.confidence} Match)` : '';
                resultDiv.innerHTML = `✅ SAFE: NOT SPAM${matchText}`;
            }
        } else {
            resultDiv.className = 'result-box loading';
            resultDiv.innerText = `Error: ${data.error || 'Server issue'}`;
        }

    } catch (error) {
        console.error('Error connecting to backend:', error);
        resultDiv.className = 'result-box loading';
        resultDiv.innerText = 'Error: Cannot connect to Python backend.';
    }
});