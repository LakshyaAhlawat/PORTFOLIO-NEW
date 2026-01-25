const { uploadBuffer } = require('../utils/supabaseStorage');

exports.uploadProjectImage = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const originalName = req.file.originalname || `img-${Date.now()}`;
    const safeName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const mimeType = req.file.mimetype || 'image/png';

    const result = await uploadBuffer({ buffer: req.file.buffer, filename: safeName, mimeType });

    return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error('Image upload failed:', err);
    const message = err?.message || (err && typeof err === 'string' ? err : 'Image upload failed');
    // Include limited error details for local debugging
    const details = err?.response || err?.name || null;
    return res.status(500).json({ message, details });
  }
};
