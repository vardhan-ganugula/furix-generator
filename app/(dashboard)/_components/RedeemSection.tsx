'use client'
import React, { useEffect } from "react";
import Coin from "@/public/coin.png";
import Image from "next/image";
import { useFurix } from "@/hooks/furixContext";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
const RedeemSection = () => {
    const [loading, setLoading] = React.useState(true);
    const { coins, isLoading } = useFurix();
    useEffect(() => {
        if (!isLoading) setLoading(false);
    }, [isLoading]);
  const [redeemCode, setRedeemCode] = React.useState<string>("");
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
            <Input
              placeholder="Enter the redeem code"
              className="py-5 border-white text-uppercase text-center"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              maxLength={10}
              minLength={10}
            />
            <button className="bg-emerald-600 text-sm text-white rounded mt-5 w-full py-2">
              Redeem
            </button>
          </div>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-3">Instructions</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Enter the 10-digit redeem code</li>
              <li>Click on Redeem</li>
              <li>Each code can be redeemed only once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RedeemSection);
