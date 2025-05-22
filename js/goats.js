document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('budgetModal');
    const btn = document.getElementById('budgetBtn');
    const span = document.getElementsByClassName('close')[0];
    const budgetForm = document.getElementById('budgetForm');

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Function to format numbers as currency
    function formatCurrency(number) {
        return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function to calculate row total
    function calculateRowTotal(qty, unitCost) {
        return (parseFloat(qty) || 0) * (parseFloat(unitCost) || 0);
    }

    // Function to update all totals
    function updateTotals() {
        // Fixed Assets calculations
        const housesTotal = calculateRowTotal(
            document.getElementById('housesQty').value,
            document.getElementById('housesUnitCost').value
        );
        const feedersTotal = calculateRowTotal(
            document.getElementById('feedersQty').value,
            document.getElementById('feedersUnitCost').value
        );
        const drinkersTotal = calculateRowTotal(
            document.getElementById('drinkersQty').value,
            document.getElementById('drinkersUnitCost').value
        );
        const boerTotal = calculateRowTotal(
            document.getElementById('boerQty').value,
            document.getElementById('boerUnitCost').value
        );
        const indigTotal = calculateRowTotal(
            document.getElementById('indigQty').value,
            document.getElementById('indigUnitCost').value
        );

        // Update Fixed Assets totals
        document.getElementById('housesTotal').textContent = formatCurrency(housesTotal);
        document.getElementById('feedersTotal').textContent = formatCurrency(feedersTotal);
        document.getElementById('drinkersTotal').textContent = formatCurrency(drinkersTotal);
        document.getElementById('boerTotal').textContent = formatCurrency(boerTotal);
        document.getElementById('indigTotal').textContent = formatCurrency(indigTotal);

        const totalFixedAssets = housesTotal + feedersTotal + drinkersTotal + boerTotal + indigTotal;
        document.getElementById('totalFixedAssets').textContent = formatCurrency(totalFixedAssets);

        // Working Capital calculations
        const feedTotal = calculateRowTotal(
            document.getElementById('feedQty').value,
            document.getElementById('feedUnitCost').value
        );
        const vetTotal = calculateRowTotal(
            document.getElementById('vetQty').value,
            document.getElementById('vetUnitCost').value
        );
        const transportTotal = calculateRowTotal(
            document.getElementById('transportQty').value,
            document.getElementById('transportUnitCost').value
        );
        const salariesTotal = parseFloat(document.getElementById('salaries').value) || 0;
        const marketingTotal = parseFloat(document.getElementById('marketing').value) || 0;
        const repairsTotal = parseFloat(document.getElementById('repairs').value) || 0;
        const otherTotal = parseFloat(document.getElementById('otherCosts').value) || 0;

        // Update Working Capital totals
        document.getElementById('feedTotal').textContent = formatCurrency(feedTotal);
        document.getElementById('vetTotal').textContent = formatCurrency(vetTotal);
        document.getElementById('transportTotal').textContent = formatCurrency(transportTotal);
        document.getElementById('salariesTotal').textContent = formatCurrency(salariesTotal);
        document.getElementById('marketingTotal').textContent = formatCurrency(marketingTotal);
        document.getElementById('repairsTotal').textContent = formatCurrency(repairsTotal);
        document.getElementById('otherTotal').textContent = formatCurrency(otherTotal);

        const totalWorkingCapital = feedTotal + vetTotal + transportTotal + 
                                  salariesTotal + marketingTotal + repairsTotal + otherTotal;
        document.getElementById('totalWorkingCapital').textContent = formatCurrency(totalWorkingCapital);

        // Update Total Startup Costs
        const totalStartupCosts = totalFixedAssets + totalWorkingCapital;
        document.getElementById('totalStartupCosts').textContent = formatCurrency(totalStartupCosts);
    }

    // Add event listeners to all input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', updateTotals);
    });

    // Calculate initial totals
    updateTotals();

    // Form submission
    budgetForm.onsubmit = function(e) {
        e.preventDefault();
        updateTotals();
    }
});
