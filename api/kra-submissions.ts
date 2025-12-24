import { kv } from '@vercel/kv';

export const config = {
    runtime: 'edge',
};

interface KRASubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    roleTitle: string;
    submittedAt: string;
    answers: number[];
    score: number;
    totalQuestions: number;
}

export default async function handler(request: Request) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (request.method === 'GET') {
            // Get all submissions
            const submissions = await kv.get<KRASubmission[]>('kra_submissions') || [];
            return new Response(JSON.stringify(submissions), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        if (request.method === 'POST') {
            // Add new submission
            const body = await request.json() as KRASubmission;
            const submissions = await kv.get<KRASubmission[]>('kra_submissions') || [];

            // Add new submission at the beginning
            submissions.unshift({
                ...body,
                id: Date.now().toString(),
                submittedAt: new Date().toISOString(),
            });

            // Save back to KV
            await kv.set('kra_submissions', submissions);

            return new Response(JSON.stringify({ success: true, submission: submissions[0] }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }
}
