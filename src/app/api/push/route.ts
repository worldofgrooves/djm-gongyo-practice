import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import { createClient } from "@supabase/supabase-js";

// Force dynamic -- don't try to pre-render this route
export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    // Verify VAPID keys are configured
    const vapidPublic = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
    const vapidEmail = process.env.VAPID_EMAIL || "denver@madebyplume.com";

    if (!vapidPublic || !vapidPrivate) {
      return NextResponse.json(
        { error: "VAPID keys not configured" },
        { status: 500 }
      );
    }

    webPush.setVapidDetails(
      `mailto:${vapidEmail}`,
      vapidPublic,
      vapidPrivate
    );

    const supabase = getSupabase();

    // Get the body (optional: filter by time)
    const body = await request.json().catch(() => ({}));
    const targetTime = body.time; // e.g., "07:00"

    // Fetch subscriptions from Supabase
    let query = supabase.from("notification_prefs").select("*");
    if (targetTime) {
      query = query.eq("notify_time", targetTime);
    }

    const { data: prefs, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch preferences" },
        { status: 500 }
      );
    }

    if (!prefs || prefs.length === 0) {
      return NextResponse.json({ sent: 0, message: "No subscribers" });
    }

    // Daily quote
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000
    );

    const { quotes } = await import("@/data/quotes");
    const quote = quotes[dayOfYear % quotes.length];

    const payload = JSON.stringify({
      title: "Morning Encouragement",
      body:
        quote.text.substring(0, 200) +
        (quote.text.length > 200 ? "..." : ""),
    });

    // Send to all subscribers
    let sent = 0;
    let failed = 0;

    for (const pref of prefs) {
      try {
        await webPush.sendNotification(pref.push_subscription, payload);
        sent++;
      } catch (err: unknown) {
        failed++;
        // Remove expired subscriptions
        const pushError = err as { statusCode?: number };
        if (pushError.statusCode === 410 || pushError.statusCode === 404) {
          await supabase
            .from("notification_prefs")
            .delete()
            .eq("id", pref.id);
        }
      }
    }

    return NextResponse.json({ sent, failed });
  } catch (err) {
    console.error("Push send error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
