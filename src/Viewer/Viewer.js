import './Viewer.css';
import { useEffect, useState } from 'react';
import { aiServer } from "../AiServer.communicator";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const Viewer = () => {
    const defaultImage = "https://storage.googleapis.com/tlvnft-44e12.appspot.com/cogito_gallery/843d6b04-38f4-40b5-b0a4-b62347ce346b.png";
    const [currentArt, setCurrentArt] = useState({ url: defaultImage, startDisplayTime: (new Date()).getTime(), imageName: 'Potato', username: 'adam' });

    let queue = [{ url: defaultImage, startDisplayTime: (new Date()).getTime(), imageName: 'hello', username: 'adam' }];

    const slideImages = [
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/tlvnft-44e12.appspot.com/o/thumbnails%2Fcognito1.jpeg?alt=media&token=5d5e4c70-8f13-4c91-ad38-4f37af9c726b',
            caption: 'City in the nature'
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/tlvnft-44e12.appspot.com/o/thumbnails%2Fcognito2.jpeg?alt=media&token=0a4aa832-44a7-400b-a364-5beae93fee74',
            caption: 'Dead tomatoes'
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/tlvnft-44e12.appspot.com/o/thumbnails%2Fcogito3.jpeg?alt=media&token=5539ccaf-b2cb-4913-9493-c87872f9c235',
            caption: 'Future battlefield'
        },
    ];

    const getNewImages = async () => {
        const urls = await aiServer.getImagesFromServer().catch(err => console.log(err));
        const currentTime = (new Date()).getTime();
        queue = queue.concat(urls);
        const timePerPicture = 60;
        if (queue.length > 1 && (currentTime - queue[0].startDisplayTime) / 1000 > timePerPicture) {
            queue.shift();
            queue[0].startDisplayTime = (new Date()).getTime();
            setCurrentArt(queue[0]);
        }
    }

    useEffect(() => {
        const intervalMS = 4000;
        setInterval(() => getNewImages(), intervalMS);
    }, []);

    return (
        <div className="main-div">
            <div className="art-div">
                <img className="viewer-art-img" src={currentArt.url} />
                <div className='under-img-div'>
                    <div style={{ height: '85%', display: 'flex', alignItems: 'center' }}>
                        <img className='qr big-z' src="https://cogito.gallery/wp-content/uploads/2022/01/logo3.png" alt='' />
                    </div>
                    <div className="bar-text">
                        <div style={{ marginBottom: '0.3em', fontSize: '4em', color: 'rgb(250,149,250)' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                Artist:&nbsp;
                            </span>{currentArt.username}</div>
                        <div style={{ fontSize: '4em' }}><span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{currentArt.imageName.replaceAll('_', ' ')},</span> (2022)</div>
                    </div>
                </div>
                <img className="tlvnft-bar" src="https://firebasestorage.googleapis.com/v0/b/tlvnft-44e12.appspot.com/o/thumbnails%2FLower%20Bar_00000.PNG?alt=media&token=c48c2c37-88be-4cef-989e-00e8f0701a80" />
                <span className='art-ai-desc'>Create your own AI art<br/>Using the iPad below</span>
                <div style={{ width: '100%', marginTop: '6em' }}>
                    <Slide>
                        {slideImages.map((slideImage, index) => (
                            <div className="each-slide" key={index}>
                                <div><img style={{ height: '36em' }} src={slideImage.url} /></div>
                                <h1>{slideImage.caption}</h1>
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
            <div className='all-images'>
            </div>
            <img style={{width: '100%'}} src="https://firebasestorage.googleapis.com/v0/b/tlvnft-44e12.appspot.com/o/thumbnails%2FVisit%20at%20cogito.gallery%20(1).png?alt=media&token=78a2c363-1d8f-4534-a041-c4a6903d314a"/>
        </div >
    )
}

export { Viewer };