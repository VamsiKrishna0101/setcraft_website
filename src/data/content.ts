import type { MochiMood } from '../components/mochi/Mochi';

/** Real app captures with demonstration data. Paths are relative to /assets. */
export const screens = {
  today: { src: '/assets/screens/today.webp', title: 'Today', alt: 'Setcraft Today screen with training readiness, sleep and your next session' },
  nutrition: { src: '/assets/screens/nutrition.webp', title: 'Nutrition', alt: 'Setcraft nutrition screen with calories, macros, meals and water' },
  planWeek: { src: '/assets/app/plan-week.webp', title: 'Your recommended week', alt: 'Setcraft plan reveal showing a recommended training week' },
  exercise: { src: '/assets/app/exercise-detail.webp', title: 'Exercise detail', alt: 'Dumbbell press detail with highlighted target muscles' },
  bodyMap: { src: '/assets/app/body-map.webp', title: 'Body map', alt: 'Setcraft Body tab with trained muscles highlighted on an anatomy figure' },
  chart: { src: '/assets/app/exercise-chart.webp', title: 'Exercise progress', alt: 'Bench press progress chart with best set and set history' },
  progressWeek: { src: '/assets/app/progress-week.webp', title: 'Weekly progress', alt: 'Weekly progress with days trained and logged sets per muscle' },
  mochiGoal: { src: '/assets/app/mochi-goal.webp', title: 'Onboarding with Mochi', alt: 'Mochi asking what you are working toward during onboarding' },
} as const;
export type ScreenKey = keyof typeof screens;

/** Mochi's line, plus the welcome button, exactly as translated in the app. */
export const languages = [
  { code: 'EN', name: 'English', line: "Let's build your plan for this week", cta: 'Continue', note: 'Change it up anytime in Settings' },
  { code: 'DE', name: 'Deutsch', line: 'Lass uns deinen Plan für diese Woche erstellen', cta: "LOS GEHT'S", note: 'Jederzeit in den Einstellungen ändern' },
  { code: 'CH', name: 'Schweizerdeutsch', line: 'Lass uns deinen Plan für diese Woche erstellen', cta: "LOS GAHT'S", note: 'Jederziit i de Iistellige änderbar' },
  { code: 'FR', name: 'Français', line: 'Créons votre plan pour cette semaine', cta: "C'EST PARTI", note: 'Modifiable à tout moment dans Réglages' },
  { code: 'SV', name: 'Svenska', line: 'Nu bygger vi din plan för veckan', cta: 'NU KÖR VI', note: 'Ändra när som helst i Inställningar' },
  { code: 'NO', name: 'Norsk', line: 'La oss lage planen din for denne uken', cta: 'LA OSS GÅ', note: 'Endre når som helst i Innstillinger' },
  { code: 'DA', name: 'Dansk', line: 'Lad os lave din plan for denne uge', cta: 'LAD OS GÅ', note: 'Skift når som helst i Indstillinger' },
  { code: 'NL', name: 'Nederlands', line: 'Laten we je plan voor deze week maken', cta: 'LATEN WE GAAN', note: 'Altijd te wijzigen in Instellingen' },
  { code: 'ES', name: 'Español', line: 'Vamos a crear tu plan para esta semana', cta: 'VAMOS', note: 'Cámbialo en cualquier momento en Ajustes' },
  { code: 'IT', name: 'Italiano', line: 'Creiamo il tuo piano per questa settimana', cta: 'ANDIAMO', note: 'Modificalo in qualsiasi momento nelle Impostazioni' },
] as const;

/** A replay of the real onboarding conversation. */
export const chatScript: { from: 'mochi' | 'you'; text: string; mood: MochiMood }[] = [
  { from: 'mochi', text: "We'll build your program around this. What are you working toward?", mood: 'listening' },
  { from: 'you', text: 'Build muscle', mood: 'listening' },
  { from: 'mochi', text: 'Love that 💪', mood: 'cheer' },
  { from: 'you', text: '4 days · 45 min · Gym', mood: 'listening' },
  { from: 'mochi', text: 'Noted ✨', mood: 'listening' },
  { from: 'mochi', text: "I'm building your week right now", mood: 'thinking' },
  { from: 'mochi', text: 'Done! I built this week around your answers', mood: 'cheer' },
];

