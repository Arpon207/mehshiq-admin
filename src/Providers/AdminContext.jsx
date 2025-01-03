import { createContext } from "react";
import { toast } from "sonner";

export const Context = createContext();

const AdminContext = ({ children }) => {
  return <Context.Provider>{children}</Context.Provider>;
};

export default AdminContext;
