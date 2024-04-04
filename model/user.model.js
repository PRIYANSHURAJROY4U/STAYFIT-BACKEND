// const { mongoose } = require(".");

module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        name: String,
        email: String,
        password: String,
        mob_no: String,
      },
      { timestamp: true }
    )
  );
  return User;
};
