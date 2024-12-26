"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
} from "react";

interface FurixContextType {
  coins: number;
  category: string;
  setCoins: Function;
  setCategory: Function;
}

const FurixContext = createContext<FurixContextType | null>(null);

const FurixProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<number>(3000);
  const [category, setCategory] = useState<string>("all");

  const FurixOutput = {
    coins,
    setCoins,
    category,
    setCategory,
  };
  
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
