import { FormControl, Button, Typography, Divider } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupsIcon from '@mui/icons-material/Groups';
import * as React from 'react';

export default function InputModule({ addStudent, addClass }) {
    return (<FormControl fullWidth>
        <Button onClick={addStudent} variant='outlined' startIcon={<PersonAddAlt1Icon />}>
            <Typography variant='h6'>
                Ajouter une personne
            </Typography>
        </Button>
        <Divider sx={{ margin: '1rem' }} />
        <Button onClick={addClass} variant='outlined' startIcon={<GroupsIcon />}>
            <Typography variant='h6'>
                Ajouter une classe
            </Typography>
        </Button>
    </FormControl>)
}