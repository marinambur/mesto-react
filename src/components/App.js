import React from 'react';
import './App.css';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import InformationPopup from "./InformationPopup.js";
import AvatarPopup from "./AvatarPopup";
import PictureAddPopup from "./PictureAddPopup";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
    console.log('2');
    const [currentUser, setCurrentUser] = React.useState();
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
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

    return (
        <>

            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                <Header/>

                    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                    />

                <Footer/>
                <PopupWithForm name={'information'} title={'Редактировать профиль'} buttonText={'Сохранить'}
                               children={<InformationPopup/>}
                               isOpen={isEditProfilePopupOpen} close={closeAllPopups}/>
                <PopupWithForm name={'picture-add'} title={'Новое место'} buttonText={'Создать'}
                               children={<PictureAddPopup/>}
                               isOpen={isAddPlacePopupOpen} close={closeAllPopups}/>
                <PopupWithForm name={'avatar'} title={'Обновить аватар'} buttonText={'Сохранить'}
                               children={<AvatarPopup/>}
                               isOpen={isEditAvatarPopupOpen} close={closeAllPopups}/>
                <PopupWithForm name={'sure'} title={'Вы уверены?'} buttonText={'Да'}/>
                <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={dataImage}/>
            </CurrentUserContext.Provider>
            </div>


        </>
    );
}

export default App;
