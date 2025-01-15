import { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../axios";
import { toast } from "sonner";

import ProductDetailsForm from "../../components/AddProduct/ProductDetailsForm";
import VariantSubmitForm from "../../components/AddProduct/VariantSubmitForm";
import ColorVariantsTable from "../../components/AddProduct/ColorVariantsTable";
import ImageUploadModal from "../../components/ImageUploadModal/ImageUploadModal";

const AddProduct = () => {
  const form = useForm();
  const [variants, setVariants] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [imagesModal, setImagesModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploaded, setUploaded] = useState(null);

  const defaultValues = {
    title: "",
    category: "",
    price: "",
    video: "",
    discount: "",
    description: "",
  };

  const onSubmit = async (data) => {
    if (variants.length === 0) {
      toast.error("There should be at least one color variant.");
      return;
    }
    setIsLoading(true);

    const productData = {
      title: data.title,
      category: data.category,
      price: data.price,
      variants: variants,
      slug: data.title + " " + data.category,
      tags: [data.category],
      video: data.video,
      description: data.description,
    };
    const { data: response } = await request.post(
      "/products/add",
      productData,
      {
        onUploadProgress: ({ loaded, total }) => {
          setUploaded(Math.round((loaded * 100) / total));
        },
      }
    );
    if (response?.result) {
      form.reset(defaultValues);
      setVariants([]);
      setIsLoading(false);
      toast("Product Added Successfully.", {
        description: `${data.title} BDT ${data.price}`,
      });
      setUploaded(null);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="addProduct">
      <h3 className="text-xl font-medium mb-5">Add Product</h3>
      <div className="grid grid-cols-2">
        <VariantSubmitForm
          variants={variants}
          setVariants={setVariants}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <div className="colorVarient w-3/4">
          {variants.length > 0 && (
            <>
              <ColorVariantsTable
                variants={variants}
                setVariants={setVariants}
              />
            </>
          )}
        </div>
      </div>
      <ProductDetailsForm
        isloading={isloading}
        setImagesModal={setImagesModal}
        onSubmit={onSubmit}
        form={form}
        uploaded={uploaded}
      />
      {imagesModal && (
        <ImageUploadModal
          setImagesModal={setImagesModal}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      )}
    </div>
  );
};

export default AddProduct;
