// Chargement page 

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const logoNegatif = document.querySelector('.logo-negatif'); // Sélectionner le logo négatif
    console.log('Page loaded, starting loading animation');

    // Attendre 1.5 secondes avant de masquer l'écran de chargement
    setTimeout(() => {
        loadingScreen.classList.add('hidden'); // Masque l'écran de chargement
        document.body.classList.add('loaded'); // Affiche le contenu principal de la page

        // Afficher le logo négatif une fois l'animation terminée
        logoNegatif.style.display = 'flex';
    }, 1500); // Délai de 1.5 secondes
});


// JavaScript pour activer/désactiver le menu burger sur mobile
const burger = document.getElementById('burger');
const closeBtn = document.getElementById('close');
const navLinks = document.getElementById('nav-links');
const logoNegatif = document.querySelector('.logo-negatif'); // Sélectionner le logo

// Vérification de la hauteur de l'écran
const isSmallScreen = window.matchMedia('(max-height: 450px)');

// Ouvrir le menu burger
burger.addEventListener('click', () => {
    navLinks.classList.add('active');
    
    // Masquer le logo seulement si l'écran a une hauteur max de 450px
    if (isSmallScreen.matches) {
        logoNegatif.style.display = 'none';
    }

    document.body.style.overflow = 'hidden'; // Désactiver le défilement du corps
});

// Fermer le menu burger
closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('active');
    
    // Afficher le logo seulement si l'écran a une hauteur max de 450px
    if (isSmallScreen.matches) {
        logoNegatif.style.display = 'block';
    }

    document.body.style.overflow = 'auto'; // Réactiver le défilement du corps
});



// Accueil Carrousel

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.testimonial-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Empêche le comportement par défaut de la sélection de texte
    carousel.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Empêche la sélection de texte
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Arrête la fonction si le bouton de la souris n'est pas enfoncé
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 0.8; // Ajuste la vitesse de défilement
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Support pour les appareils tactiles
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        isDown = true;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Ajuste la vitesse de défilement
        carousel.scrollLeft = scrollLeft - walk;
    });
});


// Avant/Après

// Sélection de tous les conteneurs d'images avant/après
document.querySelectorAll('.container-aa').forEach(container => {
    const slider = container.querySelector('.slider');
    const imageBefore = container.querySelector('.image-before');

    // Mise à jour de la position des images lors de l'entrée sur le slider
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        updateSliderPosition(container, value);
    });

    let isDragging = false; // Variable pour suivre si un glissement est en cours

    // Début de l'interaction tactile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleTouchMove(e, container);
    });

    // Mouvement tactile
    slider.addEventListener('touchmove', (e) => {
        if (isDragging) {
            handleTouchMove(e, container);
        }
    });

    // Fin de l'interaction tactile
    slider.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Fonction pour mettre à jour la position de l'image avant en fonction du pourcentage
    function updateSliderPosition(container, value) {
        container.style.setProperty('--position', `${value}%`);
    }

    // Fonction pour gérer le déplacement tactile
    function handleTouchMove(e, container) {
        const touch = e.touches[0];
        const rect = slider.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const percentage = (touchX / rect.width) * 100;
        const boundedPercentage = Math.min(Math.max(percentage, 0), 100);
        slider.value = boundedPercentage;
        updateSliderPosition(container, boundedPercentage);
    }
});

// FAQ

function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isVisible = answer.style.display === 'block';

    // Fermer toutes les réponses ouvertes
    document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));

    // Afficher ou masquer la réponse cliquée
    if (!isVisible) {
        answer.style.display = 'block';
        element.classList.add('open'); // Ajouter la classe 'open' à la question
    }
}

function filterFaq(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchRegex = new RegExp(searchTerm, 'i'); // Expression régulière pour la recherche

    // Vérifier si le champ de recherche est vide
    if (searchTerm.trim() === '') {
        faqItems.forEach(item => {
            item.style.display = 'block'; // Afficher tous les éléments si la recherche est vide
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            // Réinitialiser le highlight
            question.innerHTML = question.textContent; // Réinitialiser le contenu sans highlight
            answer.innerHTML = answer.textContent; // Réinitialiser le contenu sans highlight
        });
        return; // Quitter la fonction
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Réinitialiser le highlight
        question.innerHTML = question.textContent; // Réinitialiser le contenu sans highlight
        answer.innerHTML = answer.textContent; // Réinitialiser le contenu sans highlight

        // Vérifier si le terme de recherche est présent dans la question ou la réponse
        const questionMatch = searchRegex.test(question.textContent);
        const answerMatch = searchRegex.test(answer.textContent);

        if (questionMatch || answerMatch) {
            item.style.display = 'block'; // Afficher l'élément

            // Si le terme de recherche est trouvé dans la question, l'envelopper avec la classe highlight
            if (questionMatch) {
                const highlightedText = question.textContent.replace(searchRegex, match => `<span class="highlight">${match}</span>`);
                question.innerHTML = highlightedText; // Appliquer le highlight à la question
            }

            // Si le terme de recherche est trouvé dans la réponse, l'envelopper avec la classe highlight
            if (answerMatch) {
                const highlightedText = answer.textContent.replace(searchRegex, match => `<span class="highlight">${match}</span>`);
                answer.innerHTML = highlightedText; // Appliquer le highlight à la réponse
            }
        } else {
            item.style.display = 'none'; // Masquer l'élément
        }
    });
}

// Map
const map = L.map('map', {
    scrollWheelZoom: false, // Désactive le zoom avec la molette de la souris
}).setView([47.235194, 6.025694], 18); // Coordonnées de Besançon

// Ajout de la couche de carte en noir et blanc (CartoDB Positron)
L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 8,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Ajout d'un marqueur pour la position de Besançon
const marker = L.marker([47.235194, 6.025694]).addTo(map)
    .openPopup();

// Tracé d'un cercle de rayon 80 km autour de Besançon avec la couleur #b298dc
const circle = L.circle([47.235194, 6.025694], {
    color: '#8d77ab',      // Couleur du contour du cercle
    fillColor: '#b298dc',  // Couleur de remplissage du cercle
    fillOpacity: 0.2,      // Opacité du remplissage du cercle
    radius: 80000          // Rayon en mètres
}).addTo(map);

// Événement pour le zoom avec la molette de la souris tout en maintenant CTRL
map.getContainer().addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        // Empêche le comportement par défaut de la molette
        event.preventDefault();
        // Vérifie si l'utilisateur fait défiler vers le haut ou vers le bas
        const delta = event.deltaY < 0 ? 1 : -1;
        // Effectue un zoom
        if (delta > 0) {
            map.zoomIn(); // Zoom avant
        } else {
            map.zoomOut(); // Zoom arrière
        }
    }
});

// Timeline 

window.addEventListener("DOMContentLoaded", () => {
    // Sélectionner les deux sections
    const timelineDesktop = document.querySelector(".timeline-wrapper");
    const timelineMobile = document.querySelector(".timeline-wrapper-mobile");
  
    // Vérifier la largeur de l'écran pour afficher la section appropriée
    if (window.innerWidth <= 1200) {  // 1200px ou moins, écran de téléphone
      timelineDesktop.style.display = "none"; // Cacher la version desktop
      timelineMobile.style.display = "block"; // Afficher la version mobile
    } else {  // Plus grand qu'un téléphone, écran desktop ou tablette
      timelineDesktop.style.display = "block"; // Afficher la version desktop
      timelineMobile.style.display = "none"; // Cacher la version mobile
    }
  });
  











