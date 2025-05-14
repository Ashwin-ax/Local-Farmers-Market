
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample data for farmers markets (in a real app, this would come from a database or API)
    const marketsData = [
        {
            id: 1,
            name: "Panvel Bhaji Market",
            image: "https://source.unsplash.com/random/300x180/?farmers-market",
            days: ["saturday"],
            hours: "8:00 AM - 1:00 PM",
            address: "123 Main Street, Panvel",
            description: "A vibrant market featuring over 50 local vendors offering fresh produce, artisanal breads, local honey, handcrafted goods, and more.",
            vendors: ["Green Acres Farm", "Honey Heaven", "Artisan Breads", "Happy Hen Eggs"],
            coordinates: {lat: 40.7128, lng: -74.0060}
        },
        {
            id: 2,
            name: "Cotton Market",
            image: "https://source.unsplash.com/random/300x180/?organic-produce",
            days: ["wednesday", "sunday"],
            hours: "Wed: 3:00 PM - 7:00 PM, Sun: 9:00 AM - 2:00 PM",
            address: "Main road, cotton market, Amalner",
            description: "Certified organic market specializing in sustainably grown produce and ethically raised meats from farms within 50 miles.",
            vendors: ["Organic Valley Farms", "Wild Meadow Dairy", "Earth First Produce", "Forest Mushrooms"],
            coordinates: {lat: 40.7282, lng: -73.9942}
        },
        {
            id: 3,
            name: "Anand Bhaji Market",
            image: "https://source.unsplash.com/random/300x180/?vegetables",
            days: ["tuesday", "friday"],
            hours: "3:00 PM - 7:00 PM",
            address: "33 rajmata chowk, Pune",
            description: "A community-focused market with affordable produce options and educational programs about sustainable food systems.",
            vendors: ["Community Garden Project", "Family Farms Co-op", "Fresh Start Bakery", "Neighborhood Cheese"],
            coordinates: {lat: 40.7053, lng: -74.0088}
        },
        {
            id: 4,
            name: "Hillside Growers Market",
            image: "https://source.unsplash.com/random/300x180/?farm-produce",
            days: ["monday", "thursday"],
            hours: "10:00 AM - 4:00 PM",
            address: "101 Hill Street, Delhi",
            description: "A producer-only market where all items are grown or created by the vendors themselves, ensuring the freshest possible products.",
            vendors: ["Hillside Orchard", "Mountain Valley Growers", "Sunrise Eggs", "Handmade Pasta"],
            coordinates: {lat: 40.7411, lng: -73.9897}
        },
        {
            id: 5,
            name: "Cereals Market",
            image: "https://source.unsplash.com/random/300x180/?farmers",
            days: ["saturday", "sunday"],
            hours: "Sat: 8:00 AM - 2:00 PM, Sun: 10:00 AM - 3:00 PM",
            address: "222 Lake Drive, Dhule",
            description: "A weekend destination with not just fresh produce but also food trucks, live music, and family activities.",
            vendors: ["Lake View Farms", "Sunshine Orchard", "Craft Honey", "Lakeside Bakery", "Family Dairy"],
            coordinates: {lat: 40.7023, lng: -73.9871}
        }
    ];
    
    // DOM Elements
    const searchBtn = document.getElementById('search-btn');
    const dayFilter = document.getElementById('day-filter');
    const marketsContainer = document.getElementById('markets-container');
    const modal = document.getElementById('market-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    
    // Event Listeners
    searchBtn.addEventListener('click', searchMarkets);
    dayFilter.addEventListener('change', filterMarketsByDay);
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize the page with all markets
    displayMarkets(marketsData);
    
    // Function to search markets (simplified - would connect to API in a real app)
    function searchMarkets() {
        const locationInput = document.getElementById('location-search').value.trim().toLowerCase();
        
        // If search is empty, show all markets
        if (!locationInput) {
            displayMarkets(marketsData);
            return;
        }
        
        // Filter markets by address (simplified search)
        const filteredMarkets = marketsData.filter(market => 
            market.address.toLowerCase().includes(locationInput)
        );
        
        displayMarkets(filteredMarkets);
    }
    
    // Function to filter markets by day
    function filterMarketsByDay() {
        const selectedDay = dayFilter.value;
        
        // If "all" is selected, show all markets
        if (selectedDay === 'all') {
            displayMarkets(marketsData);
            return;
        }
        
        // Filter markets by selected day
        const filteredMarkets = marketsData.filter(market => 
            market.days.includes(selectedDay)
        );
        
        displayMarkets(filteredMarkets);
    }
    
    // Function to display markets in the container
    function displayMarkets(markets) {
        // Clear previous results
        marketsContainer.innerHTML = '';
        
        // If no markets match the criteria
        if (markets.length === 0) {
            marketsContainer.innerHTML = '<p class="no-results">No farmers markets found. Try a different search or filter.</p>';
            return;
        }
        
        // Loop through markets and create cards
        markets.forEach(market => {
            const marketCard = document.createElement('div');
            marketCard.className = 'market-card';
            marketCard.dataset.marketId = market.id;
            
            // Format days for display
            const formattedDays = market.days.map(day => 
                day.charAt(0).toUpperCase() + day.slice(1)
            ).join(', ');
            
            marketCard.innerHTML = `
                <div class="market-image" style="background-image: url('${market.image}')"></div>
                <div class="market-info">
                    <h3 class="market-name">${market.name}</h3>
                    <p class="market-schedule"><i class="far fa-clock"></i> ${formattedDays}: ${market.hours}</p>
                    <p class="market-address"><i class="fas fa-map-marker-alt"></i> ${market.address}</p>
                    <button class="view-details">View Details</button>
                </div>
            `;
            
            // Add click event to view details
            marketCard.querySelector('.view-details').addEventListener('click', function() {
                showMarketDetails(market);
            });
            
            marketsContainer.appendChild(marketCard);
        });
    }
    
    // Function to show market details in modal
    function showMarketDetails(market) {
        modalContent.innerHTML = `
            <h2>${market.name}</h2>
            <p><strong>Schedule:</strong> ${market.days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')} - ${market.hours}</p>
            <p><strong>Address:</strong> ${market.address}</p>
            <p><strong>Description:</strong> ${market.description}</p>
            <div class="vendors">
                <h3>Featured Vendors:</h3>
                <ul>
                    ${market.vendors.map(vendor => `<li>${vendor}</li>`).join('')}
                </ul>
            </div>
            <div class="map-placeholder">
                <p>Map would appear here in a production environment</p>
                <small>This is a placeholder for demonstration purposes.</small>
            </div>
        `;
        
        modal.style.display = 'block';
    }
});