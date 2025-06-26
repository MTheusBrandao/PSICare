document.addEventListener('DOMContentLoaded', () => {
  const dataSpan = document.getElementById("data-hoje");
  const hoje = new Date().toLocaleDateString();
  if (dataSpan) dataSpan.textContent = hoje;

  document.querySelectorAll('.humor-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.humor-option').forEach(h => h.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
});

function limpar() {
  document.getElementById("descricao").value = "";
  document.querySelectorAll('.humor-option').forEach(h => h.classList.remove('selected'));
}

function salvar() {
  const descricao = document.getElementById("descricao").value;
  const humor = document.querySelector(".humor-option.selected")?.textContent;
  const token = localStorage.getItem("token");

  if (!humor || !descricao) {
    alert("Preencha o humor e a descrição.");
    return;
  }

  fetch("http://localhost:3000/emocao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ mood: humor, description: descricao })
  })
  .then(res => res.json())
  .then(() => {
    alert("Emoção registrada!");
    localStorage.setItem("registroPsiCare", JSON.stringify({
      data: new Date().toLocaleDateString(),
      humor,
      descricao
    }));
    window.location.href = "./historico.html";
  })
  .catch(err => alert("Erro ao salvar emoção."));
}