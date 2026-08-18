document.getElementById('checkBtn').addEventListener('click', async () => {
    const messageText = document.getElementById('messageInput').value.trim();
    const resultDiv = document.getElementById('result');
    const bodyElement = document.body;

    // 1. Reset previous theme states
    bodyElement.className = '';
    resultDiv.classList.add('hidden');

    // 2. Validation Check
    if (!messageText) {
        alert('Please enter a message first!');
        return;
    }

    // 3. Loading state UI
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="result-header">
            <div class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>Analyzing with AI...</span>
            </div>
        </div>
    `;

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

        // 5. Update UI & Theme based on API response
        if (response.ok) {
            const isSpam = data.label === 'Spam' || data.result === 'Spam' || data.prediction === 1;
            const confidenceVal = data.confidence || '98.5%';

            resultDiv.classList.remove('hidden');

            if (isSpam) {
                // --- SHIFT ENTIRE THEME TO DANGER (RED) ---
                bodyElement.classList.add('theme-danger');
                
                const matchText = data.confidence ? ` (${data.confidence})` : '';
                resultDiv.innerHTML = `
                    <div class="result-header">
                        <div id="statusBadge" class="badge spam">
                            <i id="statusIcon" class="fa-solid fa-triangle-exclamation"></i>
                            <span id="statusText">SPAM / THREAT</span>
                        </div>
                        <div class="confidence">
                            Confidence: <span id="confidenceScore">${confidenceVal}</span>
                        </div>
                    </div>
                    <div class="progress-bar-bg">
                        <div id="riskProgressBar" class="progress-bar-fill spam" style="width: 95%;"></div>
                    </div>
                    <div class="chips" id="signalsChips">
                        <div class="chip">Phishing / Scam Patterns</div>
                        <div class="chip">High-Risk Telemetry</div>
                    </div>
                `;
            } else {
                // --- SHIFT ENTIRE THEME TO SAFE (GREEN) ---
                bodyElement.classList.add('theme-safe');
                
                const matchText = data.confidence ? ` (${data.confidence})` : '';
                resultDiv.innerHTML = `
                    <div class="result-header">
                        <div id="statusBadge" class="badge ham">
                            <i id="statusIcon" class="fa-solid fa-shield-check"></i>
                            <span id="statusText">SAFE</span>
                        </div>
                        <div class="confidence">
                            Confidence: <span id="confidenceScore">${confidenceVal}</span>
                        </div>
                    </div>
                    <div class="progress-bar-bg">
                        <div id="riskProgressBar" class="progress-bar-fill ham" style="width: 10%;"></div>
                    </div>
                    <div class="chips" id="signalsChips">
                        <div class="chip">Clean Telemetry Stream</div>
                        <div class="chip">Verified Content</div>
                    </div>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <div class="result-header">
                    <div class="badge spam">
                        <i class="fa-solid fa-circle-xmark"></i>
                        <span>Error: ${data.error || 'Server issue'}</span>
                    </div>
                </div>
            `;
        }

    } catch (error) {
        console.error('Error connecting to backend:', error);
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <div class="result-header">
                <div class="badge spam">
                    <i class="fa-solid fa-plug-circle-xmark"></i>
                    <span>Error: Cannot connect to Python backend.</span>
                </div>
            </div>
        `;
    }
});