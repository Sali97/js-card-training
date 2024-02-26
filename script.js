const cards = document.querySelectorAll(".card");
const cardBG = cards[0].style.backgroundImage;

cards.forEach(card => {
    card.onclick = function(){
        this.classList.toggle('back');
        const isBack = this.classList.contains("back");
      this.style.transform=isBack? "rotateY(180deg)": "";

      var cardPic = this.children.item(0).children.namedItem("pic-character");
      var cardPicUrl = cardPic.attributes.getNamedItem("src").value;

      delay(100).then(()=>turnCard(isBack,this,cardPicUrl)); 
    }
});

function turnCard(isBack, card,cardPicUrl){
        for(i=0;i<card.childNodes.length;i++){
           try{
            if(isBack){
                
                if(card.children.item(i).classList.contains("front")){
                    card.children.item(i).classList.add("hide");
                }
                if(card.children.item(i).classList.contains("back")){
                    card.children.item(i).classList.remove("hide");
                    card.style.backgroundImage="url('"+cardPicUrl+"')";
                }
            }
            else{
                if(card.children.item(i).classList.contains("front")){
                    card.children.item(i).classList.remove("hide");
                    card.style.backgroundImage=cardBG;
                }
                if(card.children.item(i).classList.contains("back")){
                    card.children.item(i).classList.add("hide");
                }
            }
        }
        catch{}
        }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }