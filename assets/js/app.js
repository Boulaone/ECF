var films = [
  { name: "Deadpool", years: 2016, authors: "Tim Miller" },
  { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
  { name: "Scream", years: 1996, authors: "Wes Craven" },
  { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" }
  ];

// Affiche le tableau d'objets avec les valeurs ajoutées avec
//  la méthode forEach() de jQuery
films.forEach(function(film) {
  $("#tableau tbody").append("<tr><td>" + film.name + "</td><td>" 
  + film.years + "</td><td>" + film.authors + "</td><td>" + 
  "</td><td><button class='delete-button'>Supprimer</button></td></tr>");
});

// fonction pour faire apparaitre formulaire d'ajout de films
  // Bouton pour ajouter un nouveau film
$("#add-film-button").on("click", function() {
  // Afficher le formulaire
  $("#film-form").show();
  
  // Bouton "Sauvegarder" du formulaire
$("#save-film-button").on("click", function() {
  // Récupérer les valeurs des zones de saisie
  var name = $("#film-name").val();
  var years = $("#film-years").val();
  var authors = $("#film-authors").val();

  // Convertir 1ère lettre en majuscule
  name = name.charAt(0).toUpperCase() + name.slice(1);
  authors = authors.charAt(0).toUpperCase() + authors.slice(1);

  // Vérification si les données saisies sont valides
  var errors = [];
  if (name.length < 2) {
      errors.push("Le nom doit comporter au moins 2 caractères");
  }
  if (years < 1900 || years > 2023 || years.length !== 4) {
      errors.push("L'année doit être comprise entre 1900 & 2023 et doit comportée 4 chiffres");
  }
  if (authors.length < 5) {
      errors.push("Le réalisateur doit comporter au moins 5 caractères");
  }

  // Afficher les erreurs ou ajouter le film
  if (errors.length > 0) {
      // Afficher les erreurs dans une div à fond rouge 
      var errorMessage = "<ul>";
      errors.forEach(function(error){
          errorMessage += "<li>" + error + "</li>";
      });
      errorMessage += "</ul>";
      $("#error-Message").html(errorMessage).show().css({backgroundColor:'red', color:'black'});
      setTimeout(function() {
          $("#error-Message").empty();
      }, 5000);
  } else {

  // Ajouter le nouveau film au tableau films
  films.push({ name: name, years: years, authors: authors });

  // Recharger le tableau avec les nouvelles données
  $("#tableau tbody").empty();
  films.forEach(function(film) {
    $("#tableau tbody").append("<tr><td>" + film.name + "</td><td>" 
    + film.years + "</td><td>" + film.authors + "</td><td>" + "</td><td><button class='delete-button'>Supprimer</button></td></tr>");
  });
  
  // Afficher message de succès
  $("#message").empty().append("<div>Film ajouté avec succés</div>");
  setTimeout(function() {
      $("#message").empty();
  }, 3000);

  // Cacher le formulaire
  $("#film-form").hide();
}
});

// Fonction pour suprimer une ligne du tableau en utilisant 
// la méthode remove() avec confirmation.
$("#tableau").on("click", ".delete-button", function(){
  Swal.fire({
  title: 'Voulez-vous vraiment supprimer ce film de la liste ?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui, supprimer!'
  }).then((result) => {
  if (result.value) {
  $(this).closest("tr").remove();
  }
  });
  });

// Fonction pour filtrer les résultats
  $("#filtre").on("change", function() {
      var filtre = $(this).val();
      var lignes = $("#tableau tbody tr").get();

      lignes.sort(function(a, b) {
      // Tri par nom ordre alphabétique
          if (filtre === "name") {
              var nameA = $(a).find("td:first").text();
              var nameB = $(b).find("td:first").text();
              return nameA.localeCompare(nameB);
      // Tri par Année ordre décroissant
          }else if (filtre === "years") {
              var yearsA = parseInt($(a).find("td:eq(1)").text());
              var yearsB = parseInt($(b).find("td:eq(1)").text());
              return yearsB - yearsA;
          }
      });

      $("#tableau tbody").empty();
      $.each(lignes, function(index, ligne){
          $("#tableau tbody").append(ligne);
      });
  });
});

const menuHamburger = document.querySelector("menu-hamburger")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click',() => {
  navLinks.classList.toggle('mobile-menu')
});

