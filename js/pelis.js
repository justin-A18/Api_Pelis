//INPUT SEARCH
const $btn = document.querySelector("#btn-search");
const $input = document.querySelector("#input");

$btn.addEventListener("click", (e) => {
  e.preventDefault();
  $input.classList.toggle("search-v");
  $btn.classList.toggle("btn-translate");
  $input.focus();
});

// MENU RESPONSIVE

const $btnBurger = document.querySelector(".nav__burger");
const $menu = document.querySelector(".nav__tabs");
const $list = document.querySelector(".nav__list");

$btnBurger.addEventListener("click", () => {
  $list.classList.toggle("nav__list-v")
  $menu.classList.toggle("tabs-visible");

  if ($btnBurger.childNodes[1].classList.contains("bx-menu")) {
    $btnBurger.childNodes[1].classList.remove("bx-menu");
    $btnBurger.childNodes[1].classList.add("bx-x");
  } else {
    $btnBurger.childNodes[1].classList.remove("bx-x");
    $btnBurger.childNodes[1].classList.add("bx-menu");
  }

})

// PELIS
const $prev = document.querySelector(".btnprev");
const $next = document.querySelector(".btnnext");
let pagina = 1;

$prev.addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    obtenerPeliculas();
  }
})

$next.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina++;
    obtenerPeliculas();
  }
})



const obtenerPeliculas = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5c775389c73a0b2a2bc815d05093528&language=es-MX&page=${pagina}`);

    if (respuesta.ok) {
      const datos = await respuesta.json();
      console.log(datos.results)
      const cards = datos.results.map(card => {
        return `
          <article class="card">
            <img class="card__portada" src="https://image.tmdb.org/t/p/w500/${card.poster_path}" alt="${card.title}">
            <h3 class="card__name">${card.title}</h3>
            <p class="card__fecha">${card.release_date.slice(0, 4)}</p>
            <p class="card__genero">${card.vote_average}</p>
          </article>
        `
      }).join("");

      const $container = document.querySelector(".movies__cards");
      $container.innerHTML = cards;

    }
  } catch (error) {
    console.error(error);
  }
}

obtenerPeliculas();