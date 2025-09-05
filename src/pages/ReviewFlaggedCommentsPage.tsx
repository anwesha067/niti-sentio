import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Eye, Check, X, Flag } from "lucide-react";

const ReviewFlaggedCommentsPage = () => {
  const flaggedComments = [
    {
      id: 1,
      summary: "Comment contains inappropriate language regarding government officials",
      originalText: "This draft is absolutely ridiculous and the officials who wrote this are completely incompetent...",
      flagReason: "Inappropriate Language",
      severity: "Medium",
      draft: "Draft Digital Personal Data Protection Rules 2025",
      clause: "Section 7(a)",
      flaggedAt: "2 hours ago"
    },
    {
      id: 2,
      summary: "Potential spam comment with repeated generic text",
      originalText: "I disagree with this proposal. I disagree with this proposal. I disagree with this proposal...",
      flagReason: "Suspected Spam",
      severity: "High",
      draft: "Draft Consumer Protection Rules 2025",
      clause: "Section 3(b)",
      flaggedAt: "4 hours ago"
    },
    {
      id: 3,
      summary: "Comment contains personal information that should be redacted",
      originalText: "As a resident of 123 Main Street, New Delhi, my phone number is 9876543210...",
      flagReason: "Personal Information",
      severity: "High",
      draft: "Draft CSR Rules 2025",
      clause: "Section 5(a)",
      flaggedAt: "6 hours ago"
    }
  ];

  const handleAction = (commentId: number, action: string) => {
    console.log(`${action} comment ${commentId}`);
    // In a real app, this would make an API call
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review Flagged Comments</h1>
          <p className="text-muted-foreground">
            Review and moderate comments that have been automatically flagged by the system
          </p>
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>3 comments</strong> require your attention. Please review and take appropriate action.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {flaggedComments.map((comment) => (
            <Card key={comment.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{comment.summary}</CardTitle>
                    <CardDescription className="mt-1">
                      Flagged {comment.flaggedAt} • {comment.draft} • {comment.clause}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getSeverityColor(comment.severity)}>
                      {comment.severity} Priority
                    </Badge>
                    <Badge variant="outline">
                      <Flag className="w-3 h-3 mr-1" />
                      {comment.flagReason}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Original Comment:</p>
                  <p className="text-sm text-foreground italic">"{comment.originalText}"</p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(comment.id, 'approve')}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(comment.id, 'reject')}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(comment.id, 'view')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Statistics</CardTitle>
              <CardDescription>Overview of content moderation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-green-600">127</p>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-red-600">23</p>
                  <p className="text-sm text-muted-foreground">Rejected Today</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">5</p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewFlaggedCommentsPage;