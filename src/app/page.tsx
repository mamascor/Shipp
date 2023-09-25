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

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  const [signUpInfo, setSignUpInfo] = React.useState({
    email: "",
    city: "",
  });

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

  const joinWaitlist = async () => {
    try {
      const res = await axios.post("/api/waitlist", signUpInfo);

      toast({
        title: res.data.title,
        description: res.data.message,
      });

      setSignUpInfo({
        email: "",
        city: "",
      });

      router.push("/share");
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
          <h1 className="text-xl">
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
              <h1 className="bg-[#30d5c8] text-white px-4 py-2 rounded m-12">
                Get Started
              </h1>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Join the waitlist</AlertDialogTitle>
                <AlertDialogDescription>
                  We are currently testing the app at University of North
                  Carolina, We will notify you when we are ready to launch in
                  your area.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Input
                placeholder="Email"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, email: e.target.value })
                }
                value={signUpInfo.email}
              />
              <Input
                placeholder="City"
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, city: e.target.value })
                }
                value={signUpInfo.city}
              />
              <AlertDialogFooter>
                <div className="w-full flex justify-between">
                  <AlertDialogCancel>
                    <X size={24} />
                  </AlertDialogCancel>

                  <AlertDialogAction onClick={checkIfValid}>
                    Join Waitlist
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>

        <div className="fixed bottom-0 w-full bg-transparent text-white py-2 text-center">
          <p className="text-sm md:text-base font-light">
            Actually discount off of a purchase at meetup location
          </p>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="max-h-screen overflow-hidden relative bg-cover">
  <Image
    src={"/web.png"}
    layout="fill"
    objectFit="cover"
    objectPosition="center"
    alt="Two girls playing guitar"
  />

  <div className="aboslute w-full text-center ">
   
  </div>
</div>; */
}
