import React from 'react';
import plus from "../images/plus.svg";
import Card from "./Card";
import api from "../utils/Api.js"
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    //console.log('1')
    return (
        <>
            <section className="profile">
                <img
                    className="profile__avatar"
                    alt="Аватарка"

                />
                <div onClick={props.onEditAvatar} className="profile__avatar_hover"></div>
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__title"></h1>
                        <button onClick={props.onEditProfile} className="profile__button-small" type="button"></button>
                    </div>
                    <p className="profile__subtitle"></p>
                </div>
                <button className="profile__button-large" type="button">
                    <img onClick={props.onAddPlace} src={plus} alt="Плюс"/>
                </button>
            </section>

        </>
    );
}

export default Main;