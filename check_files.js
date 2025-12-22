// Simple file existence checker for audio files
// Run this in browser console to check if audio files exist

function checkAudioFiles() {
    const files = [
        'bgm/tm1_1.flac',
        'bgm/tm1_2.flac', 
        'bgm/tm1_endroll.flac',
        'converted_audio/tm1_1.mp3',
        'converted_audio/tm1_2.mp3',
        'converted_audio/tm1_endroll.mp3'
    ];
    
    console.log('=== Audio File Check ===');
    
    files.forEach(file => {
        fetch(file, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log(`✓ EXISTS: ${file} (${response.status})`);
                } else {
                    console.log(`✗ MISSING: ${file} (${response.status})`);
                }
            })
            .catch(error => {
                console.log(`✗ ERROR: ${file} - ${error.message}`);
            });
    });
}

// Instructions
console.log('Run checkAudioFiles() in console to verify audio files exist');
console.log('Expected location for converted files: converted_audio/');
console.log('Run convert_audio.bat to create MP3 files from FLAC files');