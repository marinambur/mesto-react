import React from 'react';
import InformationPopup from "./InformationPopup";
import PopupWithForm from "./PopupWithForm";
import AvatarPopup from "./AvatarPopup";


function EditAvatarPopup(props) {
    return (
        <PopupWithForm name={'avatar'} title={'Обновить аватар'} buttonText={'Сохранить'}
                       children={<AvatarPopup/>}
                       isOpen={props.isOpen} close={props.onClose}/>
    );
}

export default EditAvatarPopup;