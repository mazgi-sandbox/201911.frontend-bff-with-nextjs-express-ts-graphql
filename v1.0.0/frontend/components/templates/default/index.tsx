import {
  AppBar,
  Container,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import SideMenuContents from './SideMenuContents'

type Props = {
  title?: string
  acceptAnonymous?: boolean
  children?: React.ReactNode
}

const drawerWidth = 160
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  appBarSpacer: theme.mixins.toolbar
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { title, acceptAnonymous, children } = props

  useEffect(() => {
    // fetchBFF()
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.appBarSpacer} />
        <SideMenuContents />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container>
          <div>{children}</div>
        </Container>
      </main>
    </div>
  )
}

Component.defaultProps = {
  title: '(default page)',
  children: <div>(children)</div>
}

export default Component
