import { createClient } from '@supabase/supabase-js'
import CryptoJS from 'crypto-js';

import { DBL_loginUser } from '@/dexie';

export const supabase = createClient('https://yxqtpqkugnsqbfzcopjt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cXRwcWt1Z25zcWJmemNvcGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4OTg5MTksImV4cCI6MTk5NjQ3NDkxOX0.cEnLQtFcI1-FVeFnQ-NLeOLf5UrqGIc8VMt3Nhm-p8c')

function HASH(val) {
    return CryptoJS.SHA3(val).toString(CryptoJS.enc.Hex)
}


export async function DB_registerUser(email, username, password) {
    const data = {
        email: email,
        username: username,
        password: HASH(password),
    }
    await supabase.from('user').insert(data);
    return true;
}

export async function DB_loginUser(username, password) {
    const { data } = await supabase.from('users').select().eq("username", username)
    if (data.length < 1) {
        return false;
    }

    const user = data[0];

    if (user.password != HASH(password)) {
        return false;
    }

    await DBL_loginUser(username, password, user["email"]);
    return true;
}

export async function DB_getAllFolders(username) {
    const { data } = await supabase.from('folders').select().eq("user", username)
    return data;
}


export async function DB_addNewFolder(username, folder, color) {
    const data = {
        folder: folder,
        user: username,
        color: color,
        pass_amount: 0,
    };
    await supabase.from('folders').insert(data);
    return true;
}


/*
const enc = this.$CryptoJS.AES.encrypt("Hi There!", "Secret Passphrase").toString()
console.log("encoded: ", enc);

const dec = this.$CryptoJS.AES.decrypt(enc, "Secret Passphrase").toString(this.$CryptoJS.enc.Utf8)
console.log("decoded: ", dec);
*/