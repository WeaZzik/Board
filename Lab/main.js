var Money = 0;
var Multiplier = 1;
var MoneyAdded = 1;
var ClickTotal = 0;
var Combo = 0;
var ObjectRadius = 150;
var ObjectXloc = 883;
var ObjectYloc = 350;
var AnimatedDiminution = 10;
var pop1 = new Audio('assets/pop1.mp3');
var pop2 = new Audio('assets/pop2.wav');
var MultiSound = new Audio('assets/MultiSound.wav');
var ScreenWidth = window.innerWidth;

window.onload = function() {
    var DataSaved = localStorage.getItem('DataSaved');
    window.addEventListener('resize', reportWindowSize);
    if (DataSaved == "Yes"){
        DataSaved = "No";
        Money = parseInt(localStorage.getItem('Money'));
        MoneyAdded = parseInt(localStorage.getItem('MoneyAdded'));
        Multiplier = parseInt(localStorage.getItem('Multiplier'));
        Combo = parseInt(localStorage.getItem('Combo'));
        ClickTotal = parseInt(localStorage.getItem('ClickTotal'));
        document.getElementById("money").innerHTML = Money;
        document.getElementById("multiplier").innerHTML = Multiplier;
        document.getElementById("clicktotal").innerHTML = ClickTotal;
        document.getElementById("combo").innerHTML = Combo;
    }
    document.getElementById("lab").style.height = ObjectRadius;
    document.getElementById("lab").style.width = ObjectRadius;
    document.getElementById("lab").style.left = ObjectXloc;
    document.getElementById("lab").style.top = ObjectYloc;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function AddMoney(){
    Money = Money + MoneyAdded * Multiplier;
    ClickTotal = ClickTotal + 1;
    Combo = Combo + 1;
    if (Combo == 100){
        Combo = 0;
        Multiplier = Multiplier + 1;
        MultiSound.play();
    }
    var randombin = getRandomInt(2);
    if (randombin == 0){
        if (pop1.paused == true){
            pop1.play();
        }else{
            pop2.play();
        }
    }else if (randombin == 1){
        if (pop2.paused == true){
            pop2.play();
        }else{
            pop1.play();
        }
    }

    document.getElementById("money").innerHTML = Money;
    document.getElementById("multiplier").innerHTML = Multiplier;
    document.getElementById("clicktotal").innerHTML = ClickTotal;
    document.getElementById("combo").innerHTML = Combo;
    document.getElementById("lab").style.height = ObjectRadius - AnimatedDiminution;
    document.getElementById("lab").style.width = ObjectRadius - AnimatedDiminution;
    document.getElementById("lab").style.left = ObjectXloc + AnimatedDiminution / 2;
    document.getElementById("lab").style.top = ObjectYloc + AnimatedDiminution / 2;
    setTimeout(function(){
        document.getElementById("lab").style.height = ObjectRadius;
        document.getElementById("lab").style.width = ObjectRadius;
        document.getElementById("lab").style.left = ObjectXloc;
        document.getElementById("lab").style.top = ObjectYloc;
    }, 50);
    var GameWidth = window.innerWidth - 151;
    var GameHeight = window.innerHeight - 151 - (window.innerHeight*12/100);
    ObjectXloc = getRandomArbitrary(0, GameWidth);
    ObjectYloc = getRandomArbitrary(0, GameHeight);
    ObjectRadius = getRandomArbitrary(30, 150);
    AnimatedDiminution = ObjectRadius / 10;
}
window.onbeforeunload = function(){
    localStorage.setItem('DataSaved', 'Yes');
    localStorage.setItem('Multiplier', Multiplier);
    localStorage.setItem('Money', Money);
    localStorage.setItem('MoneyAdded', MoneyAdded);
    localStorage.setItem('Combo', Combo);
    localStorage.setItem('ClickTotal', ClickTotal);
 }

function ClearData(){
    localStorage.clear();
    Money = 0;
    Multiplier = 1;
    MoneyAdded = 1;
    ClickTotal = 0;
    Combo = 0;
    document.getElementById("money").innerHTML = Money;
    document.getElementById("multiplier").innerHTML = Multiplier;
    document.getElementById("clicktotal").innerHTML = ClickTotal;
    document.getElementById("combo").innerHTML = Combo;
    alert('Suppression de la sauvegarde réussie.')
}
function reportWindowSize(){
    ScreenWidth = window.innerWidth;
    if ((ScreenWidth !== 1920) && (ScreenWidth !== 1366) && (ScreenWidth !== 800) && (ScreenWidth !== 1440) && (ScreenWidth !== 1280)){
        alert("This game is not yet fully responsive with this screen Resolution !")
    }
}