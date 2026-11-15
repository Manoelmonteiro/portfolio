// Visualizador de imagens das páginas de projeto.
// Qualquer <button data-zoom> com uma <img> dentro abre a imagem em tela cheia.
// As setas navegam entre todas as imagens ampliáveis da página.
(function () {
  const botoes = Array.from(document.querySelectorAll("button[data-zoom]"));
  if (!botoes.length) return;

  const lb = document.createElement("dialog");
  lb.className = "pr-lb";
  lb.setAttribute("aria-label", "Imagem ampliada");
  lb.innerHTML = `
    <div class="pr-lb-corpo"><img alt=""><p></p></div>
    <button type="button" class="pr-lb-btn pr-lb-fechar" data-acao="fechar" aria-label="Fechar">✕</button>
    <button type="button" class="pr-lb-btn pr-lb-ant" data-acao="-1" aria-label="Imagem anterior">←</button>
    <button type="button" class="pr-lb-btn pr-lb-prox" data-acao="1" aria-label="Próxima imagem">→</button>`;
  document.body.appendChild(lb);

  const img = lb.querySelector("img");
  const legenda = lb.querySelector("p");
  let atual = 0;

  function mostrar(i) {
    atual = (i + botoes.length) % botoes.length;
    const origem = botoes[atual].querySelector("img");
    img.src = origem.currentSrc || origem.src;
    img.alt = origem.alt;
    legenda.textContent = origem.alt;
    const contador = document.createElement("small");
    contador.textContent = `${atual + 1} / ${botoes.length}`;
    legenda.appendChild(contador);
  }

  botoes.forEach((b, i) => b.addEventListener("click", () => { mostrar(i); lb.showModal(); }));

  lb.querySelectorAll(".pr-lb-ant, .pr-lb-prox").forEach((b) => (b.hidden = botoes.length < 2));

  lb.addEventListener("click", (e) => {
    const acao = e.target.closest("[data-acao]")?.dataset.acao;
    if (acao === "fechar") return lb.close();
    if (acao) return mostrar(atual + Number(acao));
    if (e.target === lb || e.target.classList.contains("pr-lb-corpo")) lb.close();
  });

  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") mostrar(atual + 1);
    if (e.key === "ArrowLeft") mostrar(atual - 1);
  });
})();
