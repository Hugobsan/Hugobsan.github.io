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
                    }, 100*5/originalText.length); //Tempo de espera proporcional ao tamanho do texto
                } else {
                    sleep(100*5/originalText.length).then(() => {
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
    } else{
        idade.textContent = new Date().getFullYear() - 2001;
    }

    const periodo = document.querySelector('#periodo');
    let periodoAtual = (new Date().getFullYear() - 2021) * 2;
    if(periodoAtual > 8) periodoAtual = 8;
    periodo.textContent = periodoAtual;

    /* Efeito moeda */
    document.getElementById("avatar-container").addEventListener("mouseenter", function () {
        let avatar = document.querySelector("#avatar");
        avatar.style.transform = "rotateY(180deg)";
        avatar.style.backgroundColor = "#0d1117";
        avatar.src = "https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png";
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
}