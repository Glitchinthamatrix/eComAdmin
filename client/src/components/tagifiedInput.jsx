import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Tagified = ({name,placeholder}) => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput value={selected} onChange={setSelected} name={name} placeHolder={placeholder}/>
    </div>
  );
};

export default Tagified;