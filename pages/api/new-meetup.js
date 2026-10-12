// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://tigrangrigoryan2021_db_user:BYbPhHQ495psrxMk@cluster0.birkyih.mongodb.net/meetups",
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result, "result___");

    client.close();

    res.status(200).json({ message: "Meetup inserted!" });
  }
}
