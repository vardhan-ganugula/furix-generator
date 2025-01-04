"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";



interface FurixContextType {
  coins: number;
  category: string;
  setCoins: Function;
  setCategory: Function;
  isLoading: boolean;
}

const FurixContext = createContext<FurixContextType | null>(null);

const FurixProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<number>(3000);
  const [category, setCategory] = useState<string>("all");
  const [isLoading, setLoading] = useState<boolean>(true);
  const FurixOutput = {
    coins,
    setCoins,
    category,
    setCategory,
    isLoading,

  };
  const loadTokens = async () => {
    setLoading(true);
    try {
      const responseData = await axios.get("/api/v1/profile");
      setCoins(responseData.data.data.token);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
    
  }
  useEffect(() => {
    loadTokens();
  }, []);
  return (
    <FurixContext.Provider value={FurixOutput}>
      {children}
    </FurixContext.Provider>
  );
};

const useFurix = () => {
  const context = useContext(FurixContext);
  if (context === null) {
    throw new Error("useFurix must be used within a FurixProvider");
  }
  return context;
};

export { FurixProvider, useFurix };
