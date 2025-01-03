import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { CloudUpload, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { request } from "../../axios";

const ProductDetailsEdit = ({ onSubmit, isloading, form, setImagesModal }) => {
  const [categories, setCategories] = useState();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const isDirty = form.formState.isDirty;

  const getCategories = async () => {
    const { data } = await request.get("/categories/get");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="ProductDetailsEdit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 w-3/4">
          <div className="grid grid-cols-2 gap-y-3 gap-x-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select category</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    className="grid w-full max-w-sm items-center gap-1.5"
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(({ title }, i) => (
                        <SelectItem key={i} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Price" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video</FormLabel>
                  <FormControl>
                    <Input placeholder="Video" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="Discount" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="my-3">
            <button
              type="button"
              className="uploadImages flex items-center justify-center gap-3 my-5 bg-black text-white py-2 px-3 rounded"
              onClick={() => setImagesModal(true)}
            >
              <CloudUpload /> Upload Images
            </button>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isloading || !isDirty}
            className="bg-black text-white py-1 px-5 rounded mt-3 mb-20"
          >
            {isloading && <Loader2 className="animate-spin" />}
            {isloading ? "Please wait" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductDetailsEdit;
