import { useState } from "react";
import { request } from "../../axios";
import copyTextToClipboard from "copy-text-to-clipboard";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const ImageUploadModal = ({ setImagesModal, imageFiles, setImageFiles }) => {
  const [loading, setLoading] = useState(false);

  const handleImages = async (files) => {
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const { data } = await request.post(
        "http://localhost:5000/api/products/image/upload",
        formData
      );
      setImageFiles(data.images);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(data.message);
    }
  };

  const copy_url = (url) => {
    copyTextToClipboard(url);
    toast("Url copied");
  };

  return (
    <div className="fixed h-[70%] w-[60%] top-0 right-0 left-0 bottom-0 m-auto z-50 shadow-md bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium">Upload Image</p>
        <button onClick={() => setImagesModal(false)}>
          <X />
        </button>
      </div>
      <div className="image">
        <label htmlFor="imageUpload">
          <div className="flex items-center justify-center gap-3 my-5 bg-black text-white py-2 px-3 rounded w-fit">
            {loading && <Loader2 className="animate-spin" />}

            {loading ? (
              "Please wait"
            ) : (
              <>
                <Upload /> Select Image
              </>
            )}
          </div>
          <input
            onChange={(e) => handleImages(e.target.files)}
            type="file"
            name="imageUpload"
            id="imageUpload"
            multiple
            className="hidden"
          />
        </label>
      </div>
      <div className="flex gap-5">
        {imageFiles?.map(({ url }) => (
          <div className="relative group ">
            <img src={url} alt="" className="w-24" />
            <div className="group absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] hidden group-hover:flex items-center justify-center transition duration-1000">
              <button
                className=" border-none text-white bg-black p-3 font-medium rounded"
                onClick={() => copy_url(url)}
              >
                Copy Url
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadModal;
