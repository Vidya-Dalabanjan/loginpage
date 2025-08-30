const form = document.getElementById('registerForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    msg.textContent = result.message;
    msg.style.color = res.ok ? 'green' : 'red';
    if (res.ok) form.reset();
  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    msg.style.color ='red';
    }
});