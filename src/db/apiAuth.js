import supabase, { supabaseUrl } from "@/config/supabase";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw new Error(error.message);
    }

    return data
}

export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  // const {data, error} = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function signup({name, email, password, profile_pic}) {
    console.log('hello',name);
    
    const fileName = `dp-${name?.split(" ").join("-")}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
        .from('profilepic')
        .upload(fileName, profile_pic);

    if (storageError) {
        throw new Error(storageError.message);
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
            }
        }
    });
    if (error) {
        throw new Error(error.message);
    }

    return data;

}


export async function logout() {
    const {error} = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
        
    }
}