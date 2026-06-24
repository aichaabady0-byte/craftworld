// Utilisation d'une IIFE (Expression de fonction immédiatement invoquée) pour encapsuler le code 
// et éviter que des utilisateurs malveillants puissent accéder ou modifier les variables via la console (Anti-Leak/Anti-XSS)
(function () {
    'use strict';

    // ---- 1. GESTION DU SYSTÈME PUBLICITAIRE SÉCURISÉ ----
    const adContainer = document.getElementById('dynamic-ad');
    
    if (adContainer) {
        // Extraction sécurisée des données depuis les data-attributes du HTML
        // textContent est utilisé à la place de innerHTML pour empêcher l'exécution de scripts malveillants injectés (XSS)
        const titleText = adContainer.getAttribute('data-title') || 'Annonce Spéciale';
        const descText = adContainer.getAttribute('data-desc') || '';
        const accentColor = adContainer.getAttribute('data-color') || '#38bdf8';
        const promoText = adContainer.getAttribute('data-promo') || '';

        // Application dynamique de la couleur d'accent publicitaire sur la bordure et la lueur de survol
        adContainer.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.15)`;
        
        adContainer.addEventListener('mouseenter', () => {
            adContainer.style.boxShadow = `0 0 25px rgba(${hexToRgb(accentColor)}, 0.15)`;
            adContainer.style.borderColor = accentColor;
        });
        adContainer.addEventListener('mouseleave', () => {
            adContainer.style.boxShadow = 'none';
            adContainer.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.15)`;
        });

        // Construction sécurisée des éléments à l'intérieur de la bannière
        const titleEl = document.createElement('h3');
        titleEl.className = 'ad-title';
        titleEl.style.color = accentColor;
        titleEl.textContent = titleText;

        const descEl = document.createElement('p');
        descEl.className = 'ad-description';
        descEl.textContent = descText;

        adContainer.appendChild(titleEl);
        adContainer.appendChild(descEl);

        // Ajout conditionnel du badge de promotion s'il existe
        if (promoText) {
            const promoEl = document.createElement('span');
            promoEl.className = 'ad-promo-badge';
            promoEl.textContent = promoText;
            adContainer.appendChild(promoEl);
        }
    }

    // Fonction utilitaire pour convertir le HEX en RVB (nécessaire pour gérer l'opacité CSS dynamiquement)
    function hexToRgb(hex) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255].join(',');
        }
        return '56, 189, 248'; // Valeur par défaut si invalide
    }


    // ---- 2. NAVIGATION DES ONGLETS DE LA PAGE ----
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetPageId = button.id.replace('btn-', '');
            
            pages.forEach(p => p.classList.remove('active'));
            navButtons.forEach(b => b.classList.remove('active'));

            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.add('active');
                button.classList.add('active');
            }
        });
    });


    // ---- 3. LOGIQUE DU CARROUSEL ÉCONOMIQUE ----
    let currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.banknote-card');
    const indicator = document.getElementById('carouselIndex');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (track && cards.length > 0 && indicator) {
        // Initialisation de l'indicateur de page
        updateCarouselIndicator();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveCarousel(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveCarousel(1);
            });
        }
    }

    function moveCarousel(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= cards.length) currentIndex = cards.length - 1;

        track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 20}px))`;
        updateCarouselIndicator();
    }

    function updateCarouselIndicator() {
        indicator.innerText = `Billet ${currentIndex + 1} sur ${cards.length}`;
    }

})();
