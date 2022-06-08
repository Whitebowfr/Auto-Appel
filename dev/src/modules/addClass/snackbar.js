import * as React from 'react';

import { Snackbar, Slide, Alert } from '@mui/material';


export default function ErrorSnackbar({ isOpen, onCloseCallback }) {

    return (
        <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
            {(<Snackbar
                open={isOpen}
                autoHideDuration={2000}
                onClose={onCloseCallback}
                message="Veuillez sélectionner une classe"
                color="error"
            >
                <Alert onClose={onCloseCallback} severity="error" sx={{ width: '70%', marginBottom: '3.5rem' }}>
                    Veuillez sélectionner une classe
                </Alert>
            </Snackbar>)}
        </Slide>
    )
}