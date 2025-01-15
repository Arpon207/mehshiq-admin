import axios from "axios";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "../ui/input";

const UploadVideo = () => {
  const [uploaded, setUploaded] = useState(null);
  const uploadvideo = async (e) => {
    e.preventDefault();
    const instance = axios.create();
    const file = e.target.video.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "video_upload");
    formData.append("cloud_name", "danuatfvs");
    console.log(file);
    const { data } = await instance.post(
      `https://api.cloudinary.com/v1_1/danuatfvs/video/upload`,
      formData,
      {
        onUploadProgress: ({ loaded, total }) => {
          setUploaded(Math.round((loaded / total) * 100));
        },
      }
    );
    console.log(data);
  };
  return (
    <div className="videoAdd">
      <h3 className="mt-5 mb-3 font-medium">Upload Video</h3>
      <form action="" onSubmit={uploadvideo}>
        <Input type="file" name="video" id="video" className={"w-fit mb-3"} />
        <div>
          <button
            type="submit"
            className="text-sm bg-slate-800 text-white py-1 px-10 mt-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-5">
        <Progress value={uploaded} className="w-[200px]" />
      </div>
    </div>
  );
};
export default UploadVideo;
