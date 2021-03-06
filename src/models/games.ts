import * as mongoose from "mongoose";

const games = new mongoose.Schema({
  _id: { type: String, select: false },
  Name: { type: String, select: true },
  Platform: { type: String, select: true },
  Year_of_Release: { type: Number, select: true },
  Genre: { type: String, select: true },
  Publisher: { type: String, select: true },
  NA_Sales: { type: Number, select: false },
  EU_Sales: { type: Number, select: false },
  JP_Sales: { type: Number, select: false },
  Other_Sales: { type: Number, select: false },
  Critic_Score: { type: Number, select: true },
  Critic_Count: { type: Number, select: false },
  User_Score: { type: Number, select: true },
  User_Count: { type: Number, select: false },
  Developer: { type: String, select: true },
  Rating: { type: String, select: true },
  complete: { type: Boolean, select: true },
  Id: { type: Number, select: false },
  Random: { type: Number, select: false }
});

export default mongoose.model("games", games);
