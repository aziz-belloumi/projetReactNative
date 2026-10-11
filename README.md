# Wellnest

Wellnest is an Android-first React Native care companion for patients and the people they choose to support them. The repository is organized into `frontend/` for the mobile app and `backend/` for the REST API; MongoDB is accessed only by the API.

## What works

- Patient and companion accounts with email/password sign-in.
- Patient-created, one-time companion invitations that expire after 24 hours.
- Patient-owned reminders, meal logs, and appointments stored in MongoDB.
- Companions can read care records only while the patient’s invitation link is active; companions cannot edit patient records.
- The food and guidance libraries are reference content in the app. They are not medical advice.
- Reminders and appointments are persisted planning tools; the app does not send push notifications or book appointments.

## Requirements

- Node.js 22.13.0 or newer and npm for the React Native frontend. The backend itself supports Node.js 18 or newer.
- Android Studio with Android SDK Platform 37 and the Android NDK version configured in `frontend/android/build.gradle`.
- An Android device or emulator to run the app. Building the APK does not launch an emulator.
- A MongoDB database, local or MongoDB Atlas.

## Start the API

From the repository root:

```powershell
if (-not (Test-Path backend/.env)) { Copy-Item backend/.env.example backend/.env }
```

Set `MONGODB_URI` to your local MongoDB connection string or Atlas URI in `backend/.env`. Replace `JWT_SECRET` with a private random value of at least 32 characters. Never commit `.env` or put database credentials in the mobile app.

For Atlas, create a database user and allow the API server’s IP address in the project’s network access settings before using its `mongodb+srv://` URI.

```powershell
npm run backend:install
npm run backend:dev
```

The API listens on port `4000` and exposes `GET /api/health`. Readiness is reported as healthy only when MongoDB is connected. To run the API tests:

```powershell
npm run backend:test
```

## Start the Android app

Install the mobile app dependencies from the repository root:

```powershell
npm run frontend:install
```

Start an Android emulator, then:

```powershell
npm start
```

In a second terminal:

```powershell
npm run android
```

The default mobile API URL is `http://10.0.2.2:4000/api`, which reaches the development computer from the Android emulator. For a physical device, set the API host in `frontend/src/config.js` to the computer’s LAN IP and ensure the device can reach port `4000`. The development API uses HTTP; deploy behind HTTPS before using it outside a trusted development network.

To build a debug APK without launching an emulator:

```powershell
npm run android:build
```

Open the `frontend/android/` folder in Android Studio to sync and work with the native project. The Android SDK path belongs in the ignored `frontend/android/local.properties` file; Android Studio can create it automatically.

## API routes

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/api/health` | Public readiness check |
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/me` | Signed in |
| `POST` | `/api/care/invitations` | Patient |
| `POST` | `/api/care/accept` | Companion |
| `GET` | `/api/care/links` | Signed in |
| `GET` | `/api/care/patients` | Companion |
| `DELETE` | `/api/care/links/:userId` | Either linked user |
| `GET`, `POST` | `/api/reminders` | Read: patient or linked companion; write: patient |
| `PATCH`, `DELETE` | `/api/reminders/:id` | Owner patient |
| `GET`, `POST` | `/api/meals` | Read: patient or linked companion; write: patient |
| `DELETE` | `/api/meals/:id` | Owner patient |
| `GET`, `POST` | `/api/appointments` | Read: patient or linked companion; write: patient |
| `PATCH`, `DELETE` | `/api/appointments/:id` | Owner patient |

Protected routes expect `Authorization: Bearer <accessToken>`. Patient and companion access is enforced by the API, not by client-side role checks.

## Security and scope

Passwords are hashed, sessions use signed expiring tokens, invitation codes are stored as hashes and can be used once, and user-provided payloads are validated. This is a development-stage wellness app—not a medical device or a HIPAA-compliant service. Do not store emergency or clinical data in it.
