import { Schema } from "mongoose";

export const reusableSchemaMethods = (schema: Schema) => {
  schema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
  });
};
