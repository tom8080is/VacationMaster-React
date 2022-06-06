import { useState } from "react";
import axios from "axios";
import "../../App.css";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-type";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, SetErrorMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const onLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });

      let userData = response.data;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userData.token;

      localStorage.setItem("token", JSON.stringify(userData));

      console.log(userData);

      if (userData.userType === "ADMIN") {
        history.push("/admin");

        return;
      }
      history.push(`/`);
    } catch (e) {
      SetErrorMessage(e.response.data.error);
    }
  };
  return (
    <div className="login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <TextField
            value={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
          />
          <TextField
            value={password}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
          />

          <div className="error">{ErrorMessage}</div>

          <Button
            onClick={onLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div>
        <img
          className="LoginImage"
          src="https://tinyurl.com/d5utnhav"
          height="300px"
          alt=""
        />{" "}
      </div>
    </div>
  );
}

export default Login;
