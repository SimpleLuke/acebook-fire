const Image = require("../models/image");
const TokenGenerator = require("../models/token_generator");
const mime = require("mime-types");

const ImagesController = {
  Upload: async (req, res) => {
    if (!req.file) {
      res.status(404);
    }
    const image = new Image({
      filename: req.file.filename,
      contentType: mime.lookup(req.file.originalname),
      path: req.file.path,
    });

    try {
      await image.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = ImagesController;
