import { IResValidation, IValidation } from "./interface";

export const validation = ({ req, schema }: IValidation): IResValidation => {
  const request = schema.options({
    abortEarly: false,
  });

  const { value, error } = request.validate(req.body);
  if (error?.details) {
    return {
      error: error.message,
      value: undefined,
    };
  }
  if (!value) {
    return {
      error: "request not found",
      value: undefined,
    };
  }
  return {
    value,
  };
};
