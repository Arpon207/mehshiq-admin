import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../axios";
import { toast } from "sonner";

import ImageUploadModal from "../../components/ImageUploadModal/ImageUploadModal";
import { useLocation } from "react-router-dom";
import VariantsAdd from "../../components/EditProducts/VariantsAdd";
import ColorVariantsEdit from "../../components/EditProducts/ColorVariantsEdit";
import ProductDetailsEdit from "../../components/EditProducts/ProductDetailsEdit";

const EditProduct = () => {
  const product = useLocation().state;
  const [selectedImage, setSelectedImage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [imagesModal, setImagesModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [variants, setVariants] = useState([]);
  const [previousVariants, setPreviousVariants] = useState(product.variants);

  const defaultValues = {
    title: product?.title,
    category: product?.category,
    price: product?.price,
    video: product?.video,
    discount: product?.discount,
    description: product?.description,
  };
  const form = useForm({
    defaultValues: defaultValues,
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = async (data) => {
    setIsLoading(true);
    const productData = {
      title: data.title,
      category: data.category,
      price: data.price,
      slug: data.title + " " + data.category,
      tags: [data.category],
      video: data.video,
      description: data.description,
    };
    const { data: response } = await request.put(
      `/products/editDetails?id=${product._id}`,
      productData
    );
    console.log(response);
    if (response) {
      setIsLoading(false);
      toast("Product details edited successfully.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="addProduct">
        <h3 className="text-xl font-medium mb-5">Edit Product</h3>
        <div className="grid grid-cols-2">
          <VariantsAdd
            variants={variants}
            setVariants={setVariants}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            id={product._id}
          />
          <div className="colorVarient w-3/4">
            <>
              <ColorVariantsEdit
                variants={variants}
                setVariants={setVariants}
                previousVariants={previousVariants}
                setPreviousVariants={setPreviousVariants}
              />
            </>
          </div>
        </div>
        <ProductDetailsEdit
          isloading={isloading}
          setImagesModal={setImagesModal}
          onSubmit={onSubmit}
          form={form}
        />
        {imagesModal && (
          <ImageUploadModal
            setImagesModal={setImagesModal}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        )}
      </div>
    </>
  );
};

export default EditProduct;
