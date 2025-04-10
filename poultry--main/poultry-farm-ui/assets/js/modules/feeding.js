document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const addFeedBtn = document.getElementById('addFeedBtn');
    const addFeedModal = document.getElementById('addFeedModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const feedForm = document.getElementById('feedForm');
    
    // Event Listeners
    addFeedBtn.addEventListener('click', function() {
        addFeedModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addFeedModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    addFeedModal.addEventListener('click', function(e) {
        if (e.target === addFeedModal) {
            addFeedModal.classList.remove('active');
        }
    });
    
    // Form submission
    feedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const feedType = document.getElementById('feedType').value;
        const quantity = document.getElementById('feedQuantity').value;
        const supplier = document.getElementById('feedSupplier').value;
        const date = document.getElementById('feedDate').value;
        const batch = document.getElementById('feedBatch').value;
        const notes = document.getElementById('feedNotes').value;
        
        // In a real app, you would send this data to the server
        console.log('New feed data:', {
            feedType,
            quantity,
            supplier,
            date,
            batch,
            notes
        });
        
        // Show success message
        alert('Feed record added successfully!');
        
        // Close modal and reset form
        addFeedModal.classList.remove('active');
        feedForm.reset();
    });
    
    // In a real app, you would have functions to:
    // 1. Load feed inventory from API
    // 2. Load consumption records
    // 3. Handle feeding schedules
    // 4. Generate alerts for low stock
});