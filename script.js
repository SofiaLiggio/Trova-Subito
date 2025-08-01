let allAds = [];

document.addEventListener("DOMContentLoaded", () => {
  const selectCategorie = document.getElementById("select-categorie");
  const selectCitta = document.getElementById("select-citta");
  const selectOrdina = document.getElementById("select-order");

  // Funzione per popolare un menu a tendina
  function populateSelect(selectElement, data, placeholder) {
    selectElement.innerHtml = "";
    const defaultOption = document.createElement("option");
    defaultOption.textContent = placeholder;
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectElement.appendChild(defaultOption);
    data.sort();
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selectElement.appendChild(option);
    });
  }

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

    // Caricamento e salvataggio degli annunci
    fetch("./data/sales_dataset.json")
      .then((response) => response.json())
      .then((data) => {
        allAds = data;
        console.log("Annunci caricati:", allAds);
      })
      .catch((error) => {
        console.error("Errore nel caricamento degli annuni:", error);
      });

    // EventListener per il menu di ordinamento
    selectOrdina.addEventListener("change", (event) => {
      const opzioneSelezionata = event.target.value;
      console.log("Ordinamento selezionato:", opzioneSelezionata);
    });
  });
});
