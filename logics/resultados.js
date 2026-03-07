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

async function generarPDF(){

const {jsPDF} = window.jspdf;

const elemento = document.body;

const canvas = await html2canvas(elemento);

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF("p","mm","a4");

const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

pdf.addImage(imgData,"PNG",0,0,pdfWidth,pdfHeight);

pdf.save("resultados.pdf");

}