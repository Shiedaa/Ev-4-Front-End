import { supabase } from "./supabase";


export async function obtenerContactos(){


    const { data:{user} } = await supabase.auth.getUser();


    if(!user){

        return [];

    }



    const {data,error}=await supabase

        .from("contactos")

        .select("*")

        .eq("user_id", user.id);



    if(error){

        console.log(error);

        return [];

    }


    return data;

}



export async function crearContacto(contacto){

    const {
        data:{user}
    } = await supabase.auth.getUser();


    const { id, ...nuevoContacto } = contacto;


    const {data, error} = await supabase
        .from("contactos")
        .insert([
            {
                ...nuevoContacto,
                user_id:user.id
            }
        ])
        .select();


    console.log("DATA INSERT:", data);
    console.log("ERROR INSERT:", error);


    if(error){
        console.log(error);
        return null;
    }


    return data[0];
}



export async function eliminarContacto(id){

    const {
        data:{user}
    } = await supabase.auth.getUser();


    const {error}=await supabase
        .from("contactos")
        .delete()
        .eq("id",id)
        .eq("user_id",user.id);


    if(error){
        console.log(error);
        return false;
    }


    return true;
}



export async function actualizarContacto(id, contacto){

    const {
        data:{user}
    } = await supabase.auth.getUser();


    const {data,error}=await supabase
        .from("contactos")
        .update(contacto)
        .eq("id",id)
        .eq("user_id",user.id)
        .select();


    if(error){
        console.log(error);
        return null;
    }


    return data[0];
}

