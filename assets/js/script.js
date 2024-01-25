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
                    option.textContent = originalText.substring(0, index) + newChar + originalText.substring(index + 1);
                    console.log(option.textContent);
        
                    setTimeout(() => {
                        replaceText(index + 1); // Chama recursivamente para a próxima letra
                    }, 100);
                } else {
                    sleep(200).then(() => {
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


}