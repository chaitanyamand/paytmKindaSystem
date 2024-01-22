import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = ({ userName }) => {
  return (
    <div className="flex justify-between m-8">
      <h1 className="font-sans text-3xl text-black font-extrabold">
        Paytm Clone
      </h1>
      <div className="text-lg flex items-center">
        Hello, {userName ? userName[0].toUpperCase() + userName.slice(1) : null}
        <div className="w-9 h-9 ml-4 flex items-center justify-center rounded-full bg-gray-300 ">
          <p className="text-xl  text-gray-800">
            {userName[0] ? userName[0].toUpperCase() : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
