import React from 'react';
import './blocks/card/card.css';
import './blocks/grid/grid.css';


function Card(props) {

    function handleClick() {
        props.onCardCick(props.card)
    }

    return (
        <template id="card-template" style={{display: "flex"}}>
            <div className="card" key={props.card._id} id={props.card._id}>
                <button type="button" className="card__delete"></button>
                <a className="card__picture" href="#">
                    <img onClick={handleClick} data-name="" className="card__item" src={props.card.link}
                         alt={props.card.name}/>
                </a>
                <div className="card__text">
                    <h3 className="card__header">{props.card.name}</h3>
                    <div className="card__likes">
                        <button type="button" className="card__heart"></button>
                        <span className="card__span-like">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
        </template>
    );
}

export default Card;