document.addEventListener("DOMContentLoaded", () => {
  const selectCategorie = document.getElementById("select-categorie");
  const selectCitta = document.getElementById("select-citta");
  const selectOrdina = document.getElementById("select-order");

  // Caricamento e popolamento delle categorie
  fetch("./data/categories.json").then((response) => {
    // devo convertire la risposta in un oggetto JS riutilizzabile
    response
      .json()
      .then((data) => {
        data.sort();
        data.forEach((categoria) => {
          const option = document.createElement("option");
          option.value = categoria;
          option.textContent = categoria;
          selectCategorie.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Errore nel caricamento delle categorie:", error);
      });

    // Caricamento e popolamento delle Città
    fetch("./data/cities.json")
      .then((response) => response.json())
      .then((data) => {
        data.sort();
        data.forEach((citta) => {
          const option = document.createElement("option");
          option.value = citta;
          option.textContent = citta;
          selectCitta.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Errore ne lcaricamento delle città:", error);
      });
  });
});
