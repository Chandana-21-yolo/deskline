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

## How to use
1. Open the live demo link and sign in with the credentials above.
2. Under "New ticket", enter a title, description, and priority, then click "Create ticket".
3. Your ticket appears in the "Open" column. Use the status dropdown on any ticket to move it to "In progress" or "Resolved".
4. To assign a ticket, paste an agent's Firebase UID into the "Assignee UID" field on that ticket.
5. Use the Status/Priority filters near the top to narrow the board.
6. Click "Edit" on a ticket to change its title/description/priority, or "Delete" to remove it.