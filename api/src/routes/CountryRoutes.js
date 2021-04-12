const { Router } = require("express");
const router = Router();
const {
    getAllCountries,
    getCountry,
    addCountry,
    updateCountryName,
    deleteCountry,
} = require("../controllers/country.controller");

router.get("/getAllCountries", getAllCountries);
router.get("/getCountry/:id", getCountry);
router.post("/addCountry", addCountry);
router.put("/updateCountryName/:id", updateCountryName);
router.delete("/deleteCountry/:id", deleteCountry);

module.exports = router;