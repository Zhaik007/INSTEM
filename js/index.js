let btn = document.querySelector("#GenotypeBtb");
btn.addEventListener("click", nigawork);

let table = document.querySelector("#table");
let html = ``;

let clearBtn = document.querySelector("#clearTable");
clearBtn.addEventListener("click", clearDatawithin);

let colors = [];
function interpolateColor(start, end, steps, step) {
  const interpolateChannel = (channelStart, channelEnd, step, steps) => {
    return Math.round(
      channelStart + ((channelEnd - channelStart) * step) / steps
    );
  };
  const r = interpolateChannel(start[0], end[0], step, steps);
  const g = interpolateChannel(start[1], end[1], step, steps);
  const b = interpolateChannel(start[2], end[2], step, steps);
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}
function generateRainbowColors(numColors) {
  const colors = [];
  const rainbowColors = [
    [246, 85, 85], // Red
    [246, 179, 85], // Orange
    [219, 246, 85], // Yellow
    [126, 246, 85], // Green
    [85, 166, 246], // Blue
    [85, 115, 246], // Indigo
    [99, 85, 246], // Violet 
  ];
  const numSections = rainbowColors.length - 1;
  for (let i = 0; i < numColors; i++) {
    const section = Math.floor((i * numSections) / numColors);
    const sectionStep = (i * numSections) / numColors - section;
    const startColor = rainbowColors[section];
    const endColor = rainbowColors[section + 1];
    const color = interpolateColor(startColor, endColor, 1, sectionStep);
    colors.push(color);
  }
  return colors;
}
// Print the list of colors in HEX format
for (const color of colors) {
  console.log(color);
}
let jauabi = [];
let bb = 0;
let gridwidth = 10;
function calculate(text) {
  gridwidth *= text.length;
  return gridwidth;
}
variants = [];
let variantics;
let spisokvar = [];
let phenspisok = [];
function countVar() {
  let ul = document.querySelector("#ul");
  variantics = [];
  let counts = [];
  let varvara = [];
  for (el of variants) {
    for (kel of el) {
      varvara.push(kel);
    }
  }
  for (el of varvara) {
    if (!variantics.includes(el)) {
      variantics.push(el);
    }
  }
  for (let i = 0; i < variantics.length; i++) {
    let cnt = 0;
    for (let j = 0; j < varvara.length; j++) {
      if (variantics[i] == varvara[j]) {
        cnt += 1;
      }
    }
    counts.push(cnt);
  }
  htm = ` `;
  colors = generateRainbowColors(variantics.length);
  for (let k = 0; k < variantics.length; k++) {
    htm += `<li>${variantics[k]} - ${
      (counts[k] / varvara.length) * 100
    } % <div style="width:10px;height:10px;background-color:${
      colors[k]
    };display:inline-block;"></div></li>`;
    let asr = { color: colors[k], genotype: variantics[k] };
    jauabi.push(asr);
    spisokvar.push({
      variant: variantics[k],
      percentage: (counts[k] / varvara.length) * 100,
      color: colors[k],
    });
  }
  ul.innerHTML = htm;
}
let sortAscbtn = document.querySelector("#sortAsc");
sortAscbtn.addEventListener("click", SortAsc);
let sortDescbtn = document.querySelector("#sortDesc");
sortDescbtn.addEventListener("click", SortDesc);
function sortedSpis() {
  let ul = document.querySelector("#ul");
  htm = ``;
  ul.innerHTML =htm
  jauabi = [];
  for (let k = 0; k < spisokvar.length; k++) {
    htm += `<li>${spisokvar[k].variant} - ${spisokvar[k].percentage} % <div style="width:10px;height:10px;background-color:${spisokvar[k].color};display:inline-block;"></div></li>`;
  }
  ul.innerHTML = htm;
}
function SortAsc() {
  spisokvar.sort((a, b) => {
    return a.percentage - b.percentage;
  });
  sortedSpis();
}
function SortDesc() {
  spisokvar.sort((a, b) => {
    return b.percentage - a.percentage;
  });
  sortedSpis();
}
function clearGrid() {
  table.innerHTML = ` `;
}
function clearData() {
  variantics = [];
  variants = [];
  let ul = document.querySelector("#ul");
  ul.innerHTML = ``;
  let phenul = document.querySelector("#phenul");
  phenul.innerHTML = ``;
  spisokvar=[]
}
function clearDatawithin() {
  variantics = [];
  variants = [];
  clearGrid();
}
function createGrid(x) {
  clearGrid();
  let fat = `<td style="padding:3px 3px;width:40px;height:40px;border:1px solid black;"><img src="img/gender.png" style="width:100%;height:100%;"> </td>`;
  for (let k = 0; k < akechi.length; k++) {
    fat += `<td style="border:1px solid black;">${mamasi[k]} </td>`;
  }
  html = `<tr> ${fat}</tr>`;
  for (let j = 0; j < x; j++) {
    let yach = `<td style="border:1px solid black;">${akechi[j]}</td>`;
    let cvet = "red";
    for (let i = 0; i < x; i++) {
      for (let k = 0; k < jauabi.length; k++) {
        // console.log(jauabi[k],variants[j][i])
        if (jauabi[k].genotype == variants[j][i]) cvet = jauabi[k].color;
      }
      yach += `<td style="background-color:${cvet};">${variants[j][i]}</td>`;
    }
    html += `<tr> ${yach}</tr>`;
    yach = ``;
  }
  table.innerHTML = html;
}
function nigawork() {
  clearGrid();
  clearData();
  let finp = document.querySelector("#First").value;
  let secinp = document.querySelector("#Second").value;
  if (finp.length != secinp.length) {
    alert("Niga");
  } else {
    akechi = [];
    mamasi = [];
    firstgamets = [];
    secgamets = [];
    //#Entered values distributed into pares in parents genotype
    for (let i = 0; i < finp.length; i += 2) {
      firstgamets.push([finp[i], finp[i + 1]]); //gamets of father
      secgamets.push([secinp[i], secinp[i + 1]]); //gamets of mother
    }
    //#Creating gamets for first parent
    for (let k = 0; k < Math.pow(2, finp.length / 2) / 2; k++) {
      for (let j = 0; j < 2; j++) {
        let s = "";
        akechi.push(s);
        // добавляем первый признак для всех комбинаций
      }
    }
  }
  // Массив пар букв
  var letterPairs = firstgamets;
  // Рекурсивная функция для генерации всех комбинаций
  function generateCombinations(index, currentCombination, combinations) {
    if (index === letterPairs.length) {
      combinations.push(currentCombination.slice()); // Добавляем текущую комбинацию в массив
      return;
    }
    for (var i = 0; i < 2; i++) {
      currentCombination[index] = letterPairs[index][i];
      generateCombinations(index + 1, currentCombination, combinations);
    }
  }
  // Создаем пустой массив для хранения комбинаций
  var allCombinations = [];
  // Вызываем функцию с начальными значениями
  generateCombinations(0, new Array(letterPairs.length), allCombinations);
  // Все комбинации теперь хранятся в массиве allCombinations
  for (let mem = 0; mem < akechi.length; mem++) {
    akechi[mem] = "";
    akechi[mem] = allCombinations[mem].join("");
  }
  //----------------------------------------------------------------------------------------------------------------
  //#Creating gamets for second parent
  for (let k = 0; k < Math.pow(2, finp.length / 2) / 2; k++) {
    for (let j = 0; j < 2; j++) {
      let s = secgamets[0][j];
      mamasi.push(s);
    }
  }

  //#Adding to the first half gamets other characteristics
  // Массив пар букв
  var letterPairses = secgamets;
  // Рекурсивная функция для генерации всех комбинаций
  function generateCombinationses(index, currentCombination, combinations) {
    if (index === letterPairses.length) {
      combinations.push(currentCombination.slice()); // Добавляем текущую комбинацию в массив
      return;
    }
    for (var i = 0; i < 2; i++) {
      currentCombination[index] = letterPairses[index][i];
      generateCombinationses(index + 1, currentCombination, combinations);
    }
  }
  // Создаем пустой массив для хранения комбинаций
  var allCombinationses = [];
  // Вызываем функцию с начальными значениями
  generateCombinationses(0, new Array(letterPairses.length), allCombinationses);
  // Все комбинации теперь хранятся в массиве allCombinations
  for (let mem = 0; mem < akechi.length; mem++) {
    mamasi[mem] = "";
    mamasi[mem] = allCombinationses[mem].join("");
  }
  let jol = [];
  for (let el = 0; el < akechi.length; el++) {
    for (let mel = 0; mel < mamasi.length; mel++) {
      let string = akechi[el] + mamasi[mel];
      let strlist = string.split("");
      strlist.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      for (let buk = 0; buk < strlist.length; buk += 2) {
        if (
          strlist[buk] == strlist[buk].toLowerCase() &&
          strlist[buk + 1] == strlist[buk + 1].toUpperCase()
        ) {
          [strlist[buk], strlist[buk + 1]] = [strlist[buk + 1], strlist[buk]];
        }
      }
      jol.push(strlist.join(""));
    }
    variants.push(jol);
    jol = [];
  }
  table.innerHTML = " ";
  countVar();
  createGrid(akechi.length);
  document.querySelector("#First").value = "";
  document.querySelector("#Second").value = "";
}
let sortAscPhenbtn = document.querySelector("#sortAscPhen");
sortAscPhenbtn.addEventListener("click", SortAscPhen);
let sortDescPhenbtn = document.querySelector("#sortDescPhen");
sortDescPhenbtn.addEventListener("click", SortDescPhen);
function sortedSpisPhen() {
  let phenul = document.querySelector("#phenul");
  let htm = ``;
  phenul.innerHTML=htm
  console.log(phenul.innerHTML)
  jauabi = [];
  for (let k = 0; k < spisokvar.length; k++) {
    if(phenspisok.includes(spisokvar[k].variant)){
    htm += `<li>${spisokvar[k].variant} - ${spisokvar[k].percentage} % <div style="width:10px;height:10px;background-color:${spisokvar[k].color};display:inline-block;"></div></li>`;}
  }
  phenul.innerHTML = htm;
}
function SortAscPhen() {
  spisokvar.sort((a, b) => {
    return a.percentage - b.percentage;
  });
  sortedSpisPhen();
}
function SortDescPhen() {
  spisokvar.sort((a, b) => {
    return b.percentage - a.percentage;
  });
  sortedSpisPhen();
}
let favcnt = 0;
let phen = document.querySelector("#phenotype");
phen.addEventListener("click", phenchik);
function phenchik() {
  let phenul = document.querySelector("#phenul");
  let phinp = document.querySelector("#phinput").value;
  document.querySelector("#phinput").value = "";
  clearGrid();
  phenspisok = [];
  let clrvariants = [];
  x = akechi.length;
  for (let j = 0; j < x; j++) {
    let clr = [];
    for (let i = 0; i < x; i++) {
      let checker = true;
      for (let k = 0; k < phinp.length; k++) {
        if(phinp[k].toUpperCase()==phinp[k]){
          if (!variants[j][i].includes(phinp[k])) {
            checker = false;
            break;
          }
      }
      if(phinp[k].toUpperCase()!=phinp[k]){
        if (!variants[j][i].includes(phinp[k]+phinp[k])) {
          checker = false;
          break;
        }
    }
    }
      if (checker) {
        clr.push("#40ad6c");
      } else {
        clr.push("white");
      }
    }
    clrvariants.push(clr);
  }
  let fat = `<td style="padding:3px 3px;width:40px;height:40px;border:1px solid black;"><img src="img/gender.png" style="width:100%;height:100%;"> </td>`;
  for (let k = 0; k < akechi.length; k++) {
    fat += `<td style="border:1px solid black;">${mamasi[k]} </td>`;
  }
  html = `<tr> ${fat}</tr>`;
  for (let j = 0; j < x; j++) {
    let yach = `<td style="border:1px solid black;">${akechi[j]}</td>`;
    let cvet = "red";
    for (let i = 0; i < x; i++) {
      for (let k = 0; k < jauabi.length; k++) {
        // console.log(jauabi[k],variants[j][i])
      }
      yach += `<td style="background-color:${clrvariants[j][i]};">${variants[j][i]}</td>`;
      if (clrvariants[j][i] == "#40ad6c") {
        if (!phenspisok.includes(variants[j][i])) {
          phenspisok.push(variants[j][i]);
        }
      }
    }
    html += `<tr> ${yach}</tr>`;
    yach = ``;
  }
  table.innerHTML = html;
  // clearData();
  variantics = [];
  let counts = [];
  let varvara = [];
  for (el of variants) {
    for (kel of el) {
      varvara.push(kel);
    }
  }
  for (el of varvara) {
    if (!variantics.includes(el)) {
      variantics.push(el);
    }
  }
  for (let i = 0; i < variantics.length; i++) {
    let cnt = 0;
    for (let j = 0; j < varvara.length; j++) {
      if (variantics[i] == varvara[j]) {
        cnt += 1;
      }
    }
    counts.push(cnt);
  }
  let binom = 0
  let htmka = ` `;
  phenul.innerHTML = htmka;
  colors = generateRainbowColors(variantics.length);
  for (let k = 0; k < variantics.length; k++) {
    if (phenspisok.includes(variantics[k])) {
      htmka += `<li>${variantics[k]} - ${
        (counts[k] / varvara.length) * 100
      } % <div style="width:10px;height:10px;background-color:${
        colors[k]
      };display:inline-block;"></div></li>`;
      let asr = { color: colors[k], genotype: variantics[k] };
      jauabi.push(asr);
      binom+=(counts[k] / varvara.length) * 100
    }
  }
  let chance = document.querySelector("#chances")
  chance.innerHTML="Шансы - "+binom.toFixed(2)+" %"
  phenul.innerHTML = htmka;
}
window.addEventListener('scroll', function() {
  let num = (window.scrollY/window.innerHeight)*15;
  document.getElementById('backimage').style.webkitFilter = 'blur(' + num + 'px)'
})
function factorialize(num) {
  var result = num;
  if (num === 0 || num === 1) 
    return 1; 
  while (num > 1) { 
    num--;
    result *= num;
  }
  return result;
}
let aibyn = document.querySelector("#Aibyn")
aibyn.addEventListener("click",PossibilityCounter)
function PossibilityCounter(){
  let bin = document.querySelector("#chances").innerHTML.toString()
  let bino = bin.split(" ")  
  console.log(bino)
  let bnom=bino.filter(function(el){
    return !isNaN(el);
  })
  console.log(bnom)
  let binom = bnom.map(function(val){
    return parseFloat(val)
  })
  console.log(binom)
  let k = Number(document.querySelector("#kun").value)
  let n = Number(document.querySelector("#nun").value)
  let possibility = 0
  for(let i=0;i<k;i++){
      possibility+=factorialize(n)/factorialize(n-i)/factorialize(i)*Math.pow(binom/100,i)*Math.pow(1-binom/100,n-i)
  }
  document.querySelector("#Possibility").textContent = `Вероятность ${((1- possibility)*100).toFixed(2)} %`
  document.querySelector("#kun").value = ""
  document.querySelector("#nun").value = ""
}