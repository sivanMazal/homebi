import { InputLabel } from "@mui/material";
import * as React from "react";

const SelectForm = React.forwardRef(({ onChange, onBlur, name, lableName, arr, errors, defaultValue }, ref) => (
  <React.Fragment>
        <InputLabel>{lableName} </InputLabel>
        <select name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}>
            {arr.map(x => <option key={x.Id}
                value={x.Id ? x.Id : 2}
                selected={defaultValue == x.Id}> {x.Name} </option>)}
        </select>
        <p style={{ color: "red" }}>{errors[name]?.message}</p>
    </React.Fragment>
));
export default SelectForm;