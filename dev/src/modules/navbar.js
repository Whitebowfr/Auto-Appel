import '../css/navbar.css'

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar(props) {
    const [value, setValue] = React.useState(0);
    
    const handleChange = (e, newValue) => {
        props.onPageChange(newValue)
        setValue(newValue)
    }

    return (
        <Box sx={{
            bottom: 0,
            position: 'fixed',
            width: '100%'
        }}>
            <BottomNavigation

                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label="Enregistrer" icon={<PhotoCameraIcon />} />
                <BottomNavigationAction label="Appel" icon={<PlaylistAddCheckIcon />} />
                <BottomNavigationAction label="Ajouter" icon={<AddIcon />} sx={{width: '10%'}} />
            </BottomNavigation>
        </Box>

    )
}