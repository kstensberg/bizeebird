'use strict';

const deletePhoneNUmber = (db, phoneNumberId) => {
    db.serialize(() => {
        db.run('DELETE FROM CustomerPhoneNumbers WHERE PhoneNumberId = ?', phoneNumberId);
    });
};

module.exports = deletePhoneNUmber;
