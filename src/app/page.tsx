"use client";
import Image from "next/image";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FacebookShareButton } from "react-share";

import { X } from "lucide-react";

import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [signUpInfo, setSignUpInfo] = React.useState({
    email: "",
    city: "",
  });

  const id = searchParams.get("id");

  console.log(id);

  const checkIfValid = async () => {
    if (signUpInfo.email === "" || signUpInfo.city === "") {
      toast({
        title: "Looks like there was an error",
        description: "Please fill out all fields",
      });
    } else {
      await joinWaitlist();
    }
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const joinWaitlist = async () => {
    try {
      const res = await axios.post("/api/waitlist", { signUpInfo, id });

      toast({
        title: res.data.title,
        description: res.data.message,
      });

      setSignUpInfo({
        email: "",
        city: "",
      });

      console.log();

      router.push(res.data.redirect);
    } catch (error: any) {
      toast({
        title: "Looks like there was an error",
        description: error.message,
      });

      setSignUpInfo({
        email: "",
        city: "",
      });
    }
  };

  return (
    <div className="relative h-screen max-h-screen overflow-hidden">
      <Image
        src="/web.png"
        layout="fill"
        objectFit="cover"
        alt={"Two girls playing guitar"}
        className="hidden md:block"
      />

      <Image
        src="/mobile.png"
        layout="fill"
        objectFit="cover"
        alt={"Two girls playing guitar"}
        className="block md:hidden"
      />
      <div className="absolute h-screen  w-full text-center">
        <header className="flex justify-center bg-transparent">
          <h1 className="text-5xl font-bold">
            S<span className="text-[#30d5c8]">hi</span>pp
          </h1>
          <Separator orientation="vertical" />
        </header>

        <main className="space-y-3 flex-col flex justify-center items-center h-full">
          <h1 className="text-2xl md:text-5xl font-light">
            Online Dating Sucks.
          </h1>
          <h1 className="text-2xl md:text-5xl font-light">
            Meet someone IRL and get a drink
          </h1>

          <AlertDialog>
            <AlertDialogTrigger>
              <h1 className="bg-[#30d5c8] text-2xl text-white  px-4 py-2 rounded m-12">
                Join Waitlist
              </h1>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Signup for early access</AlertDialogTitle>
                <AlertDialogDescription>
                  Shipp is a dating app where you meet someone IRL for your
                  first conversation
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Input
                placeholder="Email"
                type="email"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, email: e.target.value })
                }
                value={signUpInfo.email}
              />
              <Input
                placeholder="City"
                onChange={(e) =>
                  setSignUpInfo({
                    ...signUpInfo,
                    city:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
                value={signUpInfo.city}
              />
              <AlertDialogFooter>
                <div className="w-full flex justify-between">
                  <AlertDialogAction
                    onClick={checkIfValid}
                    disabled={
                      signUpInfo.email === "" ||
                      signUpInfo.city === "" ||
                      !isValidEmail(signUpInfo.email)
                    }
                    className="bg-[#30d5c8] text-white"
                  >
                    Join Waitlist
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>

        <div className="fixed bottom-0 w-full bg-transparent text-white py-2 text-center">
          <p className="text-sm md:text-base font-light">
            Meet at partnered businesses for a discount on a purchase
          </p>
        </div>
      </div>
    </div>
  );
}
