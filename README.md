# 🎨 QuestLog: The Street-Art Gaming Backlog

![QuestLog Hero Image](https://via.placeholder.com/800x400.png?text=Insert+Screenshot+of+Your+App+Here)

**Live Demo:** [Your Live Vercel Link Here] 

QuestLog is a modern, full-stack web application designed to help gamers manage their playing backlog. Breaking away from the standard corporate "clean" aesthetic, QuestLog features a completely custom **Neo-brutalist / Pop Art x Graffiti** user interface, complete with algorithmic masonry comic-book grids, custom CSS `.thump` interactions, and "Spray Paint" animations.

---

## 🚀 The Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Styling:** Tailwind CSS v4 + Shadcn/UI (Heavily customized)
* **Backend & Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth (Discord OAuth)
* **External Data:** RAWG Video Games Database API
* **Hosting:** Vercel (CI/CD)

---

## ✨ Core Features

* **Live Search:** Securely fetches real-time data from the massive RAWG API.
* **Social Authentication:** Gamers can log in securely using their Discord accounts.
* **Full CRUD Functionality:** Users can add games to their backlog, view their collection, and "Spray Paint" update their statuses (Backlog -> Playing -> Finished).
* **Algorithmic Comic Grid:** The user dashboard dynamically maps games into a responsive masonry grid, utilizing mathematical spans to create a comic-book panel illusion without causing server/client hydration errors.

---

## 🧠 Technical Highlights (For the Devs)

Building this app required solving several complex engineering challenges:

* **Next.js Server Actions:** To ensure maximum security, all API calls to RAWG and Supabase mutations are handled via strictly typed Server Actions (`'use server'`). This completely hides API keys from the client and dramatically improves performance.
* **Row-Level Security (RLS):** The PostgreSQL database implements strict RLS policies, ensuring that `auth.uid()` validation happens at the database level so user collections are perfectly siloed and secure.
* **Optimistic UI & Cache Revalidation:** Implementing `revalidatePath` to instantly refresh the server-rendered comic grid upon a database mutation, giving the user immediate visual feedback without a page reload.
* **Advanced Tailwind Architecture:** Gutted standard utility patterns to build pure CSS interactions like sticker rotations, hard neo-brutalist drop shadows, and halftone dot textures. 

---

## 🛠️ Getting Started Locally

Want to run this on your own machine? 

1. Clone the repository: `git clone https://github.com/[YourUsername]/quest-log.git`
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your keys:
   * `NEXT_PUBLIC_RAWG_API_KEY`
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run the development server: `npm run dev`