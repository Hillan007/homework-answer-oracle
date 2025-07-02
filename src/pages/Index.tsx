
import { useState, useEffect } from "react";
import { BookOpen, User, LogOut, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import QuestionInput from "@/components/QuestionInput";
import AnswerDisplay from "@/components/AnswerDisplay";
import { useHomeworkSolver } from "@/hooks/useHomeworkSolver";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const {
    solveProblem,
    resetSession,
    isProcessing,
    solution,
    sessionId
  } = useHomeworkSolver();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleQuestionSubmit = async (questionText?: string, imageUrl?: string) => {
    await solveProblem(questionText, imageUrl);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with User Info */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Homework Ally
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get step-by-step AI-powered solutions to your homework questions. Type your question or upload an image!
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question Input */}
          <QuestionInput 
            onQuestionSubmit={handleQuestionSubmit}
            isProcessing={isProcessing}
          />

          {/* Answer Display */}
          {solution && (
            <AnswerDisplay 
              answer={solution} 
              onReset={resetSession}
              imageUrl={null}
            />
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Solutions</h3>
              <p className="text-muted-foreground">Get detailed step-by-step explanations powered by advanced AI</p>
            </Card>
            
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <History className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple Input Methods</h3>
              <p className="text-muted-foreground">Type questions directly or upload images - we handle both!</p>
            </Card>
            
            <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md">
              <User className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Learning Focused</h3>
              <p className="text-muted-foreground">Explanations designed to help you understand, not just get answers</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
