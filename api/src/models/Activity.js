const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "activity", {
            actId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // primaryKey: true,
                // autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            typeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            season: {
                type: DataTypes.STRING,
                allowNull: false
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );
};