import React from 'react';
import PopupWithForm from "./PopupWithForm";
import InformationPopup from "./InformationPopup";


function EditProfilePopup(props) {
    console.log(props)
    return (
        <PopupWithForm name={'information'} title={'Редактировать профиль'} buttonText={'Сохранить'}
                       children={<InformationPopup/>}
                        />
    );
}

export default  EditProfilePopup;