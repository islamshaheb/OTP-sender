const variables = require("../variables");
const mongoose = require("mongoose");
const sha256 = require("crypto-js/sha256");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/summer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  fullNme: String,
  email: String,
  phone: String,
  password: String
});
const UserModel = mongoose.model("Users", userSchema);

exports.checkDuplicacy = (email) => {
  return UserModel.findOne({ email });
};

exports.create = (userInfo) => {
  userInfo.password = sha256(userInfo.password);
  return UserModel.create(userInfo);
};
