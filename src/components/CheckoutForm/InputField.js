import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
const InputField = (props) => {
  const { name, label } = props;
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <TextField {...field} defaultValue="" fullWidth label={label} required />}
      />
      {/* <Controller
        render={(props) => <TextField />}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      /> */}
    </Grid>
  );
};

export default InputField;
