import { Grid, TextField } from '@material-ui/core'
import React from 'react'

type Props = {
  register: any
  xs: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

const Component: React.FC<Props> = (props: Props) => {
  const { register, xs } = props

  return (
    <React.Fragment>
      <Grid item xs={xs}>
        <TextField
          label="Email"
          id="email"
          name="email"
          type="email"
          fullWidth
          inputRef={register}
        />
      </Grid>
      <Grid item xs={xs}>
        <TextField
          label="Password"
          id="password"
          name="password"
          type="password"
          fullWidth
          inputRef={register}
        />
      </Grid>
    </React.Fragment>
  )
}

export default Component
