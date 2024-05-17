// import Heroes from "/json/api-heroes.json" with {type: "json" }


let characters = []

const inputField = document.getElementById('inputField');
//ul shows the selected heros (li);
const selectedItemsList = document.getElementById('selectedItemsList');
// array shows the selected heros (json);
// let selectedHeroes = [];
// //search bar
const suggestions = document.getElementById('suggestions');
//ul all showing hero(under name of ttl suggestions)
const allHeros = document.getElementById('all-heros');
// array showing hero(under name of ttl suggestions)

const infoIcon = document.getElementById('info-icon');

const overlay = document.querySelector('.js-caracteristics');

let allHerosArray = [];

const heroesTemplate = document.getElementById("heroes-template");
let showFightResult = document.getElementById('show-fight-result');


//hide and show class (display)

const attackerTag = document.getElementById("attacker")
const defenderTag = document.getElementById("defender")



/**
 * Create a template and loads informations about the hero.
 * @param {object} hero The object from json file.
*/
function fillHeroTemplate(hero) {

    let clone = document.importNode(heroesTemplate.content, true);
    heroDataSet(clone, hero)
    clone.querySelector('.js-favourite-hero').innerText = modifyNullValueTxt(hero.name);
    clone.querySelector('.js-pv').innerText = modifyNullValue(hero.powerstats.durability);
    clone.querySelector('.js-attack').innerText = modifyNullValue(hero.powerstats.strength);
    clone.querySelector('.js-hero-img').src = hero.image.url;

    // Fill caracteristics cards
    clone.querySelector('.js-favourite-hero-caracteristics').innerText = modifyNullValueTxt(hero.name);
    // clone.querySelector('.js-favourite-hero-universe').innerText = hero.biography.publisher;
    clone.querySelector('.js-caracteristics-atk').innerText = modifyNullValue(hero.powerstats.strength);
    clone.querySelector('.js-caracteristics-pv').innerText = modifyNullValue(hero.powerstats.durability);
    clone.querySelector('.js-caracteristics-speed').innerText = modifyNullValue(hero.powerstats.speed);

    return clone
}


function heroDataSet(clone, hero) {
    clone.querySelector('.js-hero-card').dataset.name = modifyNullValueTxt(hero.name);
    clone.querySelector('.js-hero-card').dataset.durability = modifyNullValue(hero.powerstats.durability);
    clone.querySelector('.js-hero-card').dataset.strength = modifyNullValue(hero.powerstats.strength);
    clone.querySelector('.js-hero-card').dataset.combat = modifyNullValue(hero.powerstats.combat);
    clone.querySelector('.js-hero-card').dataset.speed = modifyNullValue(hero.powerstats.speed);
    clone.querySelector('.js-hero-card').dataset.universe = modifyNullValue(hero.powerstats.universe);
    clone.querySelector('.js-hero-card').dataset.src = hero.image.url;

}


function modifyNullValue(value) {
    return (value === undefined || value === null || value === 'null') ? getRandomValue(100) : value;
}


function modifyNullValueTxt(name) {
    return (name === undefined || name === null || name === 'null') ? "Unknown" : name;

}

/**
 * show list of here in page by creating li trmplates
 * @param {object} hero un object of hero.
 */
function showHeros(hero) {
    let clone = fillHeroTemplate(hero);
    allHeros.appendChild(clone);

}



function getSearchInput() {
    const inputText = inputField.value.trim();
    console.log(inputText);
    if (inputText !== '') {
        suggestions.innerHTML = "";
    }
    // else {
    //     suggestions.children.remove();
    // }

    return inputText;
}

getSearchInput()






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


function handleClickSuggestionHero(e) {
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
    console.log('Selected characters:', characters);
    if (characters.length < 2) {
        console.log("At least you must choose two heroes");
        return;
    }
    startBattleRoyalInterval(characters);
}


