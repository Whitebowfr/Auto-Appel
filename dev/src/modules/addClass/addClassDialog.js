import * as React from 'react';
import { Dialog, DialogTitle, TextField, MenuItem, Select, InputLabel, Button, Box } from '@mui/material';

export default function AddClassDialog({ callback, handleClose, open }) {
    const [level, setLevel] = React.useState('');
    const [name, setName] = React.useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLevelChange = (e) => {
        setLevel(e.target.value)
    }

    const sendData = () => {
        callback({ name: name, level: level })
    }

    return (<Dialog onClose={handleClose} open={open} sx={{borderRadius: '5px'}}>
        <Box sx={{padding: '10px'}}>
            <DialogTitle>Créer une classe</DialogTitle>
            <TextField label="Nom de la classe" onChange={handleNameChange} />

            <InputLabel id="class_label_id">Choisir un niveau...</InputLabel>
            <Select
                labelId='class_label_id'
                id='class_select'
                label='Choisir un niveau...'
                value={level}
                onChange={handleLevelChange}
            >
                <MenuItem value={"Term"}>Terminale</MenuItem>
                <MenuItem value={"Prem"}>Première</MenuItem>
                <MenuItem value={"Seco"}>Seconde</MenuItem>
            </Select>
            <Button sx={{float: 'right'}} onClick={sendData}>Envoyer</Button>
        </Box>
    </Dialog>)
}