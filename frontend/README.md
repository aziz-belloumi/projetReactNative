# Wellnest Android app

This directory contains the React Native app, Android Studio/Gradle project, and mobile dependencies.

Requires Node.js 22.13.0 or newer and Android Studio with Android SDK Platform 37 and the NDK version configured in `android/build.gradle`.

From the repository root, install dependencies with `npm run frontend:install`, start Metro with `npm start`, and install/run on a connected Android device or emulator with `npm run android`. To compile a debug APK without starting a device or emulator, run `npm run android:build`. Open `frontend/android/` in Android Studio to work with the native Android project.

The app calls the API configured in `src/config.js`. Start and configure the API using the setup instructions in the repository-root [README](../README.md). MongoDB credentials belong in `backend/.env`, never in this directory.
