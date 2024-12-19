import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';


const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(./b2.png)",
        
    },
    bannerContent:{
        height:495,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    },
}));
const Banner = () => {
    const classes = useStyles();
  return (

    <div className={classes.banner}>
     <Container className={classes.bannerContent}>
     <div className={classes.tagline}>
<Typography 
variant="h2"
 style={{  fontWeight:"bold", marginBottom:15,fontFamily:"Montserrat" }}>Crypto Chaser
</Typography>
<Typography
    variant="subtitle2"
style={{color:"darkgrey" ,textTransfprm:"capitalize",fontFamily:"Montserrat"}}>
Get all the Info regrading your favorite Crypto Currency
</Typography>

     </div>
     {/* <Carousel/> */}
      </Container>
      <Carousel/>
    </div>
  );
}

export default Banner;