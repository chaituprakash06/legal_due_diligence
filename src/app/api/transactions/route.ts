import { NextResponse } from 'next/server';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export async function POST(req: Request) {
  try {
    const { transactionSummary, diligenceItems } = await req.json();
    console.log('📤 Sending to Perplexity API:', { transactionSummary, diligenceItems });

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: "sonar-reasoning-pro",
        messages: [
          {
            role: "system",
            content: "You are a legal due diligence assistant. Provide 6 key due diligence points that could come up based on this transaction scenario"
          },
          {
            role: "user",
            content: `Please analyze this transaction and provide key legal considerations and risks:\n\nTransaction Summary: ${transactionSummary}\n\nContext: ${diligenceItems}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.9
      })
    });

    const rawResponse = await response.text(); // Get raw response text first
    console.log('📥 Raw Perplexity API Response:', rawResponse);

    let data;
    try {
      data = JSON.parse(rawResponse);
    } catch (e) {
      console.error('❌ JSON Parse Error:', e);
      throw new Error('Invalid API response format');
    }

    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid Response Structure:', data);
      throw new Error('Invalid response structure from API');
    }

    const analysis = data.choices[0].message.content;
    console.log('✅ Processed Analysis:', analysis);

    return NextResponse.json({ 
      analysis: analysis || 'No analysis could be generated. Please try again.',
      success: true
    });

  } catch (error) {
    console.error('❌ Error in transaction analysis:', error);
    return NextResponse.json({
      error: 'Failed to process transaction',
      details: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}