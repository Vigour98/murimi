document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map centered on Zimbabwe
    const map = L.map('map').setView([-19.015438, 29.154857], 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Province data with coordinates, crops, and livestock
    const provinces = {
        'Mashonaland East': {
            coords: [-18.5872, 31.2626],
            crops: ['Maize', 'Tobacco', 'Cotton', 'Soyabeans', 'Groundnuts', 'Wheat', 'Vegetables'],
            livestock: ['Dairy Cattle', 'Beef Cattle', 'Chickens', 'Pigs', 'Goats'],
            description: 'A prime farming region with rich soils and good rainfall. Known for both commercial and smallholder farming.'
        },
        'Mashonaland West': {
            coords: [-17.4851, 29.7889],
            crops: ['Tobacco', 'Maize', 'Cotton', 'Wheat', 'Soyabeans'],
            livestock: ['Beef Cattle', 'Dairy Cattle', 'Pigs', 'Sheep'],
            description: 'Major tobacco growing region with extensive commercial farming operations.'
        },
        'Mashonaland Central': {
            coords: [-16.7644, 31.0794],
            crops: ['Tobacco', 'Maize', 'Cotton', 'Sunflower', 'Soyabeans'],
            livestock: ['Beef Cattle', 'Goats', 'Chickens', 'Pigs'],
            description: 'Prime agricultural region with diverse crop production and livestock farming.'
        },
        'Manicaland': {
            coords: [-18.9216, 32.1746],
            crops: ['Tea', 'Coffee', 'Fruits', 'Vegetables', 'Macadamia Nuts', 'Bananas'],
            livestock: ['Dairy Cattle', 'Goats', 'Sheep', 'Chickens'],
            description: 'Known for its tea estates and fruit production in the Eastern Highlands. Ideal climate for specialty crops.'
        },
        'Midlands': {
            coords: [-19.0551, 29.6416],
            crops: ['Maize', 'Cotton', 'Small Grains', 'Groundnuts'],
            livestock: ['Beef Cattle', 'Goats', 'Sheep', 'Indigenous Chickens'],
            description: 'Mixed farming region with both crop production and extensive livestock farming.'
        },
        'Masvingo': {
            coords: [-20.0677, 30.8277],
            crops: ['Small Grains', 'Cotton', 'Sugarcane', 'Citrus'],
            livestock: ['Beef Cattle', 'Goats', 'Indigenous Chickens', 'Donkeys'],
            description: 'Semi-arid region suitable for drought-resistant crops and livestock farming.'
        },
        'Matabeleland North': {
            coords: [-18.5284, 27.5498],
            crops: ['Small Grains', 'Cotton', 'Groundnuts'],
            livestock: ['Beef Cattle', 'Goats', 'Indigenous Chickens', 'Donkeys'],
            description: 'Suitable for drought-resistant crops and extensive cattle ranching.'
        },
        'Matabeleland South': {
            coords: [-21.0521, 29.0460],
            crops: ['Small Grains', 'Groundnuts', 'Sorghum', 'Millet'],
            livestock: ['Beef Cattle', 'Goats', 'Sheep', 'Indigenous Chickens'],
            description: 'Semi-arid region focusing on drought-resistant crops and livestock production.'
        },
        'Harare': {
            coords: [-17.8292, 31.0522],
            crops: ['Vegetables', 'Herbs', 'Mushrooms', 'Hydroponics'],
            livestock: ['Chickens', 'Rabbits', 'Pigs'],
            description: 'Urban farming with focus on market gardening and small livestock.'
        },
        'Bulawayo': {
            coords: [-20.1325, 28.6266],
            crops: ['Vegetables', 'Urban Agriculture', 'Small Grains'],
            livestock: ['Chickens', 'Rabbits', 'Goats'],
            description: 'Urban and peri-urban farming with emphasis on small-scale agriculture.'
        }
    };

    // Add markers for each province
    for (let province in provinces) {
        const data = provinces[province];
        
        // Create custom marker
        const marker = L.marker(data.coords).addTo(map);
        
        // Add click event
        marker.on('click', () => {
            showProvinceInfo(province, data);
        });

        // Add hover tooltip
        marker.bindTooltip(province, {
            permanent: false,
            direction: 'top'
        });
    }

    function showProvinceInfo(province, data) {
        const cropsList = data.crops.map(crop => 
            `<li><i class="fas fa-seedling"></i>${crop}</li>`
        ).join('');

        const livestockList = data.livestock.map(animal => 
            `<li><i class="fas fa-horse"></i>${animal}</li>`
        ).join('');

        document.getElementById('provinceDetails').innerHTML = `
            <h3>${province}</h3>
            <p class="province-description">${data.description}</p>
            
            <h4>Main Crops</h4>
            <ul class="farming-list">
                ${cropsList}
            </ul>
            
            <h4>Livestock</h4>
            <ul class="farming-list">
                ${livestockList}
            </ul>
        `;
    }
});