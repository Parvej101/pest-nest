import Marquee from "react-fast-marquee";

const Announcement = () => {
  return (
    <div className="bg-neutral text-neutral-content">
      <Marquee pauseOnHover={true} speed={50}>
        <p className="py-2 text-sm mx-8">
          BDT 1500+ অর্ডারে সম্পূর্ণ ঢাকা শহরে ফ্রি ডেলিভারি! 🚚
        </p>
        <p className="py-2 text-sm mx-8">
          বিশেষ ছাড়! সকল Pet Food-এর উপর ১০% ডিসকাউন্ট! 🎉
        </p>
        <p className="py-2 text-sm mx-8">
          নতুন কালেকশন দেখতে আমাদের শোরুমে আসুন। 🐾
        </p>
      </Marquee>
    </div>
  );
};

export default Announcement;
