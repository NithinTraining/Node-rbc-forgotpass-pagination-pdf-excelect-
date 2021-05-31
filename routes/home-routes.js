const express = require("express");
const {
  homeview,
  generatePdf,
  viewLogin,
  viewDashboard,
} = require("../controller/pdfController");

const router = express.Router();

router.get("/", homeview);
router.get("/download", generatePdf);
router.get("/login", viewLogin);
router.get("/dashboard", viewDashboard)

module.exports = router;
