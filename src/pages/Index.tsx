
import { useState } from "react";
import { Upload, Camera, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import AnswerDisplay from "@/components/AnswerDisplay";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnswer(null);
    console.log("Image uploaded:", imageUrl);
  };

  const processHomework = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image of the homework question first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log("Processing homework question...");

    // Simulate AI processing - in a real app, this would call an AI service
    setTimeout(() => {
      const sampleAnswer = "Based on the image, here's a step-by-step solution:\n\n1. First, identify what type of problem this is\n2. Break down the question into smaller parts\n3. Apply the relevant mathematical or conceptual principles\n4. Show your work clearly\n5. Double-check your answer\n\nThis approach helps your child understand not just the answer, but the thinking process behind it.";
      setAnswer(sampleAnswer);
      setIsProcessing(false);
      console.log("Processing complete");
      
      toast({
        title: "Question processed!",
        description: "Your homework solution is ready.",
      });
    }, 2000);
  };

  const resetSession = () => {
    setUploadedImage(null);
    setAnswer(null);
    setIsProcessing(false);
    console.log("Session reset");
  };

  return (
    <div className="min-h-screen gradient-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Homework Ally
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help your child succeed by uploading photos of their homework questions and getting step-by-step solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2 text-primary" />
                Upload Homework Question
              </CardTitle>
              <CardDescription>
                Take a photo or upload an image of your child's homework question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload onImageUpload={handleImageUpload} />
            </CardContent>
          </Card>

          {/* Processing Button */}
          {uploadedImage && (
            <div className="text-center">
              <Button
                onClick={processHomework}
                disabled={isProcessing}
                size="lg"
                className="gradient-primary text-white hover:opacity-90 transition-opacity px-8 py-3"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Question...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Get Solution
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Answer Display */}
          {answer && (
            <AnswerDisplay 
              answer={answer} 
              onReset={resetSession}
              imageUrl={uploadedImage}
            />
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
              <p className="text-muted-foreground">Simply take a photo or upload an image of any homework question</p>
            </Card>
            
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Step-by-Step</h3>
              <p className="text-muted-foreground">Get detailed explanations that help your child learn the process</p>
            </Card>
            
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Parent-Friendly</h3>
              <p className="text-muted-foreground">Designed to help parents confidently support their children's learning</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
