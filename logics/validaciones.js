const claveAdmin="ICRCV1717";

function corregir(){

window.location.href="candidatos.html";

}

function confirmarVoto(){

let seleccion=JSON.parse(localStorage.getItem("seleccion"));

let votos=JSON.parse(localStorage.getItem("votos"));

seleccion.forEach(c=>votos[c]++);

localStorage.setItem("votos",JSON.stringify(votos));

alert("Voto registrado");

window.location.href="candidatos.html";

}

function pedirClave(){

let clave=prompt("Ingrese clave de administrador");

if(clave===claveAdmin){

window.location.href="resultados.html";

}else{

alert("Clave incorrecta");

}

}