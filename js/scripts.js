const   formulario = document.getElementById('formulario'),
        inputs = document.querySelectorAll('input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

// Función validar formulario.
const validarFormulario = e => {
    switch (e.target.name) {
        case 'usuario':
            validarCampo(expresiones.usuario, e.target, 'usuario')
        break;
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre')
        break;
        case 'password':
            validarCampo(expresiones.password, e.target, 'password')
            validarPassword2()
        break;
        case 'password2':
            validarPassword2()
        break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo')
        break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono')
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
        document.getElementById(`icon-validacion__${campo}`).classList.add('fa-check-circle')
        document.getElementById(`icon-validacion__${campo}`).classList.remove('fa-times-circle')
        document.getElementById(`text-error__${campo}`).classList.remove('formulario__input-error--activo')
        campos[campo] = true
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.getElementById(`icon-validacion__${campo}`).classList.remove('fa-check-circle')
        document.getElementById(`icon-validacion__${campo}`).classList.add('fa-times-circle')
        document.getElementById(`text-error__${campo}`).classList.add('formulario__input-error--activo')
        campos[campo] = false
    }
}

const validarPassword2 = () => {
    const inputPassword = document.getElementById('password')
    const inputPassword2 = document.getElementById('password2')

    if (inputPassword.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto')
        document.getElementById(`icon-validacion__password2`).classList.remove('fa-check-circle')
        document.getElementById(`icon-validacion__password2`).classList.add('fa-times-circle')
        document.getElementById(`text-error__password2`).classList.add('formulario__input-error--activo')
        campos.password = false
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto')
        document.getElementById(`icon-validacion__password2`).classList.add('fa-check-circle')
        document.getElementById(`icon-validacion__password2`).classList.remove('fa-times-circle')
        document.getElementById(`text-error__password2`).classList.remove('formulario__input-error--activo')
        campos.password = true
    }
}


inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


// Previniendo el envío de datos del formulario.
formulario.addEventListener('submit', e => {
    e.preventDefault()

    // Captura de Términos y Condiciones para validación del reset()
    const terminos = document.getElementById('terminos')

    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {

        // Reset del formulario.
        formulario.reset()

        // Desplegando el mensaje de formulario enviado exitosamente.
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito--activo')

        // Eliminando el mensaje de formulario enviado exitosamente.
        setTimeout(() => {
        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito--activo')
        }, 5000)

        // Eliminando la clase 'formulario__grupo-correcto'...
        // ... para eliminar el ícono verde al final del reset() del formulario.
        document.querySelectorAll('.formulario__grupo-correcto').forEach(icono => {
            icono.classList.remove('formulario__grupo-correcto')
        })

    } else {
        // Desplegando el mensaje de error de llenar el formulario correctamente.
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje--activo')

        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje--activo')
        }, 5000)
    }
})

