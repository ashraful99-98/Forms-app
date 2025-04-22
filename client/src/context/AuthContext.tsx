// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";

// interface User {
//   // id: string;
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   fetchCurrentUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         { email, password },
//         { withCredentials: true } // ⬅️ Required for cookies
//       );
//       setUser(response.data.user);
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw error;
//     }
//   };

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/users/me", {
//         withCredentials: true,
//       });
//       setUser(response.data.user);
//     } catch (error) {
//       console.log("User not logged in:", error);
//       setUser(null);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:8000/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.log("Logout error:", error);
//     }
//     setUser(null);
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  updateUserRole: (id: string, role: string) => Promise<void>;
  blockUser: (id: string) => Promise<void>;
  unblockUser: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true } // ⬅️ Required for cookies
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/me", {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.log("User not logged in:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Logout error:", error);
    }
    setUser(null);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      await axios.put(
        "http://localhost:8000/api/users/updateRole",
        { id, role },
        { withCredentials: true }
      );
      fetchAllUsers(); // Refresh users after updating role
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const blockUser = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/users/block/${id}`,
        {},
        { withCredentials: true }
      );
      fetchAllUsers(); // Refresh users after blocking
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/users/unblock/${id}`,
        {},
        { withCredentials: true }
      );
      fetchAllUsers(); // Refresh users after unblocking
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        fetchCurrentUser,
        fetchAllUsers,
        updateUserRole,
        blockUser,
        unblockUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
