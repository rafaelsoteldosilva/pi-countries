const server = require("express").Router();
const { Activity, Country, conn } = require("../db");

const getAllActivities = async(req, res) => {
    Activity.findAll({
            include: {
                model: Country,
            }
        })
        .then(activities => res.json(activities))
        .catch(err => console.log(err));
};

const getActivity = (req, res, next) => {
    Activity.findOne({
            where: {
                actId: req.params.actId
            },
            include: {
                model: Country,
            }
        })
        .then((activity) => {
            res.send(activity);
        })
        .catch(err => console.log(err));
};

const addActivity = async(req, res) => {
    // console.log('addActivity(39):: body: ', req.body)
    await Activity.create({
            actId: req.body.actId,
            name: req.body.name,
            typeId: req.body.typeId,
            season: req.body.season,
            difficulty: req.body.difficulty,
            duration: req.body.duration
        })
        .then((activity) => {
            res.json(activity)
        })
        .catch(err => console.log(err))
};

const setActivityCountry = async(req, res) => {
    // console.log('setActivityCountry(46):: body', req.body)

    let countryCode = req.body.alpha3Code
    let activityId = req.body.actId
        // console.log('setActivityCountry(47):: countryCode: ', countryCode)
        // console.log('setActivityCountry(48):: activityId', activityId)
    const foundActivity = Activity.findOne({
        where: {
            actId: activityId
        },
    })
    foundActivity
        .then((activity) => {
            // console.log('setActivityCountry(58):: activity was found, activity: ', activity.dataValues)
            const foundCountry = Country.findOne({
                where: {
                    alpha3Code: countryCode
                },
            })
            foundCountry
                .then((country) => {
                    // console.log('setActivityCountry(65):: country was found, country: ', country.dataValues)

                    activity.addCountries([country])
                        .then(() => {
                            // console.log('setActivityCountry(68):: relation was set')
                            const activity2 = Activity.findOne({
                                    where: {
                                        actId: activityId,
                                    },
                                    include: [Country]
                                })
                                .then(activity => {
                                    // console.log('setActivityCountry(65):: activity was found, activity: ', activity.dataValues)
                                })
                        })
                })
        })
}

const updateActivityName = async(req, res) => {
    await Activity.update({
            name: req.body.name
        }, {
            where: {
                actId: req.params.actId,
            },
        })
        .then((activity) => {
            res.status(200).json({ msg: `activity ${activity} modified!` });
        })
        .catch(err => console.log(err))
};

const deleteActivity = async(req, res) => {
    await Activity.findOne({
            where: { actId: req.params.actId },
        })
        .then(() => {
            res.status(200).json({ msg: "activity deleted!" });
        })
        .catch(err => console.log(err))
};

module.exports = {
    server,
    getAllActivities,
    getActivity,
    addActivity,
    setActivityCountry,
    updateActivityName,
    deleteActivity,
};