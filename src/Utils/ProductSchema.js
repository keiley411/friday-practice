import { checkSchema } from "express-validator";

export const ProductSchema = ({
  price: {
    notEmpty: {
      errorMessage: "price cannot be empty",
    },
    isDecimal: {
      errorMessage: "price must be a decimal",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name must be a string",
    },
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "name must not be less than 3",
    },
  },
  description: {
    errorMessage:"description should range between a min 3 and max 30",
    isLength: {
      options: {
        min: 4,
        max: 30,
      },
    },
  },
});