/** Moments where Mochi shows up inside the app (actual in-app lines). */
export const mochiMoments: { text: string; mood: MochiMood; when: string }[] = [
  { text: "Workout done! That's how progress is made", mood: 'cheer', when: 'After your session' },
  { text: '+2.5 kg more than last time 💪', mood: 'cheer', when: 'When you beat your last set' },
  { text: '5 days in a row. Who even are you 🔥', mood: 'listening', when: 'On a streak' },
  { text: 'Rest day. Recovery builds muscle too', mood: 'sleepy', when: 'On rest days' },
];

export const story = [
  { id: 'plan', screen: 'planWeek' as ScreenKey, kicker: 'Plan', title: 'A week built around your life.', body: 'Your goal, experience, schedule, equipment and limitations go in. A personal training week comes out, with sets, reps and rest days that make sense for you.', points: ['Gym or home', 'Your days, your duration', 'Clear sets & reps'] },
  { id: 'train', screen: 'exercise' as ScreenKey, kicker: 'Train', title: 'Know every move before you make it.', body: 'Every exercise comes with target muscles on a front and back anatomy figure, step-by-step instructions, and your own progress for that lift.', points: ['Video demonstrations', 'Muscle anatomy', 'Rest timer & set logging'] },
  { id: 'body', screen: 'bodyMap' as ScreenKey, kicker: 'Body', title: 'See exactly where the work went.', body: 'The muscle map lights up what you trained this week. Tap any muscle for its sets, reps and exercises, then switch to what is planned next.', points: ['Trained vs planned', 'Front & back', 'Per-muscle detail'] },
  { id: 'fuel', screen: 'nutrition' as ScreenKey, kicker: 'Fuel', title: 'Fuel that keeps up with you.', body: 'Calories, protein, carbs, fat and water against targets built from your profile. Save meals and routines so logging takes seconds.', points: ['Personal targets', 'Saved meals', 'Hydration'] },
  { id: 'progress', screen: 'chart' as ScreenKey, kicker: 'Progress', title: 'Watch the work add up.', body: 'Best sets, trends for every exercise, weekly recaps, body measurements and progress photos. Small wins, made visible.', points: ['Exercise trends', 'Personal bests', 'Weekly recap'] },
];

export const faqs = [
  { question: 'Who is Mochi?', answer: 'Mochi is the AI coach inside Setcraft. Mochi guides you through setup, builds your first training week around your answers, and cheers you on when you finish a workout, beat your last set or keep a streak going.' },
  { question: 'Which languages does Setcraft speak?', answer: 'Ten: English, Deutsch, Schweizerdeutsch, Français, Svenska, Norsk, Dansk, Nederlands, Español and Italiano. You pick one when you start and can change it anytime in Settings.' },
  { question: 'Can I train at home or in the gym?', answer: 'Both. Your plan takes your training location and the equipment you actually have into account, from a pair of dumbbells to a full gym.' },
  { question: 'Is Setcraft good for beginners?', answer: 'Yes. Setup asks about your experience, and every exercise has instructions and anatomy so you know what to do and which muscles it works.' },
  { question: 'Does it work with Apple Health, Health Connect or Apple Watch?', answer: 'Yes. Setcraft can read steps, sleep, heart data and workouts from Apple Health on iPhone or Health Connect on Android, and there is a Setcraft app for Apple Watch. A wearable is optional: you can also do a quick daily check-in by hand. Training readiness is an estimate, not a medical measurement.' },
  { question: 'What does connecting Claude do?', answer: 'You can give Claude read-only access to your training profile, plans, workout history and progress, so you can ask questions about your own training. No photos or health data are shared, and you can revoke access at any time.' },
  { question: 'How does the free trial work?', answer: 'You see your personal plan before deciding. Membership starts with a 14-day free trial, with monthly and annual options. Prices are shown in the App Store or Google Play, and you can cancel anytime before the trial ends.' },
];
