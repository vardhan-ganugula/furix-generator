"use client";
import React, { useEffect } from "react";
import Coin from "@/public/coin.png";
import Image from "next/image";
import { useFurix } from "@/hooks/furixContext";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import GiftIcon from '@/public/gift.jpg'


const RedeemSection = () => {
  const [loading, setLoading] = React.useState(true);
  const { coins, isLoading, setCoins } = useFurix();
  const [bonusCoins, setBonusCoins] = React.useState(0);
  const [showGiftBox, setShowGiftBox] = React.useState<boolean>(false);
  useEffect(() => {
    if (!isLoading) setLoading(false);
  }, [isLoading]);
  const [redeemCode, setRedeemCode] = React.useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (redeemCode.length <= 5) {
      toast.error("Invalid redeem code");
      return;
    }
    try {
      const response = await axios.post("/api/v1/redeem-code", {
        code: redeemCode,
      });
      if (response.data.status === "error") {
        toast.error(response.data.message);
        return;
      }
      toast.success("Redeemed successfully");
      setBonusCoins(response.data.details.amount);
      setCoins(coins + response.data.details.amount);
      setShowGiftBox(true);
    } catch (error) {
      let message = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message;
      }
      toast.error(message);
    }
  };
  return (
    <div className="border-2 border-emerald-600 p-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-5">Redeem Information</h1>
      <div className="w-full flex items-center justify-center">
        <div className="bg-zinc-800 rounded-xl p-5 lg:w-[400px] w-full text-white">
          <div className="flex items-center gap-5">
            <Image
              src={Coin}
              alt="coin"
              className="w-[50px] h-[50px] object-cover"
            />
            <div>
              {loading ? (
                <Skeleton className="w-[200px] h-10" />
              ) : (
                <>
                  <h1 className="text-3xl font-bold">
                    {coins}{" "}
                    <span className="text-xs -translate-y-[2px] inline-block">
                      Tokens
                    </span>
                  </h1>
                  <p className="text-sm font-light"> You have {coins} Tokens</p>
                </>
              )}
            </div>
          </div>
          <Separator orientation="horizontal" className="my-3 bg-slate-300" />
          <div className="p-5">
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Enter the redeem code"
                className="py-5 border-white text-uppercase text-center"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                minLength={5}
              />
              <button className="bg-emerald-600 text-sm text-white rounded mt-5 w-full py-2">
                Redeem
              </button>
            </form>
          </div>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-3">Instructions</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Enter the redeem code</li>
              <li>Click on Redeem</li>
              <li>Each code can be redeemed only once</li>
            </ul>
          </div>
        </div>
      </div>
      {showGiftBox && (
        <Card className="fixed left-1/2 -translate-x-1/2 top-10 translate-y-10 bg-white text-black shadow rounded-sm p-5 border-none z-50">
        <CardContent className="flex items-center justify-center flex-col">
          <Image src={GiftIcon} alt="coin" className="w-[250px] h-[250px] object-cover" />
          <h1 className="text-5xl mb-5 font-bold flex items-center gap-3">
              <span>+</span> {bonusCoins} <span>🎁</span>
          </h1>
          <h1 className="text-lg font-bold">🎉Congratulations🎉</h1>
          <h2 className="text-sm flex flex-col items-center my-3 gap-3">
            <span className="text-lg font-bold text-blue-500 border border-dashed rounded bg-blue-100 block px-3 py-1 border-blue-500">&quot;{redeemCode}&quot;</span> <span>applied successfully</span>
          </h2>
          <button className="w-full bg-blue-500 text-white py-2 rounded mt-5" onClick={() => {setBonusCoins(0); setShowGiftBox(false)}}>
              Ok
          </button>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default React.memo(RedeemSection);
