let message = document.getElementById("Data");
message.addEventListener("input", function handleChange(event) {
  CreateMatrix(event.target.value);
});
let real_matrix = []
let df = 0
function CreateMatrix(text) {
  let totol = 0
  let metr = text.split("\n");
  let metrit=metr.filter((line)=>{
    return (line.trim()!="")
  })
  metrit[metrit.length]="\n"
  metrit[0] += "|Total";
  for (let i = 1; i < metrit.length; i++) {
    metrit[i] += "|0";
  }
  real_matrix = metrit.map((el) => el.split("|").map((el) => el.trim().length>0? el.trim() : el=0));
  for (let row = 1; row < real_matrix.length; row++) {
    let total = 0;
    for (let col = 1; col < real_matrix[row].length - 1; col++) {
      total += Number(real_matrix[row][col]);
    }
    real_matrix[row][real_matrix[row].length - 1] = total;
    totol += total
  }
  if(real_matrix[real_matrix.length - 1].length<real_matrix[real_matrix.length - 2].length){
    real_matrix[real_matrix.length - 1]=[]
    real_matrix[real_matrix.length - 1].push("Total")
    for (let col = 1; col < real_matrix[0].length - 1; col++) {
        let total = 0;
        for (let row = 1; row < real_matrix.length-1; row++) {
            total += Number(real_matrix[row][col])
        }
        real_matrix[real_matrix.length - 1].push(total);
    }
  }
  real_matrix[real_matrix.length - 1].push(totol);
  df = (real_matrix.length-3)*(real_matrix[1].length-3)
  CreateTableObs()
  CreateTableExp()
  CreateChiSquare()
}

let tblname = document.querySelector("#TableHead").value 
function CreateTableObs(){
  let table = document.querySelector("#table_obs");
  table.innerHTML=""
  html = ``;
  for (let i = 0; i < real_matrix.length ; i++) {
    let yach = ``;
    for (let j = 0; j < real_matrix[i].length; j++) {
        yach += `<td ">${real_matrix[i][j]}</td>`;
    }
    html += `<tr> ${yach}</tr>`;
  }    
  let thead = document.querySelector("#thead_obs")
  thead.innerHTML = 
  `<td colspan="${real_matrix[1].length}" style="border:1px solid black; ">${tblname}</td>`
  table.innerHTML = html;
}

function CreateTableExp(){
  let table = document.querySelector("#table_exp");
  table.innerHTML=""
  html = ``;
  for (let i = 0; i < real_matrix.length ; i++) {
    let yach = ``;
    for (let j = 0; j < real_matrix[i].length; j++) {
        if(i>0 && j>0 && i<real_matrix.length && j<real_matrix[0].length){
          let E = real_matrix[real_matrix.length-1][j]*real_matrix[i][real_matrix[i].length-1]/real_matrix[real_matrix.length-1][real_matrix[real_matrix.length-1].length-1]
          yach += `<td ">${E.toFixed(2)}</td>`;
        }
        else{
          yach += `<td ">${real_matrix[i][j]}</td>`;
        }        
    }
    html += `<tr> ${yach}</tr>`;
  }    
  let thead = document.querySelector("#thead_exp")
  thead.innerHTML = 
  `<td colspan="${real_matrix[1].length}" style="border:1px solid black; ">${tblname} expected values</td>`
  table.innerHTML = html;
}
function CreateChiSquare(){
  let table = document.querySelector("#table_chi");
  table.innerHTML=""
  html = ``;
  console.table(real_matrix)
  for (let i = 0; i < real_matrix.length ; i++) {
    let yach = ``;
    for (let j = 0; j < real_matrix[i].length; j++) {
        if(i>0 && j>0 && i<real_matrix.length && j<real_matrix[0].length){
          let E = real_matrix[real_matrix.length-1][j]*real_matrix[i][real_matrix[i].length-1]/real_matrix[real_matrix.length-1][real_matrix[real_matrix.length-1].length-1]
          yach += `<td ">${((real_matrix[i][j] - E.toFixed(2))**2/E).toFixed(2)}</td>`;
        }
        else{
          yach += `<td ">${real_matrix[i][j]}</td>`;
        }        
    }
    html += `<tr> ${yach}</tr>`;
  }    
  let thead = document.querySelector("#thead_chi")
  thead.innerHTML = 
  `<td colspan="${real_matrix[1].length}" style="border:1px solid black; ">${tblname} expected values</td>`
  table.innerHTML = html;
}