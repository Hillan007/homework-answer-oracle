
import { useState } from "react";
import { Type, Image, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from "@/components/ImageUpload";

interface QuestionInputProps {
  onQuestionSubmit: (questionText?: string, imageUrl?: string) => void;
  isProcessing: boolean;
}

const QuestionInput = ({ onQuestionSubmit, isProcessing }: QuestionInputProps) => {
  const [questionText, setQuestionText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("text");

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };

  const handleSubmit = () => {
    if (activeTab === "text" && questionText.trim()) {
      onQuestionSubmit(questionText.trim());
      setQuestionText("");
    } else if (activeTab === "image" && uploadedImage) {
      onQuestionSubmit(undefined, uploadedImage);
      setUploadedImage(null);
    } else if (activeTab === "both" && (questionText.trim() || uploadedImage)) {
      onQuestionSubmit(questionText.trim() || undefined, uploadedImage || undefined);
      setQuestionText("");
      setUploadedImage(null);
    }
  };

  const canSubmit = () => {
    if (activeTab === "text") return questionText.trim();
    if (activeTab === "image") return uploadedImage;
    if (activeTab === "both") return questionText.trim() || uploadedImage;
    return false;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Type className="h-5 w-5 mr-2 text-primary" />
          Submit Your Homework Question
        </CardTitle>
        <CardDescription>
          Type your question, upload an image, or both for the best results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Type Question</TabsTrigger>
            <TabsTrigger value="image">Upload Image</TabsTrigger>
            <TabsTrigger value="both">Text + Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div>
              <Textarea
                placeholder="Type your homework question here... (e.g., 'Solve for x: 2x + 5 = 15')"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isProcessing}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Be as specific as possible for the best solution
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            <ImageUpload onImageUpload={handleImageUpload} />
          </TabsContent>
          
          <TabsContent value="both" className="space-y-4">
            <div>
              <Textarea
                placeholder="Add context or specific questions about the image... (optional)"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="min-h-[100px] resize-none mb-4"
                disabled={isProcessing}
              />
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit() || isProcessing}
            size="lg"
            className="gradient-primary text-white hover:opacity-90 transition-opacity px-8 py-3"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Solving Question...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Get AI Solution
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionInput;
