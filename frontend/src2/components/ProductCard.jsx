import React from "react";
import "tailwindcss";

function ProductCard({ name, variant, price, image }) {
  return (
    <article className="min-w-60 w-[90%]">
      <img
        src={image}
        alt={name}
        className="object-contain w-full aspect-[0.82] rounded-[32px]"
      />
      <div className="mt-4 w-[95%]">

        <div className="flex gap-4 items-start w-full h-12 text-white">
          <div className="flex-1 shrink basis-0 min-w-60">
            <div className="flex gap-14"><h3 className="text-xl font-semibold">Product Name</h3>
              <p className="text-2xl font-semibold ">$55</p>
            </div>

            <p className="text-base">{variant}</p>
          </div>

        </div>

        <button className="gap-2 self-stretch px-5 py-1.5 mb-4 w-full text-lg font-medium text-white bg-white bg-opacity-10 min-h-10 rounded-[100px] shadow-[0px_1px_2px_rgba(8,8,13,0.05)]">
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;