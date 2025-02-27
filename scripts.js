// Donation Calculator Logic
const donationAmountInput = document.getElementById('donationAmount');
const totalDonationSpan = document.getElementById('totalDonation');
const donateButton = document.getElementById('donateButton');
const frequencyRadios = document.querySelectorAll('input[name="frequency"]');

// Function to calculate total donation based on frequency
function calculateDonation() {
  const amount = parseFloat(donationAmountInput.value) || 0;
  let total = amount;

  // Check donation frequency (monthly or one-time)
  const frequency = document.querySelector('input[name="frequency"]:checked').value;
  if (frequency === 'monthly') {
    total = amount * 12; // Calculate total for a year if monthly
  }

  // Update total donation display
  totalDonationSpan.textContent = total.toFixed(2);
}

// Event listeners
donationAmountInput.addEventListener('input', calculateDonation);
frequencyRadios.forEach(radio => radio.addEventListener('change', calculateDonation));

// Handle donate button click (for demo purposes, simply alerting)
donateButton.addEventListener('click', () => {
  alert(Thank you for your generous donation of $${totalDonationSpan.textContent}!);
});