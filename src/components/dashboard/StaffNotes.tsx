import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { EmailInfo } from "@/types/types";
import {
  AlertTriangle,
  Calendar,
  Clock,
  MessageSquare,
  User,
  Flag,
} from "lucide-react";

interface StaffNotesProps {
  emailInfos: EmailInfo[];
  date: Date;
}

const StaffNotes: React.FC<StaffNotesProps> = ({ emailInfos, date }) => {
  console.log("StaffNotes received:", { emailInfos, date });
  const priorityEmails = {
    high: emailInfos.filter((info) => info.priority === "high"),
    medium: emailInfos.filter((info) => info.priority === "medium"),
    low: emailInfos.filter((info) => info.priority === "low"),
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dietary":
        return <AlertTriangle className="h-4 w-4" />;
      case "special_occasion":
        return <Calendar className="h-4 w-4" />;
      case "request":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Flag className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          Staff Notes & Action Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* High Priority Alerts */}
        {priorityEmails.high.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              High Priority Notes
            </h3>
            {priorityEmails.high.map((email, idx) => (
              <Alert key={idx} className="border-l-4 border-l-red-500">
                <AlertTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getTypeIcon(email.type)}
                    {email.guestName}
                  </span>
                  <Badge className={getPriorityColor("high")}>
                    High Priority
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="text-sm text-gray-600">{email.content}</p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {email.categories?.map((category, cidx) => (
                      <Badge
                        key={cidx}
                        variant="outline"
                        className="capitalize"
                      >
                        {category.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Medium Priority Notes */}
        {priorityEmails.medium.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              Medium Priority Notes
            </h3>
            {priorityEmails.medium.map((email, idx) => (
              <Alert key={idx} className="border-l-4 border-l-yellow-500">
                <AlertTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getTypeIcon(email.type)}
                    {email.guestName}
                  </span>
                  <Badge className={getPriorityColor("medium")}>
                    Medium Priority
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="text-sm text-gray-600">{email.content}</p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {email.categories?.map((category, cidx) => (
                      <Badge
                        key={cidx}
                        variant="outline"
                        className="capitalize"
                      >
                        {category.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Low Priority Notes */}
        {priorityEmails.low.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              Low Priority Notes
            </h3>
            {priorityEmails.low.map((email, idx) => (
              <Alert key={idx} className="border-l-4 border-l-green-500">
                <AlertTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getTypeIcon(email.type)}
                    {email.guestName}
                  </span>
                  <Badge className={getPriorityColor("low")}>
                    Low Priority
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="text-sm text-gray-600">{email.content}</p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {email.categories?.map((category, cidx) => (
                      <Badge
                        key={cidx}
                        variant="outline"
                        className="capitalize"
                      >
                        {category.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* No Notes Message */}
        {emailInfos.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No special notes or requests for this date
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StaffNotes;
