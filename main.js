/* ==========================================================================
   MONKEY LAB — LÓGICA DA PÁGINA
   Não é preciso editar este arquivo. Configurações ficam em js/config.js.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.MONKEY_LAB || {};
  var produtos = Array.isArray(cfg.produtos) ? cfg.produtos : [];

  /* ---------- WhatsApp ---------- */
  var numero = String(cfg.whatsapp || "").replace(/\D/g, "");
  // 55 + DDD (2) + número (8 ou 9 dígitos)
  var waOk = /^55\d{10,11}$/.test(numero);

  if (!waOk && cfg.whatsapp) {
    console.warn("[Monkey Lab] Número de WhatsApp inválido em js/config.js. Use 55 + DDD + número, só dígitos.");
  }

  function linkWhatsApp(mensagem) {
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  }

  function ativarWhatsApp(el, mensagem) {
    if (waOk) {
      el.href = linkWhatsApp(mensagem);
      el.target = "_blank";
      el.rel = "noopener";
      el.setAttribute("aria-label", el.textContent.trim() + " (abre o WhatsApp)");
    } else {
      desativar(el, "WhatsApp ainda não configurado");
    }
  }

  function desativar(el, motivo) {
    el.removeAttribute("href");
    el.classList.add("is-disabled");
    el.setAttribute("role", "link");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("title", motivo);
  }

  /* ---------- Utilidades ---------- */
  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto != null) el.textContent = texto;
    return el;
  }

  // Textos entre colchetes são placeholders: recebem estilo de pendente
  function texto(tag, classe, valor) {
    var el = criar(tag, classe, valor);
    if (/\[.*\]/.test(String(valor))) el.classList.add("is-placeholder");
    return el;
  }

  function placeholderImagem(caminho, titulo) {
    var ph = criar("div", "ph");
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", titulo + " pendente");
    ph.appendChild(criar("strong", null, titulo + " pendente"));
    if (caminho) {
      ph.appendChild(criar("span", null, "Adicione o arquivo:"));
      ph.appendChild(criar("code", null, caminho));
    }
    return ph;
  }

  // Se a imagem não existir, troca por um aviso visível com o caminho esperado
  function protegerImagem(img, caminho, titulo) {
    function falhou() { img.replaceWith(placeholderImagem(caminho, titulo)); }
    if (img.complete && img.naturalWidth === 0) { falhou(); return; }
    img.addEventListener("error", falhou, { once: true });
  }

  /* ---------- Galeria ---------- */
  function galeria(produto) {
    var fotos = Array.isArray(produto.fotos) ? produto.fotos : [];
    var nome = produto.nome || "Produto";

    if (fotos.length === 0) {
      var vazio = placeholderImagem("assets/produtos/", "Foto do produto");
      vazio.classList.add("media-ph");
      return vazio;
    }

    var box = criar("div", "gallery");
    var trilho = criar("div", "gallery__track");
    box.appendChild(trilho);

    fotos.forEach(function (foto, i) {
      var slide = criar("div", "gallery__slide");
      var img = document.createElement("img");
      img.src = foto.src;
      img.alt = foto.alt || nome;
      img.width = 1200; img.height = 900;
      img.loading = "lazy";
      img.decoding = "async";
      slide.appendChild(img);
      trilho.appendChild(slide);
      protegerImagem(img, foto.src, "Foto");
      if (fotos.length > 1) {
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "foto");
        slide.setAttribute("aria-label", (i + 1) + " de " + fotos.length);
      }
    });

    if (fotos.length === 1) return box;

    trilho.tabIndex = 0;
    trilho.setAttribute("role", "region");
    trilho.setAttribute("aria-label", "Fotos de " + nome + ". Use as setas do teclado para navegar.");

    var anterior = criar("button", "gallery__nav gallery__nav--prev", "‹");
    var proxima = criar("button", "gallery__nav gallery__nav--next", "›");
    anterior.type = proxima.type = "button";
    anterior.setAttribute("aria-label", "Foto anterior");
    proxima.setAttribute("aria-label", "Próxima foto");

    var pontos = criar("div", "gallery__dots");
    var botoesPonto = fotos.map(function (_, i) {
      var b = criar("button", "gallery__dot");
      b.type = "button";
      b.setAttribute("aria-label", "Ver foto " + (i + 1) + " de " + fotos.length);
      b.addEventListener("click", function () { irPara(i); });
      pontos.appendChild(b);
      return b;
    });

    box.appendChild(anterior);
    box.appendChild(proxima);
    box.appendChild(pontos);

    var atual = 0;
    function indice() { return Math.round(trilho.scrollLeft / (trilho.clientWidth || 1)); }
    function irPara(i) {
      i = Math.max(0, Math.min(fotos.length - 1, i));
      var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      trilho.scrollTo({ left: i * trilho.clientWidth, behavior: reduzir ? "auto" : "smooth" });
    }
    function atualizar() {
      atual = indice();
      botoesPonto.forEach(function (b, i) { b.setAttribute("aria-current", i === atual ? "true" : "false"); });
      anterior.disabled = atual === 0;
      proxima.disabled = atual === fotos.length - 1;
    }

    anterior.addEventListener("click", function () { irPara(atual - 1); });
    proxima.addEventListener("click", function () { irPara(atual + 1); });
    trilho.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); irPara(atual + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); irPara(atual - 1); }
    });
    var t;
    trilho.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(atualizar, 60);
    }, { passive: true });

    atualizar();
    return box;
  }

  /* ---------- Card de produto ---------- */
  function card(produto) {
    var nome = produto.nome || "[Nome do modelo]";
    var art = criar("article", "card");
    art.setAttribute("aria-label", nome);

    art.appendChild(galeria(produto));

    var corpo = criar("div", "card__body");
    if (produto.exemplo) corpo.appendChild(criar("span", "tag-example", "Exemplo: substituir em js/config.js"));

    corpo.appendChild(texto("h3", "card__name", nome));

    var preco;
    if (typeof produto.preco === "number" && isFinite(produto.preco)) preco = brl.format(produto.preco);
    else preco = produto.exemplo ? "[Preço a definir]" : "Consulte o valor";
    corpo.appendChild(texto("p", "card__price", preco));

    if (produto.descricao) corpo.appendChild(texto("p", "card__desc", produto.descricao));

    var specs = criar("dl", "specs");
    [["Dimensões", produto.dimensoes], ["Material", produto.material], ["Acabamento", produto.acabamento]]
      .forEach(function (par) {
        if (!par[1]) return;
        specs.appendChild(criar("dt", null, par[0]));
        specs.appendChild(texto("dd", null, par[1]));
      });
    if (specs.children.length) corpo.appendChild(specs);

    var botao = criar("a", "btn btn--dark");
    botao.textContent = "Tenho interesse neste modelo";
    corpo.appendChild(botao);

    if (produto.exemplo) {
      desativar(botao, "Produto de exemplo");
      corpo.appendChild(criar("p", "card__hint", "Botão ativado quando o produto real for cadastrado."));
    } else {
      var msg = String(cfg.mensagemProduto || "").replace("{modelo}", nome);
      ativarWhatsApp(botao, msg);
      botao.setAttribute("aria-label", "Tenho interesse no " + nome + (waOk ? " (abre o WhatsApp)" : ""));
    }

    art.appendChild(corpo);
    return art;
  }

  /* ---------- Montagem ---------- */
  var lista = document.getElementById("lista-produtos");
  if (lista) {
    lista.innerHTML = "";
    if (produtos.length === 0) {
      lista.appendChild(criar("p", "catalog__note", "Novos modelos em breve. Fale com a gente pelo WhatsApp."));
    } else {
      produtos.forEach(function (p) { lista.appendChild(card(p)); });
    }
  }

  document.querySelectorAll("[data-wa='geral']").forEach(function (el) {
    ativarWhatsApp(el, cfg.mensagemGeral || "");
  });

  if (cfg.instagram) {
    document.querySelectorAll("[data-instagram]").forEach(function (el) { el.href = cfg.instagram; });
  }

  var aviso = document.querySelector("[data-config-note]");
  if (aviso) aviso.hidden = waOk;

  document.querySelectorAll("img[data-placeholder]").forEach(function (img) {
    var titulo = img.closest(".badge") ? "Logo" : "Imagem";
    protegerImagem(img, img.getAttribute("data-placeholder"), titulo);
  });

  // Ao usar o botão do catálogo, leva o foco para a seção (leitores de tela)
  document.querySelectorAll("a[href='#catalogo']").forEach(function (a) {
    a.addEventListener("click", function () {
      var alvo = document.getElementById("catalogo");
      if (alvo) setTimeout(function () { alvo.focus({ preventScroll: true }); }, 400);
    });
  });
})();
