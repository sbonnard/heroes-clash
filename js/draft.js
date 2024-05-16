
// /**
//  * show serial number of heroes. see showHeros()function
//  * @param {number} start the shown Start.
//  * @param {number} end the show end 
//  * @param {array} data array of object heros
//  * @returns 
//  */
// function showNOfHeros(start, end, data) {
//     if (start < 0) { start = 0; }
//     if (end > Heroes.length) { end = Heroes.length }
//     for (start; start < end; start++) {
//         showHeros(data[start])
//         //add hero to array
//         allHerosArray.push(data[start])

//     }
//     return data[start]

// }



// /**
//  * search by hero name
//  * @param {string} heroName 
//  * @returns {object} return hero if it was found it otherwise returns null 
//  */
// function searchByheroName(heroName) {
//     if (heroName !== '') {
//         return Heroes.find(hero => {
//             return hero.name.includes(heroName);
//         });
//     }

//     return null;
// }



///////////////


// function afterSearch() {
//     testList.data.results.forEach(hero => {
//         let newHero = document.createElement('button');
//         newHero.classList.add('js-suggestion', 'suggestions__itm');
//         newHero.setAttribute('id', hero.id);
//         newHero.addEventListener('click', function () {
//             selectedHeroes.push(hero);
//             let clone = fillHeroTemplate(hero);
//             // clone.querySelector('.button--minus').addEventListener('click', function (event) {
//             //     event.target.parentNode.remove();
//             // });
//             selectedItemsList.appendChild(clone);
//             newHero.remove();
//         });
//         const textItem = document.createTextNode(hero.name);
//         newHero.appendChild(textItem);
//         suggestions.appendChild(newHero);
//     });
// }



// let myPromise = new Promise(function(myResolve, myReject) {
//     // "Producing Code" (May take some time)
    
//       myResolve(
//         getInputText()
//       ); // when successful
//       myReject();  // when error
//     });
    
//     // "Consuming Code" (Must wait for a fulfilled Promise)
//     myPromise.then(
//       function(value) { /* code if successful */ },
//       function(error) { /* code if some error */ }
//     );







// function getInputText() {


//     inputField.addEventListener('keyup', function (event) {
//         const inputText = inputField.value.trim();
//         if (inputText !== '') {
//             suggestions.innerHTML = "";

//             console.log(inputText)
//             // let testList = responseByName.filter(hero => hero.name.toLowerCase().includes(inputText.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
//             // let responseByName = fetchByName(inputField)

//             return inputText
//         } else {
//             suggestions.innerHTML = '';
//         }
//     });

// }






/// 



// let query = getInputText()
// const maxResults = 3;
// const startIndex = 0;
// const apiName = `https://www.superheroapi.com/api.php/${apiKey}/search/${query}?maxResults=${maxResults}&startIndex=${startIndex}`
// const responseByName = await axios.get(apiName);
// console.log(responseByName);
