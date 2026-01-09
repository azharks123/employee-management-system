import sha256 from "crypto-js/sha256";
import { logout } from "../api/api";

export const hashPassword = async (password) => {
  const hashedPassword = sha256(password).toString();
  return hashedPassword;
};

export const handleLogout = () => {
  logout()
    .then(() => {
      localStorage.clear();
    })
    .catch((err) => {
      console.error("Logout failed", err);
    });
  window.location.href = "/login";
};

export const CONST = {
  TOKEN: "token",
  REFRESH: "refresh",
};
