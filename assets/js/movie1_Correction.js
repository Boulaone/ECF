// Variables pour l'API
const apiKey = "5a4447fd";
const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;
const baseUrl = "http://www.omdbapi.com/";
const imgUrl = "http://img.omdbapi.com/";

// Variables pour la pagination
const resultsPerPage = 10;
let currentPage = 1;

// Éléments HTML pour les résultats
const resultsContainer = document.getElementById("results");

// Fonction pour envoyer la requête
async function search(page) {
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("type").value;
  const params = `apikey=${apiKey}&s=${title}&y=${year}&type=${type}&page=${page}`;
  const url = `${baseUrl}?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const totalResults = data.totalResults;

    // Afficher les résultats
    resultsContainer.innerHTML = "";
    data.Search.forEach((result) => {
      let defaultImage = "/assets/img/default.jpg";
      resultsContainer.innerHTML += `
        <div class="result">
          <img src="${
            result.Poster === "N/A" ? defaultImage : result.Poster
          }" alt="${result.Title}" width="200px">
          <h2 class="nom">${result.Title}</h2>
          <h2 class="date">${result.Year}</h2>
        </div>
      `;
    });

    // Afficher la pagination
    createPagination(totalResults);
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour calculer le nombre de pages
function getNumberOfPages(totalResults) {
  return Math.ceil(totalResults / resultsPerPage);
}

// Fonction pour créer la pagination
function createPagination(totalResults) {
  const numberOfPages = getNumberOfPages(totalResults);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= numberOfPages; i++) {
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
  search(currentPage);
}

// Écouter le formulaire de recherche
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  currentPage = 1;
  search(currentPage);
});
