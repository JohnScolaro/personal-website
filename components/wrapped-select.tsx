"use client";

import Select from "react-select";
import { createFilter } from "react-select";
const ReactSelect = ({
  options,
  defaultValue,
  required,
  onChange,
  id,
  isClearable = false,
}) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      required={required}
      onChange={onChange}
      isClearable={isClearable}
      filterOption={createFilter({ matchFrom: "start" })}
      aria-label={id}
      instanceId={id}
    />
  );
};

export default ReactSelect;
