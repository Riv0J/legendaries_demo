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
            'card-worn-number': 'card-worn-' + Math.floor((Math.random() * 5) + 1),
            'card-type': creature.category == "beast" ? 'card-beast' : 'card-human',
            'card-period': creature.period == "ancient" ? 'card-ancient' : 'card-modern',
            'card-difficulty': creature.difficulty,
            'card-name': creature.name,
            'card-title': creature.title,
            'card-description': creature.description,
            'card-background': creature.img,
            'card-name-size': creature.name.length > 12 ? 'card-name-small' : 'card-name-normal',
            'card-myth': creature.myth == true ? 'Myth' : 'History',
        };

        const card = document.createElement('div');
        card.innerHTML = replacer(template.innerHTML, params);
        // card.classList.add('card', 'hidden'); // Agrega una clase para la animación
        container.appendChild(card);

        // Aplica un retraso a la aparición de la carta
        setTimeout(() => {
            card.querySelector('.card').classList.add('visible');
        }, delay);

        delay += 100; // Aumenta el retraso para la siguiente carta
    });
}

document.addEventListener('click', event =>{
    const card = event.target.closest('.card');
    if(!card){
        return;
    }
    let params = "";
    if(!hasClass(card, "card-flipped")){
        addClass(card, "card-flipped")
        params = {
            time: 400,
            keyframes: {
                0 : {
                    scale : '0 1'
                },
                50: {
                    func: function(){
                        card.querySelector('.card-markings').style.visibility = 'hidden';
                        card.querySelector('.card-content').style.visibility = 'hidden';
                        card.querySelector('.card-back').style.visibility = 'visible';
                    }
                },
                100 : {
                    scale : '1 1'
                },
            },
            func: function(){
            }
        }
        
    } else {
        removeClass(card, "card-flipped")
        params = {
            time: 400,
            keyframes: {
                0 : {
                    scale : '0 1'
                },
                50: {
                    func: function(){
                        card.querySelector('.card-markings').style.visibility = 'visible';
                        card.querySelector('.card-content').style.visibility = 'visible';
                        card.querySelector('.card-back').style.visibility = 'hidden';
                    }
                },
                100 : {
                    scale : '1 1'
                },
            },
            func: function(){
            }
        }
    }
    animator(card,params);
});
function replacer(html, params){
    Object.keys(params).forEach(key => {
        html = html.replace(new RegExp('%' + key + '%', 'g'), params[key]);
    });
    return html;
}

function animator(element, params){
    if(hasClass(element,"animating")){
        console.log("returned");
        
        return;
    }
    addClass(element, "animating");

    const period = 50;
    let timing = 0;
    let interval = setInterval(function() {
        
        const percent = timing * 100 / params.time;
        const keyframe = params.keyframes[percent];
        
        if(keyframe){
            executeKeyframe(element, keyframe);
        }

        timing += period;
        if(timing == params.time) {
            executeKeyframe(element, params.keyframes[100]);
            removeClass(element, "animating");
            clearInterval(interval);
            console.log("removed");

        }
    }, period);
}

function executeKeyframe(element, keyframe){
    console.log(element);
    
    console.log(keyframe);
    Object.keys(keyframe).forEach(value => {
        if(value == "func"){
            keyframe[value]();
        } else {
            element.style[value] = keyframe[value];
        }
    });
}

function hasClass(element, clas){
    return element.classList.contains(clas);
}

function addClass(element, clas){
    return element.classList.add(clas);
}

function removeClass(element, clas){
    return element.classList.remove(clas);
}