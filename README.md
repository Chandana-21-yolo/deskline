# DeskLine

A help-desk ticket tracker built with Angular 18 (strict TypeScript) and Firebase (Firestore + Auth).

## Live demo
https://deskline21-92d3d.web.app

## Login credentials
- Email: agent@deskline.app
- Password:1234567890

## Features
- Firebase Auth email/password sign-in
- Create, edit, delete tickets (title, description, priority)
- Live dashboard grouped by status (open / in-progress / resolved), backed by Firestore
- Change ticket status and assign an agent by UID
- Filter tickets by status and priority

## Run locally
\`\`\`bash
npm install
ng serve
\`\`\`
Then open http://localhost:4200

## Tech stack
Angular 18 (standalone components, strict mode) · Firebase Firestore · Firebase Auth · TypeScript