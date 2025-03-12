function q(sel){
    return document.querySelector(sel);
}
function create_cards(category) {
    const container = q('#cards');
    const template = q('#card_template');

    container.innerHTML = '';
    console.log(category);

    let delay = 0; // Para espaciar la aparición de cada carta

    creatures.forEach((creature, index) => {
        if (category && creature.category !== category) {
            return;
        }

        const params = {
            'card-worn-number': 'card-worn-' + Math.floor((Math.random() * 4) + 1),
            'card-type': creature.category == "beast" ? 'card-beast' : 'card-human',
            'card-period': creature.period == "ancient" ? 'card-ancient' : 'card-modern',
            'card-name': creature.name,
            'card-description': creature.title,
            'card-background': creature.img,
            'card-name-size': creature.name.length > 12 ? 'card-name-small' : 'card-name-normal',
        };

        const card = document.createElement('div');
        card.innerHTML = replacer(template.innerHTML, params);
        // card.classList.add('card', 'hidden'); // Agrega una clase para la animación
        container.appendChild(card);

        // Aplica un retraso a la aparición de la carta
        setTimeout(() => {
            console.log(1);
            
            card.querySelector('.card').classList.add('visible');
        }, delay);

        delay += 100; // Aumenta el retraso para la siguiente carta
    });
}


function replacer(html, params){
    Object.keys(params).forEach(key => {
        html = html.replace('%'+key+'%', params[key]);
    });
    console.log(html);
    
    return html;
}