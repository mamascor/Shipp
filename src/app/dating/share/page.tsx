"use client";
import Image from "next/image";
import { Twitter, MessageSquare , FacebookIcon, Mail} from "lucide-react";
import React from "react";

import { useSearchParams } from "next/navigation";

import {
  EmailShareButton,
  FacebookShareButton,
  
} from "react-share";
import { Button } from "@/components/ui/button";

export default function Share() {
  const searchParams = useSearchParams();

  const [isShareOpen, setIsShareOpen] = React.useState(false);

  const id = searchParams.get("id");

  const size = searchParams.get("totalSignUps");

  console.log(size);



  const link = id ? `http://www.joinshipp.com?id=${id}` : "www.joinshipp.com";

  const fb_url = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost:3000?id=${id}`;

  //make a variable for the link to share if id is not return one otherwise return the default link
  const twitterLink = `https://twitter.com/intent/tweet?text=Hey!%20This%20new%20dating%20app%20solves%20your%20frustrations%20👀.%0AYou%20should%20signup%20for%20early%20access%20at%0A%0A${link}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  }

  
 if(isShareOpen || !size) {
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
 } else if(size) {
   return (
     <>
       <h1 className="text-2xl md:text-5xl font-light">{size}</h1>
       <h1 className="text-md md:text-lg font-light">
         people are ahead of you
       </h1>

       <div className="mt-6">
         <h1 className="text-md md:text-lg font-light">
           First 1,000 will get invited to exclusive launch event.
         </h1>

         <h1>First 50 will be invited for early access event in October</h1>

         <Button onClick={()=> {
            setIsShareOpen(true);
         }} className="bg-[#30d5c8] text-white mt-6 hover:text-black">Bump me up in line</Button>
       </div>
     </>
   );
 }
}
