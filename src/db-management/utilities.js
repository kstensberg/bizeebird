'use strict';

const apptTimeStampToISOString = (date) => {
    return new Date(date).toISOString();
};

const stringStatusToNumeric = (status) => {
    switch (status) {
            case 'Scheduled':
                return 0;
            case 'Checked In':
                return 1;
            case 'Checked Out':
                return 2;
            case 'Cancelled':
                return 3;
            case 'No Show':
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
    switch (gender) {
            case 'Male':
                return 0;
            case 'Female':
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
