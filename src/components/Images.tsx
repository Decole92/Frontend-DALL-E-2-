"use client";
import fetchImages from "@/utils/fetchImages";
import Image from "next/image";
import useSWR from "swr";

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImage,
    isValidating,
  } = useSWR("/api/fetchImages", fetchImages, { revalidateOnFocus: false });

  return (
    <div>
      <button
        onClick={() => refreshImage(images)}
        className="fixed bottom-10 right-10 z-20
       text-white px-5 py-3 rounded-md hover:bg-blue-500 focus:outline-none
        focus:ring-2 focus:ring-blue-400 font-bold bg-blue-400/90"
      >
        {isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>
      {isLoading && (
        <p className="text-center font-extralight pb-7 animate-pulse">
          Loading <span className="font-semibold text-blue-500">AI</span>{" "}
          Generated Images
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 p-5">
        {images?.imageUrls?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative ${
              i === 0 && "md: col-span-2 row-span-2"
            } cursor-help hover:scale-[103%] transition-transform duration-200`}
          >
            <div className=" flex w-full h-full opacity-0 hover:opacity-80 transition-opacity duration-200 bg-gray-100 items-center justify-center absolute z-10">
              <p className="text-center text-lg text-light p-5">
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Images;
