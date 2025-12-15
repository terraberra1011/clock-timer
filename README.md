# Digital Clock & Timer

A simple web application featuring a live digital clock and an interactive countdown timer with visual progress indicator.

## Features

### Digital Clock
- Real-time display showing hours, minutes, and seconds
- Updates every second automatically

### Countdown Timer
- Set custom countdown time (minutes and seconds)
- **Visual Progress Ring**: Green circular progress indicator that fills as time counts down
- **Start/Pause/Resume**: Start the timer, pause it, and resume from where you left off
- **Reset**: Clear the timer and reset the progress ring
- **Alarm Sound**: Plays audio notification when timer reaches zero with selectable sound themes
- **Sound Themes**: Choose from multiple alarm sounds (CaseOh, Taco Bell, Goldfish)
- **Waveform Visualization**: Real-time audio waveform display with color-coded themes
- **Test Sound Button**: Preview alarm sounds before starting the timer
- **Volume Control**: Adjustable volume slider with dynamic icon indicator
- **Mute Toggle**: Click the volume icon to mute/unmute sound
- Input validation to ensure valid time entries

## How to Use

1. **Clock**: Simply view the current time displayed at the top
2. **Timer**:
   - Enter the desired minutes and seconds
   - Select your preferred alarm sound from the dropdown menu
   - Click **Test Sound** to preview the selected alarm
   - Adjust the volume slider to set alarm sound level (volume icon changes based on level)
   - Click the volume icon to quickly mute/unmute
   - Click **Start** to begin the countdown
   - Click **Pause** to pause (timer will resume from paused time when started again)
   - Click **Reset** to clear the timer and start over
   - When timer reaches zero, your selected alarm sound will play with real-time waveform visualization

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling with circular progress indicator
- `script.js` - Timer logic and clock functionality

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
- Added new alarm sounds: CaseOh, Taco Bell, and Goldfish
- Added alarm sound test button

**12-15-25**
- Added real-time audio waveform visualization with color-coded themes
- Fixed waveform display bugs (variable initialization issues)
- Enhanced audio visualization using Web Audio API
