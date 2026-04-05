"use client";

import { useState, useEffect, useCallback } from "react";
import { quotes } from "@/data/quotes";
import { supabase } from "@/lib/supabase";
import { getDeviceId, subscribeToPush, unsubscribeFromPush } from "@/lib/push";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function InspirationView() {
  const todayIndex = getDayOfYear() % quotes.length;
  const [currentIndex, setCurrentIndex] = useState(todayIndex);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifTime, setNotifTime] = useState("07:00");
  const [notifStatus, setNotifStatus] = useState("");

  const quote = quotes[currentIndex];
  const isToday = currentIndex === todayIndex;

  // Check existing notification preference on mount
  useEffect(() => {
    const savedTime = localStorage.getItem("gongyo_notif_time");
    const savedEnabled = localStorage.getItem("gongyo_notif_enabled");
    if (savedTime) setNotifTime(savedTime);
    if (savedEnabled === "true") setNotifEnabled(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  const handleNotifToggle = async (checked: boolean) => {
    if (checked) {
      if (!("Notification" in window)) {
        setNotifStatus("Notifications not supported in this browser.");
        return;
      }

      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setNotifStatus("Please allow notifications in browser settings.");
        setNotifEnabled(false);
        return;
      }

      const subscription = await subscribeToPush();
      if (subscription) {
        const deviceId = getDeviceId();
        try {
          await supabase.from("notification_prefs").upsert(
            {
              device_id: deviceId,
              push_subscription: subscription.toJSON(),
              notify_time: notifTime,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "device_id" }
          );
          setNotifEnabled(true);
          localStorage.setItem("gongyo_notif_enabled", "true");
          localStorage.setItem("gongyo_notif_time", notifTime);
          setNotifStatus("Morning reminder set.");
        } catch (err) {
          console.error("Failed to save notification preference:", err);
          setNotifStatus("Failed to save preference. Try again.");
        }
      } else {
        setNotifStatus("Push subscription failed. Try again.");
      }
    } else {
      await unsubscribeFromPush();
      const deviceId = getDeviceId();
      try {
        await supabase
          .from("notification_prefs")
          .delete()
          .eq("device_id", deviceId);
      } catch (err) {
        console.error("Failed to remove notification preference:", err);
      }
      setNotifEnabled(false);
      localStorage.setItem("gongyo_notif_enabled", "false");
      setNotifStatus("");
    }
  };

  const handleTimeChange = async (newTime: string) => {
    setNotifTime(newTime);
    localStorage.setItem("gongyo_notif_time", newTime);

    if (notifEnabled) {
      const deviceId = getDeviceId();
      try {
        await supabase
          .from("notification_prefs")
          .update({
            notify_time: newTime,
            updated_at: new Date().toISOString(),
          })
          .eq("device_id", deviceId);
      } catch (err) {
        console.error("Failed to update notification time:", err);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
      {/* Day label */}
      <div className="text-center text-[11px] font-medium tracking-[0.1em] uppercase text-ink-muted py-1">
        {isToday
          ? "Today's Encouragement"
          : `Encouragement ${currentIndex + 1} of ${quotes.length}`}
      </div>

      {/* Quote card */}
      <div className="bg-white rounded-xl p-7 border border-paper-deep relative overflow-hidden">
        {/* Decorative opening quote */}
        <span className="absolute -top-2.5 left-4 font-serif text-[100px] text-gold-pale leading-none pointer-events-none select-none">
          {"\u201C"}
        </span>

        <p className="font-serif text-[22px] font-light leading-relaxed text-ink italic relative z-10">
          {quote.text}
        </p>
        <p className="mt-4 text-xs font-medium tracking-[0.08em] uppercase text-gold">
          -- {quote.source}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 items-center">
        <button
          onClick={handlePrev}
          className="flex-1 h-12 bg-paper-warm rounded-xl font-sans text-sm font-medium text-ink-soft flex items-center justify-center gap-2 active:bg-paper-deep transition-colors"
        >
          &larr; Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 h-12 bg-gold text-white rounded-xl font-sans text-sm font-medium flex items-center justify-center gap-2 active:bg-gold-light transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      {/* Notification section */}
      <div className="bg-paper-warm rounded-xl p-5">
        <div className="text-[13px] font-medium tracking-[0.05em] uppercase text-ink-soft mb-3">
          Morning Reminder
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-ink-soft leading-relaxed flex-1">
            Receive a daily encouragement notification at your chosen time
          </div>

          {/* Toggle */}
          <label className="relative w-[50px] h-7 flex-shrink-0 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifEnabled}
              onChange={(e) => handleNotifToggle(e.target.checked)}
            />
            <div className="w-full h-full bg-paper-deep rounded-full peer-checked:bg-gold transition-colors" />
            <div className="absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-[22px]" />
          </label>
        </div>

        {/* Time picker */}
        {notifEnabled && (
          <div className="mt-3">
            <input
              type="time"
              value={notifTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="border border-paper-deep bg-paper rounded-lg px-3 py-2 font-sans text-[15px] text-ink w-full"
            />
          </div>
        )}

        {/* Status message */}
        {notifStatus && (
          <p className="mt-2 text-xs text-gold">{notifStatus}</p>
        )}
      </div>
    </div>
  );
}
