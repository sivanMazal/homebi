import { useState } from "react";
import { Input, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";

const Password = ({ errors, register, labelName, name, flag }) => {

    const [showPassword, setshowPassword] = useState(false);

    return (
        <FormControl
            sx={{ m: flag?0:1, width: flag?'19ch':'25ch' }}
            variant="standard">
            <InputLabel
                htmlFor="standard-adornment-password"
                >
                {labelName}
            </InputLabel>
            <Input
                // style={{ backgroundColor: "#ebedf0" }}
                {...register(name)}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setshowPassword(!showPassword)}                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <p className="text-danger">{errors[name]?.message}</p>
        </FormControl>
    )
}
export default Password;