const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");

router.post("/generate", async (req, res) => {
  try {
    const { name, course, grade } = req.body;

    const certificateId = "CERT" + Date.now();
    const date = new Date().toLocaleDateString();

    const newCert = new Certificate({
      name,
      course,
      grade,
      date,
      certificateId
    });

    await newCert.save();

    const qrText = `Certificate ID: ${certificateId}`;
    const qrImage = await QRCode.toDataURL(qrText);

    const doc = new PDFDocument({ size: "A4" });
    res.setHeader("Content-Type", "application/pdf");

    doc.fontSize(20).text("CERTIFICATE OF COMPLETION", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("This is to certify that", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(name, { align: "center", underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`has successfully completed the course`, { align: "center" });
    doc.text(course, { align: "center" });
    doc.moveDown();
    doc.text(`Grade: ${grade}`, { align: "center" });
    doc.moveDown();
    doc.text(`Date: ${date}`, { align: "center" });
    doc.moveDown();
    doc.text(`Certificate ID: ${certificateId}`, { align: "center" });

    doc.image(qrImage, 240, 600, { width: 120 });

    doc.pipe(res);
    doc.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
