const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Must be at least 3 characters long, no spaces
      validator: (x) => {
        return /^(\w|\d){3,}/.test(x);
      },
      message: "Username needs to be at least 3 characters long with no spaces",
    },
  },
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
