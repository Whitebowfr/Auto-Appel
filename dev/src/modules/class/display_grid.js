import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';

export default function DisplayGrid(props) {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        setRows(props.class)
    }, [props.class])

    return (
        <Box sx={{padding: '5px'}}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom, Prénom</TableCell>
                            <TableCell align='right'>Présent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.lastName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {`${row.lastName.toUpperCase()} ${row.firstName}`}
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox disabled checked={row.present} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}