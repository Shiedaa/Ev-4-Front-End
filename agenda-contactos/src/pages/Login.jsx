import { useState } from "react";
import { iniciarSesion } from "../services/authService";


function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mensaje,setMensaje] = useState("");


    async function handleLogin(e){

        e.preventDefault();


        const { data, error } = await iniciarSesion(
            email,
            password
        );


        console.log("LOGIN DATA:", data);
        console.log("LOGIN ERROR:", error);


        if(error){

            setMensaje(error.message);

        }else{

            setMensaje("Inicio de sesión correcto");

            console.log(
                "Usuario:",
                data.user.email
            );

        }

    }


    return(

        <div className="container mt-5">

            <h2>
                Iniciar Sesión
            </h2>


            <form onSubmit={handleLogin}>


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


                <button className="btn btn-success">

                    Ingresar

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


export default Login;