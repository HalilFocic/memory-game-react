import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactCardFlip from 'react-card-flip';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';

const CardState ={
  hidding:0,
  showing:1,
  matching:2
}
const mystery="./mysteryCard.png";
const cardSource =[
  {
    id:0,
    cardState:CardState.hidding,
    front:"./angular.png",
    back:mystery,
  },
  {
    id:1,
    cardState:CardState.hidding,
    front:"./angular.png",
    back:mystery,
  },
  {
    id:2,
    cardState:CardState.hidding,
    front:"./cpp.png",
    back:mystery,
  },
  {
    id:3,
    cardState:CardState.hidding,
    front:"./cpp.png",
    back:mystery,
  },
  {
    id:4,
    cardState:CardState.hidding,
    front:"./csharp.png",
    back:mystery,
  },
  {
    id:5,
    cardState:CardState.hidding,
    front:"./csharp.png",
    back:mystery,
  },
  {
    id:6,
    cardState:CardState.hidding,
    front:"./git.png",
    back:mystery,
  },
  {
    id:7,
    cardState:CardState.hidding,
    front:"./git.png",
    back:mystery,
  },
  {
    id:8,
    cardState:CardState.hidding,
    front:"./github.jpg",
    back:mystery,
  },
  {
    id:9,
    cardState:CardState.hidding,
    front:"./github.jpg",
    back:mystery,
  },
  {
    id:10,
    cardState:CardState.hidding,
    front:"./javascript.png",
    back:mystery,
  },
  {
    id:11,
    cardState:CardState.hidding,
    front:"./javascript.png",
    back:mystery,
  },
  {
    id:12,
    cardState:CardState.hidding,
    front:"./nodejs.jpg",
    back:mystery,
  },
  {
    id:13,
    cardState:CardState.hidding,
    front:"./nodejs.jpg",
    back:mystery,
  },
  {
    id:14,
    cardState:CardState.hidding,
    front:"./php.jpg",
    back:mystery,
  },
  {
    id:15,
    cardState:CardState.hidding,
    front:"./php.jpg",
    back:mystery,
  },
  {
    id:16,
    cardState:CardState.hidding,
    front:"./python.png",
    back:mystery,
  },
  {
    id:17,
    cardState:CardState.hidding,
    front:"./python.png",
    back:mystery,
  },
  {
    id:18,
    cardState:CardState.hidding,
    front:"./react.png",
    back:mystery,
  },
  {
    id:19,
    cardState:CardState.hidding,
    front:"./react.png",
    back:mystery,
  },
  {
    id:20,
    cardState:CardState.hidding,
    front:"./java.png",
    back:mystery,
  },
  {
    id:21,
    cardState:CardState.hidding,
    front:"./java.png",
    back:mystery,
  },
  {
    id:22,
    cardState:CardState.hidding,
    front:"./vuejs.jpg",
    back:mystery,
  },
  {
    id:23,
    cardState:CardState.hidding,
    front:"./vuejs.jpg",
    back:mystery,
  },

];
class MemoryGame extends Component {
    constructor() {
      super();
        this.state = {
        cards:shuffle(cardSource),
        clickCounter:0,
        noClick:false
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleNewGame=this.handleNewGame.bind(this);
    }
    handleNewGame(){
      let cards =this.state.cards.map(c=>({
        ...c,
        cardState:CardState.hidding
      }));
      cards=shuffle(cards);
      this.setState({cards});
    }
    handleClick(id) {
        const mapCardState =(cards,idsToChange,newCardState)=>{
          return cards.map(c => {
            if(idsToChange.includes(c.id)){
              return{
                ...c,
                cardState:newCardState
              };
            }
            return c;
          });
        }
        const foundCard = this.state.cards.find(c => c.id===id);
      
        if(this.state.noClick || foundCard.cardState !==CardState.hidding){
          return;
        }
        console.log("nesh");
        //If statement is in case card is already flipped or being flipped
        let noClick = false;

        let cards =mapCardState(this.state.cards,[id],CardState.showing);
        const showingCards = cards.filter((c)=>c.cardState===CardState.showing);

        const ids =showingCards.map(c=>c.id);

        if(showingCards.length===2 && showingCards[0].front===showingCards[1].front){
          cards=mapCardState(cards,ids,CardState.matching);
        }
        else if(showingCards.length===2){
          let hiddingCards=mapCardState(cards,ids,CardState.hidding);
          noClick=true;

          this.setState({cards,noClick},()=>{
            setTimeout(()=>{
              this.setState({cards:hiddingCards,noClick:false});
            },1200);
          });
          return;
        }
        this.setState({cards,noClick});
    }
   
    render() {
      const cards=this.state.cards.map((card)=>{
        return (
          <div key={card.id} className="kartica">
        <ReactCardFlip isFlipped={card.cardState!==CardState.hidding} flipDirection="horizontal">
        <img alt="rip" src={card.back} width="150px" height="150px"  className="back" onClick={()=>this.handleClick(card.id)}/>
        
        <img alt="rip" src={card.front} width="150px" height="150px" className="front" onClick={()=>this.handleClick(card.id)} />
    
        </ReactCardFlip>
        </div>
        );
      })
      return (
        <div>
          <Navbar onNewGame={this.handleNewGame}/>
          <div className="cardContainer">
          {cards}
          </div>
        </div>
      )
    }
  }

ReactDOM.render(<MemoryGame/>,document.getElementById('root'));