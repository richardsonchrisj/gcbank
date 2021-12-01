import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },

  accountType: {
    type: Boolean,
  },
  amount: {
    type: Number,
  },

  image_url: {
    /* Url to profile image */

    required: [true, "Please provide an image url for your account."],
    type: String,
  },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
