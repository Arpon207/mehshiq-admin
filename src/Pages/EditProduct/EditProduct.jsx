import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../axios";
import { toast } from "sonner";

import ImageUploadModal from "../../components/ImageUploadModal/ImageUploadModal";
import { useLocation, useParams } from "react-router-dom";
import VariantsAdd from "../../components/EditProducts/VariantsAdd";
import ColorVariantsEdit from "../../components/EditProducts/ColorVariantsEdit";
import ProductDetailsEdit from "../../components/EditProducts/ProductDetailsEdit";
import { useQuery } from "@tanstack/react-query";

export const ProductContext = createContext();

const EditProduct = () => {
  const { id } = useParams();
  const {
    data: { data: product } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return request.get(`/products/product/${id}`);
    },
  });

  const [selectedImage, setSelectedImage] = useState("");

  const [imagesModal, setImagesModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <ProductContext.Provider
        value={{
          product,
          refetch,
          selectedImage,
          setSelectedImage,
          setImagesModal,
          imageFiles,
          setImageFiles,
        }}
      >
        <div className="addProduct">
          <h3 className="text-xl font-medium mb-5">Edit Product</h3>
          <div className="grid grid-cols-2">
            <VariantsAdd />
            <div className="colorVarient w-3/4">
              <>
                <ColorVariantsEdit />
              </>
            </div>
          </div>
          <ProductDetailsEdit />
          {imagesModal && <ImageUploadModal />}
        </div>
      </ProductContext.Provider>
    </>
  );
};

export default EditProduct;
