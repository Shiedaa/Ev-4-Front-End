import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { cerrarSesion } from "../services/authService";


function Navbar(){

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);



    useEffect(()=>{


        verificarSesion();


        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session)=>{

                setUsuario(session?.user ?? null);

            }
        );


        return ()=>{

            subscription.unsubscribe();

        };


    },[]);



    async function verificarSesion(){

        const {
            data:{session}
        } = await supabase.auth.getSession();


        setUsuario(session?.user ?? null);

    }



    async function salir(){

        await cerrarSesion();

        navigate("/login");

    }



    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">


                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Agenda Contactos
                </Link>



                <div className="d-flex align-items-center">


                {
                    usuario ? (

                        <>

                            <Link
                                to="/contactos"
                                className="btn btn-outline-light me-2"
                            >
                                Contactos
                            </Link>


                            <div className="dropdown">


                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Cuenta
                                </button>



                                <ul className="dropdown-menu dropdown-menu-end">


                                    <li>

                                        <span className="dropdown-item-text">
                                            {usuario.email}
                                        </span>

                                    </li>


                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>


                                    <li>

                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={salir}
                                        >
                                            Cerrar sesión
                                        </button>

                                    </li>


                                </ul>


                            </div>


                        </>


                    ) : (


                        <>

                            <Link
                                to="/login"
                                className="btn btn-outline-light me-2"
                            >
                                Iniciar sesión
                            </Link>



                            <Link
                                to="/register"
                                className="btn btn-primary"
                            >
                                Registrarse
                            </Link>


                        </>


                    )
                }


                </div>


            </div>


        </nav>

    );

}


export default Navbar;