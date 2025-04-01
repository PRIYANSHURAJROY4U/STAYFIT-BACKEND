// const { mongoose } = require(".");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  var userschema = mongoose.Schema(
    {
      username: String,
      password: String,
    },
    {timestamps : true}
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  // const  User = mongoose.model("user", userschema);


  return Tutorial;
};



