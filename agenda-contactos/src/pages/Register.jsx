import { useState } from "react";
import { registrar } from "../services/authService";


function Register(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mensaje,setMensaje] = useState("");



    async function handleRegistro(e){

        e.preventDefault();


        const { data, error } = await registrar(
            email,
            password
        );

console.log("DATA REGISTRO:", data);
console.log("ERROR REGISTRO:", error);


        if(error){

            setMensaje(error.message);

        }else{

            setMensaje(
                "Usuario registrado correctamente"
            );

        }

    }



    return (

        <div className="container mt-5">

            <h2>
                Crear cuenta
            </h2>


            <form onSubmit={handleRegistro}>


                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button className="btn btn-primary">
                    Registrarse
                </button>


            </form>


            {
                mensaje &&
                <div className="alert alert-info mt-3">
                    {mensaje}
                </div>
            }


        </div>

    );

}


export default Register;