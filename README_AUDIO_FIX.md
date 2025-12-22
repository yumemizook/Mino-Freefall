# Audio Fix Instructions

## Problem
The game was throwing an error: `Audio key "stage1" missing from cache` because Phaser 3 doesn't support FLAC audio format by default.

## Solution
1. **Download ffmpeg**: Place `ffmpeg.exe` in the game folder (same directory as `game.js`)

2. **Run the conversion script**: Double-click `convert_audio.bat` to convert FLAC files to MP3

3. **Result**: The script will create a `converted_audio` folder with MP3 versions of your BGM files

## Files Changed
- `game.js`: Updated audio loading to use MP3 files instead of FLAC
- `convert_audio.bat`: Audio conversion script
- `converted_audio/`: New folder with MP3 audio files (created after running the conversion script)

## Troubleshooting

### If audio files are still missing:
1. Open browser console (F12) and run: `checkAudioFiles()` to verify file paths
2. Check that `converted_audio/` folder exists with MP3 files
3. Try opening `test_audio.html` to test audio independently

### If conversion fails:
1. Ensure `ffmpeg.exe` is in the same folder as `convert_audio.bat`
2. Check that original FLAC files exist in `bgm/` folder
3. Run conversion script from command line for better error messages

### Alternative audio formats:
If MP3 doesn't work, Phaser 3 also supports:
- OGG (often smaller file size)
- WAV (uncompressed, larger files)

## Verification
After conversion:
1. Open `test_audio.html` in browser
2. Click each audio test button
3. Should see "✓ Successfully loaded" messages
4. Then the main game will work without audio errors