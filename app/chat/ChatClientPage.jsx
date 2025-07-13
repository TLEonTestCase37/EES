"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { auth, db } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRoomId = searchParams.get("roomId");

  const [curUser, setCurUser] = useState(null);
  const [chatPreviews, setChatPreviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);

  const bottomRef = useRef();

  // Load current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        const userData = docSnap.exists()
          ? docSnap.data()
          : { displayName: firebaseUser.displayName || "User" };

        setCurUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: userData.displayName || userData.name || "User",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    });

    return () => unsub();
  }, []);

  // Load chat list
  useEffect(() => {
    const fetchChats = async () => {
      if (!curUser?.uid) return;

      try {
        const snapshot = await getDocs(collection(db, "chatRooms"));
        const relevantChats = [];

        for (const docSnap of snapshot.docs) {
          const roomId = docSnap.id;
          if (!roomId.includes(curUser.uid)) continue;

          const [uid1, uid2] = roomId.split("_");
          const otherUid = uid1 === curUser.uid ? uid2 : uid1;

          // Fetch other user's profile
          const otherDocSnap = await getDoc(doc(db, "users", otherUid));
          const otherUserData = otherDocSnap.exists()
            ? otherDocSnap.data()
            : null;

          const otherName =
            otherUserData?.displayName || otherUserData?.name || "Unknown User";

          // Fetch last message
          const messagesRef = collection(db, "chatRooms", roomId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
          const lastMsgSnap = await getDocs(q);
          const lastMsg = lastMsgSnap.docs[0]?.data();

          relevantChats.push({
            roomId,
            otherUid,
            otherName,
            lastMessage: lastMsg?.text || "(No messages yet)",
          });
        }

        setChatPreviews(relevantChats);
      } catch (err) {
        console.error("Error fetching chat rooms:", err);
      }
    };

    fetchChats();
  }, [curUser]);

  // Load messages for selected chat room
  useEffect(() => {
    if (!selectedRoomId) return;

    const messagesRef = collection(db, "chatRooms", selectedRoomId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });

    return () => unsub();
  }, [selectedRoomId]);

  // Load other user's name
  useEffect(() => {
    const loadOtherUser = async () => {
      if (!selectedRoomId || !curUser?.uid) return;

      const [uid1, uid2] = selectedRoomId.split("_");
      const otherUid = uid1 === curUser.uid ? uid2 : uid1;

      try {
        const otherDoc = await getDoc(doc(db, "users", otherUid));
        if (otherDoc.exists()) {
          setOtherUser({
            uid: otherUid,
            name:
              otherDoc.data().displayName ||
              otherDoc.data().name ||
              "Unknown User",
          });
        } else {
          setOtherUser({ uid: otherUid, name: "Unknown User" });
        }
      } catch (err) {
        console.error("Failed to load other user:", err);
        setOtherUser({ uid: otherUid, name: "Unknown User" });
      }
    };

    loadOtherUser();
  }, [selectedRoomId, curUser]);

  // Handle send
  const handleSend = async () => {
    if (!newMessage.trim() || !curUser || !selectedRoomId) return;

    const messagesRef = collection(db, "chatRooms", selectedRoomId, "messages");

    await addDoc(messagesRef, {
      text: newMessage.trim(),
      senderUid: curUser.uid,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  if (!curUser) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" curUser={curUser} />
      <SidebarInset>
        <SiteHeader auth={auth} />
        <div className="flex h-[calc(100vh-var(--header-height))]">
          {/* Left Panel – Chat List */}
          <div className="w-[300px] border-r">
            <Card className="h-full rounded-none">
              <CardHeader className="p-4">
                <Input placeholder="Search chats..." />
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-6rem)] px-4">
                {chatPreviews.length === 0 ? (
                  <p className="text-muted-foreground text-sm px-2 pt-4">
                    No chats yet.
                  </p>
                ) : (
                  chatPreviews.map((chat) => (
                    <div
                      key={chat.roomId}
                      className={`flex items-center gap-3 py-3 cursor-pointer rounded-md px-2 hover:bg-muted ${
                        selectedRoomId === chat.roomId ? "bg-muted" : ""
                      }`}
                      onClick={() => {
                        router.push(`/chat?roomId=${chat.roomId}`);
                      }}
                    >
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {chat.otherName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">{chat.otherName}</span>
                        <span className="text-muted-foreground truncate w-48">
                          {chat.lastMessage}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </Card>
          </div>

          {/* Right Panel – Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedRoomId ? (
              <>
                <div className="border-b px-4 py-3 font-semibold text-base">
                  {otherUser?.name || "Loading..."}
                </div>

                <ScrollArea className="flex-1 p-4">
                  {messages.map((msg, idx) => {
                    const time = msg.timestamp
                      ?.toDate?.()
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                    return (
                      <div
                        key={idx}
                        className={`mb-2 px-3 py-2 rounded-lg w-fit max-w-[70%] ${
                          msg.senderUid === curUser.uid
                            ? "ml-auto bg-primary text-white"
                            : "mr-auto bg-muted"
                        }`}
                      >
                        <div>{msg.text}</div>
                        {time && (
                          <div className="text-[10px] text-muted-foreground text-right mt-1">
                            {time}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div ref={bottomRef} />
                </ScrollArea>

                <div className="p-4 border-t flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />
                  <Button onClick={handleSend}>Send</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                  Select a chat to start messaging
                </div>
                <div className="p-4 border-t flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    disabled
                  />
                  <Button disabled>Send</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
