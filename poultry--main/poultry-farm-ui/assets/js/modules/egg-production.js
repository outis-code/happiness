document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const recordProductionBtn = document.getElementById('recordProductionBtn');
    const recordProductionModal = document.getElementById('recordProductionModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const productionForm = document.getElementById('productionForm');
    
    // Initialize production trend chart
    const ctx = document.getElementById('productionTrendChart').getContext('2d');
    const productionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Eggs Collected',
                data: [3200, 3500, 3800, 3700, 3900, 3856, 4000],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Event Listeners
    recordProductionBtn.addEventListener('click', function() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('collectionDate').value = today;
        recordProductionModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            recordProductionModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    recordProductionModal.addEventListener('click', function(e) {
        if (e.target === recordProductionModal) {
            recordProductionModal.classList.remove('active');
        }
    });
    
    // Form submission
    productionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const date = document.getElementById('collectionDate').value;
        const flock = document.getElementById('flockSelection').value;
        const time = document.getElementById('collectionTime').value;
        const totalEggs = document.getElementById('totalEggs').value;
        const goodEggs = document.getElementById('goodEggs').value;
        const damagedEggs = document.getElementById('damagedEggs').value || 0;
        const rejectedEggs = document.getElementById('rejectedEggs').value || 0;
        const notes = document.getElementById('productionNotes').value;
        
        // Validate that good + damaged + rejected <= total
        if (parseInt(goodEggs) + parseInt(damagedEggs) + parseInt(rejectedEggs) > parseInt(totalEggs)) {
            alert('Sum of good, damaged, and rejected eggs cannot exceed total eggs collected!');
            return;
        }
        
        // In a real app, you would send this data to the server
        console.log('New production record:', {
            date,
            flock,
            time,
            totalEggs,
            goodEggs,
            damagedEggs,
            rejectedEggs,
            notes
        });
        
        // Show success message
        alert('Production record saved successfully!');
        
        // Close modal and reset form
        recordProductionModal.classList.remove('active');
        productionForm.reset();
        
        // In a real app, you would refresh the production data
    });
    
    // In a real app, you would have functions to:
    // 1. Load production data from API
    // 2. Handle date filtering
    // 3. Calculate production statistics
});