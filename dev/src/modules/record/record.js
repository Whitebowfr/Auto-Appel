import * as React from 'react';

import RecordingProgessBar from './recordingProgressBar'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function RecordingModule({ enabled, classSelected}) {
    const [isLaunchingDisabled, setLaunchDisabled] = React.useState(false);
    const [isStoppingDisabled, setStopDisabled] = React.useState(true);

    // Making the disabled react to props change
    React.useEffect(() => {
        setLaunchDisabled(!enabled);
    }, [enabled])

    const handleLaunchClick = () => {
        fetch(`${window.location.origin.replace("3000",'3001')}/launchPythonCamera`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: classSelected.id})
        })
        setLaunchDisabled(true)
        setStopDisabled(false)
    }

    const handleStopClick = () => {
        setLaunchDisabled(false)
        setStopDisabled(true)
    }

    const [numberOfStudentsDetected, setNumberOfStudentsDetected] = React.useState(0);
    React.useEffect(() => {
        if (isLaunchingDisabled) {
            fetch(`${window.location.origin.replace("3000",'3001')}/getFaceRecognitionUpdate?id=${classSelected.id}`)
                .then(raw => raw.json().then(data => {
                    setNumberOfStudentsDetected(data.detected)
                }))
        }
    }, [isLaunchingDisabled, classSelected])

    return (<div>
        <Stack direction='row' spacing={2} sx={{
            marginBottom: '1rem'
        }}>
            <Button variant="contained" disabled={isLaunchingDisabled} onClick={handleLaunchClick}>Lancer l'enregistrement</Button>
            <Button variant="contained" disabled={isStoppingDisabled} color="error" onClick={handleStopClick}>Stopper l'enregistrement</Button>
        </Stack>
        <RecordingProgessBar enabled={(isLaunchingDisabled && enabled)} numberOfStudents={classSelected?.students.length ?? 0} numberOfStudentsDetected={numberOfStudentsDetected}/>
        {/* TODO : make a list of detected faces */}
    </div>)
}