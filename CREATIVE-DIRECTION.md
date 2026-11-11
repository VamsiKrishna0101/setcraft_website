# Setcraft website direction

## Active presentation

The current site is a clean black-and-white product page centered on large iPhone-style frames and the real Setcraft interface. A restrained two-phone hero introduces the app, followed by an inspectable four-tab gallery, training, nutrition, progress, FAQ, download, and footer. There is no character, anatomy illustration, or Body section in the active page. Motion is limited to gentle entrances and section reveals, with reduced-motion support. Product and store imagery remains accurate. The earlier 3D research and prototype notes below are archived exploration, not the active implementation.

Research date: 25 October 2026. Updated locally on 26 October 2026 following the requested character-driven Three.js direction. The original research and storyboard are retained below, with the current implementation described first.

## Current experience

**A spotter in your corner.** An original monochrome character guides visitors through training, Body, nutrition, and progress. The opening shows a closer, human-faced portrait with swept hair and an expressive greeting. A large phone shares the stage, then takes the foreground through the feature chapters. The app gallery and supporting phone captures use a larger scale for readable product evidence.

The user's additional reference, [Sebastien Graf](https://www.sebg.ch/), uses a character as a narrator, contextual speech, scroll-linked scenes, and playful actions. The adaptation uses these interaction patterns with original Setcraft geometry, materials, copy, fitness props, and a black-and-white visual system. No reference-site models, animations, textures, or shaders are copied.

The active stack is React, TypeScript, Vite, React Three Fiber, Three.js, GSAP ScrollTrigger, and custom CSS. The character and phone share one demand-rendered canvas, with normal HTML chapters and native page scrolling. The guide supports a greeting, dumbbell curl, turn, and desktop drag. The Body detail section continues to show the app's actual front/back training artwork; it does not claim the mobile product has a rotatable 3D body.

The full reference journey was inspected through its introduction, Jaeger-LeCoultre, Respawwwn, tourism, gallery, and contact ending. Its changing narrator positions and product handoffs informed Setcraft's alternating stage layout. The guide now crosses the full viewport, turns toward the product, gestures, and briefly animates its face. The phone uses an original iPhone-style frame with clean, undistorted app textures. Wide scenes include magnified UI details; full-size screen dialogs preserve readability on all widths. Tablet framing reduces the guide so it does not cover the phone.

Mobile has DPR 1, capped scheduling at 30 fps, simplified geometry and ink shading, native touch scrolling, and large app captures. Static fallback and explicit opt-in cover reduced motion, Save-Data, very limited memory, and WebGL errors. Rendering pauses offscreen and stops at idle. Physical-device performance still requires testing on target phones.

## Concept

Setcraft is presented as a personal training system inside a beautifully lit phone. A visitor scrolls through a day of training: understand today, follow a plan, log the work, fuel the effort, and see progress. The phone is the continuous visual anchor.

Working headline: **Every set. A step forward.**

Supporting copy: **Personalized workouts, nutrition, and progress. Built around you.**

The intended audience includes people starting strength training and experienced lifters who want a coherent planning and tracking tool. The first screen must communicate what the app does and offer a clear next action.

## Research and interpretation

These are design references, not assets or layouts to copy. Observations describe this research session, rather than permanent properties of the sites.

