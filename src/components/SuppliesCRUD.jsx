import React, { useState } from 'react';
import '../css/SuppliesCRUD.css'
// Elementos para registar insumos
// Elementos para listar insumos en la tabla
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Modal, TextField, Box } from '@mui/material';
// Elementos para hacer CRUD
import { Edit, Delete } from '@mui/icons-material';

// variable con el estilo de la ventana modal
const styleModal = {
    position: 'absolute',
    textAlign: 'center',
    padding: '10px 10px 10px 10px',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid  #000',
    boxShadow: 24,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

const SuppliesCRUD = () => {
    // Variables de estado para cada atributo
    const [nuevoSupp, setNuevoSupp] = useState({
        codigo: '',
        fabricante: '',
        item: '',
        tipo: '',
        estado: '',
        fechaAdd: '',
    });
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

    // Función para agregar el nuevo implemento
    const addSupp = () => {
        listaSupl.push(nuevoSupp);
        setModalInsert(!modalInsert);
    }

    // Función para controlar la ventana modal Insertar
    const handleAbrirCerrarInsertar = () => {
        setModalInsert(!modalInsert);

    }

    // Cuerpo de la ventana Modal
    const bodyInsertar = (
        <Box sx={styleModal}>
            <h1>Registrar nuevos items</h1>
            <TextField label="Código" name='codigo' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Fabricante" name='fabricante' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Item" name='item' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Tipo" name='tipo' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Estado" name='estado' onChange={handleAtrSupp} />
            <br /><br />
            <TextField label="Fecha de adquisición" name='fechaAdd' onChange={handleAtrSupp} />
            <br /><br />
            <div align='right'>
                <Button color='primary' onClick={addSupp}>Ingresar</Button>
                <Button onClick={handleAbrirCerrarInsertar}>Cancelar</Button>
            </div>
        </Box>
    )

    return (
        <div className='Sup-container'>
            <h1 id='Supp-title'>Inventario de Insumos de Seguridad</h1>
            <Button id='btn-In' variant='contained' onClick={handleAbrirCerrarInsertar}>Ingresar</Button>
            <br />
            <div className='Supp-Table'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Fabricante</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha de adquisición</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaSupl.length !== 0 ? (
                                listaSupl.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell >{item.codigo}</TableCell>
                                        <TableCell >{item.fabricante}</TableCell>
                                        <TableCell >{item.item}</TableCell>
                                        <TableCell >{item.tipo}</TableCell>
                                        <TableCell >{item.estado}</TableCell>
                                        <TableCell >{item.fechaAdd}</TableCell>
                                        <TableCell>
                                            <Edit />
                                            &nbsp;&nbsp;
                                            <Delete />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ): null
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
