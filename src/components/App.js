import React from 'react';
import './App.css';
import './blocks/grid/grid.css';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import InformationPopup from "./InformationPopup.js";
import AvatarPopup from "./AvatarPopup";
import PictureAddPopup from "./PictureAddPopup";
import ImagePopup from "./ImagePopup.js";
import SurePopup from "./SurePopup";
import Card from "./Card.js";
import api from "../utils/Api.js"

function App() {
    const [avatar, setAvatar] = React.useState();
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const [cards, setCards] = React.useState([]);
    const [dataImage, setDataImage] = React.useState({
        link: '',
        name: ''
    });
    const [selectedCard, setSelectedCard] = React.useState(false);

    React.useEffect(() => {
        function userInfo(user) {
            setAvatar(user.avatar);
            setName(user.name);
            setDescription(user.about);
        }


        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                userInfo(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function handleCardClick(props) {
        setSelectedCard(true);
        setDataImage({link: props.link, name: props.name});
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
        document.getElementById('information').classList.add('popup_opened')
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
        document.getElementById('picture-add').classList.add('popup_opened')
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
        document.getElementById('avatar').classList.add('popup_opened')
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
    }

    return (
        <>
        <div className="page">
            <Header/>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick} userAvatar={avatar} userName={name} userDescription={description}
            />
            <section className="grid">
                {cards && cards.map((card) => (
                    <Card key={card._id} card={card} onCardCick={handleCardClick}/>
                ))}
            </section>
            <Footer/>
            <PopupWithForm name={'information'} title={'Редактировать профиль'} children={<InformationPopup/>}
                           isOpen={isEditProfilePopupOpen} close={closeAllPopups}/>
            <PopupWithForm name={'picture-add'} title={'Новое место'} children={<PictureAddPopup/>}
                           isOpen={isAddPlacePopupOpen} close={closeAllPopups}/>
            <PopupWithForm name={'avatar'} title={'Обновить аватар'} children={<AvatarPopup/>}
                           isOpen={isEditAvatarPopupOpen} close={closeAllPopups}/>
            <PopupWithForm name={'sure'} title={'Вы уверены?'} children={<SurePopup/>}/>
            <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={dataImage}/>
        </div>

        </>
    );
}

export default App;
