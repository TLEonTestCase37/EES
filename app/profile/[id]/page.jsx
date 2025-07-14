"use client";
import ProfileHeader from "@/components/profile-page/profile-header";
import ProfileContent from "@/components/profile-page/profile-content";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const [curUser, setCurUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Listen to auth state and set curUser
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        alert("Please login to continue.");
        router.push("/login");
      } else {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: userData.displayName || userData.name || "User",
            });
          } else {
            // fallback if user document doesn't exist
            setCurUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "User",
            });
          }

          // Enable editing if the logged-in user is viewing their own profile
          if (firebaseUser.uid === id) {
            setEnableEdit(true);
          }
        } catch (err) {
          console.error("Error fetching logged-in user data:", err);
        }
      }
    });

    return () => unsub();
  }, [id]);

  // 2. Fetch profile being viewed
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfileData({ ...data, uid: snap.id });
        } else {
          console.error("No such user!");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      {curUser && <AppSidebar variant="inset" curUser={curUser} />}
      <SidebarInset>
        <SiteHeader auth={auth} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 p-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {!(curUser?.uid===id) && <Button
                onClick={async () => {
                  if (!curUser) return;

                  const myUid = curUser.uid;
                  const otherUid = id;

                  // Create consistent chatRoomId (uid1_uid2 with sorted order)
                  const sortedUids = [myUid, otherUid].sort();
                  const chatRoomId = `${sortedUids[0]}_${sortedUids[1]}`;

                  // (Optional) Create chat room document if not exists
                  const chatRoomRef = doc(db, "chatRooms", chatRoomId);
                  const chatRoomSnap = await getDoc(chatRoomRef);

                  if (!chatRoomSnap.exists()) {
                    await setDoc(chatRoomRef, {
                      participants: sortedUids,
                      createdAt: new Date(),
                    });
                  }

                  // Redirect to chat page with roomId as query param
                  router.push(`/chat?roomId=${chatRoomId}`);
                }}
              >
                Start Chat
              </Button>}

              <ProfileHeader data={profileData} />
              <ProfileContent
                data={profileData}
                editable={!enableEdit}
                auth={auth}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
