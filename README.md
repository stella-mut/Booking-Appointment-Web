# Zawadi Dentist — Dr. Zawadi Juma

A responsive, single-page dental practice website built with vanilla HTML, CSS and JavaScript.

## Included

- Sticky responsive navigation
- Mobile hamburger menu
- Azure gradient hero with Fraunces display typography
- Animated stat counters
- Photo card with floating "Next available" badge
- Six-service responsive card grid with hover lift
- Deep azure benefits/about section with 2×2 statistics
- Opening hours and emergency phone banner
- Interactive booking flow:
  1. Pick a date
  2. Pick an available time
  3. Enter patient details
  4. See confirmation
- Blocked time slots displayed with strike-through styling
- Testimonial selector with four patient stories
- Six-question FAQ accordion
- Dark footer with navigation links and repeated booking CTA

## Files

- `index.html` — page markup and content
- `styles.css` — responsive layout, design system and components
- `script.js` — menu, counters, calendar, booking flow and testimonials

## Run locally

No build step is required.

1. Open `index.html` directly in a browser, or
2. Run a local server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Typography

The page uses:

- **Fraunces** for headings and titles
- **DM Sans** for body copy and UI

Both are loaded from Google Fonts. DM Sans is used as the closest humanist-sans alternative to TT Hoves.

## Customization

### Contact details

Update the emergency phone number in `index.html`:

```html
<a href="tel:+254700000000">+254 700 000 000</a>
```

### Appointment slots

Edit the `slots` array in `script.js`:

```js
const slots = [
  { time: "8:00 AM", blocked: false },
  { time: "9:00 AM", blocked: true }
];
```

### Calendar behavior

The demo calendar is configured for July 2026 and disables weekends. For production, replace the static availability logic with a backend or booking provider.

### Form submission

The current form displays a client-side confirmation screen. Connect the `submit` handler to your backend, CRM, email service or appointment system for production use.

## Production notes

- Replace the Unsplash hero image with a licensed practice/doctor image.
- Add real appointment availability from a backend.
- Add server-side form validation and spam protection.
- Connect emergency contact details and clinic address.
- Add analytics and cookie/privacy handling as required.
