import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

function getCorrespondingErrorString(state) {
    switch (state) {
        case 'none':
            return 'Opération réussie !'
        case 'class':
            return "Une erreur a eu lieu lors de l'ajout de la classe"
        case 'student':
            return "Une erreur a eu lieu lors de l'ajout de l'élève"
        default:
            return ''
    }
}

export default function ResponseSnackbar({ state, handleClosing }) {
    return (
        <Snackbar
            open={state !== ''}
            autoHideDuration={2000}
            onClose={handleClosing}
            message={getCorrespondingErrorString(state)}
            color={state === "none" || state === '' ? 'success' : 'error'}
        >
            <Alert onClose={handleClosing} severity={state === "none" || state === '' ? 'success' : 'error'}>
                {getCorrespondingErrorString(state)}
            </Alert>
        </Snackbar>
    )
}