document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    alert(`Gracias por registrarte, ${name}! Te hemos enviado un correo de confirmación a ${email}.`);
    
    // Aquí puedes agregar código para enviar los datos del formulario a un servidor
});
