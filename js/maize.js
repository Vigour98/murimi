document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('budgetModal');
    const budgetBtn = document.getElementById('budgetBtn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const budgetForm = document.getElementById('budgetForm');
    const budgetResults = document.getElementById('budgetResults');

    // Open modal
    budgetBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Calculate budget
    budgetForm.onsubmit = function(e) {
        e.preventDefault();

        const landSize = parseFloat(document.getElementById('landSize').value);
        const seedType = document.getElementById('seedType').value;
        const irrigationType = document.getElementById('irrigationType').value;

        // Calculate requirements (these are example calculations)
        const seedsRequired = landSize * 25; // 25kg per hectare
        const compoundD = landSize * 250; // 250kg per hectare
        const anFertilizer = landSize * 200; // 200kg per hectare

        // Calculate costs (example prices in USD)
        const seedCost = seedsRequired * 5; // $5 per kg
        const compoundDCost = compoundD * 0.8; // $0.8 per kg
        const anCost = anFertilizer * 0.7; // $0.7 per kg
        const irrigationCost = irrigationType === 'rainfed' ? 0 : 
                             irrigationType === 'sprinkler' ? landSize * 200 :
                             landSize * 300; // Drip irrigation

        const totalCost = seedCost + compoundDCost + anCost + irrigationCost;

        // Display results
        document.getElementById('seedsRequired').textContent = `${seedsRequired.toFixed(1)} kg`;
        document.getElementById('compoundD').textContent = `${compoundD.toFixed(1)} kg`;
        document.getElementById('anFertilizer').textContent = `${anFertilizer.toFixed(1)} kg`;
        document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;

        budgetResults.style.display = 'block';
    }
});