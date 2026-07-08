import { useEffect, useState } from "react";
import FormularioDatoContacto from "./FormularioDatoContacto";
import {
    obtenerDatosContacto,
    crearDatoContacto,
    actualizarDatoContacto,
    eliminarDatoContacto
} from "../services/datosContactoService";


function DatosContacto({contacto}){

    const [datos,setDatos]=useState([]);
    const [editandoDato,setEditandoDato]=useState(null);



    useEffect(()=>{

        cargarDatos();

    },[contacto]);



    async function cargarDatos(){

        if(!contacto) return;


        const resultado = await obtenerDatosContacto(contacto.id);

        setDatos(resultado);

    }

    function editarDato(dato){

        console.log("Dato seleccionado:", dato);

        setEditandoDato(dato);

    }      



    async function guardarDato(dato){

    if(dato.id){

        await actualizarDatoContacto(
            dato.id,
            {
                tipo:dato.tipo,
                categoria:dato.categoria,
                valor:dato.valor
            }
        );

    }else{

        await crearDatoContacto(dato);

    }


    setEditandoDato(null);

    cargarDatos();

    }



    async function eliminar(id){


        const confirmar = window.confirm(
            "¿Eliminar este dato?"
        );


        if(!confirmar){
            return;
        }


        await eliminarDatoContacto(id);


        cargarDatos();

    }



    if(!contacto){

        return null;

    }



    return(


        <div className="card mt-4">


            <div className="card-header">

                Datos de {contacto.nombre} {contacto.apellido}

            </div>



            <div className="card-body">


                {
                    datos.length === 0 ?


                    <p>
                        No tiene datos registrados
                    </p>


                    :


                    datos.map((dato)=>(

                        <div key={dato.id}>

                            <strong>
                                {dato.tipo}
                            </strong>

                            :
                            {dato.valor}


                            <button
                                className="btn btn-warning btn-sm ms-2"
                                onClick={()=>editarDato(dato)}
                            >
                                Editar
                            </button>


                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={()=>eliminar(dato.id)}
                            >
                                Eliminar
                            </button>


                        </div>

                    ))

                }



                <FormularioDatoContacto

                    contactoId={contacto.id}

                    datoEditar={editandoDato}

                    onGuardar={guardarDato}

                />


            </div>


        </div>


    );

}


export default DatosContacto;