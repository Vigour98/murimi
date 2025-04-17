document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('budgetModal');
    const btn = document.getElementById('budgetBtn');
    const span = document.getElementsByClassName('close')[0];

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
        calculateValues();
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

    function calculateValues() {
        const yields = [30000, 40000, 50000];
        const sellingPrice = 0.50;
        
        yields.forEach((yield, index) => {
            const prefix = index === 0 ? 'low' : index === 1 ? 'med' : 'high';
            
            // Calculate Gross Income
            const grossIncome = yield * sellingPrice;
            document.getElementById(`${prefix}GrossIncome`).textContent = grossIncome.toLocaleString();
            
            // Variable Costs (example calculation)
            const varCosts = index === 0 ? 2528 : index === 1 ? 2824 : 3120;
            document.getElementById(`${prefix}VarCosts`).textContent = varCosts.toLocaleString();
            
            // Gross Margin
            const grossMargin = grossIncome - varCosts;
            document.getElementById(`${prefix}GrossMargin`).textContent = grossMargin.toLocaleString();
            
            // Gross Margin per $100 TVC
            const grossMarginTVC = ((grossMargin / varCosts) * 100).toFixed(0);
            document.getElementById(`${prefix}GrossMarginTVC`).textContent = grossMarginTVC;
        });
    }
});
