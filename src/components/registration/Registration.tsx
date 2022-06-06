
import { ChangeEvent, useState } from "react";
import Axios from "axios";
import "./Registration.css";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

 function Registration() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorMessage,SetErrorMessage] = useState('');

  const onRegisterClick = () => {

    Axios.post("http://localhost:3001/users", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }).then(() => {
      history.push('/login/');
    }).catch((e) => {
      SetErrorMessage(e.response.data.error);
    });
    
  };
  
  
  

  return (
    <div className="registration">
  <Container component="main" maxWidth="xs">
<CssBaseline />
<div className={classes.paper}>
  <Avatar className={classes.avatar}>
    <LockTwoToneIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Sign up
  </Typography>

    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      value={firstName.replace(/[^A-Za-z]/ig, '')}
      label="First Name"
      autoFocus
      onChange={(e) => {
      setFirstName(e.target.value);
      }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      value={lastName.replace(/[^A-Za-z]/ig, '')}
      label="Last Name"
      autoFocus
      onChange={(e) => {
        setLastName(e.target.value);
        }}
    />
     <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      value={username.trim()}
      label="UserName"
      autoFocus
      onChange={(e) => {
        setUsername(e.target.value);
        }}
    />
     <TextField
      variant="outlined"
      margin="normal"
      value={email.trim()}
      fullWidth
      label="Email"
      type='email'
      autoFocus
      onChange={(e) => {
        setEmail(e.target.value);
        }}
      
    />
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      value={password.trim()}
      label="Password"
      autoFocus
      type='password'
      onChange={(e) => {
        setPassword(e.target.value);
        }}
    />
      <TextField
      variant="outlined"
      margin="normal"
      value={confirmPassword.trim()}
      fullWidth
      label="Confirm password"
      autoFocus
      type='password'
      onChange={(e) => {
        setConfirmPassword(e.target.value);
        }}
    />
     <div className='error' >{ErrorMessage}</div>

    <Button 
      onClick={onRegisterClick}
      type="submit"
      fullWidth
      variant="contained"
      color='secondary'
      className={classes.submit}
    >
      Submit
    </Button>

    <Grid container>
      <Grid item>
        <Link href="/login" variant="body2">
          {"Have an account?"}
        </Link>
      </Grid>
    </Grid>

</div>
</Container>

    </div>
  );
}
export default Registration;
