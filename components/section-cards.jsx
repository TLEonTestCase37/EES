"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultiSelectDropdown from "@/components/multiselect";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function SectionCards({ curUser }) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchParams, setSearchParams] = useState({ query: "", tags: [] });

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [selectedThread, setSelectedThread] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "forums"));
    const data = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
    setForums(data);
    setLoading(false);
  };

  const handleCreateThread = async () => {
    if (!title.trim()) return alert("Title is required");

    try {
      const threadRef = await addDoc(collection(db, "forums"), {
        title,
        description,
        tags: selectedTags,
        createdByUid: curUser.uid,
        createdByName: curUser.displayName || "User",
        createdAt: serverTimestamp(),
        comments: [],
      });
      sendTagEmailNotification(selectedTags, threadRef.id);

      setTitle("");
      setDescription("");
      setSelectedTags([]);
      await fetchForums();
    } catch (err) {
      console.error("Error creating thread:", err);
    }
  };

  const sendTagEmailNotification = async (tags, threadId) => {
    try {
      const emailSet = new Set();

      for (const tag of tags) {
        const tagDocRef = doc(db, "tags", tag);
        const tagDocSnap = await getDoc(tagDocRef);

        if (tagDocSnap.exists()) {
          const tagData = tagDocSnap.data();
          if (tagData.users && Array.isArray(tagData.users)) {
            tagData.users.forEach((email) => {
              if (email !== curUser.email) {
                emailSet.add(email);
              }
            });
          }
        }
      }

      const emails = [...emailSet];

      if (emails.length === 0) return;

      await fetch("/api/sendmail", {
        method: "POST",
        body: JSON.stringify({
          emails,
          threadId,
          threadTitle: title,
          postedBy: curUser.displayName || "User",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Error sending tag notifications:", err);
    }
  };
  const handleSearch = () => {
    setSearchParams({ query: searchQueryInput.trim(), tags: searchTags });
    setPage(1);
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    try {
      const threadRef = doc(db, "forums", selectedThread.id);
      await updateDoc(threadRef, {
        comments: arrayUnion({
          text: commentInput,
          uid: curUser.uid,
          name: curUser.displayName || "User",
          createdAt: new Date().toISOString(),
        }),
      });
      setCommentInput("");
      fetchForums();
    } catch (e) {
      console.error("Error posting comment", e);
    }
  };

  const filteredForums = forums.filter((thread) => {
    const lower = searchParams.query.toLowerCase();
    const matchesTitle = thread.title?.toLowerCase().includes(lower);
    const matchesTags =
      searchParams.tags.length === 0 ||
      searchParams.tags.every((tag) =>
        thread.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    return matchesTitle && matchesTags;
  });

  const paginatedForums = filteredForums.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Search and Create Thread */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-3/4">
          <Input
            type="text"
            placeholder="Search by thread title..."
            value={searchQueryInput}
            onChange={(e) => setSearchQueryInput(e.target.value)}
            className="w-full"
          />
          <MultiSelectDropdown
            selected={searchTags}
            setSelected={setSearchTags}
            placeholder="Filter by tags"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="whitespace-nowrap">
              + Create New Thread
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[420px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle>Create a New Thread</SheetTitle>
              <SheetDescription>
                Start a discussion or ask a question to the community.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-4 p-4">
              <Input
                placeholder="e.g., How to get started with React?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
                placeholder="Briefly explain the topic..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />

              <MultiSelectDropdown
                selected={selectedTags}
                setSelected={setSelectedTags}
              />
            </div>

            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button onClick={handleCreateThread}>Post Thread</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Thread List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : paginatedForums.length === 0 ? (
          <div>No matching threads.</div>
        ) : (
          paginatedForums.map((thread) => (
            <Card key={thread.id} className="relative">
              <CardHeader className="space-y-2">
                <CardTitle>{thread.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {thread.description}
                </p>
                <p className="text-sm">
                  Posted by{" "}
                  <a
                    href={`/profile/${thread.createdByUid}`}
                    className="text-blue-600 hover:underline"
                  >
                    {thread.createdByName || "Unknown"}
                  </a>{" "}
                  -{" "}
                  <span className="text-xs text-muted-foreground">
                    {thread.createdAt?.toDate?.().toLocaleString?.() ||
                      "Just now"}
                  </span>
                </p>
              </CardHeader>
              <CardFooter>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="sm" onClick={() => setSelectedThread(thread)}>
                      Expand
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-[500px]">
                    <SheetHeader>
                      <SheetTitle>{selectedThread?.title}</SheetTitle>
                      <SheetDescription>
                        {selectedThread?.description}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="text-sm mt-2 mb-4">
                      Posted by{" "}
                      <a
                        href={`/profile/${selectedThread?.createdByUid}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedThread?.createdByName || "Unknown"}
                      </a>
                    </div>
                    <div className="space-y-2">
                      {selectedThread?.comments?.length > 0 ? (
                        selectedThread.comments.map((c, idx) => (
                          <div key={idx} className="border rounded p-2">
                            <p className="text-sm">
                              <span className="font-medium">{c.name}:</span>{" "}
                              {c.text}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(c.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No comments yet.
                        </p>
                      )}

                      <div className="mt-4 flex flex-col gap-2">
                        <Textarea
                          placeholder="Write a comment..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <Button onClick={handleAddComment}>Post Comment</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredForums.length > perPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {Math.ceil(filteredForums.length / perPage)}
          </span>
          <Button
            variant="outline"
            disabled={page >= Math.ceil(filteredForums.length / perPage)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
