import createAxios from "@/lib/Axios";
import { encryptData, decryptData } from "@/lib/utils";
import { useEffect, useState } from "react";
// shemas
import { TLogin, TRegister } from "@/schemas/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";




type UseAuthReturnType = {
  user: any;
  isError: boolean;
  isAuthenticated: boolean;
  login: (data: TLogin) => Promise<any>;
  logout: () => Promise<boolean>;
  register: (
    data: TRegister,
    setIsSubmitting: (value: boolean) => void
  ) => Promise<void>;
};

const useAuth = (): UseAuthReturnType => {


  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const axios = createAxios();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/me");

        setUser(response.data);
        setIsError(false);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsError(true);
        setIsAuthenticated(false);
      }
    };
    

    const token = localStorage.getItem("token");
    if (token) {
      const decryptedToken = decryptData(token);
      if (decryptedToken) {
        fetchUserData();
      } else {
        setIsError(true);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async ({ email, password }: TLogin) => {
    try {
      const response = await axios.post("auth/login", { email, password });
      if (response.status === 200) {
        const token = encryptData(response.data.access_token) as string;
        localStorage.setItem("token", token);
        setUser(response.data.user);
        setIsError(false);
        setIsAuthenticated(true);
        return user;
      } else {
        setIsError(true);
        setIsAuthenticated(false);
        return null
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        // Validation error occurred
        const validationErrors = error.response.data.errors;
        console.log(validationErrors);
        toast({
          title: "Validation errors occurred. Please check your input.",
          variant: "destructive",
        });
      } else {
        console.error(error);
        setIsError(true);
        setIsAuthenticated(false);
        toast({
          title: "An error occurred during login. Please try again.",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("auth/logout");
      localStorage.removeItem("token");
      setUser(null);
      setIsError(false);
      setIsAuthenticated(false);
      router.push("/login");
      toast({ title: "You are successfully logged out." });
      return true;
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsAuthenticated(false);
      toast({
        title: "Failed to log out. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (
    data: TRegister,
    setIsSubmitting: (value: boolean) => void
  ) => {
    try {
      const response = await axios.post("auth/register", data);
      if (response.status === 201) {
        toast({ title: response.data.message });
        setIsSubmitting(false);
        router.push("/login");
      } else {
        toast({
          title: "Failed to register. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 402) {
        const validationErrors = error.response.data;

        toast({
          title: "Validation errors occurred. Please check your input.",
          variant: "destructive",
        });
      } else {
        console.error(error);
        toast({
          title: "Failed to register. Please try again.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError && user === null) {
      router.push("/login");
    }
    else if (!isAuthenticated) {
      router.push("/login");
    }

  }, [user, isError]);

  return { user, isError, isAuthenticated, login, logout, register };
};
export default useAuth;
