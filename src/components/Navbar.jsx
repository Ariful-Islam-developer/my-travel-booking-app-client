"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <div className="">
      <div className=" py-3 border-b-2 mb-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <ul className="flex gap-3 items-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/destinations"}>Destination</Link>
            </li>
            <li>
              <Link href={"/myBookings"}>My Bookings</Link>
            </li>
            <li>
              <Link href={"/admin"}>Admin</Link>
            </li>
            <li>
              <Link href={"/addDestination"}>Add Destination</Link>
            </li>
          </ul>
          <div>
            <Image
              src={"/assets/Wanderlast.png"}
              alt="logo"
              width={150}
              height={150}
            ></Image>
          </div>
          <ul className="flex gap-3 items-center">
            {user ? (
              <>
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>

                <li>
                  {" "}
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="John Doe"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </li>
                <li>
                  <Button onClick={handleSignOut} variant="danger">
                    LogOut
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button className="bg-teal-500">
                    <Link href={"/login"}>Login</Link>
                  </Button>
                </li>
                <li>
                  <Button className="bg-teal-500">
                    <Link href={"/signup"}>SignUp</Link>
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
