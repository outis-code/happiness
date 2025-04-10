document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const tabBtns = document.querySelectorAll('.workforce-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const employeeForm = document.getElementById('employeeForm');
    
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
    addEmployeeBtn.addEventListener('click', function() {
        // Set today's date as default hire date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('employeeHireDate').value = today;
        addEmployeeModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addEmployeeModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    addEmployeeModal.addEventListener('click', function(e) {
        if (e.target === addEmployeeModal) {
            addEmployeeModal.classList.remove('active');
        }
    });
    
    // Form submission
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('employeeFirstName').value;
        const lastName = document.getElementById('employeeLastName').value;
        const position = document.getElementById('employeePosition').value;
        const department = document.getElementById('employeeDepartment').value;
        const phone = document.getElementById('employeePhone').value;
        const email = document.getElementById('employeeEmail').value;
        const hireDate = document.getElementById('employeeHireDate').value;
        const salary = document.getElementById('employeeSalary').value;
        
        // In a real app, you would send this data to the server
        console.log('New employee:', {
            firstName,
            lastName,
            position,
            department,
            phone,
            email,
            hireDate,
            salary
        });
        
        // Show success message
        alert('Employee added successfully!');
        
        // Close modal and reset form
        addEmployeeModal.classList.remove('active');
        employeeForm.reset();
        
        // In a real app, you would refresh the employee list
    });
    
    // In a real app, you would have functions to:
    // 1. Load employees from API
    // 2. Handle task assignment
    // 3. Track attendance
    // 4. Process payroll
    // 5. Generate workforce reports
});