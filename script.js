document.addEventListener('DOMContentLoaded', () => {
    // Day/Night Theme Logic
    const currentHour = new Date().getHours();
    const body = document.body;
    if (currentHour >= 6 && currentHour < 18) {
        body.classList.add('day-theme');
    } else {
        body.classList.add('night-theme');
    }

    // Particle Generation
    const particlesContainer = document.getElementById('particles-container');
    const numberOfParticles = 30; // Adjust number of particles

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 1; // Size between 1px and 6px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`; // Random horizontal position
        
        const animationDuration = Math.random() * 15 + 10; // Duration between 10s and 25s
        particle.style.animationDuration = `${animationDuration}s`;
        
        const animationDelay = Math.random() * 10; // Delay up to 10s
        particle.style.animationDelay = `-${animationDelay}s`;

        particlesContainer.appendChild(particle);
    }

    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        gsap.to(preloader, {
            duration: 0.5,
            opacity: 0,
            delay: 1.5, // Add a delay (in seconds) before the preloader fades out            
            onComplete: () => {
                preloader.style.display = 'none';
                // Start animations for the main content
                gsap.from("header h1", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
                gsap.from("header p", { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "back" });
                gsap.from("#map", { duration: 1.5, scale: 0.7, opacity: 0, delay: 1, ease: "elastic" });
            }
        });
    });

    const map = L.map('map', {
        minZoom: 2,
        maxBounds: [
            [-90, -180],
            [90, 180]
        ]
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const memories = [
        { name: 'Kolkata', coords: [22.5726, 88.3639], note: 'My grand parents place.', 
            image: 'https://www.shutterstock.com/image-photo/howrah-bridge-wooden-boats-on-260nw-2486557591.jpg' },
        { name: 'Asansol', coords: [23.6889, 86.9659], note: 'Schooling.', 
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/IMG_asnrlyjn.jpg/1200px-IMG_asnrlyjn.jpg' },
        { name: 'Bhubaneswar', coords: [20.2961, 85.8245], note: 'College.', 
            image: 'https://media.istockphoto.com/id/178757243/photo/ancient-indian-temple.jpg?s=612x612&w=0&k=20&c=J8JODhj86IndwpeizmfmMQSWQwRHYZ98wrWUIodxbIE=' },
        { name: 'Burdwan', coords: [23.2326, 87.8616], note: 'Grandparent.', 
            image: 'https://www.sinclairshotels.com/assets/images/burdwan/sightseeing/curzon.jpg' },
        { name: 'Ghaziabad', coords: [28.6692, 77.4538], note: 'Lived there for some time.', 
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Indirapuram.jpg' },
        { name: 'Bangalore', coords: [12.9716, 77.5946], note: 'Currently staying here.', 
            image: 'https://images.unsplash.com/photo-1697130383976-38f28c444292?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuZ2Fsb3JlJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D' }
    ];

    const wishlist = [
        { name: 'Machu Picchu', coords: [-13.1631, -72.5450], note: 'Ancient Inca city in the Andes.', 
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVlDXrD8YcVoLyxLF2HC248dFE20QT7g4Y8Q&s' },
        { name: 'Santorini, Greece', coords: [36.3932, 25.4615], note: 'Iconic blue-domed churches.', 
            image: 'https://t4.ftcdn.net/jpg/02/41/08/93/360_F_241089302_4eVzhP0L9o2OY6gIPK3msrJEoo5ASdmM.jpg' },
        { name: 'Kyoto, Japan', coords: [35.0116, 135.7681], note: 'Famous for its temples and gardens.', 
            image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Great Wall of China', coords: [40.4319, 116.5704], note: 'A must-see wonder of the world.', 
            image: 'https://t3.ftcdn.net/jpg/00/51/06/80/360_F_51068024_Pj9GnPaXcRnrnLDA0eMUGQz5iEGTd3es.jpg' },
        { name: 'Pyramids of Giza', coords: [29.9792, 31.1342], note: 'Ancient Egyptian pyramids.', 
            image: 'https://t3.ftcdn.net/jpg/02/79/09/84/360_F_279098467_wy75eVNsfvhmqULOxzoFvGsjJwtSLyx8.jpg' }
    ];

    const people = [
        { name: 'Mom & Dad', category: 'parents', coords: [22.5726, 88.3639], note: 'Live in Kolkata.' },
        { name: 'Sneha', category: 'girlfriend', coords: [12.9716, 77.5946], note: 'Lives in Bangalore.' },
        { name: 'Matisa', category: 'friend', coords: [51.5074, -0.1278], note: 'Lives in London.' },
        { name: 'Anupam', category: 'friend', coords: [28.5355, 77.3910], note: 'Lives in Noida.' },
        { name: 'Mukul', category: 'friend', coords: [28.7041, 77.1025], note: 'Lives in Delhi.' },
        { name: 'Rakesh', category: 'friend', coords: [28.5355, 77.3910], note: 'Lives in Noida.' },
        { name: 'Abhishek', category: 'friend', coords: [28.6692, 77.4538], note: 'Lives in Ghaziabad.' },        
        { name: 'Abhishek', category: 'relation', coords: [12.9716, 77.5946], note: 'Lives in Bangalore.' },
        { name: 'Avijit', category: 'relation', coords: [12.9716, 77.5946], note: 'Lives in Bangalore.' },
        { name: 'Paninee', category: 'friend', coords: [12.9716, 77.5946], note: 'Lives in Bangalore.' },
        { name: 'Arnab', category: 'friend', coords: [28.5355, 77.3910], note: 'Lives in Noida.' },
        { name: 'Priyanka', category: 'friend', coords: [22.5726, 88.3639], note: 'Lives in Kolkata.' },
        { name: 'Riya', category: 'friend', coords: [22.5726, 88.3639], note: 'Lives in Kolkata.' },        
        { name: 'Prashasti', category: 'friend', coords: [28.7041, 77.1025], note: 'Lives in Delhi.' },
        { name: 'Kuntal', category: 'friend', coords: [36.7783, -119.4179], note: 'Lives in California.' },
        { name: 'Lori', category: 'friend', coords: [40.7128, -74.0060], note: 'Lives in New York.' },
        { name: 'Gitika', category: 'friend', coords: [26.8467, 80.9462], note: 'Lives in Lucknow.' },
        { name: 'Shelli', category: 'friend', coords: [23.2599, 77.4126], note: 'Lives in Bhopal.' }
    ];

    const memoriesContainer = document.getElementById('memories-container');
    const wishlistContainer = document.getElementById('wishlist-container');
    const peopleContainer = document.getElementById('people-container');

    const markers = L.markerClusterGroup();

    memories.forEach(place => {
        const marker = L.marker(place.coords);
        marker.bindPopup(`<b>${place.name}</b><br>${place.note}`);
        markers.addLayer(marker);
        const card = createCard(place);
        memoriesContainer.appendChild(card);
    });

    wishlist.forEach(place => {
        const marker = L.marker(place.coords, { icon: createWishlistIcon() });
        marker.bindPopup(`<b>${place.name}</b><br>${place.note}`);
        markers.addLayer(marker);
        const card = createCard(place);
        wishlistContainer.appendChild(card);
    });

    people.forEach(person => {
        const marker = L.marker(person.coords, { icon: createPersonIcon(person.category) });
        marker.bindPopup(`<b>${person.name}</b><br><i>${person.category}</i><br>${person.note}`);
        markers.addLayer(marker);
        const card = createPersonCard(person);
        peopleContainer.appendChild(card);
    });

    map.addLayer(markers);

    document.querySelectorAll('.section-title').forEach(title => {
        const section = title.parentElement;
        const cardContainer = section.querySelector('.card-container');
        const searchContainer = section.querySelector('.search-container');
        const icon = title.querySelector('i');

        // Start all sections collapsed by default
        cardContainer.classList.add('collapsed');
        searchContainer.classList.add('collapsed');
        icon.style.transform = 'rotate(-90deg)';

        title.addEventListener('click', () => {
            const isCollapsed = cardContainer.classList.contains('collapsed');

            if (isCollapsed) {
                // Expand the section
                cardContainer.classList.remove('collapsed');
                searchContainer.classList.remove('collapsed');
                icon.style.transform = 'rotate(0deg)';
                // Animate cards into view
                gsap.from(cardContainer.children, {
                    duration: 0.5,
                    opacity: 0,
                    scale: 0.9,
                    stagger: 0.05,
                    delay: 0.2
                });
            } else {
                // Collapse the section
                cardContainer.classList.add('collapsed');
                searchContainer.classList.add('collapsed');
                icon.style.transform = 'rotate(-90deg)';
            }
        });
    });

    function createCard(place) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${place.image}" alt="${place.name}"><h3>${place.name}</h3><p>${place.note}</p>`;
        card.addEventListener('click', () => {
            map.setView(place.coords, 10);
        });
        return card;
    }

    function createPersonCard(person) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${person.name}</h3><p><i>${person.category}</i></p><p>${person.note}</p>`;
        card.addEventListener('click', () => {
            map.setView(person.coords, 10);
        });
        return card;
    }

    function createPersonCard(person) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const categoryEmojis = {
            parents: '👨‍👩‍👧‍👦',
            girlfriend: '💕',
            friend: '🤗',
            relation: '👥'
        };
        const emoji = categoryEmojis[person.category] || '👤';

        card.innerHTML = `<h3>${emoji} ${person.name}</h3><p><i>${person.category}</i></p><p>${person.note}</p>`;
        card.addEventListener('click', () => {
            map.setView(person.coords, 10);
        });
        return card;
    }


    function createWishlistIcon() {
        return L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    function createPersonIcon(category) {
        const iconInfo = {
            parents: { icon: 'fa-home', color: 'tomato' },
            friend: { icon: 'fa-user-friends', color: 'dodgerblue' },
            relation: { icon: 'fa-users', color: 'darkorchid' },
            girlfriend: { icon: 'fa-heart', color: 'deeppink' }
        };

        const info = iconInfo[category] || { icon: 'fa-user', color: 'gray' };

        return L.divIcon({
            html: `<i class="fas ${info.icon}" style="color: ${info.color};"></i>`,
            className: 'person-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });
    }
    
    // Search Functionality
    function setupSearch(inputId, containerId) {
        const searchInput = document.getElementById(inputId);
        const cardContainer = document.getElementById(containerId);
        const cards = cardContainer.getElementsByClassName('card');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            Array.from(cards).forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    setupSearch('memories-search', 'memories-container');
    setupSearch('wishlist-search', 'wishlist-container');
    setupSearch('people-search', 'people-container');

    // Help Modal Logic
    const helpModal = document.getElementById('help-modal');
    const helpBtn = document.getElementById('help-button');
    const closeBtn = document.querySelector('.close-button');

    helpBtn.onclick = function() {
        helpModal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        helpModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == helpModal) {
            helpModal.style.display = 'none';
        }
    }
});
