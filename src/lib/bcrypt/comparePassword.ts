import * as bcrypt from "bcrypt";

const comparePassword = async (password: string, receivedPassword: string) => {
  return await bcrypt.compare(password, receivedPassword);
};

export { comparePassword };
