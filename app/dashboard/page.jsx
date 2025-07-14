"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [curUser, setCurUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
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
            // fallback if user doc not found
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "User",
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsub();
  }, []);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      {loading ? (
        // Loader while loading
        <div className="flex items-center justify-center h-screen w-full">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-black" />
        </div>
      ) : (
        <>
          {curUser && <AppSidebar variant="inset" curUser={curUser} />}
          <SidebarInset>
            <SiteHeader auth={auth} />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCards curUser={curUser} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </>
      )}
    </SidebarProvider>
  );
  
}
