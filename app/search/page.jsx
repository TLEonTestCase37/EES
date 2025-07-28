"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";

const TAGS = [
  "VLSI",
  "Embedded Systems",
  "Microwave and Antenna Design",
  "Cloud Computing & DevOps",
  "Blockchain and Cryptography",
  "PCB Design and Fabrication",
  "SDE",
  "AI",
  "Robotics",
  "Finance",
  "Startups",
  "Art",
  "ML",
  "Teaching",
  "Data Science",
  "Design",
];

export default function PeopleSearchShadcn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [curUser, setCurUser] = useState(null);
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filterRole, setFilterRole] = useState({
    student: false,
    alumni: false,
  });
  const [yearRange, setYearRange] = useState({ from: "", to: "" });
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      if (!currUser) {
        router.push("/login");
        toast.error("Please Login to Continue");
      } else {
        setCurUser(currUser);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    try {
      let baseQuery;
      if (filterRole.student && !filterRole.alumni)
        baseQuery = query(
          collection(db, "users"),
          where("role", "==", "student"),
          limit(500)
        );
      else if (!filterRole.student && filterRole.alumni)
        baseQuery = query(
          collection(db, "users"),
          where("role", "==", "alumni"),
          limit(500)
        );
      else baseQuery = query(collection(db, "users"), limit(500));

      const snapshot = await getDocs(baseQuery);
      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = allUsers.filter((u) => {
        if (curUser?.uid === u.id) return false;
        if (queryText && !u.nameLower?.includes(queryText.toLowerCase()))
          return false;
        const year = u.role === "student" ? u.passOutYear : u.passingYear;
        if (
          (yearRange.from && year < +yearRange.from) ||
          (yearRange.to && year > +yearRange.to)
        )
          return false;
        if (
          selectedInterests.length > 0 &&
          (!u.areasOfInterest ||
            !u.areasOfInterest.some((i) => selectedInterests.includes(i)))
        )
          return false;
        return true;
      });

      setResults(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full bg-neutral-100 text-amber-700">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-amber-700" />
      </div>
    );

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing)*72)",
        "--header-height": "calc(var(--spacing)*12)",
      }}
    >
      {curUser && <AppSidebar variant="inset" curUser={curUser} />}
      <SidebarInset>
        <SiteHeader auth={auth} />
        <div className="min-h-screen bg-neutral-100 text-slate-900">
          <main className="container mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold text-slate-800">
                Search People
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    className="text-amber-700 border border-amber-400 hover:bg-amber-100 font-semibold"
                    variant="outline"
                  >
                    Open Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your search</SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-6 p-8">
                    <div>
                      <Label className="text-base">Role</Label>
                      <div className="flex flex-col gap-1 pt-2">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={filterRole.student}
                            onCheckedChange={(v) =>
                              setFilterRole((r) => ({ ...r, student: !!v }))
                            }
                          />
                          Student
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={filterRole.alumni}
                            onCheckedChange={(v) =>
                              setFilterRole((r) => ({ ...r, alumni: !!v }))
                            }
                          />
                          Alumni
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base">Year Range</Label>
                      <div className="flex gap-2 pt-2">
                        <Input
                          type="number"
                          placeholder="From"
                          value={yearRange.from}
                          onChange={(e) =>
                            setYearRange({ ...yearRange, from: e.target.value })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="To"
                          value={yearRange.to}
                          onChange={(e) =>
                            setYearRange({ ...yearRange, to: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base">Areas of Interest</Label>
                      <ScrollArea className="h-64 pr-2 mt-2">
                        <div className="flex flex-wrap gap-2">
                          {TAGS.map((tag) => (
                            <Button
                              key={tag}
                              className={`${
                                selectedInterests.includes(tag)
                                  ? "bg-amber-600 text-white"
                                  : "bg-white border-amber-300 text-amber-700"
                              } border hover:bg-amber-100 transition-all`}
                              size="sm"
                              onClick={() =>
                                setSelectedInterests((prev) =>
                                  prev.includes(tag)
                                    ? prev.filter((t) => t !== tag)
                                    : [...prev, tag]
                                )
                              }
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Search by name..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="bg-white border border-amber-300"
              />
              <Button
                onClick={handleSearch}
                className="bg-amber-600 text-white hover:bg-amber-700 shadow-md"
              >
                Search
              </Button>
            </div>

            {searching && <p className="text-amber-700 mb-4">Searching...</p>}

            <div className="grid gap-6">
              {results.map((u) => (
                <Card
                  key={u.id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl hover:scale-[1.03] transition-transform cursor-pointer border border-amber-300"
                  onClick={() => router.push(`/profile/${u.id}`)}
                >
                  <div className="font-semibold text-lg text-slate-800">
                    {u.name}
                  </div>
                  <div className="text-sm text-amber-700">
                    {u.role} - {u.passingYear || u.passOutYear}
                  </div>
                  <div className="text-sm mt-2">
                    {u.areasOfInterest?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {u.areasOfInterest.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-amber-100 rounded-full text-xs text-amber-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
