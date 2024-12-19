import noImage from "../../assets/no-image.jpg";
import { Input } from "../ui/input";

const VariantSubmitForm = ({
  variants,
  setVariants,
  selectedImage,
  setSelectedImage,
}) => {
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

  const handleVarientSubmit = (e) => {
    e.preventDefault();
    const colorName = e.target.colorName.value;
    const quantity = e.target.quantity.value;
    const image = selectedImage;
    const varientData = { quantity, image, colorName };
    setVariants([...variants, varientData]);
    e.target.reset();
    setSelectedImage("");
  };

  return (
    <div className="variantSubmitForm">
      <form action="" onSubmit={handleVarientSubmit}>
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
            <button
              type="submit"
              className="text-sm bg-slate-800 text-white py-1 px-10 mt-3 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VariantSubmitForm;
