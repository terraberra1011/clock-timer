# Digital Clock & Timer

A web app with a live digital clock and an interactive countdown timer featuring a circular progress ring and an audio visualizer (Waveform or Frequency Bars).

## Features

### Digital Clock
- Real-time display of hours, minutes, seconds
- Updates every second

### Countdown Timer
- Set custom time (minutes + seconds)
- Visual progress ring that fills as time elapses
- Start, Pause/Resume, and Reset controls
- Alarm sound when timer reaches zero
- Sound themes: Scream, Bell, Goldfish
- Visualizer modes: Waveform (time-domain) or Frequency Bars (spectrum)
- Theme-synced colors with gradients and subtle glow on bars
- Test Sound button to preview the selected alarm
- Volume slider with dynamic icon and one-click mute toggle
- Input validation to prevent invalid time entries

## How to Use

1. Clock: The current time is shown at the top.
2. Timer:
   - Enter minutes and seconds
   - Pick a sound theme (Scream, Bell, Goldfish)
   - Choose a visualizer mode (Waveform or Bars)
   - Keyboard: press W for Waveform, B for Bars
   - Click Test Sound to preview the alarm
   - Adjust the volume slider; click the volume icon to mute/unmute
   - Click Start to begin, Pause to pause/resume, Reset to clear
   - At zero, the alarm plays and the visualizer animates in real time

## Run Locally

- Open index.html in a modern browser.
- Optional: use VS Code Live Server for auto-reload.

## Troubleshooting

- Audio/visualizer inactive until a click: browsers require a user gesture before starting Web Audio.
- No audio: check system volume, page/tab sound permissions, and try Test Sound.
- Mode not switching: use the Visualizer dropdown or keys W/B; the canvas clears and re-renders when the mode changes.

## Files

- index.html – Main HTML structure
- style.css – Styles including the circular progress ring and layout
- script.js – Clock, timer logic, audio handling, and visualizer

## Update Log

**12-01-25**
- Initial clock-timer code uploaded

**12-02-25**
- Added visual countdown timer with green progress ring
- Implemented pause/resume functionality
- Added reset feature

**12-03-25**
- Added a sound clip to play when timer is complete

**12-05-25**
- Added volume control slider for alarm sound
- Fixed volume slider step attribute for smooth adjustment

**12-08-25**
- Added dynamic volume icon that changes based on volume level (🔇 🔈 🔉 🔊)
- Implemented clickable volume icon for quick mute/unmute toggle
- Enhanced volume control UI with icon hover effects

**12-09-25**
- Added sound theme selector with multiple alarm sound options
- Fixed digital clock functionality issue (corrected audio load method)
- Added new alarm sounds: Scream, Bell, and Goldfish
- Added alarm sound test button

**12-15-25**
- Added real-time audio waveform visualization with color-synced themes
- Fixed waveform display bugs (variable initialization issues)
- Enhanced audio visualization using Web Audio API

**12-16-25**
- Refactored visualizer loop for stability and performance
- Added Frequency Bars visualizer mode and mode switcher
- Fixed variable name typos and duplicate listeners

**12-17-25**
- Fixed keyboard shortcuts for visualizer switching (W for waveform, B for bars)
- Corrected typos preventing keyboard controls from working properly

**12-22-25**
- Enhanced frequency bars visualizer with custom gradient palettes
- Added theme-specific gradients and glow per sound theme (Scream: blue, Bell: purple, Goldfish: orange)
- Improved bar rendering with smooth multi-color gradients
- Fixed bug where barGradientPalettes was referenced before definition
- Synced bar gradients with sound theme selection
- General code refinements and performance improvements