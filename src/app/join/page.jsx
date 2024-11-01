"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUrlStore } from "@/zustandStore/user.url";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setLazyProp } from "next/dist/server/api-utils";

const JoinPage = () => {
  //const router = useRouter();

  // states for register variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const url = useUrlStore((state) => state.url);
  const { setUrl, updateUrl } = useUrlStore();

  // states for login variables
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  // register functionallity

  const handleRegister = async (e) => {
    e.preventDefault();

    // check for empty fields
    if (!setUrl || !email || !password) {
      toast.error("all fields are needed to register");
      return;
    }

    const username = setUrl.url;

    if (password.length < 8) {
      toast.error("password smol");
      return;
    }

    // email check using regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("invalid format of email");
      return;
    }

    // attempting to create user
    try {
      // making a post req to api
      const response = await fetch(
        "https://link-tree-backend-wuop.onrender.com/api/v1/user/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            credentials: "include", // Ensure credentials are included
        }
    );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);

        toast.error(data.message);
        console.log(response);
      } else {
        updateUrl("");
        setEmail("");
        setPassword(""); // making states empty
        toast.success(data.message);
        //router.push("/my-profile");
      }
    } catch (error) {
      toast.error(error);
      console.log("failed to register user", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // check for empty fields
    if (!logEmail || !logPassword) {
      toast.error("all fields are needed to register");
      return;
    }

    if (logPassword.length < 8) {
      toast.error("password smol");
      return;
    }

    // email check using regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(logEmail)) {
      toast.error("invalid format of email");
      return;
    }

    // attempting to create user
    try {
      // making a post req to api
      const response = await fetch(
        "https://link-tree-backend-wuop.onrender.com/api/v1/user/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Ensure credentials are included
            body: JSON.stringify({
                email: logEmail,
                password: logPassword,
            }),
        }
    );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);

        toast.error(data.message);
        console.log(response);
      } else {
        setEmail("");
        setPassword(""); // making states empty
        toast.success(data.message);
        //router.push("/my-profile");
      }
    } catch (error) {
      toast.error(error);
      console.log("failed to register user", error);
    }
  };

  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <ToastContainer />
      <div>
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2" value="register">
              Register
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="login">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            {/*  register card  */}
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join us by creating your account for free
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">your url </Label>
                      <div className="flex m-0 justify-center items-center rounded-md border-2 p-1 px-2">
                        <span htmlFor="">links.vercel.app/</span>
                        <input
                          id="name"
                          className="border-none m-0 p-0 outline-none"
                          placeholder="your url here"
                          value={setUrl.url}
                          onChange={(e) => updateUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="name"
                        placeholder="Your email here"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">password</Label>
                      <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="name"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleRegister} typeof="submit">
                  Register
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            {/* login card here  */}
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Already Have an Account ?</CardTitle>
                <CardDescription>
                  log in using email and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">email</Label>
                      <Input
                        value={logEmail}
                        onChange={(e) => setLogEmail(e.target.value)}
                        id="name"
                        placeholder="Your email here"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">password</Label>
                      <Input
                        value={logPassword}
                        onChange={(e) => setLogPassword(e.target.value)}
                        id="name"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleLogin}>Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JoinPage;
