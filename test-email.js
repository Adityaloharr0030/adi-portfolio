async function testEmail() {
  const data = {
    service_id: 'service_ic6ne49',
    template_id: 'template_i7p22qv',
    user_id: 'W8KOq0jMBBAXrjVBM',
    template_params: {
      name: 'Test Agent',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
      time: 'Now'
    }
  };

  console.log('Sending to EmailJS API with browser headers...');
  
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(data)
    });
    
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);
  } catch(e) {
    console.error('Error:', e);
  }
}

testEmail();
