"use client";


import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

type WorkSliderBtnsProps = {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
    onPrev?: () => void;
  onNext?: () => void;

};

const WorkSliderBtns = ({ containerStyles, btnStyles, iconStyles, onPrev, onNext }: WorkSliderBtnsProps) => {
    
    const swiper =  useSwiper()

  return (
    <div className={containerStyles}>
          <button className={btnStyles} onClick={onPrev}>
              <PiCaretLeftBold className={iconStyles} />
          </button>
          <button className={btnStyles} onClick={onNext}>
              <PiCaretRightBold className={iconStyles} />
          </button>
      </div>
  )
}

export default WorkSliderBtns