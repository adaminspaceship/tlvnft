import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Adder } from './Adder/Adder';
import { Viewer } from './Viewer/Viewer';
import { Lander } from './Lander/Lander';

const artworks = [
  {
  imgSrc: "https://lh3.googleusercontent.com/hjktgeAN3ys_5cBCowEKuMGiMmKLd7UKz8hFiWAxymkisGDQwwXjDBKyiuyFaecmDrBFp2IDzJNkcGB6SfTXbkrL9ItAg13VITDvwg=w600",
  title:"CryptoPunk #462",
  artist: "Larva Labs",
  latestSalePriceEth:102.312,
  description:"Created by C352B5",
  externalUrl:"https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/462",
  externalUrlName: "Opensea"
},
{
  imgSrc: "https://lh3.googleusercontent.com/ALokLIf7LZ_W2mGmn-prJ1wdEIRIwcBqFHbBWJIw81qDxjA9qXhRPdtHQHXcHTk05noa0nbHvc6O6JSkv6LeFZn1A2Ct-hgyhC_-qb8=w600",
  title:"#498",
  artist: "Bored Ape Yacht Club",
  latestSalePriceEth:188.214,
  description:"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation.",
  externalUrl:"https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/498",
  externalUrlName: "Opensea"
}]

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viewer" element={<Viewer />}></Route>
        <Route path="/adder" element={<Adder />}></Route>
        <Route path="piece/:id" element={<Lander artworks={artworks}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
