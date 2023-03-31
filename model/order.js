const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "owner" },
  fullname: String,
  phone_number: String,
  address: String,
  status: {
    type: String,
    default: "queue",
  },
  items: [
    {
      name: String,
      note: String,
    },
  ],
  total_price: Number,
});

module.exports.Order = new mongoose.model("order", OrderSchema);
