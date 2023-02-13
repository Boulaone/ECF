// Variables pour l'API
const apiKey = "5a4447fd";
const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey;
const baseUrl = "http://www.omdbapi.com/";
const imgUrl = "http://img.omdbapi.com/";

// Variables pour la pagination

const resultsPerPage = 8;
let currentPage = 1;

// Éléments HTML pour les résultats
const resultsContainer = document.getElementById("results");

// Fonction pour envoyer la requête
function search(title, year, type, page) {
  console.log("search params:", title, year, type, page);
  const params = `apikey=${apiKey}&s=${title}&y=${year}&type=${type}&page=${page}`;
  const url = `${baseUrl}?${params}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const totalResults = data.totalResults;
      const start = (currentPage - 1) * resultsPerPage;
      const end = start + resultsPerPage;
      const results = data.Search.slice(start, end);

      // Afficher les résultats
      resultsContainer.innerHTML = "";
      results.forEach((result) => {
        let posterUrl = `${imgUrl}?apikey=${apiKey}&i=${result.imdbID}`;
        let defaultImage = "../img/default.jpg";
        resultsContainer.innerHTML += `
          <div class="result">
          <img src= "${
            result.Poster === "N/A" ? defaultImage : result.Poster
          }" alt="${result.Title}">
          <h2 class="nom">${result.Title}</h2>
          <h2 class="date">${result.Year}</h2>
          </div>
          `;
      });

      // Afficher la pagination
      createPagination(totalResults);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Fonction pour calculer le nombre de pages
function getNumberOfPages(totalResults) {
  if (totalResults % resultsPerPage > 0) {
    return parseInt(totalResults / resultsPerPage + 1);
  }
  return parseInt(totalResults / resultsPerPage);
}

// Fonction pour créer la pagination
function createPagination(totalResults) {
  const numberOfPages = getNumberOfPages(totalResults);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(totalResults / resultsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    paginationContainer.innerHTML += `
    <button class="page-button" ${
      i === currentPage ? "disabled" : ""
    } onclick="setPage(${i})">
    ${i}
    </button>
    `;
  }
}

// Fonction pour définir la page actuelle
function setPage(page) {
  currentPage = page;
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("type").value;
  search(title, year, type, page);
}

// Écouter le formulaire de recherche
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  currentPage = 1;
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("type").value;
  search(title, year, type, currentPage);
});

// // Fonction pour définir la page actuelle
// function setPage(page) {
//   currentPage = page;
//   console.log('currentPage:', currentPage);
//   const title = document.getElementById("title").value;
//   const year = document.getElementById("year").value;
//   const type = document.getElementById("type").value;
//   search(title, year, type, currentPage);
// }
