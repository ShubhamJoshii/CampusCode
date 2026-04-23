const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(
  "mongodb+srv://shubhamjoshii676_db_user:RLh37zvJaRmqvGe9@cluster0.24sl7nk.mongodb.net/?appName=Cluster0",
).then(()=>{
    console.log("DataBase Connected Successfully")
}).catch((err)=>{
    console.log("DataBase Error")
})

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailToken: {
    type: String,
    require: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
    require: false,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  registerData: {
    type: Date,
    default: Date.now(),
  },
  loginDate: [
    {
      type: String,
      require: true,
    },
  ],
});

const OTPVerification = new mongoose.Schema({
  userID: String,
  OTP: String,
  createdAt: Date,
  expiresAt: Date,
});


UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const UserModel = mongoose.model("Users", UserSchema);
const OTPModel = mongoose.model("OTPs", OTPVerification);

module.exports = { UserModel, OTPModel };
