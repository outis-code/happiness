/**
 * PoultryPro - Main JavaScript File
 * Contains core functionality shared across all modules
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all core functionality
    initSidebar();
    initMobileMenu();
    initModals();
    initForms();
    initNotifications();
    initUserDropdown();
});

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar || !menuToggle) return;
    
    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Highlight current page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.parentElement.classList.add('active');
        }
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;
    
    // Only show menu toggle on mobile
    if (window.innerWidth > 768) {
        menuToggle.style.display = 'none';
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('.sidebar').classList.remove('active');
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = 'block';
        }
    });
}

/**
 * Initialize modal dialogs
 */
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    if (modals.length === 0) return;
    
    // Close modals when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modals when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

/**
 * Initialize form validation
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--error-color)';
                    
                    // Add error message if not already present
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = form.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    });
}

/**
 * Initialize notification system
 */
function initNotifications() {
    const notificationBell = document.querySelector('.notifications');
    if (!notificationBell) return;
    
    // Click handler for notification bell
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real app, this would show a dropdown with notifications
        console.log('Show notifications dropdown');
    });
    
    // Simulate notification count from server
    updateNotificationCount();
    
    // Periodically check for new notifications
    setInterval(updateNotificationCount, 300000); // Every 5 minutes
}

function updateNotificationCount() {
    const notificationBadge = document.querySelector('.notifications .badge');
    if (!notificationBadge) return;
    
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use random numbers
    const newCount = Math.floor(Math.random() * 5);
    notificationBadge.textContent = newCount;
    
    // Add animation for new notifications
    if (newCount > 0 && notificationBadge.textContent !== newCount.toString()) {
        notificationBadge.classList.add('pulse');
        setTimeout(() => {
            notificationBadge.classList.remove('pulse');
        }, 1000);
    }
}

/**
 * Initialize user profile dropdown
 */
function initUserDropdown() {
    const userProfile = document.querySelector('.user-profile');
    if (!userProfile) return;
    
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
        <a href="#"><span class="material-icons">account_circle</span> My Profile</a>
        <a href="#"><span class="material-icons">settings</span> Settings</a>
        <a href="#" class="logout-btn"><span class="material-icons">logout</span> Logout</a>
    `;
    
    userProfile.appendChild(dropdown);
    
    // Toggle dropdown
    userProfile.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Handle logout
    const logoutBtn = dropdown.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}

/**
 * Display toast notifications
 * @param {string} message - The message to display
 * @param {string} type - Type of notification (success, error, warning, info)
 * @param {number} duration - How long to display the toast (ms)
 */
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="material-icons">
            ${type === 'success' ? 'check_circle' : 
              type === 'error' ? 'error' : 
              type === 'warning' ? 'warning' : 'info'}
        </span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

/**
 * Format date to display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Format numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Debounce function to limit how often a function can execute
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Make functions available globally if needed
window.showToast = showToast;
window.formatDate = formatDate;
window.formatNumber = formatNumber;
window.debounce = debounce;