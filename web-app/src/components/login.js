import { Button, TextField, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Login() 
{
    const classes = useStyles();

    return (
        
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <form className={classes.root} noValidate autoComplete="on">
                        <Typography variant="h4" component="h2" direction="center">
                        Login
                        </Typography>
                        <br/>
                        <TextField                    
                        id="username"
                        label="Username"
                        defaultValue=""
                        variant="outlined"
                        />
                        <br/>        
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                        />
                        <br/>
                        <div dir="rtl">
                            <Button variant="contained" color="primary">Login</Button>
                        </div>                    
                    </form>
                </Grid>   

            </Grid>      
    );
  }
  
  export default Login;
  