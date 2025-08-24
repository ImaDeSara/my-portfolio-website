document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form and status message elements
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    // Listen for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state on the submit button
        const submitBtn = form.querySelector('input[type="submit"]');
        const originalValue = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        // Show status message while sending
        formStatus.style.display = 'block';
        formStatus.className = 'status-message status-info';
        formStatus.textContent = 'Sending your message...';
        
        // Send form data to Formspree using fetch API
        fetch('https://formspree.io/f/xqadzbll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Check if the response is successful
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            // Show success message
            formStatus.className = 'status-message status-success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            
            // Reset the form fields
            form.reset();
        })
        .catch(error => {
            // Show error message if sending fails
            formStatus.className = 'status-message status-error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            console.error('Error:', error);
        })
        .finally(() => {
            // Restore submit button state
            submitBtn.value = originalValue;
            submitBtn.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    });
});