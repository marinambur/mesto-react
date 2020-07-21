import React from 'react';
import './blocks/form/form.css';

function PictureAddPopup() {
    return (
        <form className="form form-add" name="form" method="post" action="#">
            <fieldset className="form__name">
                <input
                    className="text-form text-form_name place-form_name"
                    type="text"
                    name="name"
                    id="name-place"
                    required
                    pattern="^[A-Za-zА-Яа-я\s-]+$"
                    minLength="1"
                    maxLength="30"
                    placeholder="Название"
                />
            </fieldset>
            <span id="name-place-error" className="form__error"></span>
            <fieldset className="form__subject">
                <input
                    className="text-form text-form_subject place-form_link"
                    type="url"
                    name="link"
                    id="link-place"
                    required
                    placeholder="Ссылка на картинку"
                />
            </fieldset>
            <span id="link-place-error" className="form__error"></span>
        </form>
    );
}

export default PictureAddPopup;

