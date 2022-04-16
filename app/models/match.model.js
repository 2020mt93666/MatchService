module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      teamA: String,
      teamB: String,
      target: Number,
      actual: Number,
      status: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const match = mongoose.model("match", schema);
  return match;
};
