import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

export async function POST(req: NextRequest) {
  const { roomName, participantName } = await req.json();

  if (!roomName || !participantName) {
    return NextResponse.json({ error: 'Missing roomName or participantName' }, { status: 400 });
  }

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ error: 'LiveKit API key or secret not set on the server.' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });

  at.addGrant({ roomJoin: true, room: roomName });

  return NextResponse.json({ token: at.toJwt() });
}
