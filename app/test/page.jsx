"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
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
  const [curUser, setCurUser] = useState(null);
  const [chatPreviews, setChatPreviews] = useState([]);

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

        const userObj = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: userData.displayName || userData.name || "User",
        };

        setCurUser(userObj);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    });

    return () => unsub();
  }, []);

  // Load chat room previews after user loads
  useEffect(() => {
    const fetchChats = async () => {
      if (!curUser?.uid) return;

      try {
        const snapshot = await getDocs(collection(db, "chatRooms"));
        const relevantChats = [];

        for (const docSnap of snapshot.docs) {
          const roomId = docSnap.id;
          if (!roomId.includes(curUser.uid)) continue;

          // Get other user's UID
          const [uid1, uid2] = roomId.split("_");
          const otherUid = uid1 === curUser.uid ? uid2 : uid1;

          // Get other user info (optional)
          const otherDocSnap = await getDoc(doc(db, "users", otherUid));
          const otherUser = otherDocSnap.exists()
            ? otherDocSnap.data()
            : { displayName: "Unknown" };

          // Get last message in chat
          const messagesRef = collection(db, "chatRooms", roomId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
          const lastMsgSnap = await getDocs(q);

          const lastMsg = lastMsgSnap.docs[0]?.data();

          relevantChats.push({
            roomId,
            otherUid,
            otherName: otherUser.displayName || "User",
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
                      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-muted rounded-md px-2"
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
            {/* Placeholder UI */}
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select a chat to start messaging
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex items-center gap-2">
              <Input placeholder="Type a message..." className="flex-1" disabled />
              <Button disabled>Send</Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
