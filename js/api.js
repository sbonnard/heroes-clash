// const apiKey = '3e85eda0169c3aa450196a790ac1966f';

// async function fetchAllHeroes() {
//   try {
//     const heroes = [];
//     for (let id = 1; id <= 4; id++) {
//       const apiUrl = `https://www.superheroapi.com/api.php/${apiKey}/${id}`;
//       const response = await axios.get(apiUrl);
//       heroes.push(response.data); 
//       console.log(response.data);
//     }
//     return heroes;
//   } catch (error) {
//     console.error('Error fetching heroes:', error);
//     return null;
//   }
// }

// fetchAllHeroes();