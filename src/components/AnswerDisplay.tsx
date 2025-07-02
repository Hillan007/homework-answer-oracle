
import { RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnswerDisplayProps {
  answer: string;
  onReset: () => void;
  imageUrl: string | null;
}

const AnswerDisplay = ({ answer, onReset, imageUrl }: AnswerDisplayProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-accent">
          <BookOpen className="h-5 w-5 mr-2" />
          Step-by-Step Solution
        </CardTitle>
        <CardDescription>
          Here's your detailed AI-powered solution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Original Question */}
        {imageUrl && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Original Question:</h4>
            <div className="rounded-lg overflow-hidden border border-gray-200 max-w-md">
              <img 
                src={imageUrl} 
                alt="Original homework question"
                className="w-full h-auto object-contain bg-gray-50"
              />
            </div>
          </div>
        )}

        {/* Solution */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">AI Solution & Explanation:</h4>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {answer}
            </div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h5 className="font-medium text-yellow-800 mb-2">💡 Study Tips:</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Review each step to understand the methodology</li>
            <li>• Try solving similar problems using the same approach</li>
            <li>• Make note of key concepts and formulas used</li>
            <li>• Practice explaining the solution in your own words</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={onReset} 
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Ask Another Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerDisplay;
