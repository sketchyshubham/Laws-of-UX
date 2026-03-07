import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-32">
      <Lottie animationData={loaderAnimation} loop={true} className="w-24 h-24 opacity-80" />
    </div>
  );
}
