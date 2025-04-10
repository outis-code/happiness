document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const tabBtns = document.querySelectorAll('.breeding-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addBreedingBtn = document.getElementById('addBreedingBtn');
    const addBreedingModal = document.getElementById('addBreedingModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const breedingForm = document.getElementById('breedingForm');
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Event Listeners
    addBreedingBtn.addEventListener('click', function() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('breedingDate').value = today;
        addBreedingModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addBreedingModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    addBreedingModal.addEventListener('click', function(e) {
        if (e.target === addBreedingModal) {
            addBreedingModal.classList.remove('active');
        }
    });
    
    // Form submission
    breedingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const maleBreed = document.getElementById('maleBreed').value;
        const femaleBreed = document.getElementById('femaleBreed').value;
        const breedingDate = document.getElementById('breedingDate').value;
        const maleCount = document.getElementById('maleCount').value;
        const femaleCount = document.getElementById('femaleCount').value;
        const breedingLocation = document.getElementById('breedingLocation').value;
        const breedingNotes = document.getElementById('breedingNotes').value;
        
        // Validate male:female ratio
        if (parseInt(maleCount) > parseInt(femaleCount)) {
            alert('Warning: More males than females may cause aggression issues!');
            return;
        }
        
        // In a real app, you would send this data to the server
        console.log('New breeding program:', {
            maleBreed,
            femaleBreed,
            breedingDate,
            maleCount,
            femaleCount,
            breedingLocation,
            breedingNotes
        });
        
        // Show success message
        alert('Breeding program saved successfully!');
        
        // Close modal and reset form
        addBreedingModal.classList.remove('active');
        breedingForm.reset();
        
        // In a real app, you would refresh the breeding data
    });
    
    // In a real app, you would have functions to:
    // 1. Load breeding programs from API
    // 2. Handle incubation records
    // 3. Track hatching results
    // 4. Manage chick growth
    // 5. Calculate breeding performance metrics
});