| Reference | Observed pattern | Application to Setcraft | Constraint |
| --- | --- | --- | --- |
| [Linear](https://linear.app/) | Near-black opening, large white headline, restrained navigation, detailed product interface immediately below the value proposition. No canvas or video elements were found in the inspected document. | Use type, spacing, subtle borders, and legible product proof as the foundation. | Preserve readable screenshot scale; avoid compressing the whole app into tiny feature cards. |
| [Apple iPhone](https://www.apple.com/iphone/) | Large product imagery, short benefit statements, generous spacing, and direct product actions. The observed opening uses a light background. | Borrow device framing and clear product hierarchy, expressed in Setcraft's black palette. | The phone must support the app story; the site sells software rather than the device hardware. |
| [Lusion](https://lusion.co/) | A large interactive object composition, direct introductory copy, and project-led storytelling. Three canvas elements were present in the inspected document. | Give the phone convincing materials, light, depth, and controlled interaction. | Keep the scene lightweight and the app immediately understandable. Do not reproduce the reference's objects or art direction. |
| [WHOOP](https://www.whoop.com/us/en/) | The fetched official page connects daily insights with training, sleep, and ongoing progress, supported by app imagery and clear join actions. | Organize features around daily user benefits and follow each claim with the relevant app screen. | Browser navigation redirected to an unavailable regional page, so this is a content reference, not a verified visual or motion teardown. |

## Visual system

- Canvas: pure black `#000000`, with graphite `#0D0D0D` and `#171717` for depth.
- Foreground: white `#F5F5F5`, silver `#D7D7D7`, and readable secondary gray `#A0A0A0`.
- Light: broad white studio reflections, fine silver rim lighting, and a subtle local halo behind the phone.
- Device: a dark metal frame and glass screen, angled enough to convey depth while preserving readable UI.
- Typography: a large, tightly spaced sans-serif headline, clean supporting copy, and small uppercase chapter labels.
- Layout: generous black space, few containers, thin dividers, and short paragraphs.
- Actions: solid white primary button, understated secondary link, persistent access to the primary action.
- Website surfaces remain monochrome. Display actual app captures accurately; confirm any campaign-wide grayscale treatment before changing functional color indicators.

## Page storyboard

| Chapter | Visitor message | Product evidence | Motion proposal |
| --- | --- | --- | --- |
| Opening | Every set. A step forward. | A large phone showing a polished Today screen with coherent demonstration data. | The device enters with a small turn, catches a white edge light, and settles with the screen readable. Headline and action are available immediately. |
| Your day | Know your next move. | Today, training readiness, today's session, and the personal plan. | In one short desktop sequence the phone turns to face the visitor; a readiness detail and plan panel separate slightly from the screen. |
| Your training | A plan that fits your life. | Weekly schedule, exercise detail, set logging, video instructions, and rest timer. | Show one understandable flow: choose the session, inspect the exercise, log a set. Use actual captures and short recordings. |
| Your body | See where your work goes. | Logged training map, muscle coverage, and exercise anatomy. | The map becomes the main visual; selected regions are explained with labels. Use front/back states from the product rather than suggesting the app contains an unbuilt rotatable 3D body. |
| Your fuel | Fuel the work. | Meal planning, calories, macros, and water. | The phone remains stable while a small number of nutrition details appear beside it. |
| Your progress | Make progress visible. | Workout history, exercise trends, records, measurements, and approved demo comparisons. | Move from a workout log to its corresponding progress view, followed by an inspectable gallery of the major app screens. |
| Start | Your next chapter starts with one set. | Verified availability, plan details, and a final device composition. | End on a quiet, frontal product shot with one prominent action. |

The gallery provides access to all major screens without extending every feature into a full animated chapter. Desktop supports direct chapter navigation; mobile uses a vertical reading flow and swipeable gallery.

## Product truth and conversion

- Use the public name **Setcraft**, matching `mobile/docs/setcraft-brand.md`; FitAI remains an internal project name.
- Training readiness is a **daily check-in estimate** where that is its actual source. Muscle maps describe logged training and exercise involvement.
- Use a consistent synthetic demonstration account, coherent dates, and realistic sessions across all captures. Existing preview captures are useful composition references; some show empty or isolated fixture states and need refreshing for marketing.
- Display real prices, trial terms, supported platforms, and store destinations only after verification.
- Choose **Get Setcraft** when a working destination exists, or **Join the waitlist** for a prelaunch campaign. The secondary action is **Explore the app**.
- Include genuine testimonials or demonstrated product proof. Do not invent ratings, user counts, or transformation outcomes.

## Asset plan

Existing sources inspected:

- Production branding: `mobile/assets/branding/setcraft-mark.svg`.
- Today/readiness preview: `mobile/build/previews/training-readiness-today.png`.
- Today/body preview: `mobile/build/today-polished-body-preview.png`.
- Nutrition preview: `mobile/build/nutrition-preview.png`.
- Further capture candidates exist under `mobile/build/previews/`, including weekly plan, exercise progress, body measurements, and body history.

Prepare clean captures of Today, personal plan, weekly schedule, exercise details, active workout, training map, nutrition, and progress. Produce two or three short screen recordings for concrete interactions. Store final web assets outside build directories. Create an original lightweight phone asset with a separately replaceable screen, and generate a static poster fallback from the same composition.

## Implementation proposal

The website directory had no existing application source during inspection. The initial version used React, TypeScript, Vite, CSS perspective, and GSAP ScrollTrigger. Following the user's explicit request for a character-led experience, the opening now uses real-time Three.js through React Three Fiber. The inspectable app gallery, supporting phone frames, and anatomy selector remain lightweight DOM/CSS with optimized local images.

- [React Three Fiber documentation](https://r3f.docs.pmnd.rs/getting-started/introduction): React renderer for Three.js, suitable for a reusable phone scene and state-driven screen changes.
- [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): scroll-linked timelines and section pinning for the short desktop product reveal.

Keep text, navigation, buttons, screen descriptions, and the gallery in semantic HTML. Load the 3D scene progressively behind an immediately visible product poster. Keep screen captures sharp, avoid expensive full-page effects, stop rendering when the scene is out of view, and use a simpler phone presentation on mobile. Reduced-motion and WebGL fallback presentations must expose the same content and actions.

## Build order and review gates

1. Prepare a consistent demonstration account and the final screen-capture list.
2. Prototype the opening at desktop and phone widths with the real logo and actual UI.
3. Establish phone material, lighting, camera, screen legibility, headline, and action before expanding the page.
4. Implement the day-to-progress story, then the full screen gallery and launch details.
5. Review loading, scrolling, touch behavior, reduced motion, keyboard access, screenshot clarity, console errors, and action destinations on desktop and mobile.

Success criteria: visitors understand the offer in the opening viewport, can inspect the app throughout the page, and always have a clear route to the verified next action. Measure hero action clicks, chapter/gallery engagement, and completed store or waitlist conversions once the site exists.
