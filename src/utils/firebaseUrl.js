const BASE_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const getUserPath = (email) => {
  if (!email) {
    throw new Error("Email is required to build Firebase path");
  }

  const safeEmail = email.replace(/[.@]/g, "_");
  return `${BASE_URL}/${safeEmail}`;
};
