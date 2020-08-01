import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    function handleClick() {
        props.onCardCick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    /*function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }*/

    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete' : 'card__delete_invisible'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__heart ${isLiked ? 'card__heart' : 'card__heart_active'}`
    );
    return (
            <div className="card" key={props.card._id} id={props.card._id}>
                <button type="button" className={`card__delete ${!isOwn && 'card__delete card__delete_invisible'}`} onClick={handleCardDelete}></button>
                    <img onClick={handleClick} data-name="" className="card__item" src={props.card.link}
                         alt={props.card.name}/>
                <div className="card__text">
                    <h3 className="card__header">{props.card.name}</h3>
                    <div className="card__likes">
                        <button type="button" className={`card__heart ${isLiked && 'card__heart card__heart_active'}`} onClick={handleLikeClick}></button>
                        <span className="card__span-like">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
    );
}

export default Card;