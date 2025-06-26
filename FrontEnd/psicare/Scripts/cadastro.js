document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll(".form-control");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const senha = inputs[2].value;
    const confirmarSenha = inputs[3].value;

    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("E-mail inválido.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome, email, password: senha })
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar');
      return res.json();
    })
    .then(() => {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "./Entrar.html";
    })
    .catch(err => alert(err.message));
  });
});