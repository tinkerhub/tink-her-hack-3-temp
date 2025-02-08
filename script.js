const destinationData = {
    "Paris": {
        activities: [
            { name: "Eiffel Tower Visit", cost: 30 },
            { name: "Louvre Museum", cost: 20 },
            { name: "Seine River Cruise", cost: 50 }
        ],
        accommodations: [
            { name: "Budget Hotel", costPerNight: 100 },
            { name: "Mid-range Hotel", costPerNight: 200 },
            { name: "Luxury Hotel", costPerNight: 400 }
        ]
    },
    "New York": {
        activities: [
            { name: "Statue of Liberty", cost: 25 },
            { name: "Central Park", cost: 0 },
            { name: "Broadway Show", cost: 100 }
        ],
        accommodations: [
            { name: "Budget Hostel", costPerNight: 50 },
            { name: "Mid-range Hotel", costPerNight: 150 },
            { name: "Luxury Hotel", costPerNight: 350 }
        ]
    },
    "Tokyo": {
        activities: [
            { name: "Shibuya Crossing", cost: 0 },
            { name: "Tokyo Tower", cost: 15 },
            { name: "Senso-ji Temple", cost: 0 }
        ],
        accommodations: [
            { name: "Capsule Hotel", costPerNight: 40 },
            { name: "Business Hotel", costPerNight: 100 },
            { name: "Luxury Hotel", costPerNight: 300 }
        ]
    }
};

// Function to generate the AI-driven itinerary
function generateItinerary() {
    const destination = document.getElementById('destination').value;
    const budget = parseFloat(document.getElementById('budget').value);

    if (!destination || isNaN(budget) || budget <= 0) {
        alert("Please enter a valid destination and budget.");
        return;
    }

    // Check if the destination is in the predefined data
    const data = destinationData[destination];
    if (!data) {
        alert("Sorry, we don't have data for this destination.");
        return;
    }

    // Suggest activities based on the budget
    let activities = data.activities.filter(activity => activity.cost <= budget);
    let accommodations = data.accommodations.filter(acc => acc.costPerNight <= budget / 3); // Assume a 3-night stay

    // Generate itinerary summary
    let itinerarySummary = `
        <h3>Destination: ${destination}</h3>
        <h4>Activities (within your budget):</h4>
        <ul>
            ${activities.map(activity => `<li>${activity.name} - $${activity.cost}</li>`).join('')}
        </ul>
        <h4>Accommodation Options (within your budget):</h4>
        <ul>
            ${accommodations.map(acc => `<li>${acc.name} - $${acc.costPerNight} per night</li>`).join('')}
        </ul>
        <h4>Suggested Itinerary:</h4>
        <ul>
            <li>Day 1: Arrive and check into your accommodation</li>
            ${activities.slice(0, 2).map((activity, index) => `<li>Day ${index + 2}: ${activity.name}</li>`).join('')}
        </ul>
    `;

    // Display the generated itinerary
    document.getElementById('itinerary-summary').innerHTML = itinerarySummary;
}

// Export function to PDF
function exportItinerary() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const itineraryContent = document.getElementById('itinerary-summary').innerText;
    doc.text(itineraryContent, 10, 10);
    doc.save('itinerary.pdf');
}
