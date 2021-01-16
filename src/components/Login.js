import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography, Box, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Api from './api/Api'

const Login = () => 
{
  const unameTextfieldRef = useRef();
  const pwdTextfieldRef = useRef();
  const history = useHistory();
  const [snackOpen, setErrorSnackOpen] = useState(false);

  async function handleLogin(e) 
  {
    e.preventDefault();
    var loggedIn = await Api.loginCall(unameTextfieldRef.current.value, pwdTextfieldRef.current.value);
    
    if (loggedIn === false)
    {
      // Error
      setErrorSnackOpen(true);
    }
    else
    {
      setErrorSnackOpen(false);

      // Route to main view  
      history.push("/main");
    }
  }

  return (
    
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        
        <form noValidate autoComplete="on" onSubmit={handleLogin}>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackOpen}
            autoHideDuration={6000}
            onClose={() => setErrorSnackOpen(false)}
            message="Access denied"
            action={
              <React.Fragment>
                
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setErrorSnackOpen(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />

          <Typography variant="h4" component="h2" direction="center">
            Login
              </Typography>

          <br />

          <TextField
            id="username"
            label="Username"
            defaultValue=""
            variant="outlined"
            inputRef={unameTextfieldRef}
            InputProps={{
              style: { marginBottom: 10 }
            }}
          />

          <br />

          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            inputRef={pwdTextfieldRef}
            InputProps={{
              style: { marginBottom: 10 }
            }}
          />

          <br />

          <div dir="rtl">
            <Button type="submit" variant="contained" color="primary">Login</Button>
          </div>

          <div>Sign up</div>

        </form>

      </Box>

    </React.Fragment>

  );

}

export default Login;
