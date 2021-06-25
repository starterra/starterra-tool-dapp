import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
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
    disconnect:{
      border:'none',
      backgroundColor:'#f4f5fb',
      width: '100%',
      height: '36px',
      '&:hover': {
        border: "none",
     },
    },
    button:{
      width: '100%',
      margin: '5px',
      height: '28px'
    },
    header:{
        display:'flex',
        fontSize:'14px'
    }
  })
)

export default useStyles;