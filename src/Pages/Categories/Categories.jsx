import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../axios";

const Categories = () => {
  const [categories, setCategories] = useState();

  const getCategories = async () => {
    const { data } = await request.get("/categories/get");
    setCategories(data);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const { data } = await request.post("/categories/add", { title });
    if (data) {
      e.target.reset();
      getCategories();
      toast.success("Category Added Successfully");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="categories">
      <div className="mb-5">
        <h3 className="font-semibold mb-3">Categories</h3>
        <ul>
          {categories?.map(({ title }, i) => (
            <li className="flex items-center gap-2">
              <span>{i + 1 + "."}</span> <span>{title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium">Add Category</h3>
        <form action="" className="mt-5" onSubmit={handleCategorySubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="CategoryTitle">Category Title</label>
            <input
              type="text"
              name="title"
              id="CategoryTitle"
              className="bg-slate-300 rounded px-2 py-1 w-80"
            />
          </div>
          <button
            type="submit"
            className="w-fit bg-slate-800 text-white text-md py-1 px-5 mt-3 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