function displayAttackerAndDefender(attackerTag,defenderTag,attacker, defender) {
    // First, make sure the elements are not hidden
    attackerTag.classList.remove("hidden");
    defenderTag.classList.remove("hidden");
    attackerTag.innerHTML = '';
    defenderTag.innerHTML = '';
    // Show attacker and defender info
    showingHeroCard(attacker, "attacker", "fight-template", "attacker");
    showingHeroCard(defender, "defender", "fight-template", "defender");
    
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
    heroDataSet(clone, hero)
    clone.querySelector('.js-name').innerText = modifyNullValueTxt(hero.name);

    clone.querySelector('.js-durability').innerText = modifyNullValue(hero.powerstats.durability);
    clone.querySelector('.js-strength').innerText = modifyNullValue(hero.powerstats.strength);
    // clone.querySelector('.js-combat').innerTextt = modifyNullValue(hero.combat);
    // clone.querySelector('.js-speed').innerText = modifyNullValue(hero.powerstats.speed);
    // clone.querySelector('.js-universe').innerText = modifyNullValueTxt(hero.powerstats.universe);
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
    displayAttackerAndDefender(attackerTag,defenderTag,attacker, defender)

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
    let round = 0;
    const timer = setInterval(() => {

        if (characterArray.length === 1) {
            clearInterval(timer);
            showWinner(characterArray[0])
            return;
        }

        const challengers = getChallengers(characterArray);
        showFightResult.innerText = fight(challengers);
        characterArray = burnTheDead(characterArray);
        round++;
    }, 2000);
}

function showWinner(winner) {
    showingHeroCard(winner, "the winner", "fight-template", "the-winner");
    document.getElementById("the-winner").classList.remove("hidden");
    attackerTag.classList.add("hidden");
    defenderTag.classList.add("hidden");
    console.table(winner);
}



const searchBtn = document.getElementById("testBtnResearch");



const apiKey = '3e85eda0169c3aa450196a790ac1966f';

async function fetchAllHeroes() {
    try {
        const heroes = [];
        inputField.addEventListener('keyup', async () => {
            const inputText = getInputsearchbox(); // Fetch input text when button is clicked
            const query = inputText.trim();
            const maxResults = 3;
            const startIndex = 0;
            const apiName = `https://www.superheroapi.com/api.php/${apiKey}/search/${query}?maxResults=${maxResults}&startIndex=${startIndex}`;
            try {
                const responseByName = await axios.get(apiName);
                console.log(responseByName.data.results);
                afterSearch(responseByName.data.results)
                // Handle the response...
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        });


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

        //button to start fight
        document.getElementById("start-fight").addEventListener("click", () => {
            constructionAllHero('#selectedItemsList .js-hero-card');
            startFight()
            document.getElementById("hide-main").classList.toggle("hidden")


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



function afterSearch(testList) {
    testList.forEach(hero => {
        let newHero = document.createElement('inputField');
        newHero.classList.add('js-suggestion', 'suggestions__itm');
        newHero.setAttribute('id', hero.id);
        newHero.addEventListener('click', function () {
            let clone = fillHeroTemplate(hero);
            // clone.addEventListener("click",(e)=>{

            // }
            // )
            allHeros.appendChild(clone);
            listenToHeroes('#all-heros .js-hero-card', handleClickHero);

            newHero.remove();
            removeSuggestionsItem();


        });
        const textItem = document.createTextNode(modifyNullValueTxt(hero.name));
        newHero.appendChild(textItem);
        suggestions.appendChild(newHero);

    });
}

function getInputsearchbox() {
    const value = document.getElementById("inputField").value;
    return value;
}


function removeSuggestionsItem() {
    document.getElementById("inputField").value = '';
    document.getElementById('suggestions').innerHTML = '';
}


// inputField.addEventListener('keyup', function (event) {
//     const inputText = inputField.value.trim();
//     if (inputText !== '') {
//         suggestions.innerHTML = "";
//         let testList = Heroes.filter(hero => hero.name.toLowerCase().includes(inputText.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));

//         testList.forEach(hero => {
//             let newHero = document.createElement('button');
//             newHero.classList.add('js-suggestion', 'suggestions__itm');
//             newHero.setAttribute('id', hero.id);
//             newHero.addEventListener('click', function () {
//                 selectedHeroes.push(hero);
//                 let clone = fillHeroTemplate(hero);
//                 // clone.querySelector('.button--minus').addEventListener('click', function (event) {
//                 //     event.target.parentNode.remove();
//                 // });
//                 selectedItemsList.appendChild(clone);
//                 newHero.remove();
//             });
//             const textItem = document.createTextNode(hero.name);
//             newHero.appendChild(textItem);
//             suggestions.appendChild(newHero);
//         });
//     } else {
//         suggestions.innerHTML = '';
//     }
// });


