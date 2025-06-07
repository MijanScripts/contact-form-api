document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const statusMessage = document.getElementById("status-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Clear previous message
    statusMessage.textContent = "";
    statusMessage.className = "";

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.className = "success";
        form.reset();
      } else {
        statusMessage.textContent = result.message || "There was an error sending your message.";
        statusMessage.className = "error";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      statusMessage.textContent = "Failed to send message. Server may be offline.";
      statusMessage.className = "error";
    }
  });
});
