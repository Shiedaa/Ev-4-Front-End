import { useEffect, useState } from "react";
import FormularioContacto from "../components/FormularioContacto";
import DatosContacto from "../components/DatosContacto";

import { 
    obtenerContactos,
    crearContacto,
    eliminarContacto,
    actualizarContacto
} from "../services/contactosService";

function Home(){

    const [contactos, setContactos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [contactoSeleccionado,setContactoSeleccionado] = useState(null);

    useEffect(()=>{

    cargarContactos();

},[]);


async function cargarContactos(){

    const datos = await obtenerContactos();

    console.log("CONTACTOS CARGADOS:", datos);

    setContactos(datos);

}


function editar(contacto){

    setEditando(contacto);

}

    async function borrar(id) {

    const confirmar = window.confirm(
        "¿Está seguro de que quiere eliminar este contacto?"
    );

    if (!confirmar) {
        return;
    }

    await eliminarContacto(id);

    setMensaje(" Contacto eliminado correctamente.");

    cargarContactos();
}

    async function guardarContacto(contacto) {

    if (contacto.id) {

        const resultado = await actualizarContacto(contacto.id, {
            nombre: contacto.nombre,
            apellido: contacto.apellido
        });

        console.log("Resultado actualización:", resultado);

        if (!resultado) {
            alert("La actualización falló");
            return;
        }

        setMensaje("Contacto actualizado correctamente.");

    } else {

        await crearContacto(contacto);

        setMensaje("Contacto guardado correctamente.");
    }

    setEditando(null);

    await cargarContactos();
}

    const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    contacto.apellido.toLowerCase().includes(busqueda.toLowerCase())
);

    return(

    <div className="container mt-4">

        <h2 className="mb-4">
            Agenda de Contactos
        </h2>

        {/* Formulario */}
        <FormularioContacto

        onGuardar={guardarContacto}

        contactoEditar={editando}

        />

        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o apellido..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>

            {mensaje && (
                <div className="alert alert-success alert-dismissible fade show">
                    {mensaje}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMensaje("")}
                    ></button>
                </div>
)}

        <table className="table table-striped">

            <thead>
                <tr>
                    <th>Acciones</th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>
            

            <tbody>

                {
                    contactosFiltrados.map((contacto) => (

                        <tr key={contacto.id}>
                            <td>
                                <button onClick={()=>borrar(contacto.id)}>
                                    Eliminar
                                </button>

                                <button 
                                onClick={()=>setEditando(contacto)}
                                className="btn btn-warning"
                                >
                                Editar
                                </button>

                                <button
                                className="btn btn-info"
                                onClick={()=>setContactoSeleccionado(contacto)}
                                >
                                Ver datos
                                </button>
                            </td>
                            <td>{contacto.id}</td>
                            <td>{contacto.nombre}</td>
                            <td>{contacto.apellido}</td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

        <DatosContacto
                contacto={contactoSeleccionado}
            />

    </div>

);

}


export default Home;