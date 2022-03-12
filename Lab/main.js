var Money = 0;
var Multiplier = 1;
var MoneyAdded = 1;
var MoneyAddedPrice = 500;
var ClickTotal = 0;
var Combo = 0;
var ComboTime = 0;
var ComboState = false;
var ComboInterval = 0;
var ObjectRadius = 150;
var ObjectXloc = (window.innerWidth - 151) / 2;
var ObjectYloc = (window.innerHeight - 151 - (window.innerHeight*12/100)) / 2;
var AnimatedDiminution = 10;
var pop1 = new Audio('assets/pop1.mp3');
var pop2 = new Audio('assets/pop2.wav');
var MultiSound = new Audio('assets/MultiSound.wav');
var ComboBreakSound = new Audio('assets/ComboBreakSound.mp3');
var MenuButtonSound = new Audio('assets/MenuButtonSound.wav');
var BuyTrueSound1 = new Audio('assets/BuyTrueSound1.wav');
var BuyTrueSound2 = new Audio('assets/BuyTrueSound2.wav');
var ScreenWidth = window.innerWidth;

window.onload = function() {
    var DataSaved = localStorage.getItem('DataSaved');
    window.addEventListener('resize', reportWindowSize);
    if (DataSaved == "Yes"){
        DataSaved = "No";
        Money = parseInt(localStorage.getItem('Money'));
        MoneyAdded = parseInt(localStorage.getItem('MoneyAdded'));
        MoneyAddedPrice = parseInt(localStorage.getItem('MoneyAddedPrice'));
        Multiplier = parseInt(localStorage.getItem('Multiplier'));
        ComboTime = -1;
        Combo = 0;
        ClickTotal = parseInt(localStorage.getItem('ClickTotal'));
        document.getElementById("money").innerHTML = Money;
        document.getElementById("multiplier").innerHTML = Multiplier;
        document.getElementById("clicktotal").innerHTML = ClickTotal;
    }
    var GameWidth = window.innerWidth - 151;
    var GameHeight = window.innerHeight - 151 - (window.innerHeight*12/100);
    document.getElementById("lab").style.height = ObjectRadius;
    document.getElementById("lab").style.width = ObjectRadius;
    document.getElementById("lab").style.left = GameWidth/2;
    document.getElementById("lab").style.top = GameHeight/2;
    var ObjectXloc = GameWidth/2;
    var ObjectYloc = GameHeight/2;
    document.getElementById("lab").style.visibility = 'visible';
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

window.onbeforeunload = function(){
    localStorage.setItem('DataSaved', 'Yes');
    localStorage.setItem('Multiplier', Multiplier);
    localStorage.setItem('Money', Money);
    localStorage.setItem('MoneyAdded', MoneyAdded);
    localStorage.setItem('MoneyAddedPrice', MoneyAddedPrice);
    localStorage.setItem('ClickTotal', ClickTotal);
 }

function ClearData(){
    localStorage.clear();
    Money = 0;
    Multiplier = 1;
    MoneyAdded = 1;
    MoneyAddedPrice = 500;
    ClickTotal = 0;
    Combo = 0;
    document.getElementById("money").innerHTML = Money;
    document.getElementById("moneyadded").innerHTML = MoneyAdded;
    document.getElementById("moneyaddedprice").innerHTML = MoneyAddedPrice;
    document.getElementById("multiplier").innerHTML = Multiplier;
    document.getElementById("clicktotal").innerHTML = ClickTotal;
    document.getElementById("combo").innerHTML = Combo;
    alert('Suppression de la sauvegarde réussie.')
}
function reportWindowSize(){
    ScreenWidth = window.innerWidth;
    if (ScreenWidth !== 1920){
        alert("This game is not yet fully responsive with this screen Resolution !")
    }
}
function GameClicked(){
    var MouseX = window.event.clientX;
    var MouseY = window.event.clientY;
    MouseOver = document.elementFromPoint(MouseX, MouseY);
    if ((MouseOver.id == 'game') && (Combo > 0)){
        ComboTime = -1;
        Combo = 0;
        document.getElementById("combo").innerHTML = Combo;
        ComboBreakSound.pause();
        ComboBreakSound.currentTime = 0;
        ComboBreakSound.play();
        var GameWidth = window.innerWidth - 151;
        var GameHeight = window.innerHeight - 151 - (window.innerHeight*12/100);
        var ObjectRadius = 150;
        var ObjectXloc = (window.innerWidth - 151) / 2;
        var ObjectYloc = (window.innerHeight - 151 - (window.innerHeight*12/100)) / 2;
        document.getElementById("lab").style.height = ObjectRadius;
        document.getElementById("lab").style.width = ObjectRadius;
        document.getElementById("lab").style.left = ObjectXloc;
        document.getElementById("lab").style.top = ObjectYloc;
    }
    if (MouseOver.id == 'lab'){
        clearInterval(ComboInterval);
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
            pop1.pause();
            pop1.currentTime = 0;
            pop1.play();
        }else if (randombin == 1){
            pop2.pause();
            pop2.currentTime = 0;
            pop2.play();
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
        ComboTime = 2;
        ComboInterval = setInterval(ComboSettings, 400);
    }
}
function ComboSettings(){
    if (ComboTime > 0){
        ComboTime = ComboTime - 1;
    }
    else if (ComboTime == 0){
        ComboTime = -1;
        Combo = 0;
        document.getElementById("combo").innerHTML = Combo;
        ComboBreakSound.pause();
        ComboBreakSound.currentTime = 0;
        ComboBreakSound.play();
        var GameWidth = window.innerWidth - 151;
        var GameHeight = window.innerHeight - 151 - (window.innerHeight*12/100);
        var ObjectRadius = 150;
        var ObjectXloc = (window.innerWidth - 151) / 2;
        var ObjectYloc = (window.innerHeight - 151 - (window.innerHeight*12/100)) / 2;
        document.getElementById("lab").style.height = ObjectRadius;
        document.getElementById("lab").style.width = ObjectRadius;
        document.getElementById("lab").style.left = ObjectXloc;
        document.getElementById("lab").style.top = ObjectYloc;
        clearInterval(ComboInterval);
    }
}
function HomeButton(){
    if (document.getElementById("lab").style.visibility == 'hidden'){
        if (Combo > 0){
            ComboBreakSound.pause();
            ComboBreakSound.currentTime = 0;
            ComboBreakSound.play();
        }
        ComboTime = -1;
        Combo = 0;
        document.getElementById("combo").innerHTML = Combo;
        var GameWidth = window.innerWidth - 151;
        var GameHeight = window.innerHeight - 151 - (window.innerHeight*12/100);
        var ObjectRadius = 150;
        var ObjectXloc = (window.innerWidth - 151) / 2;
        var ObjectYloc = (window.innerHeight - 151 - (window.innerHeight*12/100)) / 2;
        document.getElementById("lab").style.height = ObjectRadius;
        document.getElementById("lab").style.width = ObjectRadius;
        document.getElementById("lab").style.left = ObjectXloc;
        document.getElementById("lab").style.top = ObjectYloc;
        document.getElementById("shop").style.visibility = 'hidden';
        document.getElementById("settings").style.visibility = 'hidden';
        document.getElementById("lab").style.visibility = 'visible';
        clearInterval(ComboInterval);
        MenuButtonSound.play();
    }
}
function ShopButton(){
    if (document.getElementById("shop").style.visibility !== 'visible'){
        if (Combo > 0){
            ComboBreakSound.pause();
            ComboBreakSound.currentTime = 0;
            ComboBreakSound.play();
        }
        ComboTime = -1;
        Combo = 0;
        document.getElementById("combo").innerHTML = Combo;
        document.getElementById("moneyadded").innerHTML = MoneyAdded;
        document.getElementById("moneyaddedprice").innerHTML = MoneyAddedPrice;
        document.getElementById("lab").style.visibility = 'hidden';
        document.getElementById("settings").style.visibility = 'hidden';
        document.getElementById("shop").style.left = window.innerWidth/2 - document.getElementById("shop").offsetWidth/2;
        document.getElementById("shop").style.visibility = 'visible';
        clearInterval(ComboInterval);
        MenuButtonSound.play();
    }
}
function SettingsButton(){
    if (document.getElementById("settings").style.visibility == 'hidden'){
        if (Combo > 0){
            ComboBreakSound.pause();
            ComboBreakSound.currentTime = 0;
            ComboBreakSound.play();
        }
        ComboTime = -1;
        Combo = 0;
        document.getElementById("combo").innerHTML = Combo;
        document.getElementById("lab").style.visibility = 'hidden';
        document.getElementById("shop").style.visibility = 'hidden';
        document.getElementById("settings").style.visibility = 'visible';
        clearInterval(ComboInterval);
        MenuButtonSound.play();
    }
}
function BuyGuiHoverTrue(obj){
    document.getElementById(obj.id).style.margin = 12;
    document.getElementById(obj.id).style.height = 126;
    document.getElementById(obj.id).style.width = 456;
}
function BuyGuiHoverFalse(obj){
    document.getElementById(obj.id).style.margin = 15;
    document.getElementById(obj.id).style.height = 120;
    document.getElementById(obj.id).style.width = 450;
}
function BuyGui1Click(){
    if (Money >= MoneyAddedPrice){
        Money = Money - MoneyAddedPrice;
        MoneyAdded = parseInt(MoneyAdded * 2);
        MoneyAddedPrice = parseInt(MoneyAddedPrice * 1.8);
        document.getElementById("money").innerHTML = Money;
        document.getElementById("moneyadded").innerHTML = MoneyAdded;
        document.getElementById("moneyaddedprice").innerHTML = MoneyAddedPrice;
        var randombin2 = getRandomInt(2);
        if (randombin2 == 0){
            BuyTrueSound1.pause();
            BuyTrueSound1.currentTime = 0;
            BuyTrueSound1.play();
        }else if (randombin2 == 1){
            BuyTrueSound2.pause();
            BuyTrueSound2.currentTime = 0;
            BuyTrueSound2.play();
        }
    }else{
        document.getElementById("buygui1").style.cursor = "not-allowed";
        setTimeout(function(){document.getElementById("buygui1").style.cursor = "hand";},500);
    }
}
