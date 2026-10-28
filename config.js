/* ==========================================================================
   MONKEY LAB — ARQUIVO DE CONFIGURAÇÃO
   Este é o ÚNICO arquivo que você precisa editar para:
   - configurar o WhatsApp
   - cadastrar, alterar ou remover hangboards
   ========================================================================== */

window.MONKEY_LAB = {

  /* ------------------------------------------------------------------------
     WHATSAPP
     Formato: 55 + DDD + número, só dígitos, sem espaços, traços ou "+".
     Exemplo de FORMATO (não é um número real): "55DDNNNNNNNNN"
     Enquanto este campo estiver vazio, todos os botões de WhatsApp ficam
     desativados e o site mostra um aviso de configuração pendente.
     ------------------------------------------------------------------------ */
  whatsapp: "5511994751310",

  instagram: "https://www.instagram.com/monkeylab.climbing/",

  /* Mensagem do botão "Fale com a Monkey Lab" e do rodapé */
  mensagemGeral:
    "Olá! Conheci a Monkey Lab pelo Instagram e gostaria de saber mais sobre os produtos.",

  /* Mensagem dos botões de produto. {modelo} é trocado pelo nome do produto. */
  mensagemProduto:
    "Olá! Conheci a Monkey Lab pelo catálogo e tenho interesse no {modelo}. Gostaria de saber a disponibilidade, o valor e o frete.",

  /* ------------------------------------------------------------------------
     PRODUTOS
     Para ADICIONAR: copie um bloco { ... }, cole abaixo do último
                     (separando com vírgula) e edite.
     Para REMOVER:   apague o bloco inteiro { ... } e a vírgula dele.
     Para ALTERAR:   edite os textos entre aspas.

     Campos:
       nome        Nome do modelo (aparece no card e na mensagem do WhatsApp)
       preco       Número sem "R$" e com ponto decimal (ex.: 159.9) ou null
       descricao   Texto curto
       dimensoes   Texto livre (ex.: "50 x 15 x 4 cm") ou null para ocultar
       material    Texto
       acabamento  Texto
       fotos       Lista de fotos: { src: "arquivo.webp", alt: "descrição" }
                   1 foto = imagem fixa | 2 ou mais = galeria deslizante
                   [] (lista vazia) = mostra aviso de foto pendente
       exemplo     true = card de exemplo (marcado e com botão desativado)
                   false = produto real (botão de WhatsApp ativo)
     ------------------------------------------------------------------------ */
  produtos: [
    {
      nome: "Silverback",
      preco: 180.00,
      descricao: "Opções de pinça, regletes variados e abaulado no topo com cerca de 30 graus.",
      dimensoes: "60 x 20 x 4 cm",
      material: "MDF",
      acabamento: "Branco com detalhes em madeira",
      fotos: [
        { src: "silverback-1.webp", alt: "Hangboard Silverback visto de frente" },
        { src: "silverback-2.webp", alt: "Hangboard Silverback em perspectiva" },
        { src: "silverback-3.webp", alt: "Hangboard Silverback na vertical" },
        { src: "silverback-4.webp", alt: "Hangboard Silverback na vertical, outro ângulo" },
        { src: "silverback-5.webp", alt: "Detalhe da lateral do Silverback em MDF" },
        { src: "silverback-6.webp", alt: "Detalhe da borda e das pegas do Silverback" },
        { src: "silverback-7.webp", alt: "Silverback em três vistas" }
      ],
      exemplo: false
    },
    {
      nome: "Bugio",
      preco: 160.00,
      descricao: "Diversos regletes e um agarrão no topo.",
      dimensoes: "60 x 15 x 4 cm",
      material: "MDF",
      acabamento: "Branco com detalhes em madeira",
      fotos: [
        { src: "bugio-1.webp", alt: "Hangboard Bugio visto de frente" },
        { src: "bugio-2.webp", alt: "Hangboard Bugio de frente, mostrando o agarrão no topo" },
        { src: "bugio-3.webp", alt: "Hangboard Bugio na vertical" },
        { src: "bugio-4.webp", alt: "Detalhe da lateral do Bugio" },
        { src: "bugio-5.webp", alt: "Bugio em três vistas" }
      ],
      exemplo: false
    }
  ]
};
