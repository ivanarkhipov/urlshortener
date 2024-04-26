import database from "@/firebase/firebase"
import { NextRequest, NextResponse } from "next/server"
import {  doc, getDoc } from "firebase/firestore";


export async function GET(request : NextRequest,{ params }: { params: { id: string } }) {
    const shortKey = params.id

    const shortUrl = await getDoc(doc(database, 'shorturls', shortKey))
    if (shortUrl.exists()) {
        return NextResponse.redirect(new URL(shortUrl.data().url))

    } else {
        //TODO redirect to specific page if not found
    }
}