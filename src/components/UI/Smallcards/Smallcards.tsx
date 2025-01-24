import { Heading } from "../../Typography/Heading/Heading";
import "./smallcards.scss"
interface ICard {
    icon: string;
    heading: string;
    text: string;
  }
  
  interface ISmallcards {
    cards: ICard[]; 
  }
  
  
  export const Smallcards: React.FC<ISmallcards> = ({ cards }) => {
    return (
      <div className="smallcards-container">
        {cards.map((card, index) => (
          <div key={index} className="smallcard">
            <div className="icon-container">
              <img src={card.icon} alt={`icon-${index}`} className="icon" />
            </div>
            <div className="content-container">
            <Heading text={card.heading} level={3} className={"smallcardHeading"}/>
              <p className="smallcard-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  