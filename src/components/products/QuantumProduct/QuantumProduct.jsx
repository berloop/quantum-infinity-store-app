import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import StarsIcon from '@material-ui/icons/Stars';



import useStyles from './styles';


const QuantumProduct = ({product, onAddToCart}) => {

  //calling our classes...
  const classes = useStyles();

  // console.log(product);

  // return <div>testing data..</div>

    return (
    
      
        <Card className= {classes.root}>
            <CardMedia className= {classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
        <div className={classes.cardContent}>
  
          <Typography variant="h6" component="h2">
          
            {product.name}
          </Typography>
            
          <Typography variant="body1">
          <Chip label={product.price.formatted_with_code} variant="outlined" />
            
          </Typography>
        </div>
    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
      </CardContent>
      
      <CardActions disableSpacing className={classes.cardActions}>
      
        <Button size="medium" variant="outlined" color="default" className={classes.margin} onClick={()=> onAddToCart(product.id, 1)}>
        <AddShoppingCart fontsize="small"/> ADD TO CART
        </Button>
      </CardActions>
        </Card> 
    );
}  

export default QuantumProduct;
