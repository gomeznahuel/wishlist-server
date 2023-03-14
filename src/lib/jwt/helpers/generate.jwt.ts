import jwt from "jsonwebtoken";

const generateJWT = (user: string) => {
  const token = jwt.sign({ user }, process.env.SECRETORPRIVATEKEY!, { expiresIn: "4h" });
  return token
};

export default generateJWT;