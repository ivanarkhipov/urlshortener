import database from "@/firebase/firebase"
import { NextResponse } from "next/server"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

const DOMAIN_PREFIX = 'http://localhost:3000/api/shorten/'

export async function POST(request: Request) {
    const data = await request.json()

    // TODO validate
    const url = data.url

    const shortUrlsCollection = collection(database, 'shorturls');

    const shortUrls = await getDocs(
        query(shortUrlsCollection, where('url', '==', url))
    )

    let shortKey = ''
    if (shortUrls.docs.length > 0) {
        shortKey = shortUrls.docs[0].id
    } else {
        shortKey = generateRandomString(8)
        await setDoc(doc(shortUrlsCollection, shortKey), { url })
    }

    return NextResponse.json({ shortUrl: DOMAIN_PREFIX + shortKey })
}

function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}