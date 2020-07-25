import React from 'react';

function AvatarPopup() {
    return (
        <form className="form form-add" name="form" method="post" action="#">
            <fieldset className="form__subject">
                <input
                    className="text-form text-form_subject place-form_link text-form__avatar"
                    type="url"
                    name="link"
                    id="link-avatar"
                    required
                    placeholder="Ссылка на картинку"
                />
            </fieldset>
            <span id="link-avatar-error" className="form__error"></span>
        </form>
    );
}

export default AvatarPopup;