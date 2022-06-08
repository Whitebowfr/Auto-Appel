import './css/App.css';
import Main from './modules/routes'
import Navbar from './modules/navbar';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#232723',
      paper: '#232723'
    },
    primary: {
      dark: '#1E5128',
      main: '#4E9F3D'
    },
    secondary: {
      main: '#D8E9A8',
      dark: '#D8E9A8'
    }
  }
})

function App() {
  const [pageNumber, setPagenumber] = React.useState(0);

  const handlePageChange = (val) => {
    setPagenumber(val)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Main pageNumber={pageNumber} />
        <Navbar onPageChange={handlePageChange}/>
      </div>
    </ThemeProvider>

  );
}

export default App;
