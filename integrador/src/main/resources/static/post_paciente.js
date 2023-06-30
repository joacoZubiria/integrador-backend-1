window.addEventListener('load', function () {

    const formulario = document.querySelector('#add_new_paciente');
    const $eliminarFormulario = document.getElementById('eliminar');
    const $eliminarInput = document.querySelector('#eliminarInput');
    const $buscarFormulario = document.getElementById('buscarPaciente');
    const $buscarInput = document.getElementById('buscarInput');
    const $actualizarFormulario = document.getElementById('put-paciente');

    $actualizarFormulario.addEventListener('submit', e => {
    e.preventDefault();
    const formDataDomicilio = {
           calle: document.querySelector('#callePut').value,
           numero: document.querySelector('#numeroPut').value,
           localidad: document.querySelector('#localidadPut').value,
           provincia: document.querySelector('#provinciaPut').value,
           };

            const formDataPaciente = {
                id: document.querySelector('#idPut').value,
                nombre: document.querySelector('#nombrePut').value,
                apellido: document.querySelector('#apellidoPut').value,
                dni: document.getElementById('dniPut').value,
                fechaIngreso: document.querySelector('#fechaingresoPut').value,
                domicilio: formDataDomicilio,
            };

            const url = '/pacientes/actualizar';
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataPaciente)
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
            document.getElementById('dniPut').value = "";
            document.querySelector('#fechaingresoPut').value= "";
            document.querySelector('#callePut').value= "";
            document.querySelector('#localidadPut').value= "";
            document.querySelector('#provinciaPut').value= "";
            document.querySelector('#numeroPut').value= "";
        }
    })
    $buscarFormulario.addEventListener('submit', e => {
        e.preventDefault();

        let pacienteABuscar = null;
        pacienteABuscar = $buscarInput.value;

        fetch('/pacientes/' + pacienteABuscar)
        .then(res => res.json())
        .then(res => {
            const pacienteEncontrado = document.createElement('div');
            pacienteEncontrado.textContent = res.nombre + " " + res.apellido + " " + res.dni + res.domicilio.calle;
            $buscarFormulario.appendChild(pacienteEncontrado);
        })
        .catch(err => console.log(err));
    })

    $eliminarFormulario.addEventListener('submit', e => {
        e.preventDefault();
        let pacienteAEliminar = null;
        pacienteAEliminar = $eliminarInput.value;
        fetch('/pacientes/eliminar/' + pacienteAEliminar , {
        method:'DELETE'
        })
        .then(res => {
        res.ok ? console.log('Paciente eliminado') : console.error('Error al eliminar el paciente');
        })
        .catch(err => console.log(err));
    })

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

       const formDataDomicilio = {
       calle: document.querySelector('#calle').value,
       numero: document.querySelector('#numero').value,
       localidad: document.querySelector('#localidad').value,
       provincia: document.querySelector('#provincia').value,
       };

        const formDataPaciente = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            dni: document.getElementById('dni').value,
            fechaIngreso: document.querySelector('#fechaingreso').value,
            domicilio: formDataDomicilio,
        };

        const url = '/pacientes/registrar';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataPaciente)
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
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
        document.getElementById('dni').value = "";
        document.querySelector('#fechaingreso').value= "";
        document.querySelector('#calle').value= "";
        document.querySelector('#localidad').value= "";
        document.querySelector('#provincia').value= "";
        document.querySelector('#numero').value= "";
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "./pacienteList.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
})
});