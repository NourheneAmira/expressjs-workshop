const calendarcontroller = require("../controllers/calendar");

const router = require("express").Router();

router.post("/saveCalendar", calendarcontroller.saveCalendar);
router.get("/getfindAll", calendarcontroller.getfindAll);
router.get("/getById/:id", calendarcontroller.getById);
router.put("/update/:id", calendarcontroller.update);
router.delete("/delete/:id", calendarcontroller.delete);

module.exports = router;