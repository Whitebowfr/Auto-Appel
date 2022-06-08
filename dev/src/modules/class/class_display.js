import * as React from 'react';

import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';

function GetDate({ displayDate }) {
    if (displayDate) {
        return (<Typography variant='h5' sx={{
            textAlign: 'center'
        }}>
            {new Date().toLocaleDateString()}
        </Typography>)
    }
}

export default function Title({ className, displayDate = true }) {

    return (
        <Box sx={{
            padding: '10px'
        }}>
            <Paper elevation={5}>
                <Typography variant='h4' sx={{
                    textAlign: 'center',
                    fontWeight: 700
                }}>
                    {className}
                </Typography>
                <GetDate displayDate />
            </Paper>
        </Box>
    )
}