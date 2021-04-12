const { Router } = require("express");
const router = Router();
const {
    getAllActivities,
    getActivity,
    addActivity,
    setActivityCountry,
    updateActivityName,
    deleteActivity,
} = require("../controllers/activity.controller");

// getAllActivities,
// getActivity,
// addActivity,
// setActivityCountry,
// updateActivityName,
// deleteActivity,

router.get("/getAllActivities", getAllActivities);
router.get("/getActivity/:id", getActivity);
router.post("/addActivity", addActivity);
router.post("/setActivityCountry", setActivityCountry);
router.put("/updateActivityName/:id", updateActivityName);
router.delete("/deleteActivity/:id", deleteActivity);

module.exports = router;