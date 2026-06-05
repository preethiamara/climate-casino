let economy = 60;
let publicSupport = 60;
let climate = 60;
let year = 2025;

let currentEvent = null;
let choiceMade = false;
let spinning = false;


const symbols = ["🌍","🔥","🌊","🌪"];


const events = [
    {
    title:"Energy Crisis",
    optionA:{
    text:"Open Coal Plants",
    economy:15,
    climate:-12,
    public:5
    },
    optionB:{
    text:"Subsidize Renewables",
    economy:-8,
    climate:10,
    public:6
    }
    },

    {
    title:"Severe Drought",
    optionA:{
    text:"Build Desalination Plants",
    economy:-10,
    climate:-2,
    public:10
    },
    optionB:{
    text:"Restrict Water Usage",
    economy:-3,
    climate:5,
    public:-8
    }
    },

    {
    title:"Automaker Lobbying",
    optionA:{
    text:"Support Gas Vehicles",
    economy:12,
    climate:-10,
    public:2
    },
    optionB:{
    text:"Push EV Transition",
    economy:-6,
    climate:8,
    public:4
    }
    },

    {
    title:"Coastal Flooding",
    optionA:{
    text:"Build Sea Walls",
    economy:-8,
    climate:1,
    public:10
    },
    optionB:{
    text:"Relocate Communities",
    economy:-15,
    climate:6,
    public:-5
    }
    },

    {
    title:"Heatwave Summer",
    optionA:{
    text:"Expand Air Conditioning",
    economy:5,
    climate:-6,
    public:10
    },
    optionB:{
    text:"Fund Urban Cooling Projects",
    economy:-8,
    climate:8,
    public:6
    }
    },

    {
    title:"International Climate Summit",
    optionA:{
    text:"Commit to Emissions Cuts",
    economy:-5,
    climate:10,
    public:5
    },
    optionB:{
    text:"Delay Commitments",
    economy:6,
    climate:-8,
    public:-2
    }
    }

];



const ecoEl = document.getElementById("eco");
const pubEl = document.getElementById("pub");
const cliEl = document.getElementById("cli");
const yearEl = document.getElementById("year");
const logEl = document.getElementById("log");

const eventTitle = document.getElementById("eventTitle");
const choiceAButton = document.getElementById("choiceA");
const choiceBButton = document.getElementById("choiceB");

const spinButton = document.getElementById("spinButton");



function updateUI(){

    ecoEl.textContent = economy;
    pubEl.textContent = publicSupport;
    cliEl.textContent = climate;
    yearEl.textContent = "Year: " + year;

}



function generateEvent(){

    choiceMade = false;

    currentEvent =
    events[Math.floor(Math.random()*events.length)];

    eventTitle.textContent = currentEvent.title;

    choiceAButton.textContent =
    currentEvent.optionA.text;

    choiceBButton.textContent =
    currentEvent.optionB.text;
    checkEnd()
}

function applyChoice(option){

    if(choiceMade) return;

    choiceMade = true;

    economy += option.economy;
    climate += option.climate;
    publicSupport += option.public;

    updateUI();

    logEl.innerHTML =
    "Decision: " + option.text;

}

choiceAButton.onclick =
() => applyChoice(currentEvent.optionA);

choiceBButton.onclick =
() => applyChoice(currentEvent.optionB);



function spin(){

    if(!choiceMade) {
        logEl.innerHTML =
        "Choose a policy option first.";
        return;
    }

    if(spinning) return;

    spinning = true;

    let count = 0;

    const interval = setInterval(()=>{

    document.getElementById("reel0").textContent =
    symbols[Math.floor(Math.random()*4)];

    document.getElementById("reel1").textContent =
    symbols[Math.floor(Math.random()*4)];

    document.getElementById("reel2").textContent =
    symbols[Math.floor(Math.random()*4)];

    count++;

    if(count > 25)
    {
        clearInterval(interval);
        finishSpin();
    }

},100);

}

spinButton.onclick = spin;



function finishSpin(){

const result = [
Math.floor(Math.random()*4),
Math.floor(Math.random()*4),
Math.floor(Math.random()*4)
];

document.getElementById("reel0").textContent =
symbols[result[0]];

document.getElementById("reel1").textContent =
symbols[result[1]];

document.getElementById("reel2").textContent =
symbols[result[2]];

logEl.innerHTML =
"Result: " +
symbols[result[0]] +
symbols[result[1]] +
symbols[result[2]];

if(result.includes(1)){
    climate -= 5;
    logEl.innerHTML += "<br>🔥 Heatwave";
}

if(result.includes(2)){
    publicSupport -= 5;
    logEl.innerHTML += "<br>🌊 Flooding";
}

if(result.includes(3)){
    economy -= 5;
    climate -= 5;
    logEl.innerHTML += "<br>🌪 Storm Damage";
}

if(result[0]===0 &&
   result[1]===0 &&
   result[2]===0){

    climate += 10;
    economy += 5;

    logEl.innerHTML +=
    "<br>🌿 Stable Climate Year";
}

year += 5;

updateUI();

spinning = false;

checkEnd();

if(year <= 2100){
    generateEvent();
}

}



function checkEnd(){
let ending = "";
if(year < 2100)
{
    if (climate <= 0)
        ending = "Environment Collapsed"
    else if (economy <= 0)
        ending = "Economy Collapsed"
    else if (publicSupport <= 0)
        ending = "Government Overthrown"
    else 
        return;
}
else
{
    if(climate >= 70 && economy >= 70){
        ending =
        "🌍 Sustainable Future";
    }
    else if(climate < 40 && economy >= 70){
        ending =
        "💰 Prosperity Then Collapse";
    }
    else if(climate >= 70){
        ending =
        "🌱 Green Sacrifice";
    }
    else{
        ending =
        "💥 Climate Crisis";
    }
}

eventTitle.textContent =
"GAME OVER";

logEl.innerHTML =
"<h2>" + ending + "</h2>";

choiceAButton.style.display = "none";
choiceBButton.style.display = "none";
spinButton.style.display = "none";

}

function go_to_Acknowledge() 
{
    const button = document.getElementById('change');
    button.addEventListener('click', () => {
    window.location.href = 'acknowledge.html'; 
  });
}

function go_to_main(){
    const button = document.getElementById('change1');
    button.addEventListener('click', () => {
    window.location.href = 'index.html'; 
  });
}

function go_to_How()
{
    const button = document.getElementById('change3');
    button.addEventListener('click', () => {
    window.location.href = 'howToPlay.html'; 
  });
}

updateUI();
generateEvent();