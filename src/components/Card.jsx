import React from "react";

export default function Card({ content, image, title, onAdd }) {
  return (
    <>
      <div className="w-[300px]  bg-white rounded-lg shadow bg-gray-100 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg h-[250px] w-full" src={image} alt="" />
        </a>
        <div className="p-5 w-[full] h-[full]">
          <a href="#">
            <h5 className=" w-[full] h-[full] mb-2 text-2xl font-bold tracking-tight text-neutral-600">
              {title}
            </h5>
          </a>
          <p className=" w-[full] h-[full] mb-3 font-normal text-slate-500">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <button
            onClick={onAdd}
            className=" w-[full] h-[full] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
}
