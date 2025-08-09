let allAds = [];
let filteredAds = [];
let currentCategory = "";
let currentCity = "";
let currentOrder = "";
let searchKeyword = "";

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dettaglio.html")) {
    const params = new URLSearchParams(window.location.search);
    const adId = params.get("id");

    if (adId) {
      fetch("../data/sales_dataset.json")
        .then((response) => response.json())
        .then((data) => {
          const ad = data.find((item) => item.id == adId);

          if (ad) {
            document.getElementById("titolo-annuncio").textContent = ad.titolo;
            document.getElementById(
              "prezzo-annuncio"
            ).textContent = `€${ad.prezzo.toLocaleString("it-IT")}`;
            document.getElementById("descrizione-annuncio").textContent =
              ad.descrizione;
            document.getElementById("citta-annuncio").textContent = ad.citta;
            document.getElementById("data-annuncio").textContent = new Date(
              ad.data_pubblicazione
            ).toLocaleDateString("it-IT");

            const categoriaAnnuncio =
              document.getElementById("categoria-annuncio");
            if (categoriaAnnuncio) {
              categoriaAnnuncio.textContent = ad.categoria;
            }

            const immaginePrincipale = document.getElementById(
              "immagine-principale"
            );
            if (immaginePrincipale) {
              immaginePrincipale.src = ad.immagine_principale;
              immaginePrincipale.alt = ad.titolo;
            }
            const nomeVenditore = document.getElementById("nome-venditore");
            if (nomeVenditore) {
              nomeVenditore.textContent = ad.venditore.nome;
            }

            const emailVenditore = document.getElementById("email-venditore");
            if (emailVenditore) {
              emailVenditore.textContent = ad.venditore.email;
            }

            const telefonoVenditore =
              document.getElementById("telefono-venditore");
            if (telefonoVenditore) {
              telefonoVenditore.textContent = ad.venditore.telefono;
            }
            console.log("Annuncio caricato con successo:", ad);
          } else {
            console.error("Annuncio non trovato per l'ID:", adId);
          }
        })
        .catch((error) => {
          console.error("Errore nel caricamento del file JSON:", error);
        });
    } else {
      console.error("ID dell'annuncio non trovato nell'URL");
    }
  } else {
    const selectCategorie = document.getElementById("select-categorie");
    const selectCitta = document.getElementById("select-citta");
    const selectOrdina = document.getElementById("select-order");
    const adsContainer = document.getElementById("ads-container");
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".btn-cerca");

    // Funzione che prende un array di annunci e li mostra nell'ads container
    function renderAds(adsToRender) {
      adsContainer.innerHTML = "";

      if (adsToRender.length === 0) {
        adsContainer.innerHTML = "<p>Nessun annuncio trovato.</p>";
        return;
      }

      adsToRender.forEach((ad) => {
        const adCard = document.createElement("div");
        adCard.className = "col";
        adCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${
                  ad.immagine_principale
                }" class="card-img-top" alt="${ad.titolo}">
                <div class="card-body">
                    <h5 class="card-title">${ad.titolo}</h5>
                    <p class="card-text"><strong>Prezzo:</strong> €${ad.prezzo.toLocaleString(
                      "it-IT"
                    )}</p>
                    <p class="card-text"><strong>Città:</strong> ${ad.citta}</p>
                    <p class="card-text"><small class="text-muted">Pubblicato il: ${new Date(
                      ad.data_pubblicazione
                    ).toLocaleDateString("it-IT")}</small></p>
                    <a href="pages/dettaglio.html?id=${
                      ad.id
                    }" class= "btn btn-custom mt-auto" target="_blank">Scopri di più</a>
                </div>
            </div>
        `;
        adsContainer.appendChild(adCard);
      });
    }

    // Funzione per popolare un menu a tendina
    function populateSelect(selectElement, data, placeholder) {
      selectElement.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.textContent = placeholder;
      defaultOption.value = "";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      selectElement.appendChild(defaultOption);

      if (Array.isArray(data) && typeof data[0] === "string") {
        data.sort((a, b) => a.localeCompare(b));
      }
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
      });
    }

    // Funzione per applicare filtri e ordinamento
    function applyFiltersAndSort() {
      let adsToDisplay = [...allAds];

      if (currentCategory) {
        adsToDisplay = adsToDisplay.filter(
          (ad) => ad.categoria === currentCategory
        );
      }

      if (currentCity) {
        adsToDisplay = adsToDisplay.filter((ad) => ad.citta === currentCity);
      }

      if (searchKeyword) {
        const lowerCaseKeyword = searchKeyword.toLowerCase();
        adsToDisplay = adsToDisplay.filter(
          (ad) =>
            ad.titolo.toLowerCase().includes(lowerCaseKeyword) ||
            ad.descrizione.toLowerCase().includes(lowerCaseKeyword) ||
            ad.citta.toLowerCase().includes(lowerCaseKeyword) ||
            ad.categoria.toLowerCase().includes(lowerCaseKeyword)
        );
      }

      switch (currentOrder) {
        case "1": // Data
          adsToDisplay.sort(
            (a, b) =>
              new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione)
          );
          break;
        case "2": // Prezzo
          adsToDisplay.sort((a, b) => a.prezzo - b.prezzo);
          break;
        case "3": // Ordine alfabetico
          adsToDisplay.sort((a, b) => a.titolo.localeCompare(b.titolo));
          break;
      }

      filteredAds = adsToDisplay;
      renderAds(filteredAds);
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
          console.error("Errore nel caricamento delle città:", error);
        });

      // Caricamento e salvataggio degli annunci
      fetch("./data/sales_dataset.json")
        .then((response) => response.json())
        .then((data) => {
          allAds = data;
          console.log("Annunci caricati:", allAds);
          renderAds(allAds);
        })
        .catch((error) => {
          console.error("Errore nel caricamento degli annuni:", error);
        });

      // Event Listener per il filtro per categoria
      selectCategorie.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "tutte") {
          currentCategory = "";
        } else {
          currentCategory = selectedValue;
        }
        console.log("Categoria selezionata:", currentCategory);
        applyFiltersAndSort();
      });

      // Event Listener per il filtro per città
      selectCitta.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "tutte") {
          currentCity = "";
        } else {
          currentCity = selectedValue;
        }
        console.log("Città selezionata:", currentCity);
        applyFiltersAndSort();
      });

      // Event Listener per il menu di ordinamento
      selectOrdina.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "tutte") {
          currentOrder = "";
        } else {
          currentOrder = selectedValue;
        }
        console.log("Ordinamento selezionato:", currentOrder);
        applyFiltersAndSort();
      });

      // Event Listener per la barra di ricerca
      searchButton.addEventListener("click", () => {
        searchKeyword = searchInput.value.trim();
        console.log("Parola chiave cercata:", searchKeyword);
        applyFiltersAndSort();
      });

      // Permette di cercare anche premendo Invio nel campo di ricerca
      searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          searchKeyword = searchInput.value.trim();
          console.log("Parola chiave cercata (Invio):", searchKeyword);
          applyFiltersAndSort();
        }
      });
    });
  }
});
