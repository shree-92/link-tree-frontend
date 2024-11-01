"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

const getProfile = (params) => {
  const url = params.params.id;

  const [userData, setUserData] = useState(null); // Move useState inside the component

  const getMyProfile = async () => {
    const response = await fetch(`https://link-tree-backend-wuop.onrender.com/${url}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    setUserData(data); // Set the user data
    console.log(data); // Log the fetched data
  };

  useEffect(() => {
    getMyProfile(); // Call the function to fetch user profile
  }, []);

  return (
    <div className="h-screen w-full border-0 flex flex-col gap-y-4 justify-start items-center bg-transparent text-center">
      <CardHeader className="flex justify-start items-center">
        <Avatar style={{ height: "100px", width: "100px" }}>
          <AvatarImage
            style={{ height: "100%", width: "100%" }}
            src={userData?.pfp?.image_url || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>PFP</AvatarFallback>
        </Avatar>

        <CardTitle>{userData?.name || "loading..."}</CardTitle>
        <CardDescription>
          {userData?.bio ||
            "lorem epkjb w eiugur biug biub biug gr igg biu gt biugt4 ib uggribugr iu ruig bi ugr iburgiu gr3 hiui gu"}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex flex-col justify-center items-center gap-y-4 text-lg">
        {userData?.links && userData.links.length > 0 ? (
          userData.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="flex items-center justify-between overflow-hidden pr-16  border-2 text-center rounded-2xl md:w-[20%] w-[70%]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* image  */}
              <img
                src={"https://res.cloudinary.com/dkkzjysqd/image/upload/v1730453298/thcbkacdmhg1wwwpoorr.jpg"}
                alt={`${link.title} icon`}
                className="w-12 mr-2"
              />

              {/* links  */}
              <div
                // Correctly place the href prop here
                className=" hover:underline text-center"
                // Recommended for external links
              >
                {link.title}
              </div>
            </Link>
          ))
        ) : (
          <p>No links are provided to display</p>
        )}
      </CardContent>

      <CardFooter>
        <p>Thanks for visiting UwU</p>
      </CardFooter>
    </div>
  );
};

export default getProfile;
