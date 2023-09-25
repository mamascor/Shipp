import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/firebase/config";


export async function POST(request: NextRequest) {


    try {
         const reqBody = await request.json();

         const { id } = reqBody;
        

         if(id) {
            const querySnapshot = await getDocs(collection(db, "waitlist"));
            const matchingDoc = querySnapshot.docs.find((doc) => doc.id === id);

            //add +1 to the number of shares for the matching doc
            await addDoc(collection(db, "waitlist"), {
                shares: matchingDoc?.data().shares + 1,
            });

         }

        



    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}