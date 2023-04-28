# Account Profile React Component

This React component allows users to view and edit their profile information stored in a Supabase database. The component fetches user data from the database on mount and updates the database with any changes made by the user.

##Setup

To use this component, you will need to have a Supabase account and a Supabase client setup in your React application. You will also need to have a table named user_account in your Supabase database with columns id, actual_user, first_name, last_name, qr_link, and audio_link.

## Usage

To use this component, install components using
$ npm run dev

You also must create a .env.local file so the Supabase client can get setup correctly.

## Functionality

The Account component fetches the user's profile information from the database and populates the form fields with that information. The user can update their profile information and save the changes to the database by submitting the form. If there is an error updating the database, an alert will be displayed with the error message.

The component also displays a QR code and an audio file based on the values in the qr_link and audio_link columns in the database, respectively. If there is no value in the audio_link column, the audio player will display a "loading" message until the file is loaded.