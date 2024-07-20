import * as yup from "yup";

export const usernameFieldSchema = yup
    .string()
    .required()
    .matches(
        /^[a-zA-Z][a-zA-Z0-9_\.]{2,19}$/,
        "Username must start with a letter and can contain letters, numbers, underscores, and dots.",
    )
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username cannot be longer than 20 characters.");
