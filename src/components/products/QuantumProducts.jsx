import React from "react";
import {Grid, Typography} from '@material-ui/core';

import QuantumProduct from './QuantumProduct/QuantumProduct';
import useStyles from './styles';


 
const QuantumProducts = ({products, onAddToCart}) => {
  const classes = useStyles();

  return(
    <main className={classes.content}>
<div className={classes.toolbar} />
   {/* <Typography variant="h5" justify="center" className={classes.title}>Welcome, To Quantum Infinity Store😉</Typography>
     */}
    <Grid container justify="center" spacing={4}>
      {
        //am writing javascript logic in here....
        products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <QuantumProduct product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))
      }
    </Grid>
  </main>
  );
  
};

export default QuantumProducts;
