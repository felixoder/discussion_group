import {
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="font-semibold border-b  ">
      <Link
        className="whitespace-nowrap !font-bold text-lg lg:ml-20 sm:ml-10 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
        to="/"
      >
        FelixUnderflow
      </Link>
      <div className="flex justify-end items-center gap-8">
        <div className=" flex justify-end gap-5 mr-5">
          <Link to={"/about"}>About</Link>
          <Link to={"/sign-in"}>
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-red-500 rounded-lg text-white">
              Sign-In
            </span>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
