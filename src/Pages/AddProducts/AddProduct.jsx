import { useState } from "react";
import noImage from "../../assets/no-image.jpg";
import { useForm } from "react-hook-form";
import { request } from "../../axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [variants, setVariants] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      // setImageSrc(URL.createObjectURL(files[0]));
    }
  };

  const handleVarientSubmit = (e) => {
    e.preventDefault();
    const colorName = e.target.colorName.value;
    const colorCode = e.target.colorCode.value;
    const quantity = e.target.quantity.value;
    const image = selectedImage;
    const varientData = { colorName, colorCode, quantity, image };
    setVariants([...variants, varientData]);
    e.target.reset();
    setSelectedImage("");
  };

  const handleVariantDelete = (index) => {
    const newArray = [
      ...variants.slice(0, index),
      ...variants.slice(index + 1),
    ];
    setVariants(newArray);
  };

  const onSubmit = async (data) => {
    const productData = {
      title: data.title,
      category: data.category,
      price: data.price,
      variants: variants,
      slug: data.title + " " + data.category,
      tags: [data.category],
      video:
        "https://res.cloudinary.com/dfjxig6z2/video/upload/v1717190167/Test/ts0zrfo8kcxdtttopfqp.mp4",
    };
    const { data: response } = await request.post("/products/add", productData);
    if (response?.result) {
      reset();
      setVariants([]);
      toast.success("Product Added Successfully.");
    }
  };

  return (
    <div className="addProduct">
      <h3 className="text-xl font-medium mb-5">Add Product</h3>
      <div className="grid grid-cols-2">
        <form action="" onSubmit={handleVarientSubmit}>
          <p className="mb-3">Varients</p>
          <div className="flex gap-10">
            <div>
              <label htmlFor="productImage">
                <img
                  src={selectedImage || noImage}
                  alt=""
                  className="h-[300px] w-[300px] object-contain"
                />
              </label>
              <input
                className="hidden"
                type="file"
                id="productImage"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div className="[&_label]:text-sm [&_input]:bg-slate-300 [&_input]:rounded [&_input]:py-1 [&_input]:px-2 [&_input]:w-full">
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="">Color Name</label>
                <input type="text" name="colorName" />
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="">Color Code</label>
                <input type="text" name="colorCode" />
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="">Quantity</label>
                <input type="text" name="quantity" />
              </div>
              <button
                type="submit"
                className="text-sm bg-slate-800 text-white py-1 px-10 mt-3 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div>
          {variants.length > 0 && (
            <>
              <div className="grid grid-cols-5 mb-5">
                <p>Image</p>
                <p>Color Name</p>
                <p>Color Code</p>
                <p>Quantity</p>
                <p>Actions</p>
              </div>
              {variants?.map(({ colorCode, colorName, image, quantity }, i) => (
                <div className="grid grid-cols-5 mb-4 items-center" key={i}>
                  <img src={image} alt="" className="h-14 w-14" />
                  <p>{colorName}</p>
                  <p>{colorCode}</p>
                  <p>{quantity}</p>
                  <button
                    className="text-center h-5 w-5 bg-red-600 rounded-full text-white flex items-center justify-center"
                    onClick={() => handleVariantDelete(i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="[&_label]:text-sm [&_input]:bg-slate-300 [&_input]:rounded [&_input]:py-1 [&_input]:px-2 [&_input]:w-2/4 mt-10"
      >
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Product Title</label>
          <input type="text" {...register("title", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Category</label>
          <input type="text" {...register("category", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Price</label>
          <input type="number" {...register("price", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Video</label>
          <input type="text" {...register("video")} />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Discount</label>
          <input type="number" {...register("discount")} />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-1 px-5 rounded mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
