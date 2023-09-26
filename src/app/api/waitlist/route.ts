import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/firebase/config";

//add items to database

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { signUpInfo, id } = reqBody;

    const { email, city } = signUpInfo;

    //check if email is already in database
    const w_query = await getDocs(collection(db, "waitlist"));
    const emails = w_query.docs.map((doc) => doc.data().email);

    const isEmailInDatabase = emails.includes(email);

    const matchingDoc = w_query.docs.find((doc) => doc.data().email === email);

    if (isEmailInDatabase) {
      return NextResponse.json(
        {
          title: "Already in waitlist",
          message: "You are already in the waitlist",
          redirect: `http://www.joinshipp.com/dating/share?id=${matchingDoc?.id}?totalSignUps=${w_query.size}`,
        },
        { status: 200 }
      );
    }

    await addDoc(collection(db, "waitlist"), {
      email,
      city,
      shares: 0,
      createAt: new Date(),
    });

    const querySnapshot = await getDocs(collection(db, "waitlist"));

    const isTop500 = querySnapshot.size < 500;

    const isTop500Message = isTop500
      ? "You are in the top 500"
      : `You are number ${querySnapshot.size} in line`;

    const afterQuery = await getDocs(collection(db, "waitlist"));

    const matchingDocAfter = afterQuery.docs.find(
      (doc) => doc.data().email === email
    );

    const ref = collection(db, "cities");

    const q = query(ref, orderBy("name"), limit(3));

    const w_Doc = querySnapshot.docs.find((doc) => doc.data().email === email);

    const placeInLine = querySnapshot.docs.findIndex((doc) => doc.id === w_Doc?.id) + 1;

    const behindYou = querySnapshot.docs.slice(placeInLine, placeInLine + 3);



    if (id) {
      const querySnapshot = await getDocs(collection(db, "waitlist"));
      const matchingDoc = querySnapshot.docs.find((doc) => doc.id === id);

      // Check if a matching document was found
      if (matchingDoc) {
        const docRef = doc(db, "waitlist", matchingDoc.id);

        // Update the "shares" field of the matching document by adding 1
        await updateDoc(docRef, {
          shares: matchingDoc.data().shares + 1,
        });
      }
    }

    return NextResponse.json(
      {
        title: "Thank you for joining the waitlist",
        message: isTop500Message,
        redirect: `https://www.joinshipp.com/dating/share?id=${matchingDocAfter?.id}&totalSignUps=${afterQuery.size}?behind=${behindYou}`,
        totalSignUps: afterQuery.size,
        placeInLine: afterQuery.size,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
