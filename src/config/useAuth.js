import { useState } from "react";

export default function useAuth(initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue);
  function login() {
    //login logic goes here
    setTimeout(() => {
      setIsAuth(true);
    }, 1000);
  }
  function logout() {
    //logout logic goes here
    setTimeout(() => {
      setIsAuth(false);
    }, 1000);
  }
  return [isAuth, login, logout];
}
