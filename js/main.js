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

// CARRUSEL

const $slides = document.querySelectorAll(".slide");
const $nextBtn = document.querySelector(".btn-next");
const $prevBtn = document.querySelector(".btn-prev");

$slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`
})

let count = 0;

$nextBtn.addEventListener("click", () => {
  count++;
  carousel();
})

$prevBtn.addEventListener("click", () => {
  count--;
  carousel();
})

const carousel = (e) => {


  if (count < $slides.length - 1) {
    $nextBtn.style.display = "block";
  } else {
    $nextBtn.style.display = "none";
  }
  if (count > 0) {
    $prevBtn.style.display = "block";
  } else {
    $prevBtn.style.display = "none";
  }

  $slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${count * 100}%)`;
  });

}

// PELIS
let pagina = 1;
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
            <p class="card__fecha">${card.release_date.slice(0,4)}</p>
            <p class="card__genero">${card.vote_average}</p>
          </article>
        `
      }).join("");

      const $container = document.querySelector(".movies__cards");
      $container.insertAdjacentHTML("afterbegin",cards)

    }
  } catch (error) {
    console.error(error);
  }
}

obtenerPeliculas();