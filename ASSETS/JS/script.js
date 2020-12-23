//----------------------------------------------NAVIGATION------------------------------------------------------

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.items');
  const navLinks = document.querySelectorAll('.items li');
  //toggle nav

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });
  //animate links
  navLinks.forEach((link, index) => {
    link.style.animation =
      'navLinkFade 0.5s ease forwards ${index / 7 + 0.3s}s';
    console.log(index / 7);
  });
};

navSlide();

//----------------------------------------------DIAPORAMA-------------------------------------------------------
// Variables globales
let compteur = 0; // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth, mod;

window.onload = () => {
  // On récupère le conteneur principal du diaporama
  const diapo = document.querySelector('.diapo');

  // On récupère le conteneur de tous les éléments
  elements = document.querySelector('.elements');

  // On récupère un tableau contenant la liste des diapos
  slides = Array.from(elements.children);

  // On calcule la largeur visible du diaporama
  slideWidth = diapo.getBoundingClientRect().width;

  // On récupère les deux flèches
  let next = document.querySelector('#nav-droite');
  let prev = document.querySelector('#nav-gauche');

  // On met en place les écouteurs d'évènements sur les flèches
  next.addEventListener('click', slideNext);
  prev.addEventListener('click', slidePrev);

  // Automatiser le diaporama
  timer = setInterval(slideNext, 6000);

  // Gérer le survol de la souris
  diapo.addEventListener('mouseover', stopTimer);
  diapo.addEventListener('mouseout', startTimer);

  // Mise en oeuvre du "responsive"
  window.addEventListener('resize', () => {
    slideWidth = diapo.getBoundingClientRect().width;
    slideNext();
  });

  //   MODIF
  var mod = document.querySelector('#demo');

  // RADIO
  var radios = document.getElementsByName('drone');

  for (var i = 0, length = radios.length; i < length; i++) {
    while (radios[i].checked == true) {
      // do whatever you want with the checked radio
      mod.innerHTML = 'BOUYACHAKA';

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
};

/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext() {
  // On incrémente le compteur
  compteur++;

  // Si on dépasse la fin du diaporama, on "rembobine"
  if (compteur == slides.length) {
    compteur = 0;
  }

  // On calcule la valeur du décalage
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev() {
  // On décrémente le compteur
  compteur--;

  // Si on dépasse le début du diaporama, on repart à la fin
  if (compteur < 0) {
    compteur = slides.length - 1;
  }

  // On calcule la valeur du décalage
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
}

/**
 * On stoppe le défilement
 */
function stopTimer() {
  clearInterval(timer);
}

/**
 * On redémarre le défilement
 */
function startTimer() {
  timer = setInterval(slideNext, 6000);
}
