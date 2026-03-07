const claveAdmin="adm1717";

mostrarResultados();

function mostrarResultados(){

let votos=JSON.parse(localStorage.getItem("votos"));

let nombres=Object.keys(votos);

let valores=Object.values(votos);

new Chart(document.getElementById("bar"),{

type:"bar",

data:{
labels:nombres,
datasets:[{label:"Votos",data:valores}]
}

});

new Chart(document.getElementById("pie"),{

type:"pie",

data:{
labels:nombres,
datasets:[{data:valores}]
}

});

let ranking=nombres
.map(n=>({nombre:n,votos:votos[n]}))
.sort((a,b)=>b.votos-a.votos);

let html="<h2>Ranking</h2><ol>";

ranking.forEach(r=>{
html+=`<li>${r.nombre} - ${r.votos} votos</li>`;
});

html+="</ol>";

document.getElementById("ranking").innerHTML=html;

}

function reiniciarVotos(){

let clave=prompt("Ingrese clave de administrador");

if(clave===claveAdmin){

let votos=JSON.parse(localStorage.getItem("votos"));

Object.keys(votos).forEach(k=>{
votos[k]=0;
});

localStorage.setItem("votos",JSON.stringify(votos));

alert("Votos reiniciados");

window.location.href = "../index.html";

}else{

alert("Clave incorrecta");

}

}

function generarPDF(){

const {jsPDF}=window.jspdf;

let doc=new jsPDF();

let votos=JSON.parse(localStorage.getItem("votos"));

let y=20;

doc.text("Resultados Elección Diáconos ICRCV",20,y);

y+=10;

Object.entries(votos)
.sort((a,b)=>b[1]-a[1])
.forEach(([n,v])=>{

doc.text(`${n}: ${v} votos`,20,y);

y+=10;

});

doc.save("resultados.pdf");

}