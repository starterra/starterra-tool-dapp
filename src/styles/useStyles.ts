import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    connectButton: {
      position: 'absolute',
      top: '5px',
      right: '10px'
    },
    root: {
      position: 'absolute',
      display: 'block',
      top: '40px',
      right: '10px',
      borderRadius: '15px'
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
    }
  })
)

export default useStyles
