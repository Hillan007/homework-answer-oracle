
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useHomeworkSolver = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  const solveProblem = async (questionText?: string, imageUrl?: string) => {
    if (!questionText && !imageUrl) {
      toast({
        title: "No question provided",
        description: "Please provide either text or an image of your homework question.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setSolution(null);
    setSessionId(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Please log in to use this feature");
      }

      const response = await supabase.functions.invoke('solve-homework', {
        body: {
          questionText,
          imageUrl
        }
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to solve homework question");
      }

      const { solution: aiSolution, sessionId: newSessionId } = response.data;
      
      setSolution(aiSolution);
      setSessionId(newSessionId);
      
      toast({
        title: "Question solved!",
        description: "Your AI tutor has provided a detailed solution.",
      });

    } catch (error: any) {
      console.error("Error solving homework:", error);
      toast({
        title: "Error solving question",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetSession = () => {
    setSolution(null);
    setSessionId(null);
  };

  return {
    solveProblem,
    resetSession,
    isProcessing,
    solution,
    sessionId
  };
};
