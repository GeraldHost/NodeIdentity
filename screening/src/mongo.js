import mongoose from "mongoose";

export const mongoConnect = async () => {
  mongoose.connection.once("connected", () => {
    console.log("connected to mongo db");
  });
  mongoose.connection.on("error", () => {
    console.log("error connecting to mongo db");
  });
  mongoose.connection.on("disconnect", () => {
    console.log("disconnectted from mongo db");
  });

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
  };
  await mongoose.connect(process.env.MONGO_URL, options);
};
