/** Form Validation Simulation Engine */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                if (!input.checkValidity()) {
                    formGroup.classList.add('invalid');
                    isValid = false;
                } else {
                    formGroup.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Simulate processing
                const btn = form.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = "Transmitting...";
                btn.style.opacity = "0.7";
                
                setTimeout(() => {
                    alert("Tender Request Successfully Logged (Local Simulation).");
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.opacity = "1";
                }, 1500);
            }
        });

        // Clear validation errors on typing
        form.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                e.target.closest('.form-group').classList.remove('invalid');
            }
        });
    }
});