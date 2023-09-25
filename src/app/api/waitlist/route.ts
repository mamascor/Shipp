import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/firebase/config";

//add items to database

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, city } = reqBody;

    //check if email is already in database
    const query = await getDocs(collection(db, "waitlist"));
    const emails = query.docs.map((doc) => doc.data().email);

    const isEmailInDatabase = emails.includes(email);

    
    if (isEmailInDatabase) {
      return NextResponse.json(
        {
          title: "Already in waitlist",
          message: "You are already in the waitlist",
        },
        { status: 200 }
      );
    }

    await addDoc(collection(db, "waitlist"), {
      email,
      city,
      createAt: new Date(),
    });

    const querySnapshot = await getDocs(collection(db, "waitlist"));

    const isTop500 = querySnapshot.size < 500;

    const isTop500Message = isTop500
      ? "You are in the top 500"
      : `You are number ${querySnapshot.size} in line`;

    return NextResponse.json(
      {
        title: "Thank you for joining the waitlist",
        message: isTop500Message,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
