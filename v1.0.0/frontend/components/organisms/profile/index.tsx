import { Grid, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Component: React.FC = () => {
  const classes = useStyles('')

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Typography>Welcome.</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Component
