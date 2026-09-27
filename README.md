# KANO

> Master Japanese Hiragana and Katakana through smart adaptive practice.

KANO is a modern Japanese kana learning platform designed to make memorizing Hiragana and Katakana faster through adaptive repetition, statistics, and interactive exercises.

![KANO product screenshot](public/screenshots/kano-dashboard.png)

## Features

- Complete 46-character Hiragana and Katakana sets plus 33 yōon combinations per alphabet
- Progressive lessons with Learn → Practice → Test flow
- Ten interactive practice modes, including a dedicated Combination Kana trainer
- Weighted adaptive practice based on mastery, errors, recency, and speed
- Searchable mastery map, statistics, XP, streaks, goals, and achievements
- Guest mode with persistent local progress and Supabase email authentication
- Separate progress, statistics, goals, and mastery data for every signed-in user
- Responsive light and dark interfaces

## Tech stack

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Zustand, Recharts, Supabase, PostgreSQL, and Lucide Icons.

## Getting started

```bash
pnpm install
pnpm dev
```

## Environment variables

Copy `.env.example` to `.env.local` and add your Supabase project values. Without them, KANO runs fully in guest mode.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Enable email authentication and add your site to the allowed redirect URLs.
4. Apply the migrations in `supabase/migrations`.

## Personal progress

Guest progress is stored only in the current browser. Email sign-in creates a
separate profile keyed by the Supabase user ID and synchronizes that user's
progress through the protected `profiles.progress_data` field. Row-level
security prevents users from reading or changing another account's data.

## Project structure

```text
app/                 Application shell, screens, and theme
components/ui/       Accessible reusable UI primitives
data/                Complete kana seed data and lesson groups
services/            Supabase client and auth helpers
stores/              Persistent Zustand learning state
supabase/             PostgreSQL schema and RLS policies
public/               Brand assets and screenshots
```

## Adaptive learning

Every answer updates a 0–100 mastery score. Correct, fast answers raise mastery; errors reduce it. Weighted selection gives weaker kana more exposure while excluding the immediately previous character to avoid repetitive loops.

## Roadmap

- Password recovery and additional sign-in providers
- Dakuten, handakuten, and yōon modules
- Vocabulary and JLPT N5 tracks
- Recorded native-speaker audio
- Installable mobile app experience

## License

MIT — see [LICENSE](LICENSE).
