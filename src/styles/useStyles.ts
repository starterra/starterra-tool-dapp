import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    connectButton: {
      position: 'absolute',
      top: '5px',
      right: '10px'
    },
    buttonBalance: {
      fontWeight: 700,
      position: 'relative',
      display: 'inline-block',
      marginLeft: '1em',
      paddingLeft: '1em',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '1px',
        bottom: '1px',
        left: '0',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
      }
    },
    section: {
      padding: '5px 20px'
    },
    disconnect: {
      border: 'none',
      backgroundColor: '#f4f5fb',
      width: '100%',
      height: '36px',
      '&:hover': {
        border: 'none'
      }
    },
    button: {
      width: '100%',
      margin: '5px',
      height: '28px'
    },
    header: {
      display: 'flex',
      fontSize: '14px'
    },
    balanceSection: {
      padding: '30px 0px'
    },
    balanceItem: {
      padding: '8px',
      borderTop: '1px solid #e9edf8',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '35px',
      fontSize: '14px'
    },
    formAmount: {
      marginTop: '3px',
      width: '100%'
    }
  })
)

export default useStyles
