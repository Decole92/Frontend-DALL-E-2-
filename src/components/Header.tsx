import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 sticky top-0 z-50 shadow-md bg-white">
      <div className="flex space-x-2">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJj36F8gAa-TPX1QIFnBBUUf8Q3ylGIkB7nWN4_pkYwA&s"
          alt="openai_logo"
          width={50}
          height={30}
        />
        <div>
          <h1 className="font-bold">
            The DecoleMills <span className="text-blue-500">AI </span>
            Image Generator
          </h1>
          <h2 className="text-xs hidden md:inline">
            Powered by DALL·E 2, chatGPT, Microsoft AZURE
          </h2>
        </div>
      </div>
      <div className="flex items-center text-xs md:text-base divide-x">
        <Link
          className="px-2 text-right"
          href="https://portfolio.decolemills.com"
        >
          Visit My Portfolio
        </Link>
        <Link className="px-2" href="https://www.github.com/decole92">
          Github Repo
        </Link>
      </div>
    </header>
  );
}
