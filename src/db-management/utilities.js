'use strict';
const moment = require('moment');

const apptTimeStampToISOString = (date) => {
    // this works and we're not sure why - haunted :/
    return moment(date).format('YYYY-MM-DD 00:00:00');
};

const stringStatusToNumeric = (status) => {
    switch (status.toLowerCase()) {
            case 'scheduled':
                return 0;
            case 'checked in':
                return 1;
            case 'checked out':
                return 2;
            case 'cancelled':
                return 3;
            case 'no show':
                return 4;
            default:
                return null;
    }
};

const numericStatusToString = (status) => {
    switch (status) {
            case 0:
                return 'Scheduled';
            case 1:
                return 'Checked In';
            case 2:
                return 'Checked Out';
            case 3:
                return 'Canceled';
            case 4:
                return 'No Show';
            default:
                return null;
    }
};

const numericGenderToString = (gender) => {
    switch (gender) {
            case 0:
                return 'Male';
            case 1:
                return 'Female';
            default:
                return null;
    }
};

const stringGenderToNumeric = (gender) => {
    switch (gender.toLowerCase()) {
            case 'male':
                return 0;
            case 'female':
                return 1;
            default:
                return null;
    }
};

module.exports = {
    apptTimeStampToISOString,
    stringStatusToNumeric,
    numericStatusToString,
    numericGenderToString,
    stringGenderToNumeric
};
