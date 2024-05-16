import Heroes from "/json/api-heroes.json" with {type: "json" }


let characters = []

const inputField = document.getElementById('inputField');
//ul shows the selected heros (li);
const selectedItemsList = document.getElementById('selectedItemsList');
// array shows the selected heros (json);
let selectedHeroes = [];
//search bar
const suggestions = document.getElementById('suggestions');
//ul all showing hero(under name of ttl suggestions)
const allHeros = document.getElementById('all-heros');
// array showing hero(under name of ttl suggestions)

const infoIcon = document.getElementById('info-icon');

const overlay = document.querySelector('.js-caracteristics');

let allHerosArray = [];

const heroesTemplate = document.getElementById("heroes-template");
let showFightResult = document.getElementById('show-fight-result');

/**
 * Create a template and loads informations about the hero.
 * @param {object} hero The object from json file.
*/
function fillHeroTemplate(hero) {
    let clone = document.importNode(heroesTemplate.content, true);
    heroDataSet(clone, hero)
    clone.querySelector('.js-favourite-hero').innerText = hero.name;
    clone.querySelector('.js-pv').innerText = hero.powerstats.durability;
    clone.querySelector('.js-attack').innerText = hero.powerstats.strength;
    clone.querySelector('.js-hero-img').src = hero.image.url;

    // Fill caracteristics cards
    clone.querySelector('.js-favourite-hero-caracteristics').innerText = hero.name;
    // clone.querySelector('.js-favourite-hero-universe').innerText = hero.biography.publisher;
    clone.querySelector('.js-caracteristics-atk').innerText = hero.powerstats.strength;
    clone.querySelector('.js-caracteristics-pv').innerText = hero.powerstats.durability;
    clone.querySelector('.js-caracteristics-speed').innerText = hero.powerstats.speed;

    return clone
}

function heroDataSet(clone, hero) {
    clone.querySelector('.js-hero-card').dataset.name = hero.name;
    clone.querySelector('.js-hero-card').dataset.durability = hero.powerstats.durability;
    clone.querySelector('.js-hero-card').dataset.strength = hero.powerstats.strength;
    clone.querySelector('.js-hero-card').dataset.combat = hero.powerstats.combat;
    clone.querySelector('.js-hero-card').dataset.speed = hero.powerstats.speed;
    clone.querySelector('.js-hero-card').dataset.universe = hero.powerstats.universe;
    clone.querySelector('.js-hero-card').dataset.src = hero.image.url;

}





/**
 * show list of here in page by creating li trmplates
 * @param {object} hero un object of hero.
 */
function showHeros(hero) {
    let clone = fillHeroTemplate(hero);
    allHeros.appendChild(clone);

}



inputField.addEventListener('keyup', function (event) {
    const inputText = inputField.value.trim();
    if (inputText !== '') {
        suggestions.innerHTML = "";
        let testList = Heroes.filter(hero => hero.name.toLowerCase().includes(inputText.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));

        testList.forEach(hero => {
            let newHero = document.createElement('button');
            newHero.classList.add('js-suggestion', 'suggestions__itm');
            newHero.setAttribute('id', hero.id);
            newHero.addEventListener('click', function () {
                selectedHeroes.push(hero);
                let clone = fillHeroTemplate(hero);
                // clone.querySelector('.button--minus').addEventListener('click', function (event) {
                //     event.target.parentNode.remove();
                // });
                selectedItemsList.appendChild(clone);
                newHero.remove();
                selectedItemsList.addEventListener("click",handleClickHero)   

});
            const textItem = document.createTextNode(hero.name);
            newHero.appendChild(textItem);
            suggestions.appendChild(newHero);

        });
    } else {
        suggestions.innerHTML = '';
    }
});







/**
 * listen to the click in heros list then handle the event see  handleClickHero(e) function
 * @param {*} targetClass 
 */
function listenToHeroes(targetClass, handle) {
    const allHeroes = document.querySelectorAll(targetClass);
    allHeroes.forEach(hero => {
        hero.addEventListener("click", handle);
    });
}


function handleClickHero(e) {
    let li = e.target.parentNode;
    if (li.parentNode === selectedItemsList) {
        allHeros.appendChild(li);
    } else if (li.parentNode === allHeros) {
        selectedItemsList.appendChild(li);
    }
}


function constructionHero(liHero) {
    const hero = { powerstats: {}, image: { url: "" } }
    hero.name = liHero.dataset.name;
    hero.powerstats.durability = liHero.dataset.durability;
    hero.powerstats.strength = liHero.dataset.strength;
    hero.combat = liHero.dataset.combat;
    hero.powerstats.speed = liHero.dataset.speed;
    hero.powerstats.universe = liHero.dataset.universe
    hero.image.url = liHero.dataset.src;
    return hero;
}

function constructionAllHero(className) {
    // let herosArray = []
    const heroUl = document.querySelectorAll(className)
    heroUl.forEach(liHero => {

        let hero = constructionHero(liHero);
        characters.push(hero);
    });
}

/**
 * starts fight
 * @returns 
 */
function startFight() {
    if (characters.length < 2) { console.log("At least you must choose two heros"); return }
    startBattleRoyalInterval(characters)
    //  showBattleTable.innerText = startBattleRoyalInterval(characters)
    // const showBattleTable = document.getElementById('show-fight-result');
}




/**
 * show an hero by inject a html template in target html
 * @param {object} hero object of heros has properties like name, strenght,..
 * @param {text} altImg alt image of the element
 * @param {text} templateId template id in text format
 * @param {text} targetId target id in in text format
 */
