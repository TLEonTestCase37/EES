import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, gradYear, position, interests, description } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
      });
    }

    await client.connect();
    const db = client.db("ees");
    const collection = db.collection("pendingUsers");

    // Check if email already exists (case-insensitive match)
    const existing = await collection.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (existing) {
      return new Response(JSON.stringify({
        message:
          "A request with this email already exists. If you think this is a mistake, please contact us.",
      }), {
        status: 409,
      });
    }

    // Insert into MongoDB
    await collection.insertOne({
      name,
      email,
      gradYear,
      position,
      interests,
      description,
      submittedAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Submission successful" }), {
      status: 200,
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
