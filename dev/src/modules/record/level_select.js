import { useState } from 'react';
import { InputLabel, Select, InputAdornment, FormControl } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { MenuItem } from '@mui/material';

export default function LevelSelect({ onLevelChange, levelLoading}) {
    const [level, setLevel] = useState('');

    const handleLevelChange = (e) => {
        setLevel(e.target.value)
        onLevelChange(e.target.value)
    }

    return (<FormControl fullWidth sx={{
        marginBottom: '1rem'
    }}>
        <InputLabel id="class_label_id">Choisir un niveau...</InputLabel>
        <Select
            labelId='class_label_id'
            id='class_select'
            label='Choisir un niveau...'
            value={level}
            onChange={handleLevelChange}
            endAdornment={
                <InputAdornment position='end' sx={{
                    marginRight: '1rem'
                }}>
                    <CircularProgress sx={{
                        display: levelLoading ? 'flex' : 'none'
                    }}>

                    </CircularProgress>
                </InputAdornment>
            }
        >
            <MenuItem value={"Term"}>Terminale</MenuItem>
            <MenuItem value={"Prem"}>Première</MenuItem>
            <MenuItem value={"Seco"}>Seconde</MenuItem>
        </Select>
    </FormControl>
    )
}