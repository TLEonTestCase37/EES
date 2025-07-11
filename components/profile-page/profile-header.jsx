import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";

export default function ProfileHeader({data}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <Badge variant="secondary">{data.role.toUpperCase()}</Badge>
            </div>
            {data.role==="alumni" && <p className="text-muted-foreground">{data.position}</p>}
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              {data.role==="student" && <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {data.email}
              </div>}
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                {data.gradYear}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
