"use client";

import Countdown from "react-countdown";

// Renderer function for the countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <span className="text-2xl font-bold text-error">Offer Expired!</span>
    );
  } else {
    // পরিবর্তন: টাইমারের ডিজাইন এখন রেসপন্সিভ
    return (
      <div className="grid grid-flow-col gap-3 sm:gap-5 text-center auto-cols-max justify-center">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-3xl sm:text-5xl">
            <span style={{ "--value": days }}></span>
          </span>
          <span className="text-xs sm:text-base">days</span>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-3xl sm:text-5xl">
            <span style={{ "--value": hours }}></span>
          </span>
          <span className="text-xs sm:text-base">hours</span>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-3xl sm:text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          <span className="text-xs sm:text-base">min</span>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-3xl sm:text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          <span className="text-xs sm:text-base">sec</span>
        </div>
      </div>
    );
  }
};

const CountdownTimer = ({ expiryDate }) => {
  return <Countdown date={new Date(expiryDate)} renderer={renderer} />;
};

export default CountdownTimer;
