import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 
import { useLocation } from 'react-router-dom'; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';
import { storage, app } from './config';

/* mui */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 

/* mui */

const TierFormSearcher = () => {    

const [TableOfLists, setTableOfLists] = useState([]) 
const FetchAllTheLists = () => {

  const requestOptions = { 
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
     }
    };

fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/`, requestOptions).then(res => res.json()).then(data => setTableOfLists(data.lists))

}

useEffect(() => {
  FetchAllTheLists()
}, []) 

  return (
  <>
    <div className='tier-form-itself'>
    <TableContainer component={Paper} sx={{ backgroundColor: "#1f1f1f7a", borderColor: "#212121", color: 'white' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <caption>
          <h1>Mozesz z latwoscia odnalezc ciekawa liste</h1>
          </caption>
        <TableHead>
          <TableRow> 
            <TableCell align="left"><h2>Nazwa</h2></TableCell>
            <TableCell align="right"><h2>Kategoria</h2></TableCell>
            <TableCell align="right"><h2>Ilosc kontentu</h2></TableCell> 
            <TableCell align="right"><h2>Przejdź do listy</h2></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {TableOfLists == [] ? "null " : <>
{ TableOfLists.map((row) => (

<TableRow
key={row.name}
sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
<TableCell component="th" scope="row"><label>{row.name}</label></TableCell>
<TableCell align="right"><label>{row.category}</label></TableCell>
<TableCell align="right"><label>{JSON.parse(row.blocks).length}</label></TableCell>
<TableCell align="right"> 

<Link to={`/tier-lista/${row.id}`}>
<Button color="secondary" variant="contained">
  Sprawdz liste
</Button>
</Link>
 
</TableCell> 
</TableRow>

))}



          </>
          } 
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </>
    )
}

export default TierFormSearcher;
