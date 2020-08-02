import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function AddPlacePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const inputName = React.useRef();
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setLink(currentUser.link);
    }, [currentUser]);

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onUpdatePlace({
            name: inputName.current.value,
            link: link
        });
    }


    function handleLinkChange(e) {
        setLink(e.target.value);

    }

    return (
        <PopupWithForm name={'picture-add'} title={'Новое место'} buttonText={'Сохранить'}
                       onSubmit={handleAddPlaceSubmit}
                       isOpen={props.isOpen} close={props.onClose}
                       children={<form className="form form-add" name="form" method="post" action="#">
                           <fieldset className="form__name">
                               <input
                                   className="text-form text-form_name place-form_name"
                                   type="text"
                                   name="name"
                                   defaultValue={''}
                                   id="name-place"
                                   required
                                   pattern="^[A-Za-zА-Яа-я\s-]+$"
                                   minLength="1"
                                   maxLength="30"
                                   placeholder="Название"
                                   ref={inputName}
                               />
                           </fieldset>
                           <span id="name-place-error" className="form__error"></span>
                           <fieldset className="form__subject">
                               <input
                                   className="text-form text-form_subject place-form_link"
                                   type="url"
                                   name="link"
                                   value={link || ''}
                                   id="link-place"
                                   required
                                   placeholder="Ссылка на картинку"
                                   onChange={handleLinkChange}
                               />
                           </fieldset>
                           <span id="link-place-error" className="form__error"></span>
                       </form>}
        />

    );
}

export default AddPlacePopup;