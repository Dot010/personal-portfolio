"use client";


import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

type WorkSliderBtnsProps = {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
    onPrev?: () => void;
  onNext?: () => void;

};

const WorkSliderBtns = ({ containerStyles, btnStyles, iconStyles, onPrev, onNext }: WorkSliderBtnsProps) => {
    

  return (
    <div className={containerStyles}>
          <button type="button" className={btnStyles} onClick={onPrev} aria-label="Previous project">
              <PiCaretLeftBold className={iconStyles} />
          </button>
          <button type="button" className={btnStyles} onClick={onNext} aria-label="Next project">
              <PiCaretRightBold className={iconStyles} />
          </button>
      </div>
  )
}

export default WorkSliderBtns