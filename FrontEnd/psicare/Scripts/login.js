document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputs = document.querySelectorAll('.form-control');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = inputs[0].value.trim();
    const senha = inputs[1].value;

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        alert("Login realizado com sucesso!");
        window.location.href = "./descricao.html";
      } else {
        alert("Credenciais inválidas.");
      }
    })
    .catch(err => alert("Erro ao fazer login"));
  });
});