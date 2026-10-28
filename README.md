# Monkey Lab — site (link da bio + catálogo)

Link: https://monkeylabclimbing.github.io/linkbio/

HTML, CSS e JavaScript puro. Sem banco de dados, sem servidor, sem mensalidade.

## Estrutura

```
monkey-lab-site/
├── index.html          Página (textos fixos, SEO, seções)
├── css/styles.css      Visual (cores, fontes, tamanhos)
├── js/config.js        ← O ÚNICO ARQUIVO DO DIA A DIA: WhatsApp e produtos
├── js/main.js          Lógica (não precisa mexer)
└── assets/
    ├── logo.png        ← seu logotipo original
    ├── chimpanze.webp  ← chimpanzé original (otimizado)
    ├── favicon.png     ← ícone da aba (pode ser o logo)
    ├── og-image.jpg    ← imagem que aparece ao compartilhar o link
    ├── LEIA-ME.txt     tamanhos recomendados
    └── produtos/       ← fotos dos hangboards
```

Enquanto uma imagem não existir, o site mostra um quadro tracejado com o caminho do arquivo que falta. Nada é inventado no lugar.

---

## 1. Imagens

| Arquivo | Onde aparece | Recomendado |
|---|---|---|
| `assets/logo.png` | Topo e rodapé (círculo branco) | PNG transparente, 400×400 |
| `assets/chimpanze.webp` | Seção "O LAB ESTÁ ABERTO." | WebP, 800 px de largura |
| `assets/favicon.png` | Aba do navegador / atalho no celular | PNG 512×512 |
| `assets/og-image.jpg` | Prévia do link no WhatsApp/Instagram | JPG 1200×630 |
| `assets/produtos/*.webp` | Cards do catálogo | 1200×900 (4:3), até ~200 KB |

Para substituir: salve o arquivo com **exatamente** o mesmo nome (letras minúsculas, sem acento, sem espaço) e envie por cima do antigo.

Para otimizar fotos de graça: https://squoosh.app → arraste a foto → formato **WebP**, qualidade ~75, redimensione para 1200 px de largura → baixar.


## 2. WhatsApp

Em `js/config.js`:

```js
whatsapp: "5511912345678",
```

Formato: `55` + DDD + número, só dígitos (o exemplo acima é só formato; use o seu).

- Campo vazio ou inválido → todos os botões de WhatsApp ficam desativados e aparece o aviso "WhatsApp ainda não configurado".
- Número válido → o aviso some e os botões abrem `https://wa.me/NUMERO?text=MENSAGEM`, com acentos e espaços codificados automaticamente.
- As mensagens ficam em `mensagemGeral` e `mensagemProduto` (o `{modelo}` é trocado pelo nome do produto).

## 3. Cadastrar, alterar ou remover hangboards

Tudo em `js/config.js`, na lista `produtos`. Um produto real fica assim:

```js
{
  nome: "Nome do modelo",
  preco: 159.9,                     // número, sem "R$". null = "Consulte o valor"
  descricao: "Texto curto.",
  dimensoes: "50 x 15 x 4 cm",      // null para não exibir
  material: "MDF",
  acabamento: "Branco com detalhes em madeira",
  fotos: [
    { src: "assets/produtos/nome-frente.webp", alt: "Hangboard Nome visto de frente" },
    { src: "assets/produtos/nome-detalhe.webp", alt: "Detalhe das pegas" }
  ],
  exemplo: false
},
```

- **Adicionar:** copie um bloco `{ ... },` e cole abaixo. Cuidado com as vírgulas entre blocos.
- **Remover:** apague o bloco inteiro.
- **Ordem:** a ordem da lista é a ordem no site.
- **Fotos:** 1 foto = imagem fixa; 2 ou mais = galeria (deslizar no celular, setas no computador). Lista vazia `[]` = aviso de foto pendente.
- **`exemplo: true`** marca o card como exemplo e desativa o botão. Troque para `false` nos produtos reais e apague os exemplos.
- O botão "Tenho interesse neste modelo" envia: *"Olá! Conheci a Monkey Lab pelo catálogo e tenho interesse no **[nome]**. Gostaria de saber a disponibilidade, o valor e o frete."*

