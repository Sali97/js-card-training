//Változók deklarálása - START
const cardContent = document.getElementsByClassName("card-container");
const pauseButton = document.getElementById("pauseBtn");
const replayButton = document.getElementById("replayBtn");
const continueButton = document.getElementById("continueBtn");
const pauseText = document.getElementById("pauseText");
const timeText  = document.getElementById("timeText");

const timeSeconds  = document.getElementById("seconds");
const timeTens  = document.getElementById("tens");

const cardCountSelect = document.getElementById("cardCount");
const pauseDiv = document.getElementsByClassName("pause-div");

var iconList = ["bomb", "pen","eye", "hand", "fire", "magnet", "poo", "camera", "droplet", "lock", "tag", "truck-fast", "hippo", "car", "gift", "ghost", "mug-hot", "trash", "umbrella", "money-bill", "plane", "comment", "cloud", "face-smile", "calendar-days", "film", "headphones", "city", "palette", "user-secret", "heart", "mobile"];
var rndNumber=0;
let cardCount = 0;

var pairOne = [];
var pairTwo =[];

var selectedCards = [];
//Változók deklarálása - STOP

//Oldal betöltésekori történések
window.onload = (event) => {
    initializeCardCounts();
  };

  pauseButton.onclick = function(){
    stopClock();
    refreshDashTime();
    pauseDiv[0].classList.remove("hide");
  }
  
  replayButton.onclick = function(){
    startGame();
    if(continueButton.classList.contains("hide")){
        continueButton.classList.remove("hide");
        pauseText.classList.remove("hide");
        pauseText.innerText="Szünet";
        timeText.classList.remove("hide");
        timeText.classList.remove("pair");
        replayButton.classList.remove("startBtn");
        replayButton.innerText="Újrakezdés";
    }
    pauseDiv[0].classList.add("hide");
    resetClock();
    startClock();
  }

  continueButton.onclick = function(){
    pauseDiv[0].classList.add("hide");
    startClock();
  }

//Kártyák interaktívvá tétele
  function initialize(){
    const cards = document.querySelectorAll(".card.back");

    cards.forEach(card => {
        card.onclick = function(){
            if((selectedCards.length<2)&&(this.classList.contains("back"))){
            this.classList.toggle('back');
            const isBack = this.classList.contains("back");
          this.style.transform=isBack? "rotateY(180deg)": "rotateY(0deg)";
    
          delay(120).then(()=>turnCard(isBack,this)); 
          selectedCards.push(card);

          if(selectedCards.length==2){
            delay(250).then(()=>checkIsPair(card)); 
          }
        } 
        }
    });
  }

  function startGame(){
    resetGame();
    cardCount=cardCountSelect.value;
    delay(100).then(()=>generateCards(iconList, cardCount));
    delay(100).then(()=>initialize());
  }

  function resetGame(){
    pairOne = [];
    pairTwo = [];
    rndNumber = 0;
    cardContent[0].innerHTML = "";
  }

  function initializeCardCounts(){
for(i=2;i<=42;i+=2){
        var cardCountOption = document.createElement("option");
        cardCountOption.setAttribute("value", i)
        cardCountOption.innerText=i;
        cardCountSelect.appendChild(cardCountOption);
    }
  }
  
  function checkIsPair(card){
        if(selectedCards[0].innerHTML==selectedCards[1].innerHTML){
            selectedCards[0].classList.add("pair");
            selectedCards[1].classList.add("pair");
            selectedCards[0].onclick="";
            selectedCards[1].onclick="";
            selectedCards.pop();
        selectedCards.pop();
        checkisDone();
        }else{
            selectedCards[0].classList.add("not-pair");
            selectedCards[1].classList.add("not-pair");

            delay(1000).then(()=>turnBackCards(selectedCards[0],selectedCards[1])); 
        }
    }

    function turnBackCards(card1, card2){
        turnCard(true, card1);
        turnCard(true, card2);
        selectedCards.pop();
        selectedCards.pop();
    }

    function checkisDone(){
        var pairs = document.getElementsByClassName("pair");
        if(pairs.length==cardCount){
            stopClock();
            refreshDashTime();
            continueButton.classList.add("hide");
            pauseText.innerText="Játék vége!";
            replayButton.classList.add("startBtn");
            timeText.classList.add("pair");
            pauseDiv[0].classList.remove("hide");
        }
    }

