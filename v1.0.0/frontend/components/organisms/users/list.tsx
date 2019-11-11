import {
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useState } from 'react'
import NextLink from 'next/link'

type Props = {
  rows: {
    id: string
    name?: string
    email?: string
    displayName?: string
  }[]
}

const Component: React.FC<Props> = (props: Props) => {
  const { rows } = props
  const [selectedId, setSelectedId] = useState([])

  const isSelected = (id: string): boolean => selectedId.indexOf(id) !== -1
  const checkAllClickHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const newSelecteds = rows.map(row => row.id)
      setSelectedId(newSelecteds)
    } else {
      setSelectedId([])
    }
  }
  const checkClickHandler = (id: string): void => {
    console.log(event)
    const selectedIndex = selectedId.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedId, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedId.slice(1))
    } else if (selectedIndex === selectedId.length - 1) {
      newSelected = newSelected.concat(selectedId.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      )
    }

    setSelectedId(newSelected)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <NextLink href="#">reload</NextLink>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ 'aria-label': 'select all' }}
                    indeterminate={
                      selectedId.length > 0 && selectedId.length < rows.length
                    }
                    checked={
                      rows.length > 0 && selectedId.length === rows.length
                    }
                    onChange={checkAllClickHandler}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(user => (
                <TableRow key={user.id} selected={isSelected(user.id)}>
                  <TableCell
                    padding="checkbox"
                    onClick={(): void => checkClickHandler(user.id)}
                  >
                    <Checkbox
                      inputProps={{ 'aria-labelledby': user.id }}
                      checked={isSelected(user.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Component
