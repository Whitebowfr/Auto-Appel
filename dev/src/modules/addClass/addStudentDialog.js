import * as React from 'react';
import { Dialog, DialogTitle, TextField, Button, Box, Divider } from '@mui/material';

export default function AddStudentDialog({ callback, handleClose, open, className }) {
    const [name, setName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [isSendButtonDisabled, setSendButtonState] = React.useState(false);

    const handleNameChange = (e) => {
        setSendButtonState(e.target.value !== '' && firstName !== '')
        setName(e.target.value)
    }

    const handleFirstNameChange = (e) => {
        setSendButtonState(e.target.value !== '' && name !== '')
        setFirstName(e.target.value)
    }

    const sendData = () => {
        if (name && firstName) {
            callback({ name: name, firstName: firstName})
        }
    }

    return (<Dialog onClose={handleClose} open={open} sx={{borderRadius: '5px'}}>
        <Box sx={{padding: '10px'}}>
            <DialogTitle>Ajouter un élève à {className}</DialogTitle>
            <TextField label="Prénom de l'élève" onChange={handleFirstNameChange} fullWidth />
            <Divider sx={{ margin: '1rem' }} />
            <TextField label="Nom de l'élève" onChange={handleNameChange} fullWidth />
            <Button sx={{float: 'right'}} onClick={sendData} disabled={!isSendButtonDisabled}>Envoyer</Button>
        </Box>
    </Dialog>)
}