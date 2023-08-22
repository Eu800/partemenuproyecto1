import React, { useEffect, useState } from 'react';
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
    // Variables de bandera para abrir y cerrar la ventana modal
    const [modalInsert, setModalInsert] = useState(false);
    //--- Variable de bandera para cuando se desee editar ---
    const [modalEdit, setModalEdit] = useState(false);
    // Variable con la lista de implementos
    const [listaSupl, setListaSupl] = useState([]);
    // Variable de estado para el item seleccionado
    const [itemSelect, setItemSelect] = useState(initialState);
    // Variable para almacenar el indice de un item a editar
    const [indice, setIndice] = useState(0);

    // Función para controlar los campos de cada atributo
    const handleAtrSupp = (e) => {
        const { name, value } = e.target;
        setItemSelect(estPrevio => ({
            ...estPrevio,
            [name]: value
        }))
    }

    const handleDate = (name, value) => {
        setItemSelect(estPrevio => ({
            ...estPrevio,
            [name]: value
        }))
    }

    const handleDeleteClick = (index) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este registro?');
        if (confirmDelete) {
            deleteSupp(index);
        }
    };

    //-- Función para editar el implemento --
    const  editSelect = () => {
        var editedList = [...listaSupl];
        // Se guarda el ID del elemento a editar
        const index = editedList.findIndex(antiguo => antiguo.codigo === itemSelect.codigo);
        //setIndice(index);
        if (index !== -1) {
            // Reemplazar el elemento antiguo con el elemento editado
            editedList[index] = itemSelect;
            setListaSupl(editedList); // Actualizar la lista con la lista editada
            setModalEdit(!modalEdit);
            // Se vuelve a incializar la variable de estado itemSelect
            setItemSelect(initialState); 
        }
    };

    // Función para agregar el nuevo implemento
    const addSupp = () => {
        listaSupl.push(itemSelect);
        setModalInsert(!modalInsert);
        // Se vuelve a incializar la variable de estado nuevoSupp
        setItemSelect(initialState); // Limpia los valores de nuevoSupp
    }

    // Funciones para eliminar un suplemento
    const deleteSupp = (index) => {
        const updatedList = listaSupl.filter((item, i) => i !== index);
        setListaSupl(updatedList);
    };

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarInsertar = () => {
        setModalInsert(!modalInsert);
    }

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarEditar = () => {
        setModalEdit(!modalEdit);
    }

    //--- Función para editar la fila seleccionada --
    const handleEditClick = (item, caso) => {
        setItemSelect(item);
        if (caso === 'Editar') {
            setModalEdit(true);
        }
    }


    // Cuerpo de la ventana Modal - Insertar
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
            <DateComponent label="Fecha de adquisición" className='fechaAdd' onChange={handleDate} style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }} />
            <br />
            <div align='right'>
                <Button color='primary' onClick={() => addSupp()}>Ingresar</Button>
                <Button onClick={() => handleAbrirCerrarInsertar()}>Cancelar</Button>
            </div>
        </Box>
    )

    // Cuerpo de la ventana Modal - Editar
    const bodyEditar = (
        <Box sx={styleModal}>
            <h1>Editar item</h1>
            <TextField label="Código" name='codigo' onChange={handleAtrSupp} type='number' value={itemSelect && itemSelect.codigo} />
            <br /><br />
            <TextField label="Fabricante" name='fabricante' onChange={handleAtrSupp} value={itemSelect && itemSelect.fabricante} />
            <br /><br />
            <Select label="Item" name="item" onChange={handleAtrSupp} value={itemSelect && itemSelect.item}>
                <MenuItem value="linterna">LINTERNA</MenuItem>
                <MenuItem value="radio">RADIO</MenuItem>
                <MenuItem value="comunicador">COMUNICADOR</MenuItem>
                <MenuItem value="celular">CELULAR</MenuItem>
            </Select>
            <br /><br />
            <TextField label="Tipo" name='tipo' onChange={handleAtrSupp} value={itemSelect && itemSelect.tipo} />
            <br /><br />
            <TextField label="Estado" name='estado' onChange={handleAtrSupp} value={itemSelect && itemSelect.estado} />
            <br /><br />
            <DateComponent label="Fecha de adquisición" className='fechaAdd' onChange={handleDate} 
            style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }} />
            <br />
            <div align='right'>
                <Button color='primary' onClick={() => editSelect()}>Guardar</Button>
                <Button onClick={() => handleAbrirCerrarEditar()}>Cancelar</Button>
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
                                            <Edit onClick={() => handleEditClick(item, 'Editar')} />
                                            &nbsp;&nbsp;
                                            <Delete onClick={() => handleDeleteClick(index)} />
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
                {/* Ventana Modal para editar un insumo registrado */}
                <Modal open={modalEdit} onClose={handleAbrirCerrarEditar} disablePortal disableEnforceFocus disableAutoFocus >
                    {bodyEditar}
                </Modal>
            </div>
        </div>
    );
};

export default SuppliesCRUD;
