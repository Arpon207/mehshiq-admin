import axios from "axios";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import ReactPlayer from "react-player";

const VideoAdd = () => {
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
      <h3 className="mb-5">Upload Video</h3>
      <form action="" onSubmit={uploadvideo}>
        <input type="file" name="video" id="video" />
        <button type="submit">Submit</button>
      </form>
      <div className="mt-5">
        <Progress value={uploaded} className="w-[60%]" />
      </div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/8mFG41PPj9Q?si=hqUZjWHwvxsODeSW?rel=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div className="mt-5">
        <ReactPlayer
          url={"https://youtu.be/rpR71UINxZM?si=nIwZ-NNW4a0AVTpQ"}
          controls
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoAdd;
