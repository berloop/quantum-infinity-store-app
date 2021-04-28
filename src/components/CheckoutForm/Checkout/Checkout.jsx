import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
// import { Link, useHistory } from 'react-router-dom';

// import { commerce } from '../../../lib/commerce';
import AddressForm from '../QuantumAddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  

  const Confirmation = () => (

    <div>
      Confirmation
    </div>
  )
  


  const Form = () => activeStep === 0
    ? <AddressForm />
    : <PaymentForm />
  
  return (

    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />} */}
        </Paper>
      </main>
    </>
  );
};


export default Checkout;