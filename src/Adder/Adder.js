import './Adder.css';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Adder = () => {

    const [nameField, setNameField] = useState(undefined);
    const [artTextField, setArtText] = useState(undefined);
    const [emailField, setEmail] = useState(undefined);
    const [isDisabled, setIsDisabled] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const handleNameChange = event => {
        setNameField(event.target.value);
    }
    const handleArtChange = event => {
        setArtText(event.target.value);
    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
    }
    const handleMarketingChange = event => {
        setMarketing(event.target.value);
    }

    const onClickSubmit = () => {
        setIsDisabled(true);
        const url = `https://api.cogito.gallery:8000/generate?query=${artTextField}&username=${nameField}&email=${emailField}`;
        axios.get(url).then(_ => {
            window.alert('בעוד כ-2 דקות היצירה שלך תהיה מוצגת על המסך ובמייל שהזנת');
            setNameField('');
            setArtText('');
            setEmail('');
            setMarketing(false);
            window.location.reload();
        }).catch(err => {
            window.alert(`err: ${err}`);
        }).finally(() => {
            setIsDisabled(false);
        });
    }

    return (
        <div className="form-group">
            <form>
                <div style={{ "marginTop": '5em' }} className='logo-img' />
                <h3 style={{ "marginTop": '2.5em' }}>Name</h3>
                <TextField value={nameField} onChange={handleNameChange} style={{ "width": '15em' }} id="standard-basic" label="Name" variant="filled" />
                <h3 style={{ "marginTop": '3em' }}>Art Text Prompt</h3>
                <TextField value={artTextField} onChange={handleArtChange} style={{ "width": '15em' }} id="standard-basic" placeholder='Pigs in the sky' variant="filled" aria-describedby='art-prompt-helper' />
                <h3 style={{ "marginTop": '3em' }}>Email</h3>
                <TextField value={emailField} onChange={handleEmailChange} style={{ "width": '15em' }} id="standard-basic" label="Email" variant="filled" />
                <div style={{ "marginTop": '5em', paddingLeft: '10em', paddingRight: '10em' }}>
                    <FormControlLabel control={<Checkbox onChange={handleMarketingChange} style={{transform: "scale(1.5)"}} value={marketing} />} label="I agree to receive my generated Words2Art Image to my email, along with future updates about the Cogito AI Art project"></FormControlLabel>
                </div>
                <div>
                    <Button type="button" disabled={isDisabled} style={{ "marginTop": '3em' }} onClick={onClickSubmit} id="submit-button" variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export { Adder };