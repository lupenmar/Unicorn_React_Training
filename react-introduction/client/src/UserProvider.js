import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const roles = {
  GUEST: "Nepřihlášený",
  ADMIN: "Admin",
  USER: "Přihlášený",
};

export const users = [
  {
    id: 0,
    role: roles.ADMIN,
    fullName: "Admin Adminov",
  },
  {
    id: 1,
    role: roles.GUEST,
    fullName: "Neznámý uživatel",
  },
  {
    id: 2,
    role: roles.USER,
    fullName: "Nejlepší uživatel",
  },
];

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(users[1]);

  const login = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(users[1]);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;
