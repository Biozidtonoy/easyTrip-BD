export const validateRegisterForm = (
  name: string,
  email: string,
  password: string
) => {

  const errors: Record<string, string> = {};

  if (!name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email.";
    }

  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  return errors;

};

export const validateLoginForm = (
  email: string,
  password: string
) => {
  const errors: Record<string, string> = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email.";
    }
  }

  if (!password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
};
