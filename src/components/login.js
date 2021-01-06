import React, { useRef } from "react";
import { Button, TextField, Typography, Box } from '@material-ui/core';
import Api from './api/Api'

function Login() 
{
  const unameTextfieldRef = useRef();
  const pwdTextfieldRef = useRef();

  async function handleLogin(e) 
  {
    e.preventDefault();
    var token = await Api.loginCall(unameTextfieldRef.current.value, pwdTextfieldRef.current.value);
    console.log(token);
  }

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <form noValidate autoComplete="on">
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
  );
}

export default Login;
