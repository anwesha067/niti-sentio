import { useState } from "react";
import { Search, Filter, ThumbsUp, ThumbsDown, Minus, Flag, Eye, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const DraftAnalysis = () => {
  const [selectedClause, setSelectedClause] = useState("section-3a");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [stanceFilter, setStanceFilter] = useState("all");

  // Mock data for clauses
  const clauses = [
    { id: "section-1", title: "Section 1: Definitions", comments: 1250, sentiment: { positive: 60, negative: 25, neutral: 15 } },
    { id: "section-2", title: "Section 2: Scope and Application", comments: 890, sentiment: { positive: 35, negative: 45, neutral: 20 } },
    { id: "section-3a", title: "Section 3(a): Data Processing Consent", comments: 2340, sentiment: { positive: 40, negative: 40, neutral: 20 } },
    { id: "section-3b", title: "Section 3(b): Withdrawal of Consent", comments: 1890, sentiment: { positive: 55, negative: 30, neutral: 15 } },
    { id: "section-4", title: "Section 4: Cross-border Data Transfer", comments: 3120, sentiment: { positive: 25, negative: 60, neutral: 15 } },
    { id: "section-5", title: "Section 5: Data Localization Requirements", comments: 2800, sentiment: { positive: 30, negative: 55, neutral: 15 } },
    { id: "section-6", title: "Section 6: Penalty and Compliance", comments: 1670, sentiment: { positive: 45, negative: 35, neutral: 20 } },
  ];

  // Mock data for comments
  const comments = [
    {
      id: 1,
      summary: "The consent mechanism proposed in Section 3(a) lacks clarity on renewal processes and may burden businesses.",
      sentiment: "negative",
      stance: "opposes",
      clause: "section-3a",
      originalText: "The current draft requires explicit consent for every data processing activity...",
      language: "English",
      duplicateCount: 15,
      confidence: { sentiment: 0.85, stance: 0.92 }
    },
    {
      id: 2,
      summary: "Supports the granular consent approach but suggests technical implementation guidelines.",
      sentiment: "positive",
      stance: "supports",
      clause: "section-3a",
      originalText: "I appreciate the detailed consent requirements, however...",
      language: "English",
      duplicateCount: 8,
      confidence: { sentiment: 0.78, stance: 0.88 }
    },
    {
      id: 3,
      summary: "Cluster of 25 similar comments about consent withdrawal mechanisms and user interface requirements.",
      sentiment: "neutral",
      stance: "neutral",
      clause: "section-3a",
      originalText: "Multiple stakeholders have raised concerns about...",
      language: "English",
      duplicateCount: 25,
      confidence: { sentiment: 0.70, stance: 0.65 },
      isCluster: true
    }
  ];

  const selectedClauseData = clauses.find(c => c.id === selectedClause);
  const topKeywords = ["consent mechanism", "user interface", "withdrawal process", "technical compliance", "business impact"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-1">Draft Digital Personal Data Protection Rules 2025</h1>
          <p className="text-primary-foreground/80">Analyzing 15,284 public comments • Last updated 2 hours ago</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          
          {/* Left Column - Clause Navigation */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Draft Sections</CardTitle>
                <CardDescription>Click to filter comments by section</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1 p-4">
                    {clauses.map((clause) => (
                      <div
                        key={clause.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedClause === clause.id
                            ? "bg-accent/10 border-accent text-accent-foreground"
                            : "hover:bg-muted/50 border-transparent"
                        }`}
                        onClick={() => setSelectedClause(clause.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium leading-tight">{clause.title}</h4>
                          <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{clause.comments} comments</p>
                        <div className="flex space-x-1">
                          <div className="flex-1 h-1.5 bg-sentiment-positive rounded" style={{width: `${clause.sentiment.positive}%`}}></div>
                          <div className="flex-1 h-1.5 bg-sentiment-negative rounded" style={{width: `${clause.sentiment.negative}%`}}></div>
                          <div className="flex-1 h-1.5 bg-sentiment-neutral rounded" style={{width: `${clause.sentiment.neutral}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Comment Feed */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search within comments..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sentiment</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={stanceFilter} onValueChange={setStanceFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Stance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stances</SelectItem>
                        <SelectItem value="supports">Supports</SelectItem>
                        <SelectItem value="opposes">Opposes</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4 p-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex space-x-2">
                            <Badge 
                              variant="secondary"
                              className={
                                comment.sentiment === "positive" ? "bg-sentiment-positive/10 text-sentiment-positive border-sentiment-positive/20" :
                                comment.sentiment === "negative" ? "bg-sentiment-negative/10 text-sentiment-negative border-sentiment-negative/20" :
                                "bg-sentiment-neutral/10 text-sentiment-neutral border-sentiment-neutral/20"
                              }
                            >
                              {comment.sentiment === "positive" ? <ThumbsUp className="w-3 h-3 mr-1" /> : 
                               comment.sentiment === "negative" ? <ThumbsDown className="w-3 h-3 mr-1" /> :
                               <Minus className="w-3 h-3 mr-1" />}
                              {comment.sentiment}
                            </Badge>
                            <Badge variant="outline">{comment.stance}</Badge>
                            <Badge variant="outline" className="text-xs">{comment.clause}</Badge>
                          </div>
                          
                          {comment.isCluster && (
                            <Badge variant="secondary" className="bg-government-orange/10 text-government-orange border-government-orange/20">
                              Clustered: {comment.duplicateCount} similar
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-foreground mb-3 leading-relaxed">
                          {comment.summary}
                        </p>

                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex space-x-4">
                            <span>Confidence: {Math.round(comment.confidence.sentiment * 100)}%</span>
                            <span>{comment.language}</span>
                            {!comment.isCluster && <span>{comment.duplicateCount} similar</span>}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                              <Flag className="w-3 h-3 mr-1" />
                              Flag
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <span>Section Analytics</span>
                </CardTitle>
                <CardDescription>
                  {selectedClauseData?.title}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Sentiment Breakdown */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Sentiment Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-sentiment-positive">Positive</span>
                      <span className="text-sm font-medium">{selectedClauseData?.sentiment.positive}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-sentiment-positive h-2 rounded-full" 
                        style={{width: `${selectedClauseData?.sentiment.positive}%`}}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-sentiment-negative">Negative</span>
                      <span className="text-sm font-medium">{selectedClauseData?.sentiment.negative}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-sentiment-negative h-2 rounded-full" 
                        style={{width: `${selectedClauseData?.sentiment.negative}%`}}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-sentiment-neutral">Neutral</span>
                      <span className="text-sm font-medium">{selectedClauseData?.sentiment.neutral}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full">
                      <div 
                        className="bg-sentiment-neutral h-2 rounded-full" 
                        style={{width: `${selectedClauseData?.sentiment.neutral}%`}}
                      ></div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Top Keywords */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Key Terms</h4>
                  <div className="space-y-2">
                    {topKeywords.map((keyword, index) => (
                      <div key={keyword} className="flex justify-between items-center">
                        <span className="text-sm text-foreground">{keyword}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round((5 - index) * 20)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Statistics */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Comments:</span>
                      <span className="font-medium">{selectedClauseData?.comments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unique Comments:</span>
                      <span className="font-medium">{Math.round((selectedClauseData?.comments || 0) * 0.7)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clusters Identified:</span>
                      <span className="font-medium">{Math.round((selectedClauseData?.comments || 0) * 0.1)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftAnalysis;