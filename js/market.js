// Modal handling
function showOfferModal(listingTitle) {
    const modal = document.getElementById('offerModal');
    modal.style.display = 'block';
    // You could add the listing title to the modal here
    document.querySelector('#offerModal h2').textContent = `Make an Offer - ${listingTitle}`;
}

function closeOfferModal() {
    document.getElementById('offerModal').style.display = 'none';
}

function showPostListingModal() {
    document.getElementById('postListingModal').style.display = 'block';
}

function closePostListingModal() {
    document.getElementById('postListingModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const offerModal = document.getElementById('offerModal');
    const postListingModal = document.getElementById('postListingModal');
    if (event.target === offerModal) {
        offerModal.style.display = 'none';
    }
    if (event.target === postListingModal) {
        postListingModal.style.display = 'none';
    }
}

// Form submissions
document.getElementById('offerForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically send the offer to your backend
    alert('Offer submitted successfully!');
    closeOfferModal();
}

document.getElementById('postListingForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically send the new listing to your backend
    alert('Listing posted successfully!');
    closePostListingModal();
}

// Filtering functionality
document.getElementById('categoryFilter').onchange = filterListings;
document.getElementById('locationFilter').onchange = filterListings;
document.getElementById('searchInput').onkeyup = filterListings;

function filterListings() {
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    const listings = document.querySelectorAll('.listing-card');
    
    listings.forEach(listing => {
        const listingCategory = listing.dataset.category;
        const listingLocation = listing.querySelector('.location').textContent.toLowerCase();
        const listingTitle = listing.querySelector('h3').textContent.toLowerCase();

        const matchesCategory = category === 'all' || listingCategory === category;
        const matchesLocation = location === 'all' || listingLocation.includes(location.toLowerCase());
        const matchesSearch = listingTitle.includes(searchTerm);

        if (matchesCategory && matchesLocation && matchesSearch) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}