const express = require("express");
const router = require("express").Router();
const { addJournal ,getSumOfEmotionsForDay,getSumOfEmotionsForWeek} = require("../controllers/journalController");

router.route("/journal").post(addJournal);
router.route("/getDailyEmotion").get(getSumOfEmotionsForDay);
router.route("/getWeeklyEmotion").get(getSumOfEmotionsForWeek);




module.exports = router;
