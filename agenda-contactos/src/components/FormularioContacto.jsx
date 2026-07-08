import { useState, useEffect } from "react";

function FormularioContacto({ onGuardar, contactoEditar }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");


    useEffect(() => {

        if(contactoEditar){

            setNombre(contactoEditar.nombre);
            setApellido(contactoEditar.apellido);

        }else{

            setNombre("");
            setApellido("");

        }

    },[contactoEditar]);



    const guardar = (e) => {

        e.preventDefault();


        if (!nombre.trim() || !apellido.trim()) {

            alert("Todos los campos son obligatorios");
            return;

        }


        onGuardar({

            id: contactoEditar?.id,
            nombre,
            apellido

        });


        setNombre("");
        setApellido("");

    };



    return (

        <div className="card mb-4">

            <div className="card-header">

                {contactoEditar 
                    ? "Editar Contacto" 
                    : "Nuevo Contacto"
                }

            </div>


            <div className="card-body">


                <form onSubmit={guardar}>


                    <div className="mb-3">

                        <label className="form-label">
                            Nombre
                        </label>

                        <input

                            type="text"

                            className="form-control"

                            value={nombre}

                            onChange={(e)=>setNombre(e.target.value)}

                        />

                    </div>



                    <div className="mb-3">

                        <label className="form-label">
                            Apellido
                        </label>


                        <input

                            type="text"

                            className="form-control"

                            value={apellido}

                            onChange={(e)=>setApellido(e.target.value)}

                        />

                    </div>



                    <button
                        className="btn btn-primary"
                        type="submit"
                    >

                        {contactoEditar 
                            ? "Actualizar" 
                            : "Guardar"
                        }

                    </button>


                </form>


            </div>

        </div>

    );

}

export default FormularioContacto;