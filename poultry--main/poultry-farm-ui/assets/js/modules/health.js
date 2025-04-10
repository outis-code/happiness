document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addVaccinationBtn = document.getElementById('addVaccinationBtn');
    const addVaccinationModal = document.getElementById('addVaccinationModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const vaccinationForm = document.getElementById('vaccinationForm');
    
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
    addVaccinationBtn.addEventListener('click', function() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('vaccineDate').value = today;
        addVaccinationModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addVaccinationModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    addVaccinationModal.addEventListener('click', function(e) {
        if (e.target === addVaccinationModal) {
            addVaccinationModal.classList.remove('active');
        }
    });
    
    // Form submission
    vaccinationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const vaccineType = document.getElementById('vaccineType').value;
        const vaccineDate = document.getElementById('vaccineDate').value;
        const vaccineFlock = document.getElementById('vaccineFlock').value;
        const vaccineMethod = document.getElementById('vaccineMethod').value;
        const vaccineAdmin = document.getElementById('vaccineAdmin').value;
        const vaccineNotes = document.getElementById('vaccineNotes').value;
        
        // In a real app, you would send this data to the server
        console.log('New vaccination record:', {
            vaccineType,
            vaccineDate,
            vaccineFlock,
            vaccineMethod,
            vaccineAdmin,
            vaccineNotes
        });
        
        // Show success message
        alert('Vaccination record saved successfully!');
        
        // Close modal and reset form
        addVaccinationModal.classList.remove('active');
        vaccinationForm.reset();
        
        // In a real app, you would refresh the vaccination data
    });
    
    // In a real app, you would have functions to:
    // 1. Load vaccination data from API
    // 2. Handle disease logging
    // 3. Record mortality
    // 4. Track treatments
    // 5. Generate health reports
});