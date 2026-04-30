const antes = document.getElementById("antes");
const despues = document.getElementById("despues");
const cuadricula = document.getElementById("cuadricula");
const mes = document.getElementById("mes");
const semana = document.getElementById("semana");
const btnLista = document.getElementById("botonL");
const btnEstructura = document.getElementById("botonE");
const modoLista = document.getElementById("modoLista");
const vistaCalendario = document.getElementById("vistaCalendario");

const dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
const meses=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

for(let i = 0; i < 7; i++){
    const caja = document.createElement("div");
    caja.classList.add("estilo");
    caja.textContent = dias[i];
    semana.append(caja);
}

modoLista.style.display = "none";
vistaCalendario.style.display = "block";

btnLista.addEventListener("click", () => {
    console.log("Cambiando a Lista");
    modoLista.style.display = "block";
    vistaCalendario.style.display = "none";
});

btnEstructura.addEventListener("click", () => {
    console.log("Cambiando a Estructura");
    modoLista.style.display = "none";
    vistaCalendario.style.display = "block";
});

mes.textContent = meses[0];
let j = 0;
antes.addEventListener("click", ()=>{
    if(j === 0){
        mes.textContent = meses[11];
        j = 11;
        generarDias(j);
    }
    else {
        mes.textContent = meses[j-1];
        j = j-1;
        generarDias(j);
    }
});

despues.addEventListener("click", ()=>{
    if(j === 11){
        mes.textContent = meses[0];
        j = 0;
        generarDias(j);
    }
    else {
        mes.textContent = meses[j+1];
        j = j+1;
        generarDias(j);
    }
});

function generarDias(indice){
    const primerDiaIndice = new Date(2026, indice, 1).getDay();
    const ultimoDia = new Date(2026, indice + 1, 0).getDate();

    cuadricula.innerHTML = "";

    for(let i = 0; i < primerDiaIndice; i++){
        const caja = document.createElement("div");
        caja.id = i;
        caja.classList.add("estilo");
        cuadricula.append(caja);
    }

    for(let i = 1; i <= ultimoDia; i++){
        const caja = document.createElement("div");
        caja.id = i;
        caja.classList.add("estilo");
        caja.textContent = i;
        cuadricula.append(caja);
    }
}
