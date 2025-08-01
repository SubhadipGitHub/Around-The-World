# Around The Globe - A Travel Memory Book

This is a dynamic and visually appealing single-page web application designed to be a personal travel memory book. It allows users to document their travel memories, create a wishlist of future destinations, and keep track of where friends and family are located around the world, all on an interactive map.

## Live Demo

A live version of this project can be hosted on any static web hosting service like GitHub Pages.

## Features

- **Interactive World Map**: Built with Leaflet.js, the map is the centerpiece of the application, showing all locations in one view.
- **Custom Markers**: Different types of locations are represented by unique markers:
    - **Memories**: Standard blue map pins.
    - **Wishlist**: Gold star markers.
    - **Friends & Relations**: Custom, color-coded icons for different categories (e.g., family, friends).
- **Marker Clustering**: To handle densely populated areas (like cities with multiple friends), markers automatically cluster together and expand on click.
- **Dynamic Day/Night Theme**: The entire website theme changes based on the user's local time. It features a bright, sunny sky during the day and a dark, starry sky at night.
- **Animated Particle Effects**: A subtle, continuous particle animation adds a touch of magic to the background, adapting to the day or night theme.
- **Collapsible Sections**: The UI is organized into clean, collapsible sections for memories, wishlist, and friends, which can be expanded or collapsed with a smooth animation.
- **Real-Time Search**: Each section includes a search bar to instantly filter the cards by name, making it easy to find specific items.
- **Animated Preloader**: A modern, pulsating map marker animation serves as a preloader while the site's assets are loading.
- **Help Section**: A floating help button opens a pop-up modal explaining all the site's features to the user.
- **Responsive Design**: The layout is designed to be functional and visually appealing on various screen sizes.

## Technologies Used

- **HTML5**
- **CSS3**: For styling, animations (keyframes), and responsive design.
- **JavaScript (ES6)**: For all the core logic, interactivity, and data handling.
- **[Leaflet.js](https://leafletjs.com/)**: An open-source JavaScript library for mobile-friendly interactive maps.
- **[GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)**: A powerful JavaScript library for creating high-performance animations.
- **[Font Awesome](https://fontawesome.com/)**: Used for custom icons on the map and in the UI.
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)**: A Leaflet plugin for clustering markers.

## How to Use

This is a front-end only project and requires no special build process.

1.  Clone or download the repository.
2.  Open the `index.html` file in your favorite web browser.

## Customization

All the data for the map and cards is stored in the `script.js` file. To customize the content, simply edit the following JavaScript arrays:

-   `memories`: An array of objects for your past travels. Each object needs `name`, `coords`, `note`, and an `image` URL.
-   `wishlist`: An array of objects for your future travel goals. The structure is the same as the `memories` array.
-   `people`: An array of objects for your friends and relations. Each object needs `name`, `category` ('parents', 'girlfriend', 'friend', 'relation'), `coords`, and a `note`.

Example of adding a new memory:
```javascript
const memories = [
    // ... existing memories
    { 
        name: 'Paris', 
        coords: [48.8566, 2.3522], 
        note: 'Visited the Eiffel Tower.', 
        image: 'url_to_your_image.jpg' 
    }
];
```
