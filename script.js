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

    { name: 'Asansol', date: '1993-07-09', coords: [23.6889, 86.9659], note: 'Childhood home and early memories. Grew up here, made my first friends, and learned to ride a bike.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/IMG_asnrlyjn.jpg' },
    { name: 'Mumbai', date: '1994-01-20', coords: [19.0760, 72.8777], note: 'Moved to Mumbai as a toddler. The city of dreams, vada pav, and local trains.', image: 'https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0=' },
    { name: 'Asansol', date: '1994-12-01', coords: [23.6889, 86.9659], note: 'Returned to Asansol. Reunited with old friends and family.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/IMG_asnrlyjn.jpg' },
    { name: 'Asansol', date: '1998-04-01', coords: [23.6889, 86.9659], note: 'Started formal schooling. School days, cricket, and endless homework.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/IMG_asnrlyjn.jpg' },
    { name: 'Gangtok', date: '2001-05-15', coords: [27.3314, 88.6138], note: 'Trip to Gangtok in class 4. First experience of the mountains and snow.', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80' },
    { name: 'Rajasthan', date: '2002-11-10', coords: [26.9124, 75.7873], note: 'Visited Rajasthan in class 5. Forts, deserts, and camel rides.', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/2-mehrangarh-fort-jodhpur-rajasthan-city-hero?qlt=82&ts=1726660925514' },
    { name: 'Andaman', date: '2003-12-20', coords: [11.7401, 92.6586], note: 'Trip to Andaman in class 6. Beaches, corals, and blue waters.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Ooty', date: '2005-06-10', coords: [11.4064, 76.6932], note: 'Visited Ooty in class 8. Tea gardens and toy train rides.', image: 'https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?s=612x612&w=0&k=20&c=yEjt_jKZXxSFTvD97YmFUEXWdhVfuu4-7LAkgheVPBE=' },
    { name: 'Vishakhapatnam', date: '2006-10-15', coords: [17.6868, 83.2185], note: 'Trip to Vizag in class 9. Beaches and submarines.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxjDiXzWqqEfn27_vhiP-Sg5xYuysjRKzaRQ&s' },
    { name: 'Kashmir', date: '2008-05-20', coords: [34.0837, 74.7973], note: 'Visited Kashmir in class 11. Snow, shikaras, and breathtaking views.', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',itineraryUrl: 'https://www.example.com/kashmir-itinerary' },
    { name: 'Puri', date: '2011-08-10', coords: [19.8135, 85.8312], note: 'Trip to Puri in college 2nd year. Jagannath temple and golden beaches.', image: 'https://media.istockphoto.com/id/467031976/photo/jagannath-temple-in-puri-orissa-india.jpg?s=612x612&w=0&k=20&c=dRs6e_Ko8fDH2nqL8kdT8XDhj1pkw4xEGssOwjo3g0A=' },
    { name: 'Bangkok & Singapore', date: '2012-07-15', coords: [13.7563, 100.5018], note: 'College 3rd year international trip. Temples, shopping, and Universal Studios.', image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/542000/542607-singapore.jpg' },
    { name: 'Delhi', date: '2016-11-04', coords: [28.7041, 77.1025], note: 'Moved to Delhi. City of history, food, and new beginnings.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtlAn3XuITd-3TuByHQuRxe3S6xFjLRC84PA&s' },
    { name: 'Mysore', date: '2017-01-10', coords: [12.2958, 76.6394], note: 'Trip to Mysore. Palaces, gardens, and silk.', image: 'https://static.toiimg.com/photo/msid-74605798,width-96,height-65.cms' },
    { name: 'Coorg', date: '2017-02-15', coords: [12.3375, 75.8069], note: 'Visited Coorg after Mysore. Coffee estates and hills.', image: 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fhffy.jpg%2Fhffy-1725431675134.jpg&w=3840&q=75' },
    { name: 'Hogenakkal Falls', date: '2017-03-10', coords: [12.1196, 77.7756], note: 'Day trip to Hogenakkal Falls. Waterfalls and coracle rides.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hogenakkal_Falls_Close.jpg' },
    { name: 'South Goa', date: '2017-04-20', coords: [15.1600, 73.9950], note: 'Vacation in South Goa. Beaches, seafood, and sunsets.', image: 'https://media.istockphoto.com/id/469852152/photo/arambol-beach-goa.jpg?s=612x612&w=0&k=20&c=PK7nClOmOvKi4JxDumL5-YI8lkX53b9vHF75nvExDX4=' },
    { name: 'Sri Lanka', date: '2017-08-10', coords: [7.8731, 80.7718], note: 'Trip to Sri Lanka. Ancient ruins, beaches, and tea country.', image: 'https://media.istockphoto.com/id/1288609237/photo/spectacular-view-of-the-lion-rock-surrounded-by-green-rich-vegetation-picture-taken-from.jpg?s=612x612&w=0&k=20&c=Rkmk3T6SxqzMPyIOcSkeTLrMlb6aHo3gaQpqCrxBeZM=' },
    { name: 'Jaipur', date: '2018-01-15', coords: [26.9124, 75.7873], note: 'Visited Jaipur. Pink city, forts, and shopping.', image: 'https://www.agoda.com/wp-content/uploads/2024/05/Nahargarh-Fort-jaipur-india-1244x700.jpg' },
    { name: 'Chikmagalur', date: '2018-06-10', coords: [13.3152, 75.7751], note: 'Trip with girlfriend. Coffee plantations and hills.', image: 'https://rivermistresorts.com/wp-content/uploads/2022/05/Chikmagalur-the-crown-jewel-of-state-Karnataka-1024x569.jpg' },
    { name: 'Coimbatore', date: '2018-09-05', coords: [11.0168, 76.9558], note: 'Visited Coimbatore. Temples and food.', image: 'https://www.holidify.com/images/bgImages/COIMBATORE.jpg' },
    { name: 'Mumbai', date: '2019-02-20', coords: [19.0760, 72.8777], note: 'Office trip to Mumbai. Colleagues, meetings, and Marine Drive.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
    { name: 'Pune', date: '2019-03-15', coords: [18.5204, 73.8567], note: 'Office trip to Pune. Work and fun.', image: 'https://media.istockphoto.com/id/1265056529/photo/beautiful-evening-sky-during-sunset-in-the-city.jpg?s=612x612&w=0&k=20&c=YpO0J-Gg02RqMea0bROR72JcAdSX72yfLCmv0AbNBa4=' },
    { name: 'Lucknow', date: '2019-11-25', coords: [26.8467, 80.9462], note: 'Attended Lori’s wedding. Nawabi food and celebrations.', image: 'https://media.istockphoto.com/id/671326926/photo/view-to-asfi-masjid-or-asfi-mosque-from-bara-imambara-balcony-lucknow.jpg?s=612x612&w=0&k=20&c=1R-4J0CuYxtToFD3AMFG67G9g697USgafrJUbsqvWeI=' },
    { name: 'Wayanad', date: '2020-01-10', coords: [11.6854, 76.1320], note: 'Trip with parents. Forests, wildlife, and peace.', image: 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fsteptodown.com267190%20(1).jpg%2Fsteptodown.com267190%20(1)-1700472157205.jpg&w=2048&q=75' },
    { name: 'Hyderabad', date: '2020-01-10', coords: [17.2399, 78.2899], note: 'Trip for office trip', image: 'https://t4.ftcdn.net/jpg/03/60/89/09/360_F_360890991_Ykybj5JO5HYBaqWeROz9cR2jWXN8HZxf.jpg' },
    { name: 'Ranchi', date: '2005-12-10', coords: [23.3441, 85.3096], note: 'Trip to Ranchi during class 8. Waterfalls and greenery.', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/patratu-valley-ranchi-jharkhand-1-hero?qlt=82&ts=1726723957845' },
    { name: 'Bangalore', date: '2021-01-01', coords: [12.9716, 77.5946], note: 'My current home! Bangalore is a city of innovation, greenery, and endless cafes. From morning walks in Cubbon Park to the vibrant tech scene, every day here feels like a new adventure.', image: 'https://images.unsplash.com/photo-1697130383976-38f28c444292?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuZ2Fsb3JlJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D' }
];

    const wishlist = [
        { name: 'Spiti Valley', coords: [32.2460, 78.0170], note: 'Stunning Himalayan desert valley.', image: 'https://www.sahyadrirangers.com/system/images/000/330/025/4d6bb89a101b4cacc63556dcaeae81b7/original/Spiti-Bike-Trip.jpg?1662305865' },
        { name: 'Gokarna', coords: [14.5500, 74.3167], note: 'Laid-back beaches and temples.', image: 'https://media.istockphoto.com/id/1299344131/photo/gokarna-beash-at-sunset.jpg?s=612x612&w=0&k=20&c=AyCTo2Gl-vmCr14Ea4ziDzwQI3WOt1a9sXeSeojDadM=' },
        { name: 'Lakshadweep', coords: [10.5667, 72.6417], note: 'Tropical islands with coral reefs.', image: 'https://media.istockphoto.com/id/1224360439/photo/waiting-to-sail.jpg?s=612x612&w=0&k=20&c=XMtw1nX67rhb75bYZ4D_39WNkuHTaddHDjtsxz-2IJY=' },
        { name: 'Kodaikanal', coords: [10.2381, 77.4892], note: 'Hill station with lakes and forests.', image: 'https://media.istockphoto.com/id/1175506409/photo/small-village-amidst-terrace-farms-on-hills-of-kodaikanal-tamil-nadu.jpg?s=612x612&w=0&k=20&c=E_SZ5ejTB3kuHej2RMX6HAWq26V3n0Jyfx4nSxs5rUY=' },
        { name: 'Bhopal', coords: [23.2599, 77.4126], note: 'City of lakes and heritage.', image: 'https://media.istockphoto.com/id/511119796/photo/moti-masjid-pearl-mosque-bhopal-india.jpg?s=612x612&w=0&k=20&c=bnyyhnxOFJLnKVrpVNOjMbeyLuBm6glCOovc-2M_C-o=' },
        { name: 'Machu Picchu', coords: [-13.1631, -72.5450], note: 'Ancient Inca city in the Andes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVlDXrD8YcVoLyxLF2HC248dFE20QT7g4Y8Q&s' },
        { name: 'Santorini, Greece', coords: [36.3932, 25.4615], note: 'Iconic blue-domed churches.', image: 'https://t4.ftcdn.net/jpg/02/41/08/93/360_F_241089302_4eVzhP0L9o2OY6gIPK3msrJEoo5ASdmM.jpg' },
        { name: 'Kyoto, Japan', coords: [35.0116, 135.7681], note: 'Famous for its temples and gardens.', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Great Wall of China', coords: [40.4319, 116.5704], note: 'A must-see wonder of the world.', image: 'https://t3.ftcdn.net/jpg/00/51/06/80/360_F_51068024_Pj9GnPaXcRnrnLDA0eMUGQz5iEGTd3es.jpg' },
        { name: 'Pyramids of Giza', coords: [29.9792, 31.1342], note: 'Ancient Egyptian pyramids.', image: 'https://t3.ftcdn.net/jpg/02/79/09/84/360_F_279098467_wy75eVNsfvhmqULOxzoFvGsjJwtSLyx8.jpg' },
        { name: 'Paris, France', coords: [48.8566, 2.3522], note: 'Eiffel Tower, art, and romance.', image: 'https://media.istockphoto.com/id/1345426734/photo/eiffel-tower-paris-river-seine-sunset-twilight-france.jpg?s=612x612&w=0&k=20&c=I5rAH5d_-Yyag8F0CKzk9vzMr_1rgkAASGTE11YMh9A=' },
        { name: 'Rome, Italy', coords: [41.9028, 12.4964], note: 'Colosseum and ancient history.', image: 'https://media.istockphoto.com/id/539115110/photo/colosseum-in-rome-and-morning-sun-italy.jpg?s=612x612&w=0&k=20&c=9NtFxHI3P2IBWRY9t0NrfPZPR4iusHmVLbXg2Cjv9Fs=' },
        { name: 'London, UK', coords: [51.5074, -0.1278], note: 'Big Ben, Thames, and culture.', image: 'https://media.istockphoto.com/id/1347665170/photo/london-at-sunset.jpg?s=612x612&w=0&k=20&c=MdiIzSNKvP8Ct6fdgdV3J4FVcfsfzQjMb6swe2ybY6I=' },
        { name: 'Cape Town, South Africa', coords: [-33.9249, 18.4241], note: 'Table Mountain and coast.', image: 'https://media.istockphoto.com/id/682284814/photo/aerial-view-of-cape-town.jpg?s=612x612&w=0&k=20&c=vN-j-NbeH6yVb9wtz5FHXJBzrWjV8h3FQVtEtflpHM8=' },
        { name: 'Rio de Janeiro, Brazil', coords: [-22.9068, -43.1729], note: 'Christ the Redeemer and Carnival.', image: 'https://www.planetware.com/wpimages/2020/02/brazil-in-pictures-beautiful-places-to-photograph-botafogo-bay.jpg' },
        { name: 'Istanbul, Turkey', coords: [41.0082, 28.9784], note: 'Mosques and bazaars.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xOQhAFpubscf8x7TqkiKVRNOJabFOvKV8A&s' },
        { name: 'Dubai, UAE', coords: [25.2048, 55.2708], note: 'Skyscrapers and luxury.', image: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVAZGE70' },
        { name: 'Reykjavik, Iceland', coords: [64.1466, -21.9426], note: 'Northern lights and hot springs.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUPV8ReZI8s7teB8ZBRdof8gdBRweBLOGEcA&s' },
        { name: 'Petra, Jordan', coords: [30.3285, 35.4444], note: 'Ancient city carved in rock.', image: 'https://images.unsplash.com/photo-1615811648503-479d06197ff3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cmElMkMlMjBqb3JkYW58ZW58MHx8MHx8fDA%3D' },
        { name: 'Venice, Italy', coords: [45.4408, 12.3155], note: 'Canals and romance.', image: 'https://media.istockphoto.com/id/1388018793/photo/grand-canal-in-venice.jpg?s=612x612&w=0&k=20&c=uDUrctquPNUPzlpNLwTkJIkc1Gig0aUWJknF6FrqxJE=' },
        { name: 'Zurich, Switzerland', coords: [47.3769, 8.5417], note: 'Alps and chocolate.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1PCiOgOw9Rj6g0CMAWwl5hKteMcUPl2Mxg&s' }
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

    // Animated travel quotes
    const travelQuotes = [
        "All my friends are having one or two babies, and I’m like: “What destination am I going to next?”",
        "Travel is the only thing you buy that makes you richer.",
        "To travel is to live.",
        "Jobs fill your pocket, adventures fill your soul.",
        "The world is a book and those who do not travel read only one page.",
        "Not all those who wander are lost.",
        "Take only memories, leave only footprints.",
        "Life is short and the world is wide.",
        "Wander often, wonder always.",
        "Adventure may hurt you, but monotony will kill you."
    ];
    const quoteText = document.getElementById('animated-quote-text');
    let lastIndex = -1;
    function showRandomQuote() {
        let idx;
        do {
        idx = Math.floor(Math.random() * travelQuotes.length);
        } while (idx === lastIndex && travelQuotes.length > 1);
        lastIndex = idx;
        quoteText.textContent = travelQuotes[idx];
    }
    // Show a random quote on every load
    showRandomQuote();


    // Helper to round coordinates for robust matching
    function roundCoords(coords, decimals = 4) {
        return coords.map(num => Number(num.toFixed(decimals)));
    }

    memories.forEach(place => {
        const marker = L.marker(roundCoords(place.coords));
        let popupContent = `<b>${place.name}</b><br>${place.note}`;
        if (place.itineraryUrl) {
            popupContent += `<br><a href="${place.itineraryUrl}" target="_blank" style="color: #4a90e2; text-decoration: none;">View Itinerary</a>`;
        }
        marker.bindPopup(popupContent);
        markers.addLayer(marker);
        const card = createCard(place);
        memoriesContainer.appendChild(card);
    });

    // Music toggle
    const music = document.getElementById('travel-music');
    const btn = document.getElementById('music-toggle');
    let playing = false;

    // Wait for metadata to load so we know the duration
    music.addEventListener('loadedmetadata', function() {
        // Set to a random position between 0 and duration
        music.currentTime = Math.random() * music.duration;
    });

    btn.addEventListener('click', function() {
        if (!playing) {
            // Fade in music
            music.volume = 0;
            music.play();
            btn.classList.add('active');
            playing = true;
            // Fade to full volume over 5 seconds
            let fadeStep = 0.01;
            let fadeInterval = setInterval(() => {
                if (music.volume < 0.99) {
                    music.volume = Math.min(music.volume + fadeStep, 1);
                } else {
                    music.volume = 1;
                    clearInterval(fadeInterval);
                }
            }, 50); // 0.01 * 50ms * 100 = 5s
        } else {
            music.pause();
            btn.classList.remove('active');
            playing = false;
        }
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
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <div class="card-content">
                <h3>${place.name}</h3>
                <p class="note-text">${place.note}</p>
                ${place.itineraryUrl ? `<a href="${place.itineraryUrl}" target="_blank" class="itinerary-btn">View Itinerary</a>` : ''}
            </div>`;

        // Add Show more button if note is long
        setTimeout(() => {
            const content = card.querySelector('.card-content');
            const note = content.querySelector('.note-text');
            if (note.scrollHeight > 90) {
                const btn = document.createElement('button');
                btn.className = 'show-more-btn';
                btn.textContent = 'Show more';
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const expanded = content.classList.toggle('expanded');
                    btn.textContent = expanded ? 'Show less' : 'Show more';
                };
                content.appendChild(btn);
            }
        }, 0);

        card.addEventListener('click', (e) => {
            // Only open modal if not clicking itinerary or show-more button
            if (!e.target.classList.contains('itinerary-btn') && !e.target.classList.contains('show-more-btn')) {
                openMemoryModal(place);
            }
        });
        return card;
    }

    // Modal logic for memory cards
    function openMemoryModal(place) {
        const modal = document.getElementById('memory-modal');
        document.getElementById('memory-modal-img').src = place.image;
        document.getElementById('memory-modal-title').textContent = place.name;
        document.getElementById('memory-modal-note').textContent = place.note;
        const itinerary = document.getElementById('memory-modal-itinerary');
        if (place.itineraryUrl) {
            itinerary.href = place.itineraryUrl;
            itinerary.style.display = '';
        } else {
            itinerary.style.display = 'none';
        }
        modal.style.display = 'block';
    }

    // Attach modal close listeners after DOM is ready and modal is present
    window.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('memory-modal');
        const closeBtn = document.querySelector('.close-memory-modal');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
        }
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Modal logic for memory cards
    function openMemoryModal(place) {
        const modal = document.getElementById('memory-modal');
        document.getElementById('memory-modal-img').src = place.image;
        document.getElementById('memory-modal-title').textContent = place.name;
        document.getElementById('memory-modal-note').textContent = place.note;
        const itinerary = document.getElementById('memory-modal-itinerary');
        if (place.itineraryUrl) {
            itinerary.href = place.itineraryUrl;
            itinerary.style.display = '';
        } else {
            itinerary.style.display = 'none';
        }
        modal.style.display = 'block';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('memory-modal');
        const closeBtn = document.querySelector('.close-memory-modal');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

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
        // Determine the class for the card based on category
        let typeClass = '';
        if (person.category === 'girlfriend') typeClass = 'girlfriend';
        else if (person.category === 'friend') typeClass = 'friend';
        else if (person.category === 'parents' || person.category === 'family') typeClass = 'family';
        else if (person.category === 'relation') typeClass = 'relation';

        const card = document.createElement('div');
        card.className = `card people-card${typeClass ? ' ' + typeClass : ''}`;

        const categoryEmojis = {
            parents: '👨‍👩‍👧‍👦',
            girlfriend: '💕',
            friend: '🤗',
            relation: '👥',
            family: '👨‍👩‍👧‍👦'
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

    // Global state for animation
    let isAnimating = false;
    let animationTimeoutId = null;

    // Tab Switching Logic
    const mapTab = document.getElementById('map-tab');
    const timelineTab = document.getElementById('timeline-tab');
    const mapView = document.getElementById('map-view-container');
    const timelineView = document.getElementById('timeline-view-container');
    const mapDiv = document.getElementById('map');
    const timelineContent = document.getElementById('timeline-content');

    mapTab.addEventListener('click', () => {
        if (isAnimating) playAnimationBtn.click(); // Stop animation if running
        mapView.style.display = 'block';
        timelineView.style.display = 'none';
        mapTab.classList.add('active');
        timelineTab.classList.remove('active');
        mapView.prepend(mapDiv); // Move map back to its original container
        map.invalidateSize();
    });

    timelineTab.addEventListener('click', () => {
        timelineView.style.display = 'flex';
        mapView.style.display = 'none';
        timelineTab.classList.add('active');
        mapTab.classList.remove('active');
        timelineContent.prepend(mapDiv); // Move map to the timeline view
        map.invalidateSize();
    });

    // Populate Timeline
    function populateTimeline() {
        const timelineList = document.getElementById('timeline-list');
        const sortedMemories = [...memories].filter(m => m.date).sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedMemories.forEach((memory, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.dataset.index = index; // Add index for easy lookup
            item.innerHTML = `
                <span class="date">${new Date(memory.date).toDateString()}</span>
                <h3>${memory.name}</h3>
                <p>${memory.note}</p>
            `;
            timelineList.appendChild(item);
        });
    }
    populateTimeline();

    // Timeline Animation Logic
    const playAnimationBtn = document.getElementById('play-timeline-animation');
    const timelineItems = document.querySelectorAll('.timeline-item');

    playAnimationBtn.addEventListener('click', () => {
        if (isAnimating) {
            // --- Stop the animation ---
            isAnimating = false;
            clearTimeout(animationTimeoutId);
            playAnimationBtn.textContent = '▶️ Replay';
            playAnimationBtn.classList.remove('stop');
            timelineItems.forEach(item => item.classList.remove('highlighted'));
            map.stop(); // Stop any current map flight
            map.setView([20, 0], 2);
            return;
        }

        // --- Start the animation ---
        isAnimating = true;
        playAnimationBtn.textContent = '⏹️ Stop';
        playAnimationBtn.classList.add('stop');
        const sortedMemories = [...memories].filter(m => m.date).sort((a, b) => new Date(a.date) - new Date(b.date));
        let i = 0;

        function animateNext() {
            if (i >= sortedMemories.length || !isAnimating) {
                playAnimationBtn.click(); // End animation
                return;
            }

            // Highlight current item
            timelineItems.forEach(item => item.classList.remove('highlighted'));
            const currentItem = document.querySelector(`.timeline-item[data-index='${i}']`);
            if (currentItem) {
                currentItem.classList.add('highlighted');
                currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            const memory = sortedMemories[i];
            map.flyTo(memory.coords, 10, { duration: 2 });


            // Helper for tolerant coordinate comparison (with rounding)
            function coordsMatch(a, b, tolerance = 1e-3) {
                a = roundCoords(a);
                b = roundCoords(b);
                return Math.abs(a[0] - b[0]) < tolerance && Math.abs(a[1] - b[1]) < tolerance;
            }

            setTimeout(() => {
                if (!isAnimating) return;
                const targetMarker = markers.getLayers().find(m => {
                    const latlng = m.getLatLng();
                    return coordsMatch([latlng.lat, latlng.lng], memory.coords);
                });
                if (targetMarker) targetMarker.openPopup();
            }, 2000);

            i++;
            animationTimeoutId = setTimeout(animateNext, 10000);
        }
        animateNext();
    });

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

// Run on DOMContentLoaded, resize, scroll, and load (for images/fonts)
window.addEventListener('DOMContentLoaded', positionDecorHrAndGroundBg);
window.addEventListener('resize', positionDecorHrAndGroundBg);
window.addEventListener('scroll', positionDecorHrAndGroundBg);
window.addEventListener('load', function() {
    positionDecorHrAndGroundBg();
    // Extra: run again after a short delay to catch late layout shifts
    setTimeout(positionDecorHrAndGroundBg, 300);
});

// Dynamically set the top of #walk-anim-container and #ground-bg to match the <hr>

function positionDecorHrAndGroundBg() {
  var hr = document.getElementById('decor-hr');
  var walkAnim = document.getElementById('walk-anim-container');
  var groundBg = document.getElementById('ground-bg');
  // Responsive walking animation speed
  if (walkAnim) {
    if (window.innerWidth <= 600) {
      walkAnim.style.animationDuration = '10s'; // fast on small screens
    } else if (window.innerWidth <= 900) {
      walkAnim.style.animationDuration = '18s'; // medium on tablets
    } else {
      walkAnim.style.animationDuration = '28s'; // slow on desktop
    }
  }
  if (hr && walkAnim) {
    var rect = hr.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Move the walker up so it appears above the grass
    walkAnim.style.top = (rect.top + scrollTop - 65) + 'px';
  }
  if (hr && groundBg) {
    var rect = hr.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect.bottom + scrollTop;
    groundBg.style.top = top + 'px';

    // Find the bottom of the main content (map-view-container and timeline-view-container)
    var mapView = document.getElementById('map-view-container');
    var timelineView = document.getElementById('timeline-view-container');
    var mapBottom = 0, timelineBottom = 0;
    if (mapView && mapView.offsetParent !== null) {
      var mapRect = mapView.getBoundingClientRect();
      mapBottom = mapRect.bottom + scrollTop;
    }
    if (timelineView && timelineView.offsetParent !== null) {
      var timelineRect = timelineView.getBoundingClientRect();
      timelineBottom = timelineRect.bottom + scrollTop;
    }
    var contentBottom = Math.max(mapBottom, timelineBottom);
    // Fallback to document height if contentBottom is not found
    if (!contentBottom || contentBottom < top) {
      contentBottom = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
    }
    groundBg.style.height = (contentBottom - top) + 'px';
  }
  if (walkAnim) {
    walkAnim.style.animationPlayState = 'running';
  }
}

window.addEventListener('DOMContentLoaded', positionDecorHrAndGroundBg);
window.addEventListener('resize', positionDecorHrAndGroundBg);
window.addEventListener('scroll', positionDecorHrAndGroundBg);

// Fix walk-anim alignment on animation iteration
document.addEventListener('DOMContentLoaded', function() {
  var walkAnim = document.getElementById('walk-anim-container');
  if (walkAnim) {
    walkAnim.addEventListener('animationiteration', positionDecorHrAndGroundBg);
  }
});