Erro comum: se o catálogo sumir após uma edição, quase sempre é uma vírgula ou aspa faltando no `config.js`.

## 4. Publicar grátis no GitHub Pages

1. **Salvar os arquivos:** descompacte o .zip. Coloque suas imagens em `assets/` com os nomes acima.
2. **Conta:** crie uma conta gratuita em https://github.com. O nome de usuário vira parte do link.
3. **Repositório:** botão **+** (canto superior direito) → **New repository** → nome, ex.: `monkeylab` → marque **Public** → **Create repository**.
4. **Enviar arquivos:** na página do repositório, clique em **uploading an existing file** (ou **Add file → Upload files**). Arraste o **conteúdo** da pasta (`index.html`, `css`, `js`, `assets`), não a pasta em si: o `index.html` precisa ficar na raiz. Clique em **Commit changes**.
5. **Ativar o Pages:** **Settings → Pages** → em *Build and deployment*, *Source* = **Deploy from a branch** → *Branch* = **main** e pasta **/(root)** → **Save**.
6. **Link público:** em 1–3 minutos aparece no topo da mesma tela: `https://SEU-USUARIO.github.io/monkeylab/`.
   Para um link mais curto (`https://SEU-USUARIO.github.io/`), nomeie o repositório exatamente `SEU-USUARIO.github.io`.
7. **Bio do Instagram:** Editar perfil → **Links** → Adicionar link externo → cole o endereço.
8. **Prévia ao compartilhar:** já configurada para `https://monkeylabclimbing.github.io/linkbio/`. Se mudar o nome do repositório, atualize `og:url`, `og:image` e `canonical` no `index.html`.

### Atualizar depois
- **Texto/produto:** abra `js/config.js` no GitHub → ícone de lápis → edite → **Commit changes**.
- **Fotos novas:** entre na pasta `assets/produtos` no GitHub → **Add file → Upload files**.
- O site atualiza em 1–2 minutos. Se não aparecer, recarregue a página (o navegador guarda cache).

### Alternativa sem Git: Cloudflare Pages
Crie conta gratuita na Cloudflare → **Workers & Pages** → criar um projeto do tipo **Pages** → opção de **upload direto** → arraste a pasta → publicar. O link fica `https://NOME.pages.dev`. Para atualizar, envie a pasta de novo como nova versão. É mais simples para publicar, mas editar um arquivo isolado é mais prático no GitHub.

---

## 5. Checklist antes de divulgar

- [ ] `logo.png`, `chimpanze.png`, `favicon.png` e `og-image.jpg` em `assets/` (nenhum quadro tracejado no site).
- [ ] Nomes de arquivo idênticos aos do código: o GitHub Pages diferencia maiúsculas de minúsculas (`Logo.PNG` ≠ `logo.png`).
- [ ] Número em `whatsapp:` e aviso de configuração sumiu.
- [ ] Botão "Fale com a Monkey Lab" abre o WhatsApp certo, com a mensagem com acentos corretos.
- [ ] Cada produto real abre a mensagem com o **nome do modelo certo**.
- [ ] Nenhum produto com `exemplo: true` e nenhum texto entre `[colchetes]` sobrando.
- [ ] Preços conferidos (`159.9` vira R$ 159,90).
- [ ] Galeria desliza no celular e as setas funcionam no computador.
- [ ] "Conheça nossos hangboards" rola até o catálogo.
- [ ] Instagram abre @monkeylab.climbing.
- [ ] Teste pelo link aberto **dentro do Instagram** (navegador interno), no celular, além do Chrome/Safari.
- [ ] Envie o link para você mesmo no WhatsApp e veja a prévia (pode levar alguns minutos para atualizar).
- [ ] Fotos com até ~200 KB cada.
