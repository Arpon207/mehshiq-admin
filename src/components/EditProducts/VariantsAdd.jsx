import axios from "axios";
import noImage from "../../assets/no-image.jpg";
import { Input } from "../ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const VariantsAdd = ({
  variants,
  setVariants,
  selectedImage,
  setSelectedImage,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleImage = async (e) => {
    const { files } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const handleVarientAdd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const colorName = e.target.colorName.value;
    const quantity = e.target.quantity.value;
    const image = selectedImage;
    const varientData = { quantity, image, colorName };
    const { data } = await axios.put(
      `http://localhost:5000/api/products/addVariant?id=${id}`,
      varientData
    );
    if (data) {
      setIsLoading(false);
      setVariants([...variants, varientData]);
      e.target.reset();
      setSelectedImage("");
    }
    setIsLoading(false);
  };

  return (
    <div className="variantSubmitForm">
      <form action="" onSubmit={handleVarientAdd}>
        <p className="mb-3 font-medium">Color Variants</p>
        <div className="flex gap-10">
          <div>
            <label htmlFor="productImage">
              <img
                src={selectedImage || noImage}
                alt=""
                className="h-[300px] w-[300px] object-contain rounded-lg"
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="productImage"
              onChange={(e) => handleImage(e)}
            />
          </div>
          <div className="[&_label]:text-sm">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="">Color Name</label>
              <Input type="text" name="colorName" required />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <label htmlFor="">Quantity</label>
              <Input type="text" name="quantity" required />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white py-1 px-5 rounded mt-3 mb-20"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Please wait" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VariantsAdd;
