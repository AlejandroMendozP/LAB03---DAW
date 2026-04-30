const btnLista = document.getElementById("botonL");
const btnEstructura = document.getElementById("botonE");
const modoLista = document.getElementById("modoLista");
const vistaCalendario = document.getElementById("vistaCalendario");
const btnActualizar = document.getElementById("actualizar");
const contenedor = document.getElementById("modoLista");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");
const inputDesc = document.getElementById("descripcion");
const txtTotalEventos = document.getElementById("txtE");
const txtFechasUnicas = document.getElementById("txtF");
const antes = document.getElementById("antes");
const despues = document.getElementById("despues");
const cuadricula = document.getElementById("cuadricula");
const mesCabecera = document.getElementById("mes");
const semanaCabecera = document.getElementById("semana");
const cancelar = document.getElementById("cancelar");

let eventos = [];
let j = 0;
let editando = false;
let indiceEdicion = null;

const diasNombres = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

modoLista.style.display = "none";
vistaCalendario.style.display = "block";
mesCabecera.textContent = mesesNombres[j];

semanaCabecera.innerHTML = "";
for (let i = 0; i < diasNombres.length; i++) {
    const div = document.createElement("div");
    div.classList.add("estilo");
    div.style.fontWeight = "bold";
    div.textContent = diasNombres[i];
    semanaCabecera.append(div);
}

function actualizarInterfaz() {
    renderEventos();
    actualizarEstadisticas();
    generarDias(j);
}

function actualizarEstadisticas() {
    txtTotalEventos.textContent = eventos.length;
    const fechas = eventos.map(e => e.fecha);
    const unicas = new Set(fechas);
    txtFechasUnicas.textContent = unicas.size;
}

function renderEventos() {
    contenedor.innerHTML = "";
    eventos.forEach((ev, i) => {
        const item = document.createElement("div");
        item.classList.add("evento-item");
        item.innerHTML = `
            <div class="evento-info">
                <p><strong>📅 ${ev.fecha}</strong> | ⏰ ${ev.hora}</p>
                <p>${ev.descripcion}</p>
            </div>
            <div class="evento-acciones">
                <button class="btn-editar" onclick="prepararEdicion(${i})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarEvento(${i})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(item);
    });
}

function generarDias(mesIndice) {
    const primerDia = new Date(2026, mesIndice, 1).getDay();
    const ultimoDia = new Date(2026, mesIndice + 1, 0).getDate();
    cuadricula.innerHTML = "";

    for (let i = 0; i < primerDia; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("estilo");
        vacio.style.visibility = "hidden";
        cuadricula.append(vacio);
    }

    for (let i = 1; i <= ultimoDia; i++) {
        const caja = document.createElement("div");
        caja.classList.add("estilo");
        caja.textContent = i;
        const fechaID = `2026-${String(mesIndice + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        const tieneEvento = eventos.some(e => e.fecha === fechaID);
        if (tieneEvento) {
            caja.style.backgroundColor = "#ff4757";
            caja.style.color = "white";
        }
        cuadricula.append(caja);
    }
}

btnActualizar.addEventListener("click", async (e) => {
    e.preventDefault();
    const datos = { fecha: inputFecha.value, hora: inputHora.value, descripcion: inputDesc.value };

    if (!datos.fecha || !datos.hora || !datos.descripcion) return alert("Llena todo");

    if (editando) {
        const evViejo = eventos[indiceEdicion];
        await fetch('/eliminar', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fecha: evViejo.fecha, hora: evViejo.hora })
        });
        eventos[indiceEdicion] = datos;
        editando = false;
        btnActualizar.textContent = "Actualizar";
    } else {
        eventos.push(datos);
    }

    await fetch('/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    actualizarInterfaz();
    inputFecha.value = ""; inputHora.value = ""; inputDesc.value = "";
});

window.prepararEdicion = (i) => {
    const ev = eventos[i];
    inputFecha.value = ev.fecha;
    inputHora.value = ev.hora;
    inputDesc.value = ev.descripcion;
    editando = true;
    indiceEdicion = i;
    btnActualizar.textContent = "Guardar Cambios";
};

window.eliminarEvento = async (i) => {
    const ev = eventos[i];
    await fetch('/eliminar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: ev.fecha, hora: ev.hora })
    });
    eventos.splice(i, 1);
    actualizarInterfaz();
};

window.prepararEdicion = (i) => {
    const ev = eventos[i];
    inputFecha.value = ev.fecha;
    inputHora.value = ev.hora;
    inputDesc.value = ev.descripcion;
    editando = true;
    indiceEdicion = i;
    btnActualizar.textContent = "Actualizar";
};

antes.addEventListener("click", () => {
    if (j === 0) {
        j = 11;
    } else {
        j = j - 1;
    }
    mesCabecera.textContent = mesesNombres[j];
    generarDias(j);
});

despues.addEventListener("click", () => {
    if (j === 11) {
        j = 0;
    } else {
        j = j + 1;
    }
    mesCabecera.textContent = mesesNombres[j];
    generarDias(j);
});

btnLista.addEventListener("click", () => {
    modoLista.style.display = "block";
    vistaCalendario.style.display = "none";
});

btnEstructura.addEventListener("click", () => {
    modoLista.style.display = "none";
    vistaCalendario.style.display = "block";
});

cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    inputFecha.value = ""; inputHora.value = ""; inputDesc.value = "";
    editando = false;
    btnActualizar.textContent = "Actualizar";
});

actualizarInterfaz();