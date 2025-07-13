import { Suspense } from "react";
import ChatClientPage from "./ChatClientPage";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading chat...</div>}>
      <ChatClientPage />
    </Suspense>
  );
}
