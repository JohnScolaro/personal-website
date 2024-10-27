"use client";

import Select from "react-select";

const ReactSelect = ({
  options,
  defaultValue,
  required,
  onChange,
  isClearable = false,
}) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      required={required}
      onChange={onChange}
      isClearable={isClearable}
    />
  );
};

export default ReactSelect;
