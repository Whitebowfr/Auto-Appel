import React from 'react';

import Home from '../pages/Home';
import AddMenu from '../pages/Add.js';
import ClassList from '../pages/Class'
import { Box } from '@mui/system';

export default function Main(props) {
    const [classSelected, setClassData] = React.useState({id: undefined, label: '', students: []})

    const handlePreciseClassChange = (id) => {
        fetch(window.location.origin.replace('3000', '3001') + `/getDatabaseEntireClass?id=${id}`)
            .then(raw => raw.json().then(data => {
                setClassData(data)
            }))
    }

    React.useEffect(() => {
        if (classSelected.id !== undefined) {
            fetch(window.location.origin.replace('3000', '3001') + `/getDatabaseEntireClass?id=${classSelected.id}`)
                .then(raw => raw.json().then(data => {
                    setClassData(data)
                }))
        }
        
    }, [props.pageNumber, classSelected.id])

    return (<div>
        <Box sx={{
            display: props.pageNumber === 1 ? 'block' : 'none'
        }}>
            <ClassList className={classSelected.name} classStudents={classSelected.students} />
        </Box>
        <Box sx={{
            display: props.pageNumber === 0 ? 'block' : 'none'
        }}>
            <Home {...props} onPreciseClassChange={handlePreciseClassChange} isOnStudentsList={props.pageNumber === 1} classSelected={{...classSelected}}/>
        </Box>
        <Box sx={{
            display: props.pageNumber === 2 ? 'block' : 'none'
        }}>
            <AddMenu classSelected={{...classSelected}} />
        </Box>
    </div>
    )
};