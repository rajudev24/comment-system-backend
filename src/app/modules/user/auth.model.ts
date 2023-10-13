import { Schema, model } from "mongoose";
import config from "../../../config";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "./auth.interface";

export const UserSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "password"> | null> {
  return await User.findOne({ email }, { password: 1, _id: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  currentPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, savedPassword);
};

UserSchema.pre("save", async function (next) {
  // Hashing User Poassword
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
