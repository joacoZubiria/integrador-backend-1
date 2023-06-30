window.addEventListener('load', function () {

    const formulario = document.querySelector('#add-new-turno');
    const $eliminarFormulario = document.getElementById('eliminar');
    const $eliminarInput = document.querySelector('#eliminarInput');
    const $buscarFormulario = document.getElementById('buscarTurno');
    const $buscarInput = document.getElementById('buscarInput');
const $actualizarFormulario = document.getElementById('put-turno');

    $actualizarFormulario.addEventListener('submit', e => {
    e.preventDefault();
            const formData = {
                id:document.querySelector ('#idPut').value,
               paciente:document.querySelector('#paciente-idPut').value,
               odontologo:document.querySelector('#odontologo-idPut').value,
               fechaYHora:document.querySelector('#fechahoraPut').value,
            };

            const url = '/turnos/actualizar';
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }

            fetch(url, settings)
                .then(response => {
                response.json();
                })
                .then(data => {
                     console.log(data);
                     resetUploadForm();
                })
                .catch(error => {
                   console.log(error);
                   resetUploadForm();
                })


        function resetUploadForm(){
            document.querySelector('#paciente-idPut').value = "";
            document.querySelector('#odontologo-idPut').value = "";
            document.getElementById('fechahoraPut').value = "";
        }
    })
    $buscarFormulario.addEventListener('submit', e => {
        e.preventDefault();

        let turnoABuscar = null;
        turnoABuscar = $buscarInput.value;

        fetch('/turnos/' + turnoABuscar)
        .then(res => res.json())
        .then(res => {
        console.log(res);
            const turnoEncontrado = document.createElement('div');
            turnoEncontrado.textContent = res.odontologo + " " + res.paciente
            + " " + res.fechaYHora;
            $buscarFormulario.appendChild(turnoEncontrado);
        })
        .catch(err => console.log(err));
    })

    $eliminarFormulario.addEventListener('submit', e => {
        e.preventDefault();
        let turnoAEliminar = null;
        turnoAEliminar = $eliminarInput.value;
        fetch('/turnos/eliminar/' + turnoAEliminar , {
        method:'DELETE'
        })
        .then(res => {
        res.ok ? console.log('Turno eliminado') : console.error('Error al eliminar el turno');
        })
        .catch(err => console.log(err));
    })

    formulario.addEventListener('submit', function (event) {
            event.preventDefault();

            const formDataTurnos = {
                odontologo: document.querySelector('#odontologo-id').value,
                paciente: document.querySelector('#paciente-id').value,
                fechaYHora: document.querySelector('#fechaYHora').value,

            };

            const url = '/turnos/registrar';
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataTurnos)
            }

            fetch(url, settings)
                .then(response => {
                response.json()
                })
                .then(data => {
                   console.log(data);
                   resetUploadForm();
                })
                .catch(error => {
                        console.log(error);
                         resetUploadForm();
                })

    function resetUploadForm(){
        document.querySelector('#paciente-id').value = "";
        document.querySelector('#odontologo-id').value = "";
         document.querySelector('#fechaYHora').value = "";
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "./turnoList.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
});
});