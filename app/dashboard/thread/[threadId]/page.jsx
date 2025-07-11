import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Link from "next/link";

export default async function ThreadPage({ params }) {
  const { threadId } = params;

  const threadRef = doc(db, "forums", threadId);
  const threadSnap = await getDoc(threadRef);

  if (!threadSnap.exists()) {
    return <div className="p-4">Thread not found.</div>;
  }

  const thread = threadSnap.data();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{thread.title}</h1>
      <p className="text-muted-foreground">{thread.description}</p>

      <p className="text-sm">
        Posted by{" "}
        <Link
          href={`/profile/${thread.createdByUid}`}
          className="text-blue-600 hover:underline"
        >
          {thread.createdByName || "Unknown"}
        </Link>{" "}
        —{" "}
        <span className="text-xs text-muted-foreground">
          {thread.createdAt?.toDate?.().toLocaleString?.() || "Just now"}
        </span>
      </p>

      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold">Comments</h2>
        {thread.comments?.length > 0 ? (
          thread.comments.map((c, idx) => (
            <div key={idx} className="border rounded p-2">
              <p className="text-sm">
                <span className="font-medium">{c.name}:</span> {c.text}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
