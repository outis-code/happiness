document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const addFlockBtn = document.getElementById('addFlockBtn');
    const addFlockModal = document.getElementById('addFlockModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const flockForm = document.getElementById('flockForm');
    
    // Sample data (in a real app, this would come from an API)
    const flocks = [
        {
            id: 'FL-2023-001',
            breed: 'Rhode Island Red',
            age: 12,
            quantity: 500,
            location: 'Barn A',
            status: 'active',
            source: 'Hatchery XYZ',
            arrivalDate: '2023-05-15',
            notes: 'Initial flock for egg production'
        },
        // More sample data would be here
    ];
    
    // Event Listeners
    addFlockBtn.addEventListener('click', function() {
        addFlockModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addFlockModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    addFlockModal.addEventListener('click', function(e) {
        if (e.target === addFlockModal) {
            addFlockModal.classList.remove('active');
        }
    });
    
    // Form submission
    flockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const breed = document.getElementById('flockBreed').value;
        const quantity = document.getElementById('flockQuantity').value;
        const source = document.getElementById('flockSource').value;
        const age = document.getElementById('flockAge').value;
        const location = document.getElementById('flockLocation').value;
        const date = document.getElementById('flockDate').value;
        const notes = document.getElementById('flockNotes').value;
        
        // In a real app, you would send this data to the server
        console.log('New flock data:', {
            breed,
            quantity,
            source,
            age,
            location,
            date,
            notes
        });
        
        // Show success message
        alert('Flock added successfully!');
        
        // Close modal and reset form
        addFlockModal.classList.remove('active');
        flockForm.reset();
        
        // In a real app, you would refresh the flock list
    });
    
    // In a real app, you would have functions to:
    // 1. Load flocks from API
    // 2. Render flocks in the table
    // 3. Handle pagination
    // 4. Handle search and filtering
    // 5. Handle view/edit/delete actions
});