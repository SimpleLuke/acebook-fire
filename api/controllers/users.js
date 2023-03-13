const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    await user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  // GetUser: async (req, res) => {
  //   const { email } = req.params;
  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }
  GetUser: async (req, res) => {
    try {
      const email = req.query.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.firstName);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = UsersController;
