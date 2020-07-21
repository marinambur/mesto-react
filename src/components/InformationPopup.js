import React from 'react';
import './blocks/form/form.css';

function InformationPopup() {
    return (
        <form
            className="form"
            id="formname"
            name="form"
            method="post"
            action="#"
            noValidate
        >
            <fieldset className="form__name">
                <input
                    className="text-form text-form_name"
                    type="text"
                    name="name"
                    id="name-input"
                    required
                    pattern="^[A-Za-zА-Яа-я\s-]+$"
                    value="Имя"
                    minLength="2"
                    maxLength="40"
                />
            </fieldset>
            <span id="name-input-error" className="form__error"></span>
            <fieldset className="form__subject">
                <input
                    className="text-form text-form_subject"
                    type="text"
                    name="link"
                    id="profession"
                    required
                    pattern="^[A-Za-zА-Яа-я\s-]+$"
                    minLength="2"
                    maxLength="200"
                    value="Профессия"
                />
            </fieldset>
            <span id="profession-error" className="form__error"></span>
        </form>
    );
}

export default InformationPopup;

