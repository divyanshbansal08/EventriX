"use client";
import React from "react";
import ProductCard from "./ProductCard";
import "tailwindcss";

function MerchandiseSection() {
  const products = [
    {
      id: 1,
      name: "Product name",
      variant: "Variant",
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/867f2a4b20e0df8381043420e8627e1f2d0f3180308707fe0edac44ced211843?placeholderIfAbsent=true",
    },
    {
      id: 2,
      name: "Product name",
      variant: "Variant",
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/867f2a4b20e0df8381043420e8627e1f2d0f3180308707fe0edac44ced211843?placeholderIfAbsent=true",
    },
    {
      id: 3,
      name: "Product name",
      variant: "Variant",
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/867f2a4b20e0df8381043420e8627e1f2d0f3180308707fe0edac44ced211843?placeholderIfAbsent=true",
    },
    {
      id: 4,
      name: "Product name",
      variant: "Variant",
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/21c7ee6bca6caaec9e454384b2b698a908eb839cc5982db13e8aebd8c58e80c9?placeholderIfAbsent=true",
    },
    {
      id: 5,
      name: "Product name",
      variant: null,
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/cd6e293c68a065629673b554ad340ab8b673c7069f413db040f8c6227901c235?placeholderIfAbsent=true",
    },
    {
      id: 6,
      name: "Product name",
      variant: null,
      price: "$55",
      image:
        "https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/cd6e293c68a065629673b554ad340ab8b673c7069f413db040f8c6227901c235?placeholderIfAbsent=true",
    },
  ];

  return (
    <section className="overflow-hidden px-16 py-28 w-full bg-zinc-950 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-end w-full max-md:max-w-full">
        <div className="text-white min-w-60 w-[768px] max-md:max-w-full">
          <div className="w-full max-md:max-w-full">
            <h2 className="text-6xl font-medium tracking-wide leading-tight max-md:max-w-full max-md:text-4xl">
              Merchandise
            </h2>
            <p className="mt-4 text-xl leading-relaxed max-md:max-w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </p>
          </div>
        </div>
        <div className="text-lg font-medium leading-relaxed text-white">
          <a
            href="#"
            className="gap-2 self-stretch px-6 py-2.5 bg-white bg-opacity-10 rounded-[100px] shadow-[0px_1px_2px_rgba(8,8,13,0.05)] max-md:px-5"
          >
            View all
          </a>
        </div>
      </div>
      <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-10 items-start w-full leading-relaxed max-md:max-w-full overflow-x-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              variant={product.variant}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-10 justify-between items-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <div
            className="flex gap-2 items-start self-stretch my-auto"
            aria-label="Pagination dots"
          >
            {[1, 2, 3, 4, 5].map((dot) => (
              <span
                key={dot}
                className="flex shrink-0 w-2 h-2 bg-white rounded-full"
                aria-current={dot === 1 ? "true" : "false"}
              />
            ))}
          </div>
          <div className="flex gap-4 items-start self-stretch my-auto">
            <button
              className="flex gap-2 justify-center items-center px-3 w-12 h-12 border border-solid bg-neutral-800 border-zinc-950 rounded-[100px]"
              aria-label="Previous slide"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/9ba01d185d35165a36f41cf798b308c6193482d5feb5fa1c45d65e95d618ba1b?placeholderIfAbsent=true"
                alt="Previous"
                className="object-contain self-stretch my-auto w-6 aspect-square"
              />
            </button>
            <button
              className="flex gap-2 justify-center items-center px-3 w-12 h-12 border border-solid bg-neutral-800 border-zinc-950 rounded-[100px]"
              aria-label="Next slide"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/f0e6a28d5af74f66b47e7e8a1216e314/1cc021d70ed4fccb568ee1ba27c845487ded6b445a69d432c8085080b4317bb1?placeholderIfAbsent=true"
                alt="Next"
                className="object-contain self-stretch my-auto w-6 aspect-square"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MerchandiseSection;