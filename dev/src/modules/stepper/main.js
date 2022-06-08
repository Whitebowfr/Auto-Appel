import * as React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';


export default function HomeStepper({ onStep, isNextButtonDisabled }) {
    const [activeStep, setActiveStep] = React.useState(0)

    const handleReset = () => {
        setActiveStep(0)
        onStep(0)
    }

    const handleBack = () => {
        setActiveStep(Math.max(0, activeStep - 1))
        onStep(Math.max(0, activeStep - 1))
    }

    const handleNext = () => {
        if (activeStep + 1 >= 4) {
            handleReset()
            onStep(0)
        } else {
            setActiveStep(activeStep + 1)
            onStep(activeStep + 1)
        }
    }

    return (
        <Box>
            <Stepper activeStep={activeStep} sx={{ position: 'absolute', bottom: '6.5rem' }} orientation='vertical'>
                <Step key={0}>
                    <StepLabel>Choisir une classe</StepLabel>
                </Step>
                <Step key={1}>
                    <StepLabel>Détection des visages</StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel>Identification des visages</StepLabel>
                </Step>
            </Stepper>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, position: 'absolute', bottom: '4.5rem', width: '95%' }}>
                <Button
                    color='error'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                >
                    Précédent
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={isNextButtonDisabled}
                    sx={{
                        right: 0,
                        marginLeft: 'auto'
                    }}
                >
                    {activeStep === 3 ? 'Reset' : 'Suivant'}
                </Button>
            </Box>
        </Box>
    )
}