import UserSchema, { User } from "../models/user";

export const getUser = async ({ user }: { user: User }) => {
  try {
    const userDocument = await UserSchema.findOne({ _id: user.id });
    return userDocument;
  } catch (error) {
    return error;
  }
};

export const updateUser = async ({
  user,
  update,
}: {
  user: User;
  update: User;
}) => {
  try {
    const updatedUser = await UserSchema.findOneAndUpdate(
      { _id: user.id },
      update,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async ({ user }: { user: User }) => {
  try {
    await UserSchema.deleteOne({ _id: user.id });
    return "User deleted";
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const users = await UserSchema.find();
    return users;
  } catch (error) {
    return error;
  }
};

export const createUser = async ({ user }: { user: User }) => {
  try {
    const newUser = new UserSchema(user);
    await newUser.save();
    return newUser;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("User validation failed: email: Email already exists");
    }
    return error;
  }
};
