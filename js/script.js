// let characters = [
//     {
//         name: 'Zangief',
//         life: 50,
//         xp: 7,
//         weapon: 9,
//         shield: 8,
//     },
//     {
//         name: 'Chun-Li',
//         life: 50,
//         xp: 7,
//         weapon: 8,
//         shield: 8,
//     },
//     {
//         name: 'Blanca',
//         life: 50,
//         xp: 4,
//         weapon: 6,
//         shield: 7,
//     },
//     {
//         name: 'Ken',
//         life: 1,
//         xp: 4,
//         weapon: 7,
//         shield: 5,
//     }
// ];

import Heroes from "/json/api-heroes.json" with {type: "json" }

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
    return getRandomValue(attacker.weapon) + attacker.xp;
}


/**
 * Get random defense score from character stats
 * @param {object} defender - An object representing a character
 * @returns {number} - Random defense score
 */
function getDefenseScore(defender) {
    return getRandomValue(defender.shield) + defender.xp;
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
 * @returns {string} A text to explain the fight.
 */
function fight(challengers) {
    const attacker = challengers[0];
    const defender = challengers[1];

    let txt = '';

    const attackPoints = getAttackScore(attacker);
    if (attackPoints > getDefenseScore(defender)) {
        defender.life -= attackPoints;

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
    return character.life > 0;
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
        console.log(fight(challengers));
        characterArray = burnTheDead(characterArray);

        if (characterArray.length === 1) {
            clearInterval(timer);
            console.table(characterArray[0]);
        }
    }, 1000);
}

// startBattleRoyalInterval(Heroes);
// console.table(startBattleRoyalInterval(characters));