const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas', {

    autor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },

    IDpergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


Resposta.sync({force:false});

module.exports = Resposta;