document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. GESTION DU SYSTÈME DE NAVIGATION (ONGLETS)
    // ==========================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    // Dictionnaire reliant l'ID du bouton à l'ID de la page correspondante
    const pageMapping = {
        'btn-accueil': 'accueil',
        'btn-economie': 'economie',
        'btn-assemblee': 'assemblee',
        'btn-etats': 'etats'
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPageId = pageMapping[button.id];
            
            if (targetPageId) {
                // Retirer la classe active de tous les boutons et toutes les pages
                navButtons.forEach(btn => btn.classList.remove('active'));
                pages.forEach(page => page.classList.remove('active'));

                // Activer le bouton et la page cibles
                button.classList.add('active');
                const targetPage = document.getElementById(targetPageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                }
            }
        });
    });

    // ==========================================
    // 2. INJECTION DYNAMIQUE DE LA PUBLICITÉ (BlabPRO)
    // ==========================================
    const dynamicAd = document.getElementById('dynamic-ad');
    if (dynamicAd) {
        // Extraction des attributs "data-" présents dans le HTML
        const adTitle = dynamicAd.getAttribute('data-title') || 'Sponsorisé';
        const adDesc = dynamicAd.getAttribute('data-desc') || '';
        const adColor = dynamicAd.getAttribute('data-color') || '#38bdf8';
        const adPromo = dynamicAd.getAttribute('data-promo') || '';

        // Construction du contenu HTML interne de la bannière
        let adContent = `
            <span class="ad-tag">Sponsorisé</span>
            <div class="ad-title" style="color: ${adColor};">${adTitle}</div>
            <div class="ad-description">${adDesc}</div>
        `;

        if (adPromo) {
            adContent += `<span class="ad-promo-badge">${adPromo}</span>`;
        }

        // On injecte le contenu
        dynamicAd.innerHTML = adContent;
        
        // On applique la couleur directement sur la bordure sans passer par la fonction RGB
        dynamicAd.style.borderColor = adColor;
    }

    // ==========================================
    // 3. GESTION DU CARROUSEL FI-DUCIAIRE (CraftCash)
    // ==========================================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indexDisplay = document.getElementById('carouselIndex');
    
    if (track && prevBtn && nextBtn && indexDisplay) {
        const cards = Array.from(track.children);
        const totalCards = cards.length; // Détecte automatiquement les 10 billets
        let currentIndex = 0;

        function updateCarousel() {
            // Déplacement du conteneur (track) en fonction de l'index de la carte (largeur + gap de 20px)
            // Utilisation de calc() combiné avec flex-gap pour gérer l'espacement proprement
            track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 20}px))`;
            
            // Mise à jour de l'indicateur textuel (Billet X sur 10)
            indexDisplay.textContent = `Billet ${currentIndex + 1} sur ${totalCards}`;
        }

        // Événement clic sur le bouton Suivant
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Retour au premier billet (boucle en continu)
            }
            updateCarousel();
        });

        // Événement clic sur le bouton Précédent
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalCards - 1; // Aller au dernier billet (boucle inversée)
            }
            updateCarousel();
        });

        // Initialisation de l'affichage au démarrage
        updateCarousel();
    }

    // Fonction utilitaire pour convertir le HEX en RVB (nécessaire pour l'opacité CSS)
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '56, 189, 248';
    }
});
