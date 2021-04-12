const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "country", {
            alpha3Code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            continent: {
                type: DataTypes.STRING,
                allowNull: false
            },
            subRegion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            capital: {
                type: DataTypes.STRING,
                allowNull: false
            },
            area: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            flagUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            population: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );
};