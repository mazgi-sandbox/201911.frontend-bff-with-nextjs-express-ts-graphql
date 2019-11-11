import * as icons from '@material-ui/icons'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import React, { Fragment } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const Component: React.FC = () => {
  return (
    <Fragment>
      <Link href="/">
        <ListItem button>
          <ListItemIcon>
            <icons.Link />
          </ListItemIcon>
          <ListItemText primary="top" />
        </ListItem>
      </Link>
      <Link href="/signin">
        <ListItem button>
          <ListItemIcon>
            <icons.Link />
          </ListItemIcon>
          <ListItemText primary="signin" />
        </ListItem>
      </Link>
      <Divider />
      <ListSubheader inset>(dev)</ListSubheader>
      <Link href="/users">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="users" />
        </ListItem>
      </Link>
    </Fragment>
  )
}

export default Component
