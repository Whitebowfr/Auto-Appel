import { Box } from "@mui/material";
import InputModule from "../modules/addClass/buttons";
import ErrorSnackbar from "../modules/addClass/snackbar";
import ResponseSnackbar from '../modules/addClass/responseSnackbar'
import AddClassDialog from '../modules/addClass/addClassDialog'
import AddStudentDialog from '../modules/addClass/addStudentDialog'
import * as React from 'react'

export default function AddMenu({ classSelected }) {
    const handleCloseStudentError = () => {
        setStudentErrorState(false)
    }

    const [errorOnStudent, setStudentErrorState] = React.useState(false)
    const handleAddingStudent = () => {
        if (classSelected.id === undefined) {
            setStudentErrorState(true)
        } else {
            setStudentDialogOpen(true)
            setStudentErrorState(false)
        }
    }

    const handleAddingClass = (name, students, level) => {
        setClassDialogOpen(true)
    }

    const [isClassDialogOpen, setClassDialogOpen] = React.useState(false);
    const handleClassDialogClose = () => {
        setClassDialogOpen(false)
    }

    const [addError, setAddError] = React.useState('')
    const handleDialogSend = (data) => {
        setClassDialogOpen(false)
        fetch(window.location.origin.replace('3000', '3001') + '/addClassToDatabase', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status !== 200) {
                    setAddError('class')
                } else {
                    setAddError('none')
                }
            })
    }

    const handleClosingResponseError = () => {
        setAddError('')
    }

    const [isStudentDialogOpen, setStudentDialogOpen] = React.useState(false)
    const handleStudentDialogClose = () => {
        setStudentDialogOpen(false)
    }

    const handleStudentSend = (obj) => {
        obj.targetId = classSelected.id

        setClassDialogOpen(false)
        fetch(window.location.origin.replace('3000', '3001') + '/addStudentToDatabase', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => {
                if (res.status !== 200) {
                    setAddError('student')
                } else {
                    setAddError('none')
                }
            })
    }

    return (
        <Box sx={{
            padding: '10px'
        }}>
            <InputModule addClass={handleAddingClass} addStudent={handleAddingStudent} />
            <ResponseSnackbar state={addError} handleClosing={handleClosingResponseError} />
            <ErrorSnackbar isOpen={errorOnStudent} onCloseCallback={handleCloseStudentError} />
            <AddClassDialog open={isClassDialogOpen} handleClose={handleClassDialogClose} callback={handleDialogSend} />
            <AddStudentDialog open={isStudentDialogOpen} handleClose={handleStudentDialogClose} callback={handleStudentSend} className={classSelected.name} />
        </Box>
    )
}