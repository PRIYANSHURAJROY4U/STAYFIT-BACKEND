// const { mongoose } = require(".");

module.exports = (mongoose) => {
  var userschema = mongoose.Schema(
    {
      username: String,
      password: String,
    },
    {timestamps : true}
  );

  const  User = mongoose.model("user", userschema);

  return User;
};
