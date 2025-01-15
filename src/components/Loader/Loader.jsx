import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-white">
      <div className="animate-spin">
        <LoaderCircle size={40} />
      </div>
    </div>
  );
};

export default Loader;
