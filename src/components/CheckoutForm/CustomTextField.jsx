import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';


  const CustomTextField= ({ name, label, required }) => {
     const { control } = useFormContext(); 
          

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField} defaultValue=""
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
        // error={isError}
      />
    </Grid>
  );
}

export default CustomTextField;