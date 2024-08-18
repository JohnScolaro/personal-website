"use client";

import Select from "react-select";

const ReactSelect = ({ options, defaultValue, required, onChange }) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      required={required}
      onChange={onChange}
    />
  );
};

export default ReactSelect;
