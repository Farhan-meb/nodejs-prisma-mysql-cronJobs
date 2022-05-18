const createPassword = function () {
    var text = '';
    var possible =
        '0123456789abcdefghijklmnopqrstwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

module.exports = {
    createPassword,
};
