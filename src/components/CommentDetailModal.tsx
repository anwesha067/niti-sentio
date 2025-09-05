import { useState } from "react";
import { X, ThumbsUp, ThumbsDown, Minus, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Comment {
  id: number;
  summary: string;
  sentiment: string;
  stance: string;
  clause: string;
  originalText: string;
  language: string;
  confidence: { sentiment: number; stance: number };
}

interface CommentDetailModalProps {
  comment: Comment | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (commentId: number, updates: { sentiment?: string; stance?: string }) => void;
}

const CommentDetailModal = ({ comment, isOpen, onClose, onUpdate }: CommentDetailModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState(comment?.sentiment || "");
  const [selectedStance, setSelectedStance] = useState(comment?.stance || "");

  if (!comment) return null;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(comment.id, {
        sentiment: selectedSentiment,
        stance: selectedStance,
      });
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setSelectedSentiment(comment.sentiment);
    setSelectedStance(comment.stance);
    setEditMode(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Comment Analysis Details</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditMode(!editMode)}
              className="h-8 px-2"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              {editMode ? "Cancel Edit" : "Override Labels"}
            </Button>
          </DialogTitle>
          <DialogDescription>
            Review and analyze the complete comment with AI-processed data
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
          {/* Original Comment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Original Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.originalText}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Language: {comment.language}</Badge>
                  <Badge variant="outline">Clause: {comment.clause}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Analysis & Override</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Summary */}
              <div>
                <h4 className="font-semibold text-sm mb-2">AI-Generated Summary</h4>
                <p className="text-sm text-muted-foreground p-3 bg-accent/5 rounded-lg border border-accent/20">
                  {comment.summary}
                </p>
              </div>

              <Separator />

              {/* Sentiment Analysis */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Sentiment Analysis</h4>
                  <Badge variant="secondary" className="text-xs">
                    Confidence: {Math.round(comment.confidence.sentiment * 100)}%
                  </Badge>
                </div>

                {editMode ? (
                  <RadioGroup value={selectedSentiment} onValueChange={setSelectedSentiment}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="positive" id="positive" />
                      <Label htmlFor="positive" className="flex items-center space-x-2">
                        <ThumbsUp className="w-4 h-4 text-sentiment-positive" />
                        <span>Positive</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="negative" id="negative" />
                      <Label htmlFor="negative" className="flex items-center space-x-2">
                        <ThumbsDown className="w-4 h-4 text-sentiment-negative" />
                        <span>Negative</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id="neutral" />
                      <Label htmlFor="neutral" className="flex items-center space-x-2">
                        <Minus className="w-4 h-4 text-sentiment-neutral" />
                        <span>Neutral</span>
                      </Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Badge 
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
                )}
              </div>

              <Separator />

              {/* Stance Analysis */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Stance Analysis</h4>
                  <Badge variant="secondary" className="text-xs">
                    Confidence: {Math.round(comment.confidence.stance * 100)}%
                  </Badge>
                </div>

                {editMode ? (
                  <RadioGroup value={selectedStance} onValueChange={setSelectedStance}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="supports" id="supports" />
                      <Label htmlFor="supports">Supports the provision</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="opposes" id="opposes" />
                      <Label htmlFor="opposes">Opposes the provision</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id="stance-neutral" />
                      <Label htmlFor="stance-neutral">Neutral stance</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Badge variant="outline" className="capitalize">
                    {comment.stance}
                  </Badge>
                )}
              </div>

              {editMode && (
                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleSave} size="sm">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDetailModal;