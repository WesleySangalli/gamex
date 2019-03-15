import * as mongoose from "mongoose";

const games = new mongoose.Schema({
  Name: String,
  Platform: String,
  Genre: String,
  Year_of_Release: Number,
  Critic_Score: String
});

export default mongoose.model("games", games);
