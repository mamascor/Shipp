"use client";
import Image from "next/image";
import { Twitter, MessageSquare , FacebookIcon, Mail} from "lucide-react";

import { useSearchParams } from "next/navigation";

import {
  EmailShareButton,
  FacebookShareButton,
  
} from "react-share";
import { Button } from "@/components/ui/button";

export default function Share() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const link = id ? `http://www.joinshipp.com?id=${id}` : "www.joinshipp.com";

  const fb_url = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost:3000?id=${id}`;

  //make a variable for the link to share if id is not return one otherwise return the default link
  const twitterLink = `https://twitter.com/intent/tweet?text=Hey!%20This%20new%20dating%20app%20solves%20your%20frustrations%20👀.%0AYou%20should%20signup%20for%20early%20access%20at%0A%0A${link}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  }

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
        </header>

        <main className="space-y-3 flex-col flex justify-center items-center h-full">
          <h1 className="text-2xl md:text-5xl font-light">
            Thank you for signing up!
          </h1>
          <h1 className="text-md md:text-lg font-light">
            Please share with your friends!
          </h1>

          <div className="flex space-x-4">
            <a href={twitterLink} target="_blank">
              <Twitter size={32} />
            </a>
            <a
              href={`sms:/* phone number here */&body=Hey! This new dating app solves your frustrations 👀. You should signup for early access! ${link}`}
            >
              <MessageSquare size={32} />
            </a>
            <FacebookShareButton url={link}>
              <FacebookIcon size={32} />
            </FacebookShareButton>

            <EmailShareButton
              url={link}
              subject="I found an app that solves your frustration 👀"
              body={`Hey! This new dating app solves your frustrations 👀. You should signup for early access!`}
            >
              <Mail size={32} />
            </EmailShareButton>
          </div>

          <div className="my-4">
            <h1 className="text-md md:text-lg font-light">
              Or copy this link to share
            </h1>

            <Button onClick={copyToClipboard} className="text-2xl">
              Link
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
