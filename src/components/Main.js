import React from 'react';
import plus from "../images/plus.svg";
import Card from "./Card";
import api from "../utils/Api.js"


function Main(props) {
    const [avatar, setAvatar] = React.useState();
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setAvatar(user.avatar);
                setName(user.name);
                setDescription(user.about);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <section className="profile">
                <img
                    className="profile__avatar" src={avatar}
                    alt="Аватарка"
                />
                <div onClick={props.onEditAvatar} className="profile__avatar_hover"></div>
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__title">{name}</h1>
                        <button onClick={props.onEditProfile} className="profile__button-small" type="button"></button>
                    </div>
                    <p className="profile__subtitle">{description}</p>
                </div>
                <button className="profile__button-large" type="button">
                    <img onClick={props.onAddPlace} src={plus} alt="Плюс"/>
                </button>
            </section>
            <section className="grid">
                {cards && cards.map((card) => (
                    <Card key={card._id} card={card} onCardCick={props.onCardClick}/>
                ))}
            </section>

        </>
    );
}

export default Main;