"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {redeemCodeSchema} from "@/lib/schema/user";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";


const GenerateRedeenCode = () => {
  

  const form = useForm<z.infer<typeof redeemCodeSchema>>({
    resolver: zodResolver(redeemCodeSchema),
    defaultValues: {
      name: "",
      amount: 0,
      expiryDate: new Date(),
      code: "",
      limit: 50,
    },
  });

  const [date, setDate] = React.useState<Date | null>(new Date());
  const [tableData, setTableData] = React.useState<
    Array<{
      _id: number;
      name: string;
      createdAt: string;
      amount: number;
      expiryDate: string;
      code: string;
      limit: number;
      redeemed: number;
      createdBy: string;
    }>
  >([]);
  const handleGenerateToken = () => {
    const token = Math.random().toString(36).substring(2);
    form.setValue("code", token.toUpperCase());
  };
  const handleGenerateCode = (data: z.infer<typeof redeemCodeSchema>) => {
    axios.post("/api/v1/generate-redeem-code", {
      ...data,
      expiryDate: new Date(data.expiryDate),
    }).then((res) => {
      if(res.data.status === "success") {
        setTableData([...tableData, res.data.data]);
        form.reset();
        toast.success("Code generated successfully");
      }
    }).catch(err => {
      const error = (err as AxiosError).response?.data;
      console.log(error);
    });
  };

  useEffect(() => {
    axios.get("/api/v1/generate-redeem-code").then((res) => {
      console.log(res.data);
      setTableData(res.data.data);
    });
  }, []);
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[450px] p-5">
        <Card className="rounded-none border-none shadow-lg">
          <CardHeader className="rounded-none bg-white text-center">
            <CardTitle className="rounded-none">Generate Redeem Code</CardTitle>
          </CardHeader>
          <CardContent className="bg-zinc-900 p-5 text-white min-h-96">
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(handleGenerateCode)}
              >
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border border-white rounded-none"
                          placeholder="pongol special"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="expiryDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-2">Expiry Date</FormLabel>
                        <FormControl className="block">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-zinc-900 rounded-none",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-full p-0"
                              align="center"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(e) => {
                                  field.onChange(e);
                                  if (e) setDate(e);
                                }}
                                initialFocus
                                className="bg-white text-black border mx-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border border-white rounded-none"
                          placeholder="100"
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between my-3">
                        <div>Code</div>
                        <div
                          className="text-xs text-muted-foreground cursor-pointer"
                          onClick={handleGenerateToken}
                        >
                          Generate new Code
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border border-white rounded-none tracking-widest text-center"
                          placeholder="WELCOME50"
                          onChange={(e) => {
                            field.onChange(e.target.value.toUpperCase());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border border-white rounded-none"
                          placeholder="100"
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-none hover:bg-slate-100"
                >
                  Generate Code
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex justify-center mt-5 flex-col">
        <h1 className="py-5 font-bold">Redeem Code List</h1>
        <div className="overflow-x-auto border w-full max-h-[500px">
          <Table className="border">
            <TableCaption>Redeem Code List</TableCaption>
            <TableHeader className="bg-white text-black">
              <TableRow>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Created Date</TableHead>
                <TableHead className="text-black">Amount</TableHead>
                <TableHead className="text-black">Expiry Date</TableHead>
                <TableHead className="text-black">Code</TableHead>
                <TableHead className="text-black">Limit</TableHead>
                <TableHead className="text-black">Users Redeemed</TableHead>
                <TableHead className="text-black">Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center hover:bg-black">
                    No data
                  </TableCell>
                </TableRow>
              )}
              {tableData.map((data) => {
                return (
                  <TableRow key={data._id} className="hover:bg-black">
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.createdAt}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{format(data.expiryDate, 'PPP')}</TableCell>
                    <TableCell>{data.code}</TableCell>
                    <TableCell>{data.limit}</TableCell>
                    <TableCell>{data.redeemed}</TableCell>
                    <TableCell>{data.createdBy}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default GenerateRedeenCode;
