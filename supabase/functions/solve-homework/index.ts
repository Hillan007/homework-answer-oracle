
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { questionText, imageUrl } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    });

    // Get user from the request
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Unauthorized');
    }

    console.log('User authenticated:', user.id);

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an expert homework tutor. Your job is to help students understand and solve their homework problems step-by-step. 

IMPORTANT GUIDELINES:
- Provide detailed, step-by-step explanations
- Show your work clearly at each step
- Explain the reasoning behind each step
- Use simple language appropriate for students
- If it's a math problem, show all calculations
- If it's a science problem, explain the concepts involved
- If it's a language problem, break down grammar or vocabulary
- Always encourage learning and understanding, not just giving answers
- End with a summary of key concepts learned

Format your response with clear sections and bullet points where helpful.`
      }
    ];

    if (imageUrl && questionText) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: `Please solve this homework problem. Here's the question text: "${questionText}" and I've also included an image.` },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      });
    } else if (imageUrl) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: 'Please solve this homework problem shown in the image.' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      });
    } else if (questionText) {
      messages.push({
        role: 'user',
        content: `Please solve this homework problem: ${questionText}`
      });
    } else {
      throw new Error('No question provided');
    }

    console.log('Calling OpenAI API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const solution = data.choices[0].message.content;

    // Save the homework session to database
    const { data: sessionData, error: dbError } = await supabase
      .from('homework_sessions')
      .insert({
        user_id: user.id,
        question_text: questionText || null,
        question_image_url: imageUrl || null,
        solution: solution
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save homework session');
    }

    console.log('Session saved successfully');

    return new Response(JSON.stringify({ 
      solution,
      sessionId: sessionData.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in solve-homework function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
