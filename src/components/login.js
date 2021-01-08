import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography, Box, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Api from './api/Api'

function Login() 
{
  const unameTextfieldRef = useRef();
  const pwdTextfieldRef = useRef();
  const history = useHistory();
  const [snackOpen, setOpen] = useState(false);

  async function handleLogin(e) 
  {
    e.preventDefault();
    var token = await Api.loginCall(unameTextfieldRef.current.value, pwdTextfieldRef.current.value);
    
    if (token === "")
    {
      // Error
      setOpen(true);
    }
    else
    {
      setOpen(false);
      
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
        
        <form noValidate autoComplete="on">

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackOpen}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Access denied"
            action={
              <React.Fragment>
                
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
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
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          </div>

          <div>Sign up</div>

        </form>

      </Box>

    </React.Fragment>

  );

}

export default Login;
