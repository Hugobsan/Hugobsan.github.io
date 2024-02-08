function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', () => {
    const brandElement = document.querySelector('.brand');
    const text = brandElement.textContent;
    brandElement.textContent = '';

    let index = 0;
    const typingInterval = setInterval(() => {
        brandElement.textContent += text[index];
        index++;

        if (index === text.length) {
            clearInterval(typingInterval);
        }
    }, 50);
});

window.onload = function () {
    var page = window.location.pathname;
    page = page.substr(1);

    var links = document.querySelectorAll('.options ul li a');

    links.forEach(function (link) {
        if (link.getAttribute('href') === page) {
            link.parentElement.classList.add('active');
        }
    });

    var menuItems = document.querySelectorAll('.options ul li');

    menuItems.forEach(function (item) {
        item.classList.add('slideInDown');
        item.addEventListener('animationend', function () {
            item.classList.remove('slideInDown');
        });
    });

    const options = document.querySelectorAll('.options ul li');

    options.forEach(option => {
        //Armazenando texto originais num dicionário
        const originalText = option.textContent;

        option.addEventListener('mouseover', () => { // Alterar o texto do link
            const originalText = option.textContent;

            // Função recursiva para substituir letras
            function replaceText(index) {
                if (index < originalText.length) {
                    // Substitui a letra por um caractere aleatório
                    let newChar = String.fromCharCode(Math.floor(Math.random() * 255));
                    // Substitui o texto pelo texto original com a letra substituída
                    option.textContent = originalText.substring(0, index) + newChar + originalText.substring(index + 1);

                    setTimeout(() => {
                        replaceText(index + 1); // Chama recursivamente para a próxima letra
                    }, 100 * 5 / originalText.length); //Tempo de espera proporcional ao tamanho do texto
                } else {
                    sleep(100 * 5 / originalText.length).then(() => {
                        option.textContent = originalText;
                    });
                }
            }

            replaceText(0); // Inicia a recursão a partir do índice 0
        });

        option.addEventListener('mouseout', () => { //Retorna o texto original
            option.textContent = originalText;
        });
    });

    /* Automatizando números no texto inicial */
    const idade = document.querySelector('#idade');
    //Se o dia atual for antes de 10 de outubro
    if (new Date().getMonth() < 9 || (new Date().getMonth() === 9 && new Date().getDate() < 10)) {
        idade.textContent = new Date().getFullYear() - 2001 - 1;
    } else {
        idade.textContent = new Date().getFullYear() - 2001;
    }

    const periodo = document.querySelector('#periodo');
    let periodoAtual = (new Date().getFullYear() - 2021) * 2;
    if (periodoAtual > 8) periodoAtual = 8;
    periodo.textContent = periodoAtual;

    /* Efeito moeda */
    document.getElementById("avatar-container").addEventListener("mouseenter", function () {
        let avatar = document.querySelector("#avatar");
        avatar.style.transform = "rotateY(180deg)";
        avatar.style.backgroundColor = "#0d1117";
        avatar.src = "https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png";
        avatar.style.cursor = "pointer";
    });

    document.getElementById("avatar-container").addEventListener("mouseleave", function () {
        let avatar = document.querySelector("#avatar");
        avatar.style.transform = "rotateY(0deg)";
        avatar.style.backgroundColor = "transparent";
        avatar.src = "assets/img/profile.png";
    });

    document.getElementById("avatar-container").addEventListener("click", function () {
        window.open("https://github.com/Hugobsan");
    });

    /* Automatizando inserção das skills */

    function createSkills(stack) {
        fetch('assets/js/skills.json')
            .then(response => response.json())
            .then(data => {

                let div_stack = document.querySelector(stack);
                let div_title = document.createElement("h2");
                div_title.classList.add("text-gb");
                div_title.innerHTML = data[stack.substr(1)].subtitle;

                div_stack.appendChild(div_title);

                let main_skills = data[stack.substr(1)].skills.filter(skill => skill.percentage > 50);
                let learning_skills = data[stack.substr(1)].skills.filter(skill => skill.percentage <= 50);

                //Para as skills principais, exibindo em cards
                for (let i = 0; i < main_skills.length / 3; i++) {
                    let skill_group = document.createElement("div");
                    skill_group.classList.add("skill-group");
                    //Adicionando os 3 próximos skills ao grupo
                    for (let j = 0; j < 3; j++) {
                        let skill = main_skills[i * 3 + j];
                        if (skill == undefined) break;
                        let div = document.createElement("div");
                        div.classList.add("skill");
                        div.innerHTML = `<h5>${skill.name}</h5>`;
                        div.innerHTML += '<i class="' + skill.icon + '"> </i>'
                        let progress = document.createElement("div");
                        progress.classList.add("progress-bar");
                        let progress_bar = document.createElement("div");
                        progress_bar.classList.add("progress");
                        progress_bar.style.width = skill.percentage + '%';
                        progress.appendChild(progress_bar);
                        div.appendChild(progress);

                        skill_group.appendChild(div);
                    }
                    div_stack.appendChild(skill_group);
                }
                if (learning_skills.length > 0) {
                    let foot = document.createElement("p");
                    let outras = document.createElement("b");
                    outras.innerHTML = "Em aprendizado:";
                    foot.appendChild(outras);
                    foot.innerHTML += " ";
                    for (let i = 0; i < learning_skills.length; i++) {
                        let skill = learning_skills[i];
                        foot.innerHTML += skill.name;
                        if (i < learning_skills.length - 1) foot.innerHTML += ", ";
                    }
                    div_stack.appendChild(foot);
                }
            });
    }

    fetch('assets/js/skills.json')
        .then(response => response.json())
        .then(data => {
            let root = document.querySelector("#skills");
            //Adicionando título
            let title = document.createElement("h1");
            title.classList.add("text-gb");
            title.innerHTML = "Habilidades";
            root.appendChild(title);
            //Criando div para cada tipo de stack
            for (let stack in data) {
                let div = document.createElement("div");
                div.id = stack;
                div.classList.add("stack-group");
                root.appendChild(div);
                createSkills("#" + stack);
            }
        });

}