# Samuel's Birthday Notes

A warm little birthday page you can share on social media.

Friends leave you private notes:
- 💛 what they love about you
- 🌱 something you could change / grow on
- 💬 anything else

Only **you** can read them at `/inbox` with a passphrase.

## Quick start

```bash
npm install
cp .env.example .env.local   # if you don't already have one
# edit ADMIN_PASSCODE in .env.local
npm run dev
```

Open:
- Public page: [http://localhost:3000](http://localhost:3000)
- Private inbox: [http://localhost:3000/inbox](http://localhost:3000/inbox)

Default local passphrase (change it!): `samuel-bday`

## Personalize

Edit `src/lib/config.ts` to change your name, headline, and thank-you copy.

## Share it

For a birthday post, deploy somewhere with a durable filesystem (or ask me to wire cloud storage), then share the public URL — **not** `/inbox`.

Notes are saved in `data/notes.json` (gitignored).

## Stack

- Next.js + Tailwind
- Passphrase-protected inbox cookie
- Confetti on successful send
