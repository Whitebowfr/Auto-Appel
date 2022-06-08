import * as React from 'react';
import { LinearProgress, Box, Paper, Typography, Divider } from '@mui/material';

function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default function IdentifierModule({ enabled, classSelected, id }) {
    const [value, setValue] = React.useState(0);
    const [identifiedNumber, setIdentifiedNumber] = React.useState(0);
    const [totalNumber, setTotalNumber] = React.useState(0)

    const [images, setImages] = React.useState([0, 0]);

    React.useEffect(() => {
        setTotalNumber(classSelected?.students.length ?? 0)
    }, [classSelected])

    React.useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`${window.location.origin.replace('3000', '3001')}/getFaceRecognitionUpdate?id=${classSelected.id}`)
                .then(raw => raw.json().then(data => {
                    setIdentifiedNumber(data?.identified.length ?? 0)
                    setValue(Math.round((data?.identified.length ?? 0) / totalNumber * 100))
                    setImages([data?.treatedImages ?? 0, data?.totalImages ?? 0])
                }))
        }, 2000)
        if (!enabled) {
            clearTimeout(timer)
        }
        return () => clearTimeout(timer)
    }, [enabled, classSelected.id, totalNumber])

    const prevEnabledState = usePrevious(enabled)

    React.useEffect(() => {
        if (prevEnabledState !== enabled && enabled) {
            fetch(`${window.location.origin.replace('3000', '3001')}/startRecognitionProcess`, {
                method: 'POST',
                body: JSON.stringify({id: id})
            })
        } else if (prevEnabledState !== enabled && !enabled) {
            fetch(`${window.location.origin.replace('3000', '3001')}/stopRecognitionProcess`, {
                method: 'POST',
                body: JSON.stringify({id: id})
            })
        }
    }, [enabled, prevEnabledState, id])

    return (
        <Box>
            <LinearProgress variant="determinate" value={value} sx={{
                borderRadius: '10px',
                height: '.5rem'
            }} />
            <Paper elevation={3}>
                <Typography variant='h4'>{identifiedNumber} / {totalNumber} détectées...</Typography>
                <Divider />
                <Typography variant='h5'>{images[0]} traitées sur {images[1]}</Typography>
            </Paper>
        </Box>
    )
}