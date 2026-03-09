const candidatos = [
    { nombre: "Fernando Castañeda", foto: "../Candidatos/FernandoCastañeda.JPG" },
    { nombre: "Gustavo Abila", foto: "../Candidatos/GustavoAvila.JPG" },
    { nombre: "Jaime Castiblanco", foto: "../Candidatos/JaimeCastiblanco.JPG" },
    { nombre: "Jhonatan Osorio", foto: "../Candidatos/JhonatanOsorio.JPG" },
    { nombre: "Robinson Aristizabal", foto: "../Candidatos/RobinsonAristizabal.JPG" },
    { nombre: "Steban Osorio", foto: "../Candidatos/StebanOsorio.JPG" },
    { nombre: "Wilder Arce", foto: "../Candidatos/WilderArce.JPG" },
    { nombre: "Yaisinio Cruz", foto: "../Candidatos/YaisinioCruz.JPG" }
];

let seleccion = [];

if (!localStorage.getItem("votos")) {

    let base = {};

    candidatos.forEach(c => {
        base[c.nombre] = 0;
    });

    localStorage.setItem("votos", JSON.stringify(base));
}

const contenedor = document.getElementById("candidatos");

candidatos.forEach(c => {

    let div = document.createElement("div");

    div.className = "card";

    div.innerHTML = `
<img src="${c.foto}">
<h3>${c.nombre}</h3>
`;

    div.onclick = () => seleccionar(c.nombre, div);

    contenedor.appendChild(div);

});

function seleccionar(nombre, card) {

    if (seleccion.includes(nombre)) {

        seleccion = seleccion.filter(n => n !== nombre);

        card.classList.remove("selected");

        return;

    }

    if (seleccion.length >= 2) {

        alert("Solo puedes elegir máximo 2 candidatos");

        return;

    }

    seleccion.push(nombre);

    card.classList.add("selected");

}

function irConfirmacion() {

    localStorage.setItem("seleccion", JSON.stringify(seleccion));

    window.location.href = "validaciones.html";

}