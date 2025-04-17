document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('resultsModal');
    const form = document.getElementById('soilTestForm');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Close modal when clicking the X
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        analyzeSoilResults();
    }

    function analyzeSoilResults() {
        const soilPh = parseFloat(document.getElementById('soilPh').value);
        const nitrogen = parseFloat(document.getElementById('nitrogen').value);
        const phosphorus = parseFloat(document.getElementById('phosphorus').value);
        const potassium = parseFloat(document.getElementById('potassium').value);
        const organicMatter = parseFloat(document.getElementById('organicMatter').value);
        const soilTexture = document.getElementById('soilTexture').value;

        // Generate analysis summary
        let summary = `<ul>`;
        summary += `<li>Soil pH: ${getSoilPhStatus(soilPh)}</li>`;
        summary += `<li>Nitrogen Level: ${getNutrientStatus(nitrogen, 'nitrogen')}</li>`;
        summary += `<li>Phosphorus Level: ${getNutrientStatus(phosphorus, 'phosphorus')}</li>`;
        summary += `<li>Potassium Level: ${getNutrientStatus(potassium, 'potassium')}</li>`;
        summary += `<li>Organic Matter: ${getOrganicMatterStatus(organicMatter)}</li>`;
        summary += `<li>Soil Texture: ${soilTexture.charAt(0).toUpperCase() + soilTexture.slice(1)}</li>`;
        summary += `</ul>`;

        // Generate recommendations
        let recommendations = `<ul>`;
        recommendations += generateRecommendations(soilPh, nitrogen, phosphorus, potassium, organicMatter, soilTexture);
        recommendations += `</ul>`;

        // Generate suitable crops
        let crops = `<ul>`;
        crops += getSuitableCrops(soilPh, soilTexture);
        crops += `</ul>`;

        // Update modal content
        document.getElementById('resultsSummary').innerHTML = summary;
        document.getElementById('soilRecommendations').innerHTML = recommendations;
        document.getElementById('suitableCrops').innerHTML = crops;

        // Show modal
        modal.style.display = "block";
    }

    function getSoilPhStatus(ph) {
        if (ph < 5.5) return `${ph} - Acidic (Lime application recommended)`;
        if (ph > 7.5) return `${ph} - Alkaline (Sulfur application may be needed)`;
        return `${ph} - Optimal range`;
    }

    function getNutrientStatus(value, nutrient) {
        let status;
        switch(nutrient) {
            case 'nitrogen':
                status = value < 20 ? 'Low' : value < 40 ? 'Medium' : 'High';
                break;
            case 'phosphorus':
                status = value < 10 ? 'Low' : value < 25 ? 'Medium' : 'High';
                break;
            case 'potassium':
                status = value < 100 ? 'Low' : value < 200 ? 'Medium' : 'High';
                break;
        }
        return `${value} mg/kg - ${status}`;
    }

    function getOrganicMatterStatus(value) {
        if (value < 2) return `${value}% - Low (Increase organic matter)`;
        if (value < 5) return `${value}% - Medium`;
        return `${value}% - High`;
    }

    function generateRecommendations(ph, n, p, k, om, texture) {
        let recs = [];

        // pH recommendations
        if (ph < 5.5) recs.push("Apply agricultural lime to raise soil pH");
        if (ph > 7.5) recs.push("Consider adding sulfur to lower soil pH");

        // Nutrient recommendations
        if (n < 20) recs.push("Apply nitrogen-rich fertilizers or incorporate legumes");
        if (p < 10) recs.push("Add phosphorus through fertilizers or bone meal");
        if (k < 100) recs.push("Supplement with potassium-rich fertilizers");

        // Organic matter recommendations
        if (om < 2) recs.push("Increase organic matter by adding compost and crop residues");

        // Texture-specific recommendations
        switch(texture) {
            case 'sandy':
                recs.push("Add organic matter to improve water retention");
                break;
            case 'clay':
                recs.push("Improve drainage and soil structure through organic matter");
                break;
        }

        return recs.map(rec => `<li>${rec}</li>`).join('');
    }

    function getSuitableCrops(ph, texture) {
        let crops = [];

        // pH-based recommendations
        if (ph >= 5.5 && ph <= 7.5) {
            crops.push("Maize", "Tomatoes", "Cabbage", "Potatoes");
        }

        // Texture-based additions
        switch(texture) {
            case 'sandy':
                crops.push("Groundnuts", "Sweet Potatoes", "Watermelons");
                break;
            case 'loamy':
                crops.push("Most vegetables", "Wheat", "Soybeans");
                break;
            case 'clay':
                crops.push("Rice", "Wheat", "Cotton");
                break;
        }

        return [...new Set(crops)].map(crop => `<li>${crop}</li>`).join('');
    }
});