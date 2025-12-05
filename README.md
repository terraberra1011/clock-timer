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
- **Alarm Sound**: Plays audio notification when timer reaches zero
- **Volume Control**: Adjustable volume slider for alarm sound
- Input validation to ensure valid time entries

## How to Use

1. **Clock**: Simply view the current time displayed at the top
2. **Timer**:
   - Enter the desired minutes and seconds
   - Adjust the volume slider to set alarm sound level
   - Click **Start** to begin the countdown
   - Click **Pause** to pause (timer will resume from paused time when started again)
   - Click **Reset** to clear the timer and start over
   - When timer reaches zero, an alarm sound will play

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
