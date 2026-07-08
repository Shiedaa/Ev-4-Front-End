import { useEffect, useState } from "react";


function FormularioDatoContacto({
    contactoId,
    onGuardar,
    datoEditar
}) {


    const [tipo, setTipo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState("");



    useEffect(()=>{

        if(datoEditar){

            setTipo(datoEditar.tipo);
            setCategoria(datoEditar.categoria);
            setValor(datoEditar.valor);

        }else{

            setTipo("");
            setCategoria("");
            setValor("");

        }

    },[datoEditar]);




    function guardar(e){

        e.preventDefault();


        if(!tipo.trim() || !valor.trim()){

            alert("Tipo y valor son obligatorios");

            return;

        }


        onGuardar({

            id: datoEditar?.id,

            contacto_id: contactoId,

            tipo,

            categoria,

            valor

        });



        setTipo("");
        setCategoria("");
        setValor("");

    }




    return (

        <div className="card mt-3">


            <div className="card-header">

                {
                    datoEditar
                    ? "Editar dato de contacto"
                    : "Nuevo dato de contacto"
                }

            </div>



            <div className="card-body">


                <form onSubmit={guardar}>


                    <div className="mb-3">

                        <label className="form-label">
                            Tipo
                        </label>


                        <input

                            type="text"

                            className="form-control"

                            placeholder="Ej: teléfono, email"

                            value={tipo}

                            onChange={(e)=>setTipo(e.target.value)}

                        />

                    </div>



                    <div className="mb-3">

                        <label className="form-label">
                            Categoría
                        </label>


                        <input

                            type="text"

                            className="form-control"

                            placeholder="Ej: personal, trabajo"

                            value={categoria}

                            onChange={(e)=>setCategoria(e.target.value)}

                        />

                    </div>



                    <div className="mb-3">

                        <label className="form-label">
                            Valor
                        </label>


                        <input

                            type="text"

                            className="form-control"

                            placeholder="Ingrese el dato"

                            value={valor}

                            onChange={(e)=>setValor(e.target.value)}

                        />

                    </div>



                    <button
                        className="btn btn-primary"
                        type="submit"
                    >

                        {
                            datoEditar
                            ? "Actualizar"
                            : "Guardar"
                        }

                    </button>


                </form>


            </div>


        </div>

    );

}


export default FormularioDatoContacto;