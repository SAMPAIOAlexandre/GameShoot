window.onload = function() {
    const container = document.querySelector('.container');
    const btn = document.querySelector('.start_btn');
    const scoreContainer = document.querySelector('.score');
    const timeContainer = document.querySelector('.time');

    // Fonction pour lancer le jeu
    btn.onclick = function () {
        let score = 0;
        let time = 20;
        container.innerHTML = "";

        // Récupérer la largeur et la hauteur du conteneur
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Lancement de l'interval pour la première image (qui augmente les points)
        let intervalPositive = setInterval(function showPositiveTarget() {
            let target = document.createElement('img');
            target.id = "target";
            target.src = "/img/js.png";  // Image pour ajouter des points
            target.style.position = 'absolute';
            container.appendChild(target);

            // Quand l'image est chargée, positionner la cible à l'intérieur du conteneur
            target.onload = function () {
                const targetWidth = target.offsetWidth;
                const targetHeight = target.offsetHeight;

                // Calculer une position aléatoire en tenant compte de la taille du conteneur
                let top = Math.random() * (containerHeight - targetHeight) + 'px';
                let left = Math.random() * (containerWidth - targetWidth) + 'px';

                // Appliquer la position
                target.style.top = top;
                target.style.left = left;
            };

            // Temps où la cible reste à l'écran
            setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score += 1; // Augmenter le score
                target.remove();
            };

            time -= 1;

            scoreContainer.innerHTML = `Score : ${score}`;
            timeContainer.innerHTML = `Temps : ${time}`;

            // Vérifie si le temps est écoulé
            if (time == 0) {
                clearInterval(intervalPositive);
                clearInterval(intervalNegative);  // Arrêter aussi l'interval pour la cible négative
                container.innerHTML = "Le jeu est fini";
            }
        }, 1000);

        // Lancement de l'interval pour la deuxième image (qui réduit les points)
        let intervalNegative = setInterval(function showNegativeTarget() {
            let negativeTarget = document.createElement('img');
            negativeTarget.id = "negativeTarget";
            negativeTarget.src = "/img/php.png";  // Image pour réduire des points
            negativeTarget.style.position = 'absolute';
            container.appendChild(negativeTarget);

            // Quand l'image est chargée, positionner la cible à l'intérieur du conteneur
            negativeTarget.onload = function () {
                const targetWidth = negativeTarget.offsetWidth;
                const targetHeight = negativeTarget.offsetHeight;

                // Calculer une position aléatoire en tenant compte de la taille du conteneur
                let top = Math.random() * (containerHeight - targetHeight) + 'px';
                let left = Math.random() * (containerWidth - targetWidth) + 'px';

                // Appliquer la position
                negativeTarget.style.top = top;
                negativeTarget.style.left = left;
            };

            // Temps où la cible reste à l'écran
            setTimeout(function () {
                negativeTarget.remove();
            }, 2000);

            negativeTarget.onclick = function () {
                score -= 1; // Réduire le score
                negativeTarget.remove();
            };
        }, 2000);  // La cible négative apparaît toutes les 2 secondes
    };
};