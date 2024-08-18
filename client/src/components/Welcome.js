import { Box, Typography, TextField, Button } from "@mui/material/";

import { useState } from "react";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmission = async (e) => {
    const parameters = {
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <div>
        <Typography>username</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <Typography>password</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button onClick={handleSubmission}>Submit</Button>
      </div>

      <div>
        <Box>
          New User Sign up
          <div>
            <Typography>username</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Button>Submit</Button>
          </div>
          <div>
            <Typography>password</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Typography>confirm password</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button>Submit</Button>
          </div>
        </Box>
      </div>
    </Box>
  );
};
export default Welcome;
