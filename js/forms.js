document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    if (!form) return;

    const statusBox = document.getElementById('form-status');
    const serviceSelect = document.getElementById('service');
    const serviceContext = document.getElementById('service-context');

    const updateServiceContext = () => {
        if (!serviceSelect || !serviceContext) return;

        const selectedValue = serviceSelect.value;
        const message = selectedValue === 'Vehicle Batteries' || selectedValue === 'Civil Servant Programme'
            ? 'Please provide your vehicle/product requirements and our team will get back to you.'
            : '';

        serviceContext.textContent = message;
        serviceContext.hidden = !message;
        serviceContext.classList.toggle('visible', Boolean(message));
    };

    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateServiceContext);
        updateServiceContext();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let valid = true;
        const fields = form.querySelectorAll('input, select, textarea');

        fields.forEach((field) => {
            const group = field.closest('.form-group');
            const hasValue = field.value.trim();

            if (!field.checkValidity() || !hasValue) {
                valid = false;
                if (group) group.classList.add('invalid');
            } else if (group) {
                group.classList.remove('invalid');
            }
        });

        if (!valid) {
            if (statusBox) {
                statusBox.textContent = 'Please complete all required fields before sending your enquiry.';
                statusBox.classList.add('visible');
            }
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // TODO: Replace this local simulation with a real form backend such as Formspree or an email API.

        if (statusBox) {
            statusBox.textContent = 'Thank you. Your enquiry has been prepared locally for review and can be connected to a real email backend later.';
            statusBox.classList.add('visible');
        }

        setTimeout(() => {
            form.reset();
            updateServiceContext();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1200);
    });

    form.addEventListener('input', (event) => {
        const target = event.target;
        const group = target.closest('.form-group');
        if (group) group.classList.remove('invalid');
    });
});