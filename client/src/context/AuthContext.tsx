import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  // id: string;
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
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

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