function showingHeroCard(hero, altImg, templateId, targetId) {
    const templateName = document.getElementById(templateId);
    let clone = document.importNode(templateName.content, true);
    const target = document.getElementById(targetId);
    // heroDataSet(clone, hero)
    clone.querySelector('.js-name').innerText = hero.name;
    clone.querySelector('.js-durability').innerText = hero.powerstats.durability;
    clone.querySelector('.js-strength').innerText = hero.powerstats.strength;
    clone.querySelector('.js-combat').innerTextt = hero.combat;
    clone.querySelector('.js-speed').innerText = hero.powerstats.speed;
    clone.querySelector('.js-universe').innerText = hero.powerstats.universe;
    clone.querySelector('.js-img').src = hero.image.url;
    clone.querySelector('.js-img').alt = altImg;
    target.appendChild(clone);
}






//figth codes

/**
 * Return a random value between 0 and a chosen number.
 * @param {number} max - chosen number
 * @returns {number} - random value
 */
function getRandomValue(max) {
    return Math.floor(Math.random() * (max + 1));
}


/**
 * Gets a random value from an array
 * @param {array} array of datas 
 * @returns {*} - a random value
 */
function getRandomArrayValue(array) {
    return array[getRandomValue(array.length - 1)];
}


/**
 * Get random attack score from character stats
 * @param {object} attacker - An object representing a character
 * @returns {number} - Random attack score
 */
function getAttackScore(attacker) {
    return getRandomValue(attacker.powerstats.power) + attacker.powerstats.strength;
}


/**
 * Get random defense score from character stats
 * @param {object} defender - An object representing a character
 * @returns {number} - Random defense score
 */
function getDefenseScore(defender) {
    return getRandomValue(defender.powerstats.combat) + defender.powerstats.strength;
}


/**
 * Get 2 different and random challengers for a fight.
 * @param {array} charactersList The array you want the character's to be from.
 * @returns {array} First index of the array will draw the attacker and the second one will draw the defender.
 */
function getChallengers(charactersList) {
    let challengers = [];
    while (challengers.length < 2) {
        const c = getRandomArrayValue(charactersList);
        if (!challengers.includes(c)) {
            challengers.push(c);
        }
    }
    return challengers;
}


/**
 * fight between two characters and define the winner and the loser.
 * @param {array} challengers the first element in the array is the attacker and the second is the defender. they are objects. 
 * @returns {string} A text to epowerstats.strengthlain the fight.
 */
function fight(challengers) {
    const attacker = challengers[0];
    const defender = challengers[1];
    // showingHeroCard(hero, altImg, templateId, showId)
    console.log(attacker)
    showingHeroCard(attacker, "attacker", "fight-template", "attacker")
    showingHeroCard(defender, "defender", "fight-template", "defender")

    let txt = '';

    const attackPoints = getAttackScore(attacker);
    if (attackPoints > getDefenseScore(defender)) {
        defender.powerstats.durability -= attackPoints;

        txt += `${attacker.name} attaque ${defender.name} et a gagné le combat en lui infligeant ${attackPoints} points de dégats.`;

        if (!isAlive(defender)) {
            txt += ` ${defender.name} est mort 💀`
        }
    }
    else {
        txt += `${defender.name} a contré l'attaque de ${attacker.name}.`;
    }

    return txt;
}


/**
 * Test if a character is alive and return true if he is
 * @param {object} character -The character's object
 * @returns {boolean} -True if alive, false if dead
 */
function isAlive(character) {
    return character.powerstats.durability > 0;
}


/**
 * Delete a character from is array if he is out of hp
 * @param {array} charactersArray -The characters array
 * @returns {array} -The new array without characters out of hp
 */
function burnTheDead(charactersArray) {
    return charactersArray.filter(isAlive);
}


/**
 * Fight until only 1 remains
 * @param {array} characterArray -The array with all our characters
 * @return {object} -The winner's object
 */
function startBattleRoyalInterval(characterArray) {

    const timer = setInterval(() => {
        const challengers = getChallengers(characterArray);
        showFightResult.innerText = fight(challengers)
        characterArray = burnTheDead(characterArray);

        if (characterArray.length === 1) {
            clearInterval(timer);
            console.table(characterArray[0]);
        }
    }, 1000);
}





////////////////////////////

// `https://www.superheroapi.com/api.php/${apiKey}/search/${query}?maxResults=${maxResults}&startIndex=${startIndex}`

const apiKey = '3e85eda0169c3aa450196a790ac1966f';

async function fetchAllHeroes() {
    try {
        const heroes = [];

        for (let i = 1; i <= 4; i++) {
            let id = getRandomValue(731);
            const apiUrl = `https://www.superheroapi.com/api.php/${apiKey}/${id}`;

            const response = await axios.get(apiUrl);
            showHeros(response.data)
            heroes.push(response.data);

        }
        console.log(heroes);
        //listen to click in all heros (suggestions)
        listenToHeroes('#all-heros .js-hero-card', handleClickHero);
        listenToHeroes('#selectedItemsList .js-hero-card', handleClickHero);
        //button to start fight
        document.getElementById("start-fight").addEventListener("click", () => {

            constructionAllHero('#selectedItemsList .js-hero-card');
            // console.log(characters)
            startFight()
            // fight(characters)
        })

        // infoIcon.addEventListener('click', function () {
        //     this.classList.toggle("close");
        //     overlay.classList.toggle("overlay");
        // });

        return heroes;
    }



    catch (error) {
        console.error('Error fetching heroes:', error);
        return null;
    }


}

fetchAllHeroes();