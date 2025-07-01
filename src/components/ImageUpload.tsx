
import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      onImageUpload(imageUrl);
      console.log("Image processed and uploaded");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("Image removed");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="rounded-lg overflow-hidden border-2 border-gray-200">
          <img 
            src={uploadedImage} 
            alt="Uploaded homework question"
            className="w-full max-h-96 object-contain bg-gray-50"
          />
        </div>
        <Button
          onClick={removeImage}
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 rounded-full p-2"
        >
          <X className="h-4 w-4" />
        </Button>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Image uploaded successfully! Click "Get Solution" to process the question.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragging 
            ? "border-primary bg-primary/5 scale-105" 
            : "border-gray-300 hover:border-primary hover:bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto p-3 rounded-full w-fit transition-colors ${
            isDragging ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
          }`}>
            <Image className="h-8 w-8" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isDragging ? "Drop your image here" : "Upload homework question"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Drag and drop an image, or click to select
            </p>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileInput();
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Supports JPG, PNG, and other image formats up to 10MB
      </p>
    </div>
  );
};

export default ImageUpload;
