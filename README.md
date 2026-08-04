# US Civify — New Jersey Edition

A mobile-friendly flashcard app for New Jersey residents preparing for the USCIS 100-question civics test.

## Features

- All 100 questions from the USCIS civics study guide (rev. 01/19)
- New Jersey-specific answers for state and local questions
- Current federal officeholder answers
- Random order with no repetition until the full set is completed
- Tap-to-flip question and answer cards
- Support for questions requiring two or three responses
- Warnings on answers that can change after elections or appointments
- Installable on iPhone using Safari's **Add to Home Screen**
- Offline support after the first successful load

## New Jersey-specific answers

- U.S. Senators: Cory Booker or Andy Kim
- U.S. Representative: Josh Gottheimer
- Governor of New Jersey: Mikie Sherrill
- Capital of New Jersey: Trenton

## Current federal answers

As reviewed on **August 4, 2026**:

- President: Donald J. Trump
- Vice President: JD Vance
- President's political party: Republican Party
- Speaker of the House: Mike Johnson
- Number of Supreme Court justices: nine
- Chief Justice: John G. Roberts, Jr.

These answers can change after elections, appointments, resignations, or other official transitions. Verify all current-answer questions shortly before the USCIS interview.

## Publish with GitHub Pages

1. Upload every file and the `icons` folder to the root of the `uscivify.github.io` repository.
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, `main`, and `/ (root)`.
4. Open `https://uscivify.github.io/`.

## Updating the app

After changing questions or app files, increment the cache name in `sw.js`, for example:

```js
const CACHE = "uscivify-v3";
```

## Source and disclaimer

Based on the USCIS *Civics (History and Government) Questions for the Naturalization Test*, revision 01/19.

This independent study app is not affiliated with or endorsed by USCIS. Location-specific and current-officeholder answers were added for New Jersey study use and must be verified before the eligibility interview.
