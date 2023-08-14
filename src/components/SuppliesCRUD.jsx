import React, { useState } from 'react';
import '../css/SuppliesCRUD.css'
// Elementos para registar insumos
// Elementos para listar insumos en la tabla
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Modal, TextField, Box, Select, MenuItem } from '@mui/material';
// Elementos para hacer CRUD
import { Edit, Delete } from '@mui/icons-material';
// Componentes para fecha
import DateComponent from './DateComponent';


// variable con el estilo de la ventana modal
const styleModal = {
    position: 'absolute',
    textAlign: 'center',
    padding: '10px 10px 10px 10px',
    width: 400,
    outerHeight: 400,
    backgroundColor: 'background.paper',
    border: '2px solid  #000',
    boxShadow: 24,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

const SuppliesCRUD = () => {
    // Se declara una variable con el estado inicial del nuevo suplemento
    const initialState = {
        codigo: '',
        fabricante: '',
        item: '',
        tipo: '',
        estado: '',
        fechaAdd: '',
    };
    // Variables de estado para cada atributo
    const [nuevoSupp, setNuevoSupp] = useState(initialState);
    // Variables de bandera para abrir y cerrar la ventana modal
    const [modalInsert, setModalInsert] = useState(false);
    // Variables de bandera para controlar el item guardado
    //    const [modalInsert, setModalInsert] = useState(false);

    // Variable con la lista de implementos
    const [listaSupl, setListaSupl] = useState([]);

    // Función para controlar los campos de cada atributo
    const handleAtrSupp = (e) => {
        const { name, value } = e.target;
        setNuevoSupp(estPrevio => ({
            ...estPrevio,
            [name]: value
        }))
    }

    const handleDate = (name, value) => {
        setNuevoSupp(estPrevio => ({
            ...estPrevio,
            [name]: value
        }))
    }

    // Función para agregar el nuevo implemento
    const addSupp = () => {
        listaSupl.push(nuevoSupp);
        setModalInsert(!modalInsert);
        // Se vuelve a incializar la variable de estado nuevoSupp
        setNuevoSupp(initialState); // Limpia los valores de nuevoSupp
    }

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarInsertar = () => {
        setModalInsert(!modalInsert);

    }

    // Cuerpo de la ventana Modal
    const bodyInsertar = (
        <Box sx={styleModal}>
            <h1>Registrar nuevos items</h1>
            <TextField label="Código" name='codigo' onChange={handleAtrSupp} type='number' />
            <br /><br />
            <TextField label="Fabricante" name='fabricante' onChange={handleAtrSupp} />
            <br /><br />
            {/*<TextField label="Item" name='item' onChange={handleAtrSupp} />*/}
            <Select label="Item" name="item" onChange={handleAtrSupp}>
                <MenuItem value="linterna">LINTERNA</MenuItem>
                <MenuItem value="radio">RADIO</MenuItem>
                <MenuItem value="comunicador">COMUNICADOR</MenuItem>
                <MenuItem value="celular">CELULAR</MenuItem>
            </Select>
            <br /><br />
            <TextField label="Tipo" name='tipo' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Estado" name='estado' onChange={handleAtrSupp} />
            <br /><br />
            <DateComponent label="Fecha de adquisición" className='fechaAdd' onChange={handleDate} style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
            <br />
            <div align='right'>
                <Button color='primary' onClick={addSupp}>Ingresar</Button>
                <Button onClick={handleAbrirCerrarInsertar}>Cancelar</Button>
            </div>
        </Box>
    )

    return (
        <div className='Sup-container'>
            <h1 id='Supp-title'>Inventario de Insumos de Seguridad</h1>
            <img id='logo-prin' src={require("../imagenSuppl.png")} alt="imagen" />
            <Button id='btn-In' variant='contained' onClick={handleAbrirCerrarInsertar}>Ingresar</Button>
            <br />
            <br />
            <div className='Supp-Table'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="header-cell" align="center"><strong>Código</strong></TableCell>
                                <TableCell className="header-cell" align="center"><strong>Fabricante</strong></TableCell>
                                <TableCell className="header-cell" align="center"><strong>Item</strong></TableCell>
                                <TableCell className="header-cell" align="center"><strong>Tipo</strong></TableCell>
                                <TableCell className="header-cell" align="center"><strong>Estado</strong></TableCell>
                                <TableCell className="header-cell" align="center"><strong>Fecha de adquisición</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaSupl.length !== 0 ? (
                                listaSupl.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{item.codigo}</TableCell>
                                        <TableCell align="center">{item.fabricante}</TableCell>
                                        <TableCell align="center">{item.item}</TableCell>
                                        <TableCell align="center">{item.tipo}</TableCell>
                                        <TableCell align="center">{item.estado}</TableCell>
                                        <TableCell align="center">{item.fechaAdd}</TableCell>
                                        <TableCell>
                                            <Edit />
                                            &nbsp;&nbsp;
                                            <Delete />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Ventana Modal para ingresar un nuevo insumo a la Tabla */}
                <Modal open={modalInsert} onClose={handleAbrirCerrarInsertar} disablePortal disableEnforceFocus disableAutoFocus >
                    {bodyInsertar}
                </Modal>
            </div>
        </div>
    );
};

export default SuppliesCRUD;
