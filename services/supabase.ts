import { createClient } from "@supabase/supabase-js";
import type { ProgressSnapshot } from "@/stores/use-kano-store";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function signInWithGoogle() {
  if (!supabase) return { error: new Error("Supabase is not configured yet.") };
  return supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function loadUserProgress(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("username, progress_data")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data as { username: string; progress_data: Partial<ProgressSnapshot> | null } | null;
}

export async function saveUserProgress(
  userId: string,
  email: string | undefined,
  snapshot: ProgressSnapshot,
) {
  if (!supabase) return;
  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    username: snapshot.name || email?.split("@")[0] || "Learner",
    xp: snapshot.xp,
    daily_goal: snapshot.dailyGoal,
    progress_data: snapshot,
  });
  if (error) throw error;
}
