const server = require("express").Router();
// const { json } = require("sequelize/types");
const { Country, conn } = require("../db");

const getAllCountries = async(req, res) => {
    await Country.findAll({
            include: [{
                all: true,
            }, ],
        })
        .then((countries) => {
            res.send(countries);
        })
        .catch(new Error({ msg: "No countries" }));
};

const getCountry = (req, res, next) => {
    Activity.findOne({
            where: {
                alpha3Code: req.params.alpha3Code
            },
            include: {
                model: Activity,
            }
        })
        .then((country) => {
            res.send(country);
        })
        .catch(err => console.log(err));
};

const addCountry = async(req, res) => {
    console.log('addCountry(32):: body: ', req.body)
    await Country.create({
            alpha3Code: req.body.alpha3Code,
            name: req.body.name,
            continent: req.body.continent,
            subRegion: req.body.subRegion,
            capital: req.body.capital,
            area: req.body.area,
            flagUrl: req.body.flagUrl,
            population: req.body.population,
        })
        .then((country) => {
            res.json(country)
        })
        .catch(err => console.log('addCountry(46):: err: ', err))
};

const updateCountryName = async(req, res) => {
    await Country.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then(() => {
            res
                .status(200)
                .json({ msg: "country name updated!" });
        })
        .catch(err => console.log(err))
};

const deleteCountry = async(req, res) => {
    await Country.findOne({
            where: { id: req.params.id },
        })
        .then((country) => {
            const countryDestroyed = country.destroy()
            countryDestroyed.then(() => {
                res
                    .status(200)
                    .json({ msg: `country ${req.params.id} deleted!` });
            })
        })
        .catch(err => console.log(err))
};

module.exports = {
    server,
    getAllCountries,
    getCountry,
    addCountry,
    updateCountryName,
    deleteCountry,
};