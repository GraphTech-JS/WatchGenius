import { ThemedText } from "@/components/ThemedText/ThemedText";
import React, { useState } from "react";

interface ProductData {
  label: string;
  value: string;
}

interface ProductDetailsProps {
  data: ProductData[];
}

const ProductDetails = ({ data }: ProductDetailsProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? data : data.slice(0, 5);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div className="border-0 sm:border border-[#171414] border-b-0 rounded-[5px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] sm:gap-0">
        {visibleData.map((item, index) => (
          <div
            key={index}
            className={`flex justify-normal sm:justify-center items-center text-start sm:text-center border-b-none sm:border-b border-[#171414] last:border-b-0 h-auto sm:h-[62px] 
          ${
            index % 2 !== 0 ? "border-l-none sm:border-l border-[#171414]" : ""
          }`}
          >
            <ThemedText className="w-full sm:max-w-[330px]">
              {item.label}: {item.value}
            </ThemedText>
          </div>
        ))}
        <div className="flex justify-center ">
          <button
            onClick={toggleShowAll}
            className="bg-transparent sm:bg-black text-black sm:text-white w-full underline font-normal sm:font-semibold text-[20px] sm:text-[16px]"
          >
            {showAll ? "Сховати" : "Показати все"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
