import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenOne, setTokenOne] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedToken1 = localStorage.getItem("token1");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // useEffect(() => {
  //   // console.log("token", token);
  // }, [token]);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const token1 = (token1) => {
    setTokenOne(token1);
    localStorage.setItem("token1", token1);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
