import React from 'react';
import './blocks/profile/profile.css';
import './blocks/popup/popup.css';
import plus from "../images/plus.svg";


function Main(props) {

    return (
        <>
            <section className="profile">
                <img
                     className="profile__avatar" src={props.userAvatar}
                    alt="Аватарка"
                />
                <div onClick={props.onEditAvatar} className="profile__avatar_hover"></div>
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__title">{props.userName}</h1>
                        <button onClick={props.onEditProfile} className="profile__button-small" type="button"></button>
                    </div>
                    <p className="profile__subtitle">{props.userDescription}</p>
                </div>
                <button className="profile__button-large" type="button">
                    <img onClick={props.onAddPlace} src={plus} alt="Плюс"/>
                </button>
            </section>
        </>
    );
}

export default Main;