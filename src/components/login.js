import { Button, TextField, Typography, Box } from '@material-ui/core';

function Login() 
{
  async function handleLogin(e) 
  {
    e.preventDefault();
    const requestOptions =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'testpwd' })
    };

    const response = await fetch("https://localhost/api/Auth/User", requestOptions);

    if (response.ok)
    {
      const token = await response.text();
      console.log(token);
    }
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
