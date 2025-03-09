function create_cards() {
    const container = document.querySelector('#cards')
    const template = document.querySelector('#card_template')
    
    
    creatures.forEach(creature => {
        const params = {
            'card-worn-number': 'card-worn-'+Math.floor((Math.random() * 4) + 1),
            'card-type': creature.category == "beast" ? 'card-beast' : 'card-human',
            'card-period': creature.period == "ancient" ? 'card-ancient' : 'card-modern',
            'card-name': creature.name,
            'card-description': creature.title,
            'card-background': creature.img,
            'card-name-size': creature.name.length > 12 ? 'card-name-small' : 'card-name-normal',
        }
        container.innerHTML += replacer(template.innerHTML, params);
    });
}

function replacer(html, params){
    Object.keys(params).forEach(key => {
        html = html.replace('%'+key+'%', params[key]);
    });
    console.log(html);
    
    return html;
}