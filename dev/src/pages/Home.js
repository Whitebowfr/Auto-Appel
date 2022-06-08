import * as React from 'react';

import RecordingModule from '../modules/record/record.js';
import LevelSelect from '../modules/record/level_select.js';
import ClassSelect from '../modules/record/class_select.js';
import HomeStepper from '../modules/stepper/main.js';
import IdentifierModule from '../modules/identify/main';

import Box from '@mui/material/Box';

export default function Home(props) {
    const [classList, setClassList] = React.useState([]);

    const [isPreciseClassEnabled, setPreciseClassEnabled] = React.useState(false);
    const [isRecordingEnabled, setRecordingEnabled] = React.useState(false);

    const [levelLoading, setLevelLoading] = React.useState(false);

    const [currentClass, setCurrentClass] = React.useState("")

    const handlePreciseClassChange = (val) => {
        setCurrentClass(val)
        props.onPreciseClassChange(val)
        if (val && isPreciseClassEnabled) {
            setRecordingEnabled(true)
        } else {
            setRecordingEnabled(false)
        }
    }

    const handleClassChange = (val) => {
        setLevelLoading(true)
        fetch(window.location.origin.replace('3000', '3001') + '/getClassesFromLevel?lvl=' + val)
            .then((data) => {
                data.json().then(fullData => {
                    setClassList(fullData)
                    setLevelLoading(false)
                    setPreciseClassEnabled(true)
                })
            })
    }

    const [currentStep, setCurrentStep] = React.useState(0)
    const onChangeStep = (val) => {
        setCurrentStep(val)
    }

    return (
        <Box sx={{
            margin: '10px',
            borderRadius: '5px'
        }}>
            {currentStep === 0 ? (
                <React.Fragment>
                    <LevelSelect
                        levelLoading={levelLoading}
                        onLevelChange={handleClassChange}
                    />

                    <ClassSelect
                        classLoading={false}
                        isPreciseClassEnabled={isPreciseClassEnabled}
                        onClassChange={handlePreciseClassChange}
                        classList={classList}
                    />
                </React.Fragment>
            ) : (<></>)}

            {currentStep === 1 ? (
                <React.Fragment>
                    <RecordingModule enabled={isRecordingEnabled} classSelected={props.classSelected} numberOfStudentsDetected={props.numberOfStudentsDetected} />
                </React.Fragment>
            ) : (<></>)}

            {currentStep === 2 ? (
                <React.Fragment>
                    <IdentifierModule enabled={currentStep === 2} classSelected={props.classSelected} />
                </React.Fragment>
            ) : (<></>)}


            <HomeStepper onStep={onChangeStep} isNextButtonDisabled={currentClass === ""} />

        </Box>
    )
}