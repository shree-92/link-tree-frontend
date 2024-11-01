"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

const getProfile = (params) => {
  const url = params.params.id;

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file

  const getMyProfile = async () => {
    const response = await fetch(
      `https://link-tree-backend-wuop.onrender.com/api/v1/user/my-profile`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    
    const data = await response.json();
    setUserData(data);
    console.log(data);
  };

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name); // Append the name field
    formData.append("bio", bio); // Append the bio field
    formData.append("links", jsonInput); // Append the links as a JSON string

    if (image) {
        formData.append("image", image); // Append the image file if one is selected
    }

    try {
      const response = await fetch(`https://link-tree-backend-wuop.onrender.com/api/v1/user/my-profile`, {
        method: "POST",
        credentials: "include",
        body: formData, // Send the FormData object
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      console.log("Profile updated successfully:", updatedData);
      setUserData(updatedData); // Optionally update state with the response data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (userData?.links) {
      setJsonInput(JSON.stringify(userData.links, null, 2));
    }
  }, [userData]);

  const handleForm = (e) => {
    e.preventDefault(); // Prevent page reload
    updateProfile(); // Call updateProfile on form submission
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image file
    }
  };

  return (
    <div className="h-screen w-full border-0 flex flex-col gap-y-4 justify-start items-center bg-transparent text-center">
      <form onSubmit={handleForm}>
        <CardHeader className="flex justify-start items-center">
          <Avatar style={{ height: "100px", width: "100px" }}>
            <AvatarImage
              style={{ height: "100%", width: "100%" }}
              src={userData?.pfp?.image_url || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>

          <label
            htmlFor="fileUpload"
            className="inline-block cursor-pointer text-blue-700 px-4 rounded hover:underline transition duration-200"
          >
            update pfp...
          </label>
          <input type="file" id="fileUpload" name="image" className="hidden" onChange={handleFileChange} />

          <CardTitle className="m-2 flex flex-col gap-y-1">
            <Label>update username</Label>
            <Input
              className="bg-transparent rounded-lg text-sm"
              type="text"
              value={name || userData?.name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </CardTitle>
          <CardDescription className="m-2 flex flex-col gap-y-1 w-full">
            <Label>update bio</Label>
            <Textarea
              className="text-black w-full"
              value={bio || userData?.bio || ""}
              onChange={(e) => setBio(e.target.value)}
            />
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full flex flex-col justify-center items-center gap-y-4 text-lg">
          <Label>just use your pattern recognition skills</Label>
          <Textarea
            placeholder='[{"title": "Google", "url": "https://google.com", "icon": "https://example.com/icon.png"}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="6"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </CardContent>

        <CardFooter>
          <p>No amount of UI libraries could save it</p>
        </CardFooter>

        <Button type="submit" className="mt-4">Save</Button>
      </form>
    </div>
  );
};

export default getProfile;
