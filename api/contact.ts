import type { IncomingMessage, ServerResponse } from 'node:http';
import { deliverContactEmail } from '../src/server/contactMailer';

type NodeRequestWithBody = IncomingMessage & { body?: unknown };

async function readJsonBody(req: NodeRequestWithBody): Promise<unknown> {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  const rawText = Buffer.concat(chunks).toString('utf8').trim();
  if (!rawText) return null;

  try {
    return JSON.parse(rawText);
  } catch {
    return null;
  }
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export default async function handler(
  req: NodeRequestWithBody,
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  const body = await readJsonBody(req);
  const result = await deliverContactEmail(body);
  sendJson(res, result.status, result);
}
