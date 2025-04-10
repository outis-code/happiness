document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../../index.html';
    }
    
    // DOM Elements
    const reportTypeSelect = document.getElementById('reportType');
    const timePeriodSelect = document.getElementById('timePeriod');
    const customRangeGroups = document.querySelectorAll('.custom-range');
    const generateReportBtn = document.getElementById('generateReportBtn');
    
    // Initialize production report chart
    const ctx = document.getElementById('productionReportChart').getContext('2d');
    const productionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Eggs Collected',
                data: [22000, 23400, 25842, 24200],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1
            }, {
                label: 'Good Eggs',
                data: [21500, 22800, 25100, 23600],
                backgroundColor: 'rgba(33, 150, 243, 0.7)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.toLocaleString();
                        }
                    }
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
    timePeriodSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customRangeGroups.forEach(group => group.style.display = 'block');
        } else {
            customRangeGroups.forEach(group => group.style.display = 'none');
        }
    });
    
    generateReportBtn.addEventListener('click', function() {
        const reportType = reportTypeSelect.value;
        const timePeriod = timePeriodSelect.value;
        let startDate, endDate;
        
        if (timePeriod === 'custom') {
            startDate = document.getElementById('startDate').value;
            endDate = document.getElementById('endDate').value;
            
            if (!startDate || !endDate) {
                alert('Please select both start and end dates for custom range');
                return;
            }
        }
        
        // In a real app, you would fetch report data based on filters
        console.log('Generating report:', {
            reportType,
            timePeriod,
            startDate,
            endDate
        });
        
        // Show loading state
        this.innerHTML = '<span class="material-icons btn-icon">hourglass_top</span> Generating...';
        
        // Simulate API call
        setTimeout(() => {
            this.innerHTML = '<span class="material-icons btn-icon">insert_chart</span> Generate Report';
            alert('Report generated successfully!');
            
            // In a real app, you would update the charts and tables with new data
        }, 1500);
    });
    
    // In a real app, you would have functions to:
    // 1. Load different report types (health, feeding, financial)
    // 2. Handle date range filtering
    // 3. Export reports to PDF/Excel
    // 4. Generate performance insights
});