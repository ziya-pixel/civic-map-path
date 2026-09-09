# Pothole & Road Damage Reporting System

RoadWatch is a responsive civic-tech demonstration for reporting potholes and damaged roads. It includes citizen reporting, photo capture, GPS/map pin selection, community map browsing, personal report tracking, and an authority triage dashboard.

## Included screens

- `/` — landing page and community activity
- `/register` — citizen registration form
- `/login` — citizen login form
- `/dashboard` — citizen overview
- `/report` — photo, damage type, description, severity, location, duplicate warning, and submit flow
- `/map` — searchable and severity-filtered map
- `/my-reports` — submitted reports and status tracking
- `/admin` — authority statistics, report filters, map, and status updates

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:8080`.

## Current demo behavior

The app seeds demonstration reports and persists new reports/status changes in browser storage so the complete workflow can be tested without external setup. The map is an interactive civic map surface: markers open report details, and the report screen accepts GPS or click-to-place coordinates.

## Firebase production hookup

To connect Firebase for a real deployment:

1. Create a Firebase project at https://console.firebase.google.com.
2. Enable Email/Password under Authentication → Sign-in method.
3. Create a Firestore database and a Storage bucket.
4. Register a web app and add its public Firebase config to a client-safe config module.
5. Replace the demo `loadReports`/`saveReports` functions with Firebase Authentication, Firestore, and Storage calls.
6. Store the report shape shown in `src/lib/roadwatch-data.ts` in a `reports` collection.
7. Store the admin role in a dedicated `userRoles` collection/document and enforce admin-only status updates with Firestore rules.
8. Deploy with Firebase Hosting or another static hosting target after building.

Example Firestore rule outline:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{reportId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        exists(/databases/$(database)/documents/userRoles/$(request.auth.uid))
      );
      allow delete: if request.auth != null &&
        exists(/databases/$(database)/documents/userRoles/$(request.auth.uid));
    }
  }
}
```

For a production release, also add Storage rules that limit uploads to authenticated users and image MIME types, and keep the admin role collection write-protected.
