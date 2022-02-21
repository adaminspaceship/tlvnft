import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { artworks } from '../piece.config';
import './Lander.css';

const Lander = () => {
    const convertToCurrency = async (ethAmount) => {
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ILS');
        const data = await response.json();
        console.log(data);
        setInIls((data["ILS"]*ethAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    const params = useParams();
    const artwork = artworks[params.id];
    const [inIls, setInIls] = useState(0);

    useEffect(() => {
        convertToCurrency(artwork.latestSalePriceEth);
    })

    const openExternalUrl = (url) => window.location.href = url;
    return (
        <div className='full-card'>
            <img className='art-img' component="img" src={artwork.imgSrc} />
            <Typography style={{ 'marginTop': '0.5em', fontSize: 'xx-large', fontWeight: 'bold' }} gutterBottom component="div">
                {artwork.title}
            </Typography>
            <div style={{ fontSize: '25px', marginTop: '1em', marginBottom: '1em' }}>
                <span><img src="https://www.kindpng.com/picc/b/257-2576092_bitcoin-icon-png.png" height="25px" />&nbsp;&nbsp;{artwork.latestSalePriceEth}</span>
                &nbsp;-<span>&nbsp;₪{inIls}</span>
            </div>
            <Typography gutterBottom variant="h5" >
                {artwork.artist}
            </Typography>
            <Typography style={{ 'width': '10%' }} variant="h7" >
                {artwork.description}
            </Typography>
            <div style={{ 'marginTop': '2em' }}>
                <Button variant="contained" onClick={() => openExternalUrl(artwork.externalUrl)} size="small">Learn more on {artwork.externalUrlName}</Button>
            </div>
        </div>
    )
}

export { Lander };