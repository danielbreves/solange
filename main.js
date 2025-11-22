// Intercept form submission and post to webhook
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('wf-form-Mensagens-Form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        mensagem: formData.get('mensagem'),
        'cf-turnstile-response': formData.get('cf-turnstile-response')
      };
      
      // Get success and fail divs
      const successDiv = document.querySelector('.w-form-done');
      const failDiv = document.querySelector('.w-form-fail');
      
      // Post to webhook
      fetch('https://hook.eu1.make.com/gwaxm4ctszncbw7rryf98612gsre9fnb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          console.log('Form submitted successfully');
          // Hide form and fail div, show success div
          form.style.display = 'none';
          failDiv.style.display = 'none';
          successDiv.style.display = 'block';
        } else {
          console.error('Form submission failed');
          // Hide form and success div, show fail div
          form.style.display = 'none';
          successDiv.style.display = 'none';
          failDiv.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Hide form and success div, show fail div
        form.style.display = 'none';
        successDiv.style.display = 'none';
        failDiv.style.display = 'block';
      });
    });
  }
});