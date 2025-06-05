document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(result => {
        if (result.status === 200) {
          alert(result.body.message || 'Message sent!');
          form.reset();
        } else {
          alert(result.body.error || 'Failed to send message.');
        }
      })
      .catch(error => {
        console.error('Network error:', error);
        alert('Network error. Please try again later.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  });
});
