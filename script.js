document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 960) {
          menu.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copyValue = button.getAttribute("data-copy") || "";
      const originalText = button.textContent;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(copyValue);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = copyValue;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        button.textContent = "Copiado!";
        button.disabled = true;
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 1600);
      } catch (error) {
        button.textContent = "N\u00e3o foi poss\u00edvel copiar";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      }
    });
  });

  const ministriesGrid = document.getElementById("ministries-grid");
  const ministryModal = document.getElementById("ministry-modal");

  if (ministriesGrid && ministryModal) {
    const ministries = [
      {
        title: "EBI - Escola Bíblica Infantil",
        shortDescription:
          "Ensino bíblico para crianças, formando desde cedo uma base sólida na Palavra de Deus.",
        practicalInfo: "Para crianças de 3 a 11 anos durante os cultos.",
        longDescription:
          "Espaço dedicado ao ensino da Palavra de Deus para crianças, de forma didática, alegre e apropriada para cada faixa etária. Aqui os pequenos aprendem os princípios bíblicos enquanto crescem em fé, comunhão e amor a Deus.",
        verse:
          "\"Instrui a criança no caminho em que deve andar, e até quando envelhecer não se desviará dele.\" (Provérbios 22:6)",
        image: "images/ministerios/ebi.png",
      },
      {
        title: "Louvor",
        shortDescription:
          "Servimos a Deus conduzindo a igreja em adoração através da música.",
        practicalInfo:
          "Vocalistas e instrumentistas com agenda de ensaios semanais.",
        longDescription:
          "Ministério responsável por conduzir a igreja em adoração através da música. Nosso propósito é servir a Deus com excelência, ajudando a congregação a expressar gratidão, reverência e entrega ao Senhor.",
        verse:
          "\"Tudo quanto tem fôlego louve ao Senhor. Louvai ao Senhor.\" (Salmos 150:6)",
        image: "images/ministerios/louvor.png",
      },
      {
        title: "Escola Bíblica",
        shortDescription:
          "Estudo da Palavra de Deus para crescimento espiritual e formação de discípulos.",
        practicalInfo:
          "Aulas organizadas por módulos e turmas em horários definidos pela igreja.",
        longDescription:
          "Ambiente de ensino e crescimento espiritual por meio do estudo sistemático das Escrituras. A Escola Bíblica busca fortalecer a fé, aprofundar o conhecimento da Palavra e formar discípulos comprometidos com Cristo.",
        verse:
          "\"Toda a Escritura é inspirada por Deus e útil para ensinar, para repreender, para corrigir e para instruir na justiça.\" (2 Timóteo 3:16)",
        image: "images/ministerios/escola-biblica.png",
      },
      {
        title: "Projeto Celeiro",
        shortDescription:
          "Cuidando de pessoas e compartilhando o amor de Cristo através da generosidade.",
        practicalInfo:
          "Ações de apoio e assistência realizadas conforme as necessidades da comunidade.",
        longDescription:
          "Iniciativa de cuidado e apoio a pessoas em necessidade. O Projeto Celeiro promove ações de solidariedade e assistência, demonstrando o amor de Cristo por meio do serviço e da generosidade da igreja.",
        verse:
          "\"Quem se compadece do pobre ao Senhor empresta, e este lhe paga o seu benefício.\" (Provérbios 19:17)",
        image: "images/ministerios/celeiro.png",
      },
      {
        title: "Mães que Oram",
        shortDescription:
          "Mães unidas em oração pelos filhos, famílias e pela próxima geração.",
        practicalInfo: "Encontros periódicos de oração e intercessão.",
        longDescription:
          "Grupo de intercessão formado por mães que se reúnem para orar por seus filhos, famílias e pela próxima geração. Um tempo de comunhão e clamor a Deus pela proteção, direção e crescimento espiritual das famílias.",
        verse:
          "\"A oração feita por um justo pode muito em seus efeitos.\" (Tiago 5:16)",
        image: "images/ministerios/mulheres-coonversando.png",
      },
      {
        title: "Ministério de Casais",
        shortDescription:
          "Fortalecendo casamentos à luz da Palavra de Deus.",
        practicalInfo:
          "Encontros e atividades voltados para casais da igreja.",
        longDescription:
          "Espaço voltado para o fortalecimento dos relacionamentos conjugais à luz da Palavra de Deus. O ministério promove encontros e atividades que ajudam os casais a crescerem juntos em amor, compromisso e fé.",
        verse:
          "\"Assim, já não são dois, mas uma só carne. Portanto, o que Deus ajuntou não o separe o homem.\" (Mateus 19:6)",
        image: "images/ministerios/casais2.png",
      },
      {
        title: "Adolescentes",
        shortDescription:
          "Crescimento espiritual e comunhão para adolescentes.",
        practicalInfo:
          "Programação voltada para adolescentes com encontros regulares.",
        longDescription:
          "Ministério dedicado a acompanhar adolescentes em sua caminhada de fé. Através de encontros, estudos bíblicos e momentos de comunhão, buscamos ajudá-los a conhecer a Deus e viver os valores do Evangelho.",
        verse:
          "\"Ninguém despreze a tua mocidade; pelo contrário, torna-te padrão dos fiéis.\" (1 Timóteo 4:12)",
        image: "images/ministerios/teens.png",
      },
      {
        title: "Aulas de Música",
        shortDescription:
          "Desenvolvendo dons musicais para servir a Deus.",
        practicalInfo:
          "Aulas e acompanhamento para quem deseja aprender e servir com música.",
        longDescription:
          "Aulas voltadas para o desenvolvimento musical dentro da igreja, incentivando novos talentos e preparando pessoas para servir no ministério de louvor.",
        verse:
          "\"Cantai ao Senhor um cântico novo; cantai ao Senhor, todas as terras.\" (Salmos 96:1)",
        image: "images/ministerios/aula-de-musica.png",
      },
      {
        title: "Coral",
        shortDescription:
          "Adoração coletiva proclamando o Evangelho através do canto.",
        practicalInfo:
          "Participação em cultos e ocasiões especiais da igreja.",
        longDescription:
          "Grupo musical dedicado à adoração congregacional através do canto coletivo. O coral participa de cultos e ocasiões especiais proclamando o Evangelho por meio da música.",
        verse:
          "\"Falando entre vós com salmos, entoando e louvando de coração ao Senhor.\" (Efésios 5:19)",
        image: "images/ministerios/coral.png",
      },
      {
        title: "Reunião das Mulheres",
        shortDescription:
          "Mulheres crescendo juntas na fé, comunhão e oração.",
        practicalInfo:
          "Encontros voltados para estudo bíblico, oração e comunhão.",
        longDescription:
          "Encontros voltados ao crescimento espiritual das mulheres da igreja. Momentos de comunhão, oração e estudo da Palavra que fortalecem a fé e encorajam uma vida cristã madura.",
        verse:
          "\"Enganosa é a graça, e vã, a formosura, mas a mulher que teme ao Senhor, essa será louvada.\" (Provérbios 31:30)",
        image: "images/ministerios/mulheres-coonversando.png",
      },
      {
        title: "Bem-vindo",
        shortDescription:
          "Recebendo pessoas com amor e hospitalidade.",
        practicalInfo:
          "Equipe de recepção e acolhimento durante cultos e eventos.",
        longDescription:
          "Equipe responsável por receber visitantes e novos participantes da igreja com atenção e hospitalidade. Nosso objetivo é ajudar cada pessoa a se sentir acolhida e integrada à comunidade.",
        verse:
          "\"Portanto, acolhei-vos uns aos outros, como também Cristo nos acolheu para a glória de Deus.\" (Romanos 15:7)",
        image: "images/ministerios/bem-vindo.png",
      },
      {
        title: "Introdução",
        shortDescription:
          "Acompanhamento para quem está começando a caminhada com Cristo.",
        practicalInfo:
          "Encontros de acolhimento e fundamentos da fé cristã.",
        longDescription:
          "Ministério que acompanha pessoas que estão chegando à igreja ou iniciando sua caminhada na fé. Oferece orientação básica sobre a vida cristã, a igreja e os próximos passos no discipulado.",
        verse:
          "\"Como crianças recém-nascidas, desejai o genuíno leite espiritual.\" (1 Pedro 2:2)",
        image: "images/ministerios/introducao.png",
      },
      {
        title: "Intercessão",
        shortDescription:
          "Servindo a igreja através da oração constante.",
        practicalInfo:
          "Grupo dedicado à oração pela igreja, famílias e necessidades da comunidade.",
        longDescription:
          "Grupo dedicado à oração constante pela igreja, pelas famílias e pelas necessidades da comunidade. O ministério de intercessão sustenta espiritualmente a igreja através da busca contínua pela presença de Deus.",
        verse: "\"Orai sem cessar.\" (1 Tessalonicenses 5:17)",
        image: "images/ministerios/intercessao.png",
      },
      {
        title: "Formação de Líderes",
        shortDescription:
          "Preparando líderes para servir e cuidar do povo de Deus.",
        practicalInfo:
          "Capacitação com ensino bíblico, acompanhamento e prática ministerial.",
        longDescription:
          "Ministério voltado ao preparo de novos líderes para servir na igreja. Através de ensino bíblico, acompanhamento e prática ministerial, buscamos formar servos comprometidos com o cuidado do povo de Deus.",
        verse:
          "\"E o que de mim ouviste perante muitas testemunhas, isso mesmo transmite a homens fiéis.\" (2 Timóteo 2:2)",
        image: "images/ministerios/lideres.png",
      },
    ];

    const modalTitle = document.getElementById("ministry-modal-title");
    const modalPractical = document.getElementById("ministry-modal-practical");
    const modalDescription = document.getElementById("ministry-modal-description");
    const modalVerse = document.getElementById("ministry-modal-verse");
    const closeModalButtons = ministryModal.querySelectorAll("[data-close-modal]");
    const modalCloseButton = ministryModal.querySelector(".ministry-modal-close");
    let lastFocusedElement = null;

    ministriesGrid.innerHTML = ministries
      .map(
        (ministry, index) => `
          <button type="button" class="ministry-tile" data-ministry-index="${index}" aria-label="Abrir detalhes de ${ministry.title}">
            <img src="${ministry.image}" alt="${ministry.title}" />
            <div class="ministry-tile-content">
              <h3>${ministry.title}</h3>
              <p>${ministry.shortDescription}</p>
              <p class="ministry-practical">${ministry.practicalInfo}</p>
              <span class="ministry-hint">Clique para saber mais &rarr;</span>
            </div>
          </button>
        `
      )
      .join("");

    const openMinistryModal = (ministry) => {
      modalTitle.textContent = ministry.title;
      modalPractical.textContent = ministry.practicalInfo;
      modalDescription.textContent = ministry.longDescription;
      modalVerse.textContent = ministry.verse;

      ministryModal.classList.add("open");
      ministryModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lastFocusedElement = document.activeElement;
      if (modalCloseButton) {
        modalCloseButton.focus();
      }
    };

    const closeMinistryModal = () => {
      ministryModal.classList.remove("open");
      ministryModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    };

    ministriesGrid.addEventListener("click", (event) => {
      const tile = event.target.closest("[data-ministry-index]");
      if (!tile) return;
      const ministryIndex = Number(tile.getAttribute("data-ministry-index"));
      const ministry = ministries[ministryIndex];
      if (ministry) {
        openMinistryModal(ministry);
      }
    });

    closeModalButtons.forEach((button) => {
      button.addEventListener("click", closeMinistryModal);
    });

    ministryModal.addEventListener("click", (event) => {
      if (event.target === ministryModal || event.target.hasAttribute("data-close-modal")) {
        closeMinistryModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && ministryModal.classList.contains("open")) {
        closeMinistryModal();
      }
    });
  }
});

