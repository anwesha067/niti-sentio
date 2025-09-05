import { BarChart3, FileText, TrendingUp, MessageCircle, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for demonstration
  const activeDrafts = [
    {
      id: 1,
      title: "Draft Digital Personal Data Protection Rules 2025",
      totalComments: 15284,
      analyzedPercentage: 87,
      sentimentBreakdown: { positive: 45, negative: 30, neutral: 25 },
      lastUpdated: "2 hours ago",
      status: "Active"
    },
    {
      id: 2,
      title: "Draft Consumer Protection (E-commerce) Amendment Rules 2025",
      totalComments: 8962,
      analyzedPercentage: 92,
      sentimentBreakdown: { positive: 38, negative: 42, neutral: 20 },
      lastUpdated: "5 hours ago",
      status: "Active"
    },
    {
      id: 3,
      title: "Draft Companies (Corporate Social Responsibility) Rules 2025",
      totalComments: 3456,
      analyzedPercentage: 100,
      sentimentBreakdown: { positive: 52, negative: 28, neutral: 20 },
      lastUpdated: "1 day ago",
      status: "Review Complete"
    }
  ];

  const stats = [
    { 
      title: "Total Comments Processed", 
      value: "27,702", 
      icon: MessageCircle,
      trend: "+12% from last month",
      color: "text-chart-primary"
    },
    { 
      title: "Overall Positive Sentiment", 
      value: "45%", 
      icon: TrendingUp,
      trend: "+3% from last review",
      color: "text-sentiment-positive"
    },
    { 
      title: "Most Discussed Clause", 
      value: "Section 7(a)", 
      icon: FileText,
      trend: "Data localization requirements",
      color: "text-government-orange"
    },
    { 
      title: "New Comments Today", 
      value: "342", 
      icon: Calendar,
      trend: "Across 3 active drafts",
      color: "text-accent"
    }
  ];

  const topKeywords = [
    "data protection", "privacy rights", "consent mechanism", "cross-border transfer",
    "data localization", "compliance cost", "implementation timeline", "penalty structure",
    "data breach", "user rights", "regulatory framework", "business impact"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Policy Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze public feedback on government draft legislations
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Draft Legislations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Active Draft Legislations</span>
                </CardTitle>
                <CardDescription>
                  Current drafts under public consultation and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeDrafts.map((draft) => (
                  <div key={draft.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {draft.title}
                      </h3>
                      <Badge 
                        variant={draft.status === "Active" ? "default" : "secondary"}
                        className="ml-2 shrink-0"
                      >
                        {draft.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <div>Total Comments: <span className="font-medium text-foreground">{draft.totalComments.toLocaleString()}</span></div>
                      <div>Last Updated: <span className="font-medium text-foreground">{draft.lastUpdated}</span></div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Analysis Progress</span>
                        <span className="text-sm font-medium text-foreground">{draft.analyzedPercentage}%</span>
                      </div>
                      <Progress value={draft.analyzedPercentage} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-xs">
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-sentiment-positive"></div>
                          <span>{draft.sentimentBreakdown.positive}% Positive</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-sentiment-negative"></div>
                          <span>{draft.sentimentBreakdown.negative}% Negative</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-sentiment-neutral"></div>
                          <span>{draft.sentimentBreakdown.neutral}% Neutral</span>
                        </span>
                      </div>
                      
                      <Link to={`/analysis?draft=${draft.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Analyze
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Overall Keywords */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <span>Trending Keywords</span>
                </CardTitle>
                <CardDescription>
                  Most frequently mentioned terms across all drafts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topKeywords.map((keyword, index) => (
                    <Badge 
                      key={keyword} 
                      variant="secondary" 
                      className={`text-xs ${
                        index < 3 ? 'bg-accent/10 text-accent border-accent/20' : 
                        index < 6 ? 'bg-government-orange/10 text-government-orange border-government-orange/20' : 
                        'bg-secondary'
                      }`}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Export Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Review Flagged Comments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;