import React from "react";

function SurePopup() {
    return (
<section className="popup popup_type_sure" id="sure">
    <div className="popup__container">
        <button className="popup__button-close" type="button">
            <img className="popup__cross" src="images/crest.svg" alt="Закрыть"/>
        </button>
        <h2 className="form__heading form__heading_sure">Вы уверены?</h2>
        <form>
            <button type="submit" className="form__save form__save_sure">Да</button>
        </form>
    </div>
</section>
    );
}
export default SurePopup;