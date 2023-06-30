window.addEventListener('load', function () {

    const formulario = document.querySelector('#add_new_odontologo');
    const $eliminarFormulario = document.getElementById('eliminar');
    const $eliminarInput = document.querySelector('#eliminarInput');
    const $buscarFormulario = document.getElementById('buscarOdontologo');
    const $buscarInput = document.getElementById('buscarInput');
const $actualizarFormulario = document.getElementById('put-odontologo');

    $actualizarFormulario.addEventListener('submit', e => {
    e.preventDefault();

            const formDataOdontologo = {
                id: document.querySelector('#idPut').value,
                nombre: document.querySelector('#nombrePut').value,
                apellido: document.querySelector('#apellidoPut').value,
                matricula: document.getElementById('matriculaPut').value,
            };

            const url = '/odontologos/actualizar';
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataOdontologo)
            }

            fetch(url, settings)
                .then(response => {
                response.json()
                })
                .then(data => {
                console.log(data);
                     console.log(data);
                     resetUploadForm();

                })
                .catch(error => {
                   console.log(error);
                   resetUploadForm();
                })


        function resetUploadForm(){
            document.querySelector('#nombrePut').value = "";
            document.querySelector('#apellidoPut').value = "";
            document.getElementById('matriculaPut').value = "";
        }
    })
    $buscarFormulario.addEventListener('submit', e => {
        e.preventDefault();

        let odontologoABuscar = null;
        odontologoABuscar = $buscarInput.value;

        fetch('/odontologos/odontologo/' + odontologoABuscar)
        .then(res => res.json())
        .then(res => {
            const odontologoEncontrado = document.createElement('div');
            odontologoEncontrado.textContent = res.nombre + " " + res.apellido + " " + res.matricula;
            $buscarFormulario.appendChild(odontologoEncontrado);
        })
        .catch(err => console.log(err));
    })

    $eliminarFormulario.addEventListener('submit', e => {
        e.preventDefault();
        let odontologoAEliminar = null;
        odontologoAEliminar = $eliminarInput.value;
        fetch('/odontologos/eliminar/' + odontologoAEliminar , {
        method:'DELETE'
        })
        .then(res => {
        res.ok ? console.log('Odontologo eliminado') : console.error('Error al eliminar el odontólogo');
        })
        .catch(err => console.log(err));
    })

    formulario.addEventListener('submit', function (event) {


        const formData = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            matricula: document.querySelector('#matricula').value,

        };

        const url = '/odontologos/registrar';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                 resetUploadForm();

            })
            .catch(error => {
            console.log(error);
            });


    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
         document.querySelector('#matricula').value = "";
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "./odontologoList.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
});
});
