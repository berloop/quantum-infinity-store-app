import React, { useState, useEffect } from 'react';
import {CssBaseline,Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import QuantumAddressForm from '../QuantumAddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const[isFinished, setIsFinished] = useState(false);
  const classes = useStyles();
  // const history = useHistory();

  // const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    // if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          console.log(token);
          setCheckoutToken(token);
        
        } catch(error) {
          console.log(error)
          // if (activeStep !== steps.length) history.push('/');
          // history.pushState('/');
        }
      };

      generateToken();
    
  }, [cart]);

 //setting the steps for addressform:)
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    //shipping data...sio kwa usingizi huu...:(
    setShippingData(data);

    nextStep();
  }

  const timeout = () => {
    setTimeout(() =>{
      setIsFinished(true)
    },3000);
  }

  

  let Confirmation = () => (order.customer ? (
     <>
    <div>
    <Divider className={classes.divider} />
      <Typography variant="h6" align="center">An Order Confirmation Email has been sent to your mailbox. Be sure to check your Spam/ Promotions Folder!</Typography>
      <Typography variant="h6" align="center" style={{fontweight:800}}>
           Thank you for your Purchase, {order.customer.firstname} {order.customer.lastname}:)
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2" style={{fontweight:800}}>Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
      <Button component={Link} variant="outlined" type="button"  to="/">Back to Shopping</Button>
      </>
     ): isFinished ? (
     <> 
     <div>
    <Typography variant="h6" align="center" style={{fontweight:800}}>
          Thank you for your Purchase,</Typography>
         <Divider className={classes.divider} />
         </div>
         <br />
     <Button component={Link} variant="outlined" type="button"  to="/">Back to Shopping</Button>
     </>
     ) : ( <div className={classes.spinner}>
      <CircularProgress />
    </div>
   
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }



  const Form = () => activeStep === 0
    ? <QuantumAddressForm checkoutToken= {checkoutToken} next={next} />
    : <PaymentForm shippingData = {shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout ={onCaptureCheckout} timeout ={timeout}/>
  
  return (

    <>
    <CssBaseline /> 
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
         {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};


export default Checkout;