//Kártya fordítás
function turnCard(isBack, card){         
    if(isBack){
        card.style.transform="rotateY(180deg)";
        card.children.item(0).classList.add("hide");
       delay(150).then(()=> card.classList.add("back"));
       delay(200).then(()=> card.classList.remove("not-pair"));
    }else{
        card.style.transform="rotateY(0deg)";
        card.children.item(0).classList.remove("hide");
    }    
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

//Kártyák generálása
function generateCards(iconList, countofCards){
    var rndNumber = 0;
        /*var newCard = new Card(iconList[rndNumber]);
        let card = newCard.getCard();
        cardContent[0].appendChild(card);*/

        getIcons(iconList, countofCards);
    console.log("---pairOne hossza: " + pairOne.length);

    while(pairOne.length>0){
        rndNumber = Math.floor(Math.random()* pairOne.length);
        var newCard = new Card(pairOne[rndNumber]);
        let card = newCard.getCard();
        cardContent[0].appendChild(card);

        pairOne.splice(rndNumber, 1);
    }
    while(pairTwo.length>0){
        rndNumber = Math.floor(Math.random()* pairTwo.length);
        var newCard = new Card(pairTwo[rndNumber]);
        let card = newCard.getCard();
        cardContent[0].appendChild(card);

        pairTwo.splice(rndNumber, 1);
    }
}

function refreshDashTime(){
  timeText.innerText="Idő: " +timeSeconds.innerText+":"+timeTens.innerText;
}

function getIcons(iconList, countofCards){
    var rndNumber = Math.floor(Math.random()* iconList.length);
    let i = 0;
    let iconNums = countofCards/2;

    console.log("---iconNums hossza: " +iconNums);
    
for(j=0;j<iconNums;j++){
    do{
        rndNumber = Math.floor(Math.random()* iconList.length);
    }
    while(pairOne.includes(iconList[rndNumber]));
    pairOne.push(iconList[rndNumber]);
    pairTwo.push(iconList[rndNumber]);
}
}

//Kártya objektum
class Card{
    #body = "";
    constructor(iconName){
        this.iconName = iconName;
        
        var iconElemLT = document.createElement("i");
        iconElemLT.className="fa-solid fa-"+iconName;
        var iconElemMid = document.createElement("i");
        iconElemMid.className="fa-solid fa-"+iconName;
        var iconElemRB = document.createElement("i");
        iconElemRB.className="fa-solid fa-"+iconName;
       /* const body = '<div class="card back">'
        '<div class="card-content center hide">'
        '<div class="icon-lt-index"><i class="fa-brands fa-'+iconName+'"></i></div>'
        '<div class="icon center"><i class="fa-brands fa-'+iconName+'"></i></div>'
        '<div class="icon-rb-index"><i class="fa-brands fa-'+iconName+'"></i></div>  </div>';*/
        var body = document.createElement("div");
        body.className="card back"
        body.style.transform = "rotateY(180deg)";

        var content = document.createElement("div");
        content.className="card-content center hide";

        var iconMid = document.createElement("div");
        iconMid.className="icon center";
        iconMid.appendChild(iconElemMid);

        var iconLeftTop = document.createElement("div");
        iconLeftTop.className="icon-lt-index";
        iconLeftTop.appendChild(iconElemLT);

        var iconRightBottom = document.createElement("div");
        iconRightBottom.className="icon-rb-index";
        iconRightBottom.appendChild(iconElemRB);
        
        content.appendChild(iconLeftTop);
        content.appendChild(iconMid);
        content.appendChild(iconRightBottom);

        body.appendChild(content);

        this.#body = body;
    }
    getCard(){
        return this.#body;
    }
}