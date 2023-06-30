document.addEventListener("DOMContentLoaded", async e => {
    await fetch("http://localhost:8080/turnos/")
    .then(res => res.json())
    .then(res => {
        const $body = document.querySelector("body");
        res.forEach(el => {
            const div = document.createElement('div');
            div.textContent = "Id: "+ el.id + " | " + el.paciente +" " + el.odontologo + " "+ el.fechaYHora;
            $body.appendChild(div);
        })
        console.log(res)
    })
    .catch(e=>console.log(e))

})