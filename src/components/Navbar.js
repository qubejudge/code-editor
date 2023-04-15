import React from "react";
import {TbBrandCodesandbox} from 'react-icons/tb'
import { getRandomOptions } from "../utils/RandomAvatar";

import { BigHead } from "@bigheads/core";

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const shortName = uniqueNamesGenerator({
  dictionaries: [colors, adjectives, animals],
  separator: " ",
  length:2
}); // red_big_donkey



const Navbar = () => {
  return(
<nav class="flex items-center justify-between flex-wrap bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <TbBrandCodesandbox size={40}/>
    <span class="font-semibold text-xl tracking-tight ml-3">QubeJudge</span>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 active ">
        Submit File
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Submissions
      </a>
    </div>
  </div>
  <div class = "flex items-center justify-between ">
      <text class = "block mt-4 lg:inline-block lg:mt-0 text-white mu-4 active text-md">{shortName}</text>
      <svg class="w-20 h-10">
        <BigHead {...getRandomOptions()}/>
      </svg>
    </div>
</nav>
  )

}

export default Navbar
