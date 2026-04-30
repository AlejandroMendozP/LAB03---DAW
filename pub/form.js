const btnActualizar = document.getElementById("actualizar");
const contenedor = document.getElementById("eventoProgramado");

const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");
const inputDesc = document.getElementById("descripcion");

const totalEventosInput = document.querySelector(".total input");
const fechasUnicasInput = document.querySelector(".unicas input");

let eventos = [];

btnActualizar.addEventListener("click", () => {
    const fecha = inputFecha.value;
    const hora = inputHora.value;
    const descripcion = inputDesc.value;

    if (!fecha || !hora || !descripcion) {
        alert("Completa todos los campos");
        return;
    }

    const evento = { fecha, hora, descripcion };
    eventos.push(evento);

    renderEventos();
    actualizarEstadisticas();

    inputFecha.value = "";
    inputHora.value = "";
    inputDesc.value = "";
});
function renderEventos() {
    contenedor.innerHTML = "";

    eventos.forEach((ev, index) => {
        const div = document.createElement("div");
        div.classList.add("evento-item");

        // contenedor izquierdo (texto)
        const info = document.createElement("div");
        info.classList.add("evento-info");

        info.innerHTML = `
            <p><strong>📅 ${ev.fecha}</strong> - ⏰ ${ev.hora}</p>
            <p>${ev.descripcion}</p>
        `;

        // contenedor derecho (botones)
        const acciones = document.createElement("div");
        acciones.classList.add("evento-acciones");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-editar");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");

        btnEliminar.addEventListener("click", () => {
            eventos.splice(index, 1);
            renderEventos();
            actualizarEstadisticas();
        });

        btnEditar.addEventListener("click", () => {
            inputFecha.value = ev.fecha;
            inputHora.value = ev.hora;
            inputDesc.value = ev.descripcion;

            eventos.splice(index, 1);
            renderEventos();
            actualizarEstadisticas();
        });

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);

        div.appendChild(info);
        div.appendChild(acciones);

        contenedor.appendChild(div);
    });
}

function actualizarEstadisticas() {
    totalEventosInput.value = eventos.length;

    const fechas = eventos.map(e => e.fecha);
    const fechasUnicas = new Set(fechas);

    fechasUnicasInput.value = fechasUnicas.size;
    
}