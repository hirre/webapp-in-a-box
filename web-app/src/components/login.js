import React from 'react';
import { Button, Input, TextField } from '@material-ui/core';

function Login() 
{
    return (
        <div>
            <form>
                <Input id="regular" inputProps={{placeholder: "Regular" }} formControlProps={{ fullWidth: true }} />
                <br/>        
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <br/>
                <Button variant="contained" color="primary">Login</Button>
            </form>
        </div>      
    );
  }
  
  export default Login;
  