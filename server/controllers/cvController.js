const path = require('path');
//cv is a odf to be uploaded or downloaded
const fs = require('fs');

// download cv
exports.downloadCV = (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.resolve(__dirname, '../assets', fileName);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found"
      });
    }
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf'); // Assuming CV is a PDF

    // Send the file
    return res.status(200).sendFile(filePath);
  } catch (error) {
    console.error("Error downloading CV:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }


}
// upload cv
exports.uploadCV = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }
    // File is already saved by Multer
    return res.status(200).json({
      message: "CV uploaded successfully",
      fileName: req.file.filename
    });
  } catch (error) {
    console.error("Error uploading CV:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};