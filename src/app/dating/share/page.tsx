"use client";
import Image from "next/image";
import { Twitter, MessageSquare, FacebookIcon, Mail } from "lucide-react";
import React from "react";

import { useSearchParams } from "next/navigation";

import { EmailShareButton, FacebookShareButton } from "react-share";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Share() {
  const searchParams = useSearchParams();

  const [isShareOpen, setIsShareOpen] = React.useState(false);

  const id = searchParams.get("id");

  const { toast } = useToast();

  const size = searchParams.get("totalSignUps");

  const behind = searchParams.get("behind");

  console.log(size);

  const link = id ? `http://www.joinshipp.com?id=${id}` : "www.joinshipp.com";

  const fb_url = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost:3000?id=${id}`;

  const twitterText =
    "Hey! This new dating app solves your frustrations 👀. You should sign up for early access!";
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)} %0A${link}`;

  //make a variable for the link to share if id is not return one otherwise return the default link

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Copied to clipboard",
      description: "Share with your friends",
    });
  };

  if (isShareOpen || !size) {
    return (
      <>
        <h1 className="text-2xl md:text-5xl font-light">
          Thank you for signing up!
        </h1>
        <h1 className="text-md md:text-lg font-light">
          Move up the waitlist by sharing with your friends
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
      </>
    );
  } else if (size) {
    return (
      <>
        <div className="space-y-10">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold">{size}</h1>
            <h1 className="text-md md:text-lg font-light">
              people are ahead of you
            </h1>
          </div>

          {behind && (
            <div>
              <h1 className="text-2xl md:text-5xl font-bold">{behind}</h1>
              <h1 className="text-md md:text-lg font-light">Behind</h1>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <h1 className="text-xl md:text-lg font-light">
            First 1,000 will get invited to exclusive launch event.
          </h1>

          <h1 className="font-bold text-xl">
            First 50 will be invited for early access event in October
          </h1>

          <Button
            onClick={() => {
              setIsShareOpen(true);
            }}
            className="bg-[#30d5c8] text-2xl hover:bg-[#30d5c8]/50 text-white mt-6 hover:text-black"
          >
            Bump me up in line
          </Button>
        </div>
      </>
    );
  }
}
