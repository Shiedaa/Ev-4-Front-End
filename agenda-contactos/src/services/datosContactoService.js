import { supabase } from "./supabase";


export async function obtenerDatosContacto(contacto_id){

    const {data,error}=await supabase
        .from("datos_contacto")
        .select("*")
        .eq("contacto_id", contacto_id);


    if(error){

        console.log(error);
        return [];

    }


    return data;

}



export async function crearDatoContacto(dato){


    const {data,error}=await supabase

        .from("datos_contacto")

        .insert([
            {
                contacto_id: dato.contacto_id,
                tipo: dato.tipo,
                categoria: dato.categoria,
                valor: dato.valor
            }
        ])

        .select();



    if(error){

        console.log(error);

        return null;

    }


    return data[0];

}



export async function actualizarDatoContacto(id,dato){

    const {data,error}=await supabase
        .from("datos_contacto")
        .update(dato)
        .eq("id",id)
        .select();


    if(error){

        console.log(error);
        return null;

    }


    return data[0];

}



export async function eliminarDatoContacto(id){

    const {error}=await supabase
        .from("datos_contacto")
        .delete()
        .eq("id",id);


    if(error){

        console.log(error);
        return false;

    }


    return true;

}