const { Router } = require("express");
// import all routers;
const CountryRouter = require("./CountryRoutes.js");
const ActivityRouter = require("./ActivityRoutes.js");

const router = Router();

router.use("/countries", CountryRouter);
router.use("/activities", ActivityRouter);

module.exports = router;