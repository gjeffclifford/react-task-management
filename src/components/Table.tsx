import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import BaseApi, {useRequest} from "@/lib/_base.api";
import { useRouter } from "next/router";

export default function BasicTable() {
  const [search, setSearch] = React.useState("");
  const { data: rows, isValidating: rowsIsValidating, mutate } =
  useRequest(
    {
      url: `${
        process.env.NEXT_PUBLIC_TASK_API
      }/v1/tasks?${search && search!==""? 'keyword='+search : ""}`,
    }
  );
  const router = useRouter();

  const editClick = (id: any) => {
    router.push(`${id}`)
  }

  const handleCreate = () => {
    router.push('/create')
  }

  const deleteClicked = (id: any) => {
    BaseApi.delete(`${process.env.NEXT_PUBLIC_TASK_API}/v1/tasks/${id}`).then(() => {
      mutate()
    })
  }

  return (
    <div className="bg-color-white">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className='m-1 p-1'
        onClick={(e) => {
          handleCreate()
        }
      }>
        Create Task
      </Button>
      <TextField 
        id="outlined-basic"
        label="Search"
        variant="outlined"
        className='float-right m-1 p-1'
        onChange={(event) => {
          setSearch(event.target.value)
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow
                // onClick
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Button aria-label="Edit" onClick={() => {
                    editClick(row.id)
                  }}>
                    Edit
                  </Button>
                  <Button aria-label="delete" onClick={() => {
                    deleteClicked(row.id)
                  }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}