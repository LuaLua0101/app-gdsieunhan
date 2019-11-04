import { useState } from "react";

const useFormDropdown = (init = "") => {
  const [value, setValue] = useState(init);

  function handleChange(e, item) {
    setValue(item.key);
  }

  return {
    value,
    setValue,
    onChange: handleChange
  };
};

export default useFormDropdown;
