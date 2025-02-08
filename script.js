const destinationData = {
    "Paris": {
        activities: [
            { name: "Eiffel Tower Visit", cost: 30 },
            { name: "Louvre Museum", cost: 20 },
            { name: "Seine River Cruise", cost: 50 },
            { name: "Notre-Dame Cathedral", cost: 0 }
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
            { name: "Broadway Show", cost: 100 },
            { name: "Times Square", cost: 0 }
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
            { name: "Senso-ji Temple", cost: 0 },
            { name: "Odaiba Shopping Mall", cost: 30 }
        ],
        accommodations: [
            { name: "Capsule Hotel", costPerNight: 40 },
            { name: "Business Hotel", costPerNight: 100 },
            { name: "Luxury Hotel", costPerNight: 300 }
        ]
    },
    "London": {
        activities: [
            { name: "London Eye", cost: 30 },
            { name: "British Museum", cost: 0 },
            { name: "Westminster Abbey", cost: 20 }
        ],
        accommodations: [
            { name: "Budget Hostel", costPerNight: 60 },
            { name: "Mid-range Hotel", costPerNight: 180 },
            { name: "Luxury Hotel", costPerNight: 400 }
        ]
    }
};

function generateItinerary() {
    const destinationSelect = document.getElementById('destination');
    const selectedDestination = destinationSelect.value;
    const budget = parseFloat(document.getElementById('budget').value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!selectedDestination || isNaN(budget) || budget <= 0 || !startDate || !endDate) {
        alert("Please select a valid destination, enter a valid budget, and select trip dates.");
        return;
    }

    const data = destinationData[selectedDestination];
    if (!data) {
        alert("Sorry, we don't have data for this destination.");
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    let activities = data.activities.filter(activity => activity.cost <= budget);
    let accommodations = data.accommodations.filter(acc => acc.costPerNight <= budget / 3);

    let itinerarySummary = `
        <h3>Destination: ${selectedDestination}</h3>
        <h4>Dates: ${startDate} to ${endDate} (Total Days: ${days})</h4>
        <h4>Activities:</h4>
        <ul>
            ${activities.map(activity => `<li>${activity.name} - $${activity.cost}</li>`).join('')}
        </ul>
        <h4>Accommodation Options:</h4>
        <ul>
            ${accommodations.map(acc => `<li>${acc.name} - $${acc.costPerNight} per night</li>`).join('')}
        </ul>
        <h4>Suggested Itinerary:</h4>
        <ul>
            <li>Day 1: Arrive and check into your accommodation</li>
            ${activities.slice(0, days - 1).map((activity, index) => `<li>Day ${index + 2}: ${activity.name}</li>`).join('')}
        </ul>
    `;

    document.getElementById('itinerary-summary').innerHTML = itinerarySummary;
}

function exportItinerary() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const itineraryContent = document.getElementById('itinerary-summary').innerText;
    doc.text(itineraryContent, 10, 10);
    doc.save('itinerary.pdf');
}
