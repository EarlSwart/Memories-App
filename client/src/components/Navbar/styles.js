import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#1f441e",
        borderRadius: 15,
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    heading: {
        color: '#fff',
        textDecoration: 'none',
        paddingLeft: '20px',
        fontSize: 'xx-large',
      },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar:{
        backgroundColor: "#9ecca4",
    },
}));