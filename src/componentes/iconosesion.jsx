import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green} from '@mui/material/colors';

function Iconosesion() {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: green[500], width:60, height:60 }}>OP</Avatar>
      </Stack>
    );
  }

export default Iconosesion;