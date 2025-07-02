
-- Create table to store homework questions and solutions
CREATE TABLE public.homework_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT,
  question_image_url TEXT,
  solution TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.homework_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for homework_sessions table
CREATE POLICY "Users can view their own homework sessions" 
  ON public.homework_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own homework sessions" 
  ON public.homework_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own homework sessions" 
  ON public.homework_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own homework sessions" 
  ON public.homework_sessions 
  FOR DELETE 
  USING (auth.uid() = user_id);
