import * as React from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function RecordingProgressBar({ enabled, numberOfStudents, numberOfStudentsDetected }) {

    const [detectionProgress, setProgress] = React.useState(10);
    const [numberDetected, setNumber] = React.useState(0);
    const [totalNumber, setTotalNumber] = React.useState(1);

    React.useEffect(() => {
        setTotalNumber(numberOfStudents)
    }, [numberOfStudents]);

    React.useEffect(() => {
        setProgress(Math.round(numberDetected / totalNumber * 100))
        setNumber(numberOfStudentsDetected)
    }, [numberOfStudentsDetected, numberDetected, totalNumber])

    return (<Box sx={{
        width: '100%',
        display: enabled ? "block" : "none"
    }} >
        <LinearProgress sx={{
            borderRadius: '10px',
            height: '.3rem',
            value: {detectionProgress}
        }} />
    </Box>)
}