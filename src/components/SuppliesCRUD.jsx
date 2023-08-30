import React, { useState } from 'react';
import '../css/SuppliesCRUD.css'
// Elementos para listar insumos en la tabla
import {
    Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Modal, TextField, Box, MenuItem
} from '@mui/material';
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

    // Estado local para rastrear si los campos son obligatorios y están llenos
    const [isRequiredFilled, setIsRequiredFilled] = useState({
        codigo: true,
        fabricante: true,
        item: true,
        tipo: true,
        estado: true,
    });

    // Función para validar si los campos obligatorios están llenos
    const validateRequiredFields = () => {
        const requiredFields = ['codigo', 'fabricante', 'item', 'tipo', 'estado', 'fechaAdd'];
        const newIsRequiredFilled = { ...isRequiredFilled };

        requiredFields.forEach(field => {
            if (!itemSelect[field]) {
                newIsRequiredFilled[field] = false;
            } else {
                newIsRequiredFilled[field] = true;
            }
        });

        setIsRequiredFilled(newIsRequiredFilled);

        return Object.values(newIsRequiredFilled).every(isFilled => isFilled);
    };

    // Variables de bandera para abrir y cerrar la ventana modal
    const [modalInsert, setModalInsert] = useState(false);
    //--- Variable de bandera para cuando se desee editar ---
    const [modalEdit, setModalEdit] = useState(false);
    // Variable con la lista de implementos
    const [listaSupl, setListaSupl] = useState([]);
    // Variable de estado para el item seleccionado
    const [itemSelect, setItemSelect] = useState(initialState);

    // Función para controlar los campos de cada atributo
    const handleAtrSupp = (e) => {
        const { name, value } = e.target;
        setItemSelect(estPrevio => ({
            ...estPrevio,
            [name]: value
        }))
    }

    const handleDate = (name, value) => {
        setItemSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDeleteClick = (index) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este registro?');
        if (confirmDelete) {
            deleteSupp(index);
        }
    };

    //-- Función para editar el implemento --
    const editSelect = () => {
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
        if (validateRequiredFields()) {
            listaSupl.push(itemSelect);
            setModalInsert(!modalInsert);
            setItemSelect(initialState);
        }
    }

    // Funciones para eliminar un suplemento
    const deleteSupp = (index) => {
        const updatedList = listaSupl.filter((item, i) => i !== index);
        setListaSupl(updatedList);
    };

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarInsertar = () => {
        setItemSelect(initialState);
        setIsRequiredFilled({
            codigo: true,
            fabricante: true,
            item: true,
            tipo: true,
            estado: true,
        });
        setModalInsert(!modalInsert);
    }

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarEditar = () => {
        setItemSelect(initialState);
        setIsRequiredFilled({
            codigo: true,
            fabricante: true,
            item: true,
            tipo: true,
            estado: true,
        });
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
            <TextField label="Código" name='codigo' onChange={handleAtrSupp} type='number' error={!isRequiredFilled.codigo}
                helperText={!isRequiredFilled.codigo && "Este campo es obligatorio"} />
            <br /><br />
            <TextField label="Fabricante" name='fabricante' onChange={handleAtrSupp} error={!isRequiredFilled.fabricante}
                helperText={!isRequiredFilled.fabricante && "Este campo es obligatorio"} />
            <br /><br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-item" name='item' select label="Item" onChange={handleAtrSupp} error={!isRequiredFilled.item}
                helperText={!isRequiredFilled.item && "Este campo es obligatorio"}>
                <MenuItem value="LINTERNA">LINTERNA</MenuItem>
                <MenuItem value="RADIO">RADIO</MenuItem>
                <MenuItem value="COMUNICADOR">COMUNICADOR</MenuItem>
                <MenuItem value="CELULAR">CELULAR</MenuItem>
            </TextField>
            <br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-tipo" name='tipo' select label="Tipo" onChange={handleAtrSupp} error={!isRequiredFilled.tipo}
                helperText={!isRequiredFilled.tipo && "Este campo es obligatorio"}>
                <MenuItem value="UTILERÍA">UTILERÍA</MenuItem>
                <MenuItem value="COMUNICACIÓN">COMUNICACIÓN</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
            </TextField>
            <br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-tipo" name='estado' select label="Estado" onChange={handleAtrSupp} error={!isRequiredFilled.estado}
                helperText={!isRequiredFilled.estado && "Este campo es obligatorio"}>
                <MenuItem value="DISPONIBLE">DISPONIBLE</MenuItem>
                <MenuItem value="EN USO">EN USO</MenuItem>
                <MenuItem value="DAÑADO">DAÑADO</MenuItem>
            </TextField>
            <br />
            <DateComponent label="Fecha de adquisición" value={itemSelect.fechaAdd} className='fechaAdd' onChange={handleDate} style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }} />
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
            <TextField label="Código" name='codigo' onChange={handleAtrSupp} type='number' value={itemSelect && itemSelect.codigo}
                error={!isRequiredFilled.codigo} helperText={!isRequiredFilled.codigo && "Este campo es obligatorio"} />
            <br /><br />
            <TextField label="Fabricante" name='fabricante' onChange={handleAtrSupp} value={itemSelect && itemSelect.fabricante}
                error={!isRequiredFilled.fabricante} helperText={!isRequiredFilled.fabricante && "Este campo es obligatorio"} />
            <br /><br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-item" name='item' select label="Item" onChange={handleAtrSupp} value={itemSelect && itemSelect.item}
                error={!isRequiredFilled.item} helperText={!isRequiredFilled.item && "Este campo es obligatorio"}>
                <MenuItem value="LINTERNA">LINTERNA</MenuItem>
                <MenuItem value="RADIO">RADIO</MenuItem>
                <MenuItem value="COMUNICADOR">COMUNICADOR</MenuItem>
                <MenuItem value="CELULAR">CELULAR</MenuItem>
            </TextField>
            <br /><br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-tipo" name='tipo' select label="Tipo" onChange={handleAtrSupp} value={itemSelect && itemSelect.tipo}
                error={!isRequiredFilled.tipo} helperText={!isRequiredFilled.tipo && "Este campo es obligatorio"}>
                <MenuItem value="UTILERÍA">UTILERÍA</MenuItem>
                <MenuItem value="COMUNICACIÓN">COMUNICACIÓN</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
            </TextField>
            <br /><br />
            <TextField sx={{ m: 1, minWidth: 235 }} id="label-estado" name='estado' select label="Estado" onChange={handleAtrSupp} value={itemSelect && itemSelect.estado}
                error={!isRequiredFilled.estado} helperText={!isRequiredFilled.estado && "Este campo es obligatorio"}>
                <MenuItem value="DISPONIBLE">DISPONIBLE</MenuItem>
                <MenuItem value="EN USO">EN USO</MenuItem>
                <MenuItem value="DAÑADO">DAÑADO</MenuItem>
            </TextField>
            <br /><br />
            <DateComponent
                label="Fecha de adquisición"
                className="fechaAdd"
                value={itemSelect.fechaAdd}
                onChange={handleDate}
                style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}
            />
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
                <Modal open={modalInsert} onClose={handleAbrirCerrarInsertar} disablePortal='true' disableEnforceFocus disableAutoFocus >
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
