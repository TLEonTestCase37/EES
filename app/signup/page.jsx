"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import MultiSelectDropdown from "@/components/multiselect";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc,updateDoc,arrayUnion } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    gradYear: "",
    interests: [],
    description: "",
  });

  const [alumniInfo, setAlumniInfo] = useState({
    name: "",
    email: "",
    password: "",
    gradYear: "",
    position: "",
    interests: [],
    description: "",
  });

  const handleStudentSubmit = async () => {
    if (
      // studentInfo.email.endsWith("@itbhu.ac.in") &&
      studentInfo.name.trim().length > 1 &&
      Number(studentInfo.gradYear) >= 2024 &&
      Number(studentInfo.gradYear) <= 2029 &&
      Number(studentInfo.rollNo).toString().length === 8
    ) {
      try {
        // 1. Create the user
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          studentInfo.email,
          studentInfo.password
        );
        const user = userCredentials.user;

        // 2. Add user to the 'users' collection
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          role: "student",
          name: studentInfo.name,
          email: studentInfo.email,
          rollNo: studentInfo.rollNo,
          gradYear: studentInfo.gradYear,
          interests: studentInfo.interests,
          description: studentInfo.description,
          nameLowerCase: studentInfo.name.toLowerCase(),
          createdAt: new Date(),
        });

        // 3. Add email to relevant tag docs
        for (const tag of studentInfo.interests) {
          const tagRef = doc(db, "tags", tag);
          await updateDoc(tagRef, {
            users: arrayUnion(studentInfo.email),
          }).catch(async (err) => {
            // If tag doc doesn't exist, create it
            if (err.code === "not-found") {
              await setDoc(tagRef, {
                users: [studentInfo.email],
              });
            } else {
              throw err;
            }
          });
        }

        console.log("Student registered and added to tag subscriptions!");
        router.push("/dashboard");
      } catch (error) {
        console.log("Registration failed:", error);
      }
    } else {
      console.log("Email valid:", studentInfo.email.endsWith("@itbhu.ac.in"));
      console.log("Name valid:", studentInfo.name.trim().length > 1);
      console.log(
        "Grad year valid:",
        Number(studentInfo.gradYear) >= 2024 &&
          Number(studentInfo.gradYear) <= 2029
      );
      console.log("Roll no valid:", studentInfo.rollNo.toString().length === 8);
    }
  };

  const handleAlumniSubmit = () => {
    console.log("Alumni Info:", alumniInfo);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <Tabs defaultValue="Student">
          <TabsList>
            <TabsTrigger value="Student">Student</TabsTrigger>
            <TabsTrigger value="Alumni">Alumni</TabsTrigger>
          </TabsList>

          <TabsContent value="Student">
            <Card>
              <CardHeader>
                <CardTitle>Student Sign Up</CardTitle>
                <CardDescription>
                  Fill your details as a student. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input
                    id="student-name"
                    placeholder="John Doe"
                    value={studentInfo.name}
                    onChange={(e) =>
                      setStudentInfo({ ...studentInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="student-email">Institute Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="virat.kohli23@itbhu.ac.in"
                    value={studentInfo.email}
                    onChange={(e) =>
                      setStudentInfo({ ...studentInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="password"
                    value={studentInfo.password}
                    onChange={(e) =>
                      setStudentInfo({
                        ...studentInfo,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-roll">Institute Roll Number</Label>
                    <Input
                      id="student-roll"
                      placeholder="23095000"
                      value={studentInfo.rollNo}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          rollNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-grad-year">Graduation Year</Label>
                    <Input
                      id="student-grad-year"
                      type="number"
                      value={studentInfo.gradYear}
                      onChange={(e) =>
                        setStudentInfo({
                          ...studentInfo,
                          gradYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Areas of Interest</Label>
                  <MultiSelectDropdown
                    selected={studentInfo.interests}
                    setSelected={(newInterests) =>
                      setStudentInfo({
                        ...studentInfo,
                        interests: newInterests,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="student-description">Description</Label>
                  <Textarea
                    id="student-description"
                    placeholder="A brief description about yourself..."
                    value={studentInfo.description}
                    onChange={(e) =>
                      setStudentInfo({
                        ...studentInfo,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleStudentSubmit}>
                  Submit as Student
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="Alumni">
            <Card>
              <CardHeader>
                <CardTitle>Alumni Sign Up</CardTitle>
                <CardDescription>
                  Fill your alumni details. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="alumni-name">Full Name</Label>
                  <Input
                    id="alumni-name"
                    placeholder="Jane Smith"
                    value={alumniInfo.name}
                    onChange={(e) =>
                      setAlumniInfo({ ...alumniInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alum-email">Email</Label>
                  <Input
                    id="alum-email"
                    type="email"
                    placeholder="someone@gmail.com"
                    value={alumniInfo.email}
                    onChange={(e) =>
                      setAlumniInfo({ ...alumniInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alum-password">Password</Label>
                  <Input
                    id="alum-password"
                    type="password"
                    placeholder="password"
                    value={alumniInfo.password}
                    onChange={(e) =>
                      setAlumniInfo({ ...alumniInfo, password: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="alumni-grad-year">Year of Graduation</Label>
                    <Input
                      id="alumni-grad-year"
                      type="number"
                      value={alumniInfo.gradYear}
                      onChange={(e) =>
                        setAlumniInfo({
                          ...alumniInfo,
                          gradYear: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="alumni-position">
                      Current Working Position
                    </Label>
                    <Input
                      id="alumni-position"
                      value={alumniInfo.position}
                      onChange={(e) =>
                        setAlumniInfo({
                          ...alumniInfo,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Areas of Interest</Label>
                  <MultiSelectDropdown
                    selected={alumniInfo.interests}
                    setSelected={(newInterests) =>
                      setAlumniInfo({
                        ...alumniInfo,
                        interests: newInterests,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alumni-description">Description</Label>
                  <Textarea
                    id="alumni-description"
                    placeholder="Write a short bio or anything you want to share..."
                    value={alumniInfo.description}
                    onChange={(e) =>
                      setAlumniInfo({
                        ...alumniInfo,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAlumniSubmit}>
                  Submit as Alumni
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
