import React from "react";
import styles from './menuizquierdo.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Listaimagenes from "./listaimagenes";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Iconosesion from "./iconosesion";
import LogoutIcon from '@mui/icons-material/Logout';
import { useParams, useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Menuizquierdo() {
  
  let {user} = useParams();
  let usermostrar=user.replace(/:/g, "");
  const primeraLetra = usermostrar.charAt(0);
  let navegar=useNavigate();
  return (
    <div id="cuerpototal">
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography >
            <div id="barratitulo">
              <div className="custom-title">Menú Brigadista</div>
              <div id="iconosesion">
                <Iconosesion valorletra={primeraLetra}></Iconosesion>
                <div>{usermostrar}</div>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Reportar Evento De Riesgo', 'Llamar al 911'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <OnDeviceTrainingIcon /> : <SettingsPhoneIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Alertas y Mensajes', 'Problemas con Recursos'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <CrisisAlertIcon /> : <ReportProblemIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Comunicarse con Administracion'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <SupervisorAccountIcon /> : <ReportProblemIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Salir'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => {
            navegar("/");}}>
            {index === 0 && (
              <ListItemButton sx={{ color: 'red' }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </ListItem>
  ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <div id="arreglotextoletrero">
          <div id="fondocollage">
            <div className="sizeletra">¡Bienvenido/a! Estamos encantados de tenerte aquí!</div>
            <div><Listaimagenes></Listaimagenes></div>
          </div>
        </div>
      </Box>
    </Box>
    </div>
  );
}
export default Menuizquierdo;