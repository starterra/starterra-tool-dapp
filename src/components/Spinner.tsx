import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  })
)

interface ISpinnerProps {
  shouldRender: boolean
}

const Spinner: FC<ISpinnerProps> = ({ shouldRender }) => {
  const classes = useStyles()
  if (shouldRender)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  return null
}

export default Spinner
