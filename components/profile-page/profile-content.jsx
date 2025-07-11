"use client";
import { Shield, Key } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
const interestOptions = [
  "AI",
  "Art",
  "Automotive Electronics",
  "Blockchain and Cryptography",
  "Cloud Computing & DevOps",
  "Computer Vision",
  "Control Systems",
  "Cybersecurity",
  "Data Science",
  "Design",
  "Digital Signal Processing",
  "Embedded Systems",
  "Entrepreneurship",
  "Finance",
  "Hardware Security",
  "IoT",
  "Machine Learning",
  "Microwave and Antenna Design",
  "PCB Design and Fabrication",
  "Power Systems",
  "Quantum Computing",
  "Renewable Energy",
  "Robotics",
  "SDE",
  "Signal Processing",
  "Software Architecture",
  "Startups",
  "Teaching",
  "UI/UX",
  "VLSI",
];
export default function ProfileContent({ data, editable, auth }) {
  console.log(data);
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    rollNo: "",
    gradYear: "",
    interests: [],
    description: "",
  });
  const updateStudentInfo = async () => {
    if (updating) return;

    if (profileData.name.trim().length === 0) {
      window.alert("Fill out your Name!!");
      return;
    }

    try {
      setUpdating(true);

      const userRef = doc(db, "users", data.uid);

      // 1. Fetch previous interests
      const userSnap = await getDoc(userRef);
      const oldInterests = userSnap.exists()
        ? userSnap.data().interests || []
        : [];

      const newInterests = profileData.interests || [];
      const email = data.email;

      // 2. Update user info
      await updateDoc(userRef, {
        name: profileData.name,
        description: profileData.description,
        interests: newInterests,
      });

      // 3. Calculate added and removed tags
      const addedTags = newInterests.filter(
        (tag) => !oldInterests.includes(tag)
      );
      const removedTags = oldInterests.filter(
        (tag) => !newInterests.includes(tag)
      );

      // 4. Add email to newly selected tags
      for (const tag of addedTags) {
        const tagRef = doc(db, "tags", tag);
        await updateDoc(tagRef, {
          users: arrayUnion(email),
        }).catch(async (err) => {
          if (err.code === "not-found") {
            await setDoc(tagRef, { users: [email] });
          } else {
            throw err;
          }
        });
      }

      // 5. Remove email from deselected tags
      for (const tag of removedTags) {
        const tagRef = doc(db, "tags", tag);
        await updateDoc(tagRef, {
          users: arrayRemove(email),
        }).catch((err) => {
          console.warn(`Couldn't remove from tag '${tag}':`, err.message);
        });
      }

      console.log("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      window.alert("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };
  useEffect(() => {
    if (!data) return;

    setProfileData({
      name: data.name ?? "",
      email: data.role === "alumni" ? "" : data.email ?? "",
      rollNo: data.role === "student" ? data.rollNo ?? "" : "",
      gradYear: data.gradYear ?? "",
      interests: data.interests ?? [],
      description: data.description ?? "",
    });
  }, [data]);

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        alert("User not found or not logged in.");
        return;
      }

      // Step 1: Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        curPass
      );
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update the password
      await updatePassword(user, newPass);
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      if (error.code === "auth/wrong-password") {
        alert("Current password is incorrect.");
      } else {
        alert("Failed to change password. " + error.message);
      }
    }
  };

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      {!editable && (
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
      )}
      {editable && (
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="personal" >Personal</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="Name">Name</Label>
                <Input
                  id="Name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  disabled={editable}
                />
              </div>

              {data.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                  />
                </div>
              )}
              {data.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    type="number"
                    value={profileData.rollNo}
                    disabled
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="GradYear">Year of Graduation</Label>
                <Input
                  id="GradYear"
                  type="number"
                  value={profileData.gradYear}
                  disabled
                />
              </div>
              {data.role === "alumni" && (
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" value={data.value} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>

              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={profileData.description}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                disabled={editable}
                rows={4}
              />
            </div>
            {!editable && (
              <Button variant={"default"} onClick={updateStudentInfo}>
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      {/* Security Settings */}
      {!editable && (
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Password</Label>
                    <p className="text-muted-foreground text-sm">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setShowChangePasswordForm(!showChangePasswordForm)
                    }
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>

                {showChangePasswordForm && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleChangePassword();
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={curPass}
                        onChange={(e) => setCurPass(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Update Password
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}
      {/* Notification Settings */}
      {!editable && (
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <p className="text-muted-foreground text-sm">
                Receive email notifications regarding:
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {interestOptions.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <Label className="text-base">{tag}</Label>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
