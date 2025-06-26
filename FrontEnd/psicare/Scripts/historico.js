document.addEventListener("DOMContentLoaded", () => {
  const dados = JSON.parse(localStorage.getItem("registroPsiCare"));
  const registroDiv = document.getElementById("registro");

  if (dados) {
    registroDiv.innerHTML = `
      <span class="data">Data: ${dados.data}</span>
      <span class="humor" onclick="mostrarAcoes()">Humor: ${dados.humor}</span>
      <span class="descricao">${dados.descricao}</span>
      <div class="acoes">
        <button class="editar" onclick="editarRegistro()">Editar</button>
        <button class="excluir" onclick="confirmarExclusao()">Excluir</button>
      </div>
    `;
  } else {
    registroDiv.innerHTML = "<p>Nenhum registro encontrado.</p>";
  }
});

function mostrarAcoes() {
  document.querySelector(".acoes").style.display = "block";
}

function confirmarExclusao() {
  if (confirm("Tem certeza que deseja excluir este registro?")) {
    localStorage.removeItem("registroPsiCare");
    document.getElementById("registro").innerHTML = "<p>Registro excluído.</p>";
  }
}

function editarRegistro() {
  localStorage.setItem("registroEdicao", "true");
  window.location.href = "descricao.html";
}