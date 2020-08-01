import React from 'react';
import './App.css';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import AvatarPopup from "./AvatarPopup";
import PictureAddPopup from "./PictureAddPopup";
import ImagePopup from "./ImagePopup.js";
import Card from "./Card.js";
import api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [dataImage, setDataImage] = React.useState({
        link: '',
        name: ''
    });
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard(true);
        setDataImage({link: props.link, name: props.name});
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.putLike(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
        api.deleteLike(card._id, isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    function handleCardDelete(card) {

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id).then(() => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id !== card._id);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    return (
        <>

            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header/>

                    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                    />
                    <section className="grid">
                        {cards && cards.map((card) => (
                            <Card key={card._id} card={card} onCardClick={handleCardClick} onCardLike={handleCardLike}
                                  onCardDelete={handleCardDelete}/>
                        ))}
                    </section>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
                    <PopupWithForm name={'picture-add'} title={'Новое место'} buttonText={'Создать'}
                                   children={<PictureAddPopup/>}
                                   isOpen={isAddPlacePopupOpen} close={closeAllPopups}/>
                    <PopupWithForm name={'avatar'} title={'Обновить аватар'} buttonText={'Сохранить'}
                                   children={<AvatarPopup/>}
                                   isOpen={isEditAvatarPopupOpen} close={closeAllPopups}/>
                    <PopupWithForm name={'sure'} title={'Вы уверены?'} buttonText={'Да'}/>
                    <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={dataImage}/>

                    <Footer/>
                </CurrentUserContext.Provider>
            </div>


        </>
    );
}

export default App;
