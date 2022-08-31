import { useCallback, useState } from "react";

export const StarRating = () => {
  const [hover, setHover] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const handleClick = useCallback((num: number) => {
    setSelected(num);
    setHover(-1);
  }, []);
  const handleHover = useCallback((num: number) => {
    setHover(num);
  }, []);
  return (
    <div className="relative w-[5em] h-[1em] text-3xl leading-[1em] mt-3">
      <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#fe553e] w-[5em]">
        {[...Array(5)]
          .map((_, i) => i + 1)
          .map((num: number) => (
            <span
              key={num}
              className={
                num <= selected || num <= hover
                  ? "opacity-100 cursor-pointer"
                  : "opacity-0 hover:opacity-100 cursor-pointer"
              }
              onClick={() => handleClick(num)}
              onMouseOver={() => handleHover(num)}
              onMouseLeave={() => setHover(-1)}
            >
              ★
            </span>
          ))}
      </div>
      <div className="text-[#aeaeae]">☆☆☆☆☆</div>
    </div>
  );
};
