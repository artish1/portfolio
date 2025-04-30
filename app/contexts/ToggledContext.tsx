import { createContext, useContext, useState } from "react";


interface ToggledContextType {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

const ToggledContext = createContext<ToggledContextType>({
  toggled: false,
  setToggled: () => { },
});

export const ToggledProvider = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <ToggledContext.Provider value={{ toggled, setToggled }}>
      {children}
    </ToggledContext.Provider>
  );
}

export const useToggled = () => {
  const context = useContext(ToggledContext);
  if (!context) {
    throw new Error("useToggled must be used within a ToggledProvider");
  }
  return context;
}
export default ToggledContext;