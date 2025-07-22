import supabase, { supabaseUrl } from "@/config/supabase";
import { UAParser } from "ua-parser-js";


export async function getUrls(user_id) {
    const { data, error } = await supabase
        .from('urls')
        .select('*')
        .eq('user_id', user_id);

    if (error) {
        console.error(error.message);
        throw new Error('Unable to load Clicks');
    }

    return data;
}
export async function deleteUrl(urlId) {
    const { data, error } = await supabase
        .from('urls')
        .delete()
        .eq('id', urlId);

    if (error) {
        console.error(error.message);
        throw new Error('Unable to Delete URL');
    }

    return data;
}
export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const shortUrl = Math.random().toString(36).substring(2,6)//it generate a short string of 4 chars
    console.log(title, 'hi');
    
    const fileName = `qr-${shortUrl}`;
    const { error: storageError } = await supabase.storage
        .from('qrs')
        .upload(fileName, qrcode);

    if (storageError) {
        throw new Error(storageError.message);
    }

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const { data, error } = await supabase
        .from('urls')
        .insert([{
            title,
            original_url: longUrl,
            custom_url: customUrl || null,
            user_id,
            short_url: shortUrl,
            qr,
        }])
        .select();

    if (error) {
        console.error(error.message);
        throw new Error('Unable to Create Short URL');
    }

    return data;
}

export async function getLongUrl(urlId) {
    const { data, error } = await supabase
        .from('urls')
        .select('id, original_url')
        .or(`short_url.eq.${urlId},custom_url.eq.${urlId}`)
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Unable to Fetch Short URL');
    }

    return data;
}

export async function getUrl({urlId, userId}) {
    
    const { data, error } = await supabase
        .from('urls')
        .select('*')
        .eq('id', urlId)
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error(error.message);
        throw new Error('Short URL not Found');
    }

    return data;
}

