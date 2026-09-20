import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "careerPilotUsers";
const CURRENT_USER_KEY = "careerPilotCurrentUser";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    return [];
  }

  try {
    return JSON.parse(users);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD CURRENT USER
  // =========================

  useEffect(() => {
    const currentUser =
      localStorage.getItem(CURRENT_USER_KEY);

    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch {
        localStorage.removeItem(
          CURRENT_USER_KEY
        );
      }
    }

    setLoading(false);
  }, []);


  // =========================
  // SIGNUP
  // =========================

  function signup(userData) {
    const users = getUsers();

    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() ===
        userData.email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: crypto.randomUUID(),

      name: userData.name,

      email: userData.email.toLowerCase(),

      password: userData.password,

      college: userData.college || "",

      targetRole:
        userData.targetRole || "",

      skills:
        userData.skills || "",

      createdAt:
        new Date().toISOString(),
    };

    users.push(newUser);

    saveUsers(users);

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      college: newUser.college,
      targetRole: newUser.targetRole,
      skills: newUser.skills,
      createdAt: newUser.createdAt,
    };

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  }


  // =========================
  // LOGIN
  // =========================

  function login(email, password) {
    const users = getUsers();

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      college: foundUser.college || "",
      targetRole:
        foundUser.targetRole || "",
      skills:
        foundUser.skills || "",
      createdAt:
        foundUser.createdAt || "",
    };

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true,
      message: "Login successful.",
    };
  }


  // =========================
  // UPDATE USER
  // =========================

  function updateUser(updatedData) {
    if (!user) {
      return {
        success: false,
        message: "No user is currently logged in.",
      };
    }

    const users = getUsers();

    const updatedUsers = users.map(
      (item) => {
        if (item.id !== user.id) {
          return item;
        }

        return {
          ...item,
          ...updatedData,
        };
      }
    );

    saveUsers(updatedUsers);

    const updatedCurrentUser = {
      ...user,
      ...updatedData,
    };

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(
        updatedCurrentUser
      )
    );

    setUser(updatedCurrentUser);

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  }


  // =========================
  // LOGOUT
  // =========================

  function logout() {
    localStorage.removeItem(
      CURRENT_USER_KEY
    );

    setUser(null);
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// =========================
// USE AUTH
// =========================

export function useAuth() {
  return useContext(AuthContext);
}