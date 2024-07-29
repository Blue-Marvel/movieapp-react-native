import AuthService from "@/services/auth_service";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  FC,
} from "react";

/**
 * Represents a user
 */

type User = {
  name: string;
};

/**
 * Represents the value of the global context.
 */

type GlobalContextValue = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
};

/**
 * The global context for the application
 */
const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

/**
 *  Hook to use the global context
 *
 * @throws Will throw an error if used outside of a GlobalProvider
 * @returns {GlobalContextValue} the global context value
 */

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const authService = new AuthService();

/**
 * Provides the global context to its children.
 *
 * @param {ReactNode} children - The child components to render.
 * @returns {JSX.Element} The provider component.
 */

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  /**
   * This is similiar to flutter setState
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the current user when the component is mounted.
   * This is similar to Flutter's initState.
   */
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("success");

        setIsLoading(false);
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
