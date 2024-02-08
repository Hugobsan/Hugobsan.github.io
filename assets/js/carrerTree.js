function plotExperiences(experiences) {
    const carreerLine = document.getElementById('carreer-line');
    const carreerTree = document.getElementById('carreer-tree');
    let lastY = 0;
  
    Object.values(experiences).forEach((experience, index) => {
      const experienceDiv = document.createElement('div');
      experienceDiv.className = 'experience';
      experienceDiv.style.top = `${(index / Object.keys(experiences).length) * 100}%`;
  
      const experienceBar = document.createElement('div');
      experienceBar.className = 'experience-bar';
      experienceBar.style.height = `${(1 / Object.keys(experiences).length) * 100}%`;
      experienceBar.style.backgroundColor = `hsl(${(index / Object.keys(experiences).length) * 360}, 70%, 70%)`;
  
      experienceDiv.appendChild(experienceBar);
  
      const experienceContent = document.createElement('div');
      experienceContent.className = 'experience-content';
      experienceContent.innerHTML = `
        <div>${experience.company}</div>
        <div>${experience.position}</div>
        <div>${experience.entry} - ${experience.exit}</div>
        <div>${experience.description}</div>
      `;
  
      experienceDiv.appendChild(experienceContent);
      carreerTree.appendChild(experienceDiv);
  
      const experienceHeight = experienceContent.offsetHeight;
      lastY += experienceHeight;
  
      experienceDiv.style.height = `${experienceHeight}px`;
      carreerLine.style.height = `${lastY}px`;
  
      experienceDiv.addEventListener('mouseover', () => {
        experienceDiv.style.backgroundColor = '#f0f0f0';
      });
  
      experienceDiv.addEventListener('mouseout', () => {
        experienceDiv.style.backgroundColor = '';
      });
    });
  }
  
  const experiences = {
    "7": {
        "company": "Solutions - Soluções em eletricidade",
        "position": "Estagiário",
        "entry": "12/2018",
        "exit": "01/2020",
        "description": "Desenvolvimento de Site da Empresa, Manipulação de pacote Office, acompanhamento em instalações fotovoltaicas."
    },
    "6": {
        "company": "Universidade Estadual de Montes Claros",
        "position": "Bolsista - ICV",
        "entry": "03/2020",
        "exit": "03/2021",
        "description": "Bolsa de Iniciação Científica Voluntária na área de Energia Fotovoltaica. O programa teve prazo de 1 ano, rendendo a publicação ANÁLISE DE DESEMPENHO DE UMA USINA FOTOVOLTAICA A PARTIR DE DADOS DE MEDIÇÃO DE ENERGIA COLETADOS AUTOMATICAMENTE no XIV Fórum de Ensino, Pesquisa, Extensão e Gestão."
    },
    "5": {
        "company": "Empreendedor individual",
        "position": "Téc. Manutenção de Computadores",
        "entry": "06/2020",
        "exit": "08/2021",
        "description": "Manutenção preventiva/corretiva em desktops e notebooks e suporte ao usuário como microempreendedor autônomo."
    },
    "4": {
        "company": "JPID - Engenharia & Iluminação",
        "position": "Desenvolvedor WordPress",
        "entry": "08/2020",
        "exit": "09/2020",
        "description": "Desenvolvimento de Site (Landing Page) da empresa utilizando Wordpress."
    },
    "3": {
        "company": "Açougue do Povão",
        "position": "Desenvolvedor Web",
        "entry": "09/2020",
        "exit": "12/2020",
        "description": "Análise, Projeto e Desenvolvimento de sistema local para controle de estoque, vendas e caderneta da empresa, utilizando HTML e CSS com Bootstrap, Back-end em PHP (puro) e Banco de Dados MySQL."
    },
    "2": {
        "company": "Universidade Estadual de Montes Claros",
        "position": "Bolsista - IC",
        "entry": "12/2021",
        "exit": "10/2022",
        "description": "Programa de Iniciação Científica na área de Ciência da Computação. O programa teve duração de 10 meses com o objetivo de modelar um sistema para gestão de processos seletivos e ingressão de acadêmicos nos programas de pós-graduação da Universidade Estadual de Montes Claros utilizando Laravel, Bootstrap e MySQL. O programa resultou no trabalho: DESENVOLVIMENTO DE UMA APLICAÇÃO WEB PARA GESTÃO DE PROCESSOS SELETIVOS no XVI FEPEG."
    },
    "1": {
        "company": "Universidade Estadual de Montes Claros",
        "position": "Estagiário",
        "entry": "11/2022",
        "exit": "Atual",
        "description": "Desenvolvimento do Sistema de Gestão da Extensão (SIGEX) utilizando HTML e CSS com Bootstrap, Ajax, JQuery, Laravel com Bancos de Dados MySQL e SQLServer, versionamento com Bitbucket e controle de tasks via Trello."
    }
};
  
  plotExperiences(experiences);