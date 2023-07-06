import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green} from '@mui/material/colors';

function Iconosesion(props) {
  // Se obtiene la letra del usuario
  const {valorletra}=props;
  
  return (
      <Stack direction="row" spacing={2}>
        {/* Se crea el icono de sesión con la letra del usuario */}
        <Avatar sx={{ bgcolor: green[500], width:60, height:60 }} className="buho">{valorletra}</Avatar>
      </Stack>
    );
  }

export default Iconosesion;