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
      query(collection(db, "waitlist"), orderBy("createAt"))
    );

    // Determine the user's place in line
    const placeInLine = matchingDoc
      ? q_Snapshot.docs.findIndex((doc) => doc.id === matchingDoc.id) + 1
      : 0;

    const behindYou = q_Snapshot.docs.slice(placeInLine);

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
    

    if (id) {
      // Check if the provided "id" matches with any document in Firestore
      const matchingDoc = afterQuery.docs.find((doc) => doc.id === id);

      // Check if a matching document was found
      if (matchingDoc) {
        // Update the "shares" field of the matching document by adding 1
        await updateDoc(matchingDoc.ref, {
          shares: matchingDoc.data().shares - 1,
        });

        // Re-query the Firestore collection to get the updated position
        const updatedQuery = await getDocs(collection(db, "waitlist"));
        const updatedMatchingDoc = updatedQuery.docs.find(
          (doc) => doc.id === id
        );

        return NextResponse.json(
          {
            title: "Thank you for joining the waitlist",
            message: isTop500Message,
            redirect: `https://www.joinshipp.com/dating/share?id=${updatedMatchingDoc?.id}&totalSignUps=${updatedQuery.size}`,
            totalSignUps: updatedQuery.size,
            placeInLine:
              updatedQuery.docs.findIndex((doc) => doc.id === id) - 1,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      {
        title: "Thank you for joining the waitlist",
        message: isTop500Message,
        redirect: `https://www.joinshipp.com/dating/share?id=${matchingDocAfter?.id}&totalSignUps=${afterQuery.size}`,
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
