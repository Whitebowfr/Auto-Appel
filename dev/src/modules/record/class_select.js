import { useState } from 'react';
import { InputLabel, Select, InputAdornment, FormControl } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { MenuItem } from '@mui/material';

export default function ClassSelect({ classList, isPreciseClassEnabled, onClassChange, classLoading}) {
    const [preciseClass, setPreciseClass] = useState('');

    const handlePreciseClassChange = (e) => {
        setPreciseClass(e.target.value)
        onClassChange(e.target.value)
    }

    return (<FormControl fullWidth disabled={!isPreciseClassEnabled} sx={{
        marginBottom: '1rem'
    }}>
        <InputLabel id="precise_class_label_id">Choisir une classe...</InputLabel>
        <Select
            labelId='precise_class_label_id'
            id='precise_class_select'
            label='Choisir une classe...'
            value={preciseClass}
            onChange={handlePreciseClassChange}
            endAdornment={
                <InputAdornment position='end' sx={{
                    marginRight: '1rem'
                }}>
                    <CircularProgress sx={{
                        display: classLoading ? 'flex' : 'none'
                    }}>

                    </CircularProgress>
                </InputAdornment>
            }
        >
            {classList.map(currentClasse => {
                return (<MenuItem key={currentClasse.id} value={`${currentClasse.id}`}>{currentClasse.label}</MenuItem>)
            })
            }
        </Select>
    </FormControl>)
}