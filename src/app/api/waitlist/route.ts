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



export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { signUpInfo, id } = reqBody;

    const { email, city } = signUpInfo;
    const ref = collection(db, "waitlist");

    // Check if email is already in the database
    const w_query = await getDocs(collection(db, "waitlist"));
    const emails = w_query.docs.map((doc) => doc.data().email);

    const isEmailInDatabase = emails.includes(email);

    const matchingDoc = w_query.docs.find((doc) => doc.data().email === email);

    const q_Snapshot = await getDocs(
      query(collection(db, "waitlist"), orderBy("placeInLine"))
    );

    // Determine the user's place in line
    const placeInLine = matchingDoc
      ? q_Snapshot.docs.findIndex((doc) => doc.id === matchingDoc.id) + 1
      : q_Snapshot.size + 1; // Place at the end if not found

    // Check for duplicate placeInLine values
    const existingPlaceInLineValues = q_Snapshot.docs.map(
      (doc) => doc.data().placeInLine
    );
    let adjustedPlaceInLine = placeInLine;

    while (existingPlaceInLineValues.includes(adjustedPlaceInLine)) {
      adjustedPlaceInLine++; // Increment placeInLine until it's unique
    }

    const behindYou = q_Snapshot.docs.slice(adjustedPlaceInLine);

    if (isEmailInDatabase) {
      // If the email is already in the database, return a response
      return NextResponse.json(
        {
          title: "Already in waitlist",
          message: "You are already in the waitlist",
          redirect: `http://www.joinshipp.com/dating/share?id=${matchingDoc?.id}&totalSignUps=${w_query.size}&behind=${behindYou.length}`,
        },
        { status: 200 }
      );
    }

    await addDoc(collection(db, "waitlist"), {
      email,
      city,
      shares: 0,
      createAt: new Date(),
      placeInLine: adjustedPlaceInLine,
    });

    const querySnapshot = await getDocs(collection(db, "waitlist"));

    const isTop500 = querySnapshot.size <= 500;

    const isTop500Message = isTop500
      ? "You are in the top 500"
      : `You are number ${adjustedPlaceInLine} in line`;

    if (id) {
      // Check if the provided "id" matches with any document in Firestore
      const matchingDoc = querySnapshot.docs.find((doc) => doc.id === id);

      // Check if a matching document was found
      if (matchingDoc) {
        // Update the "placeInLine" field of the matching document
        await updateDoc(matchingDoc.ref, { placeInLine: adjustedPlaceInLine });

        // Check if the user's place in line reaches 0
        if (adjustedPlaceInLine === 0) {
          // Do not remove the user, just provide a message
          return NextResponse.json(
            {
              title: "Your place in line is 0",
              message: "You are at the front of the waitlist",
              totalSignUps: querySnapshot.size, // Update total signups
            },
            { status: 200 }
          );
        }
      }
    }

    return NextResponse.json(
      {
        title: "Thank you for joining the waitlist",
        message: isTop500Message,
        redirect: `https://www.joinshipp.com/dating/share?id=${matchingDoc?.id}&totalSignUps=${querySnapshot.size}`,
        totalSignUps: querySnapshot.size,
        placeInLine: adjustedPlaceInLine,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

