const playLists = [{
    title: 'Ngập Ngừng (Ft. Aries tis)',
    artist: 'Hằng ssi',
    song: './musics/music5.mp3',
    photo: './images/ngap ngung.jpeg'
}, {
    title: 'Soft Spot',
    artist: 'Keshi',
    song: './musics/music1.mp3',
    photo: './images/soft spot.jpeg'
}, {
    title: 'Em Đã Biết',
    artist: 'Suni Ha Linh',
    song: './musics/music2.mp3',
    photo: './images/em da biet.jpeg'
}, {
    title: 'Ngỏ Lời',
    artist: 'Suni Ha Linh',
    song: './musics/music3.mp3',
    photo: './images/ngo loi.jpeg'
}, {
    title: 'Sudden Shower',
    artist: 'Byeon Woo Seok',
    song: './musics/music4.mp3',
    photo: './images/sudden shower.jpeg'
}];

const audio = document.querySelector('.music-audio');
const trackDuration = document.querySelector('.track-duration');
const prevButton = document.querySelector('.prev');
const playButton = document.querySelector('.play');
const nextButton = document.querySelector('.next');
const currentTimeSong = document.querySelector('.current-time');
const durationSong = document.querySelector('.duration');
const songPhoto = document.querySelector('.song-image');
const songArtist = document.querySelector('.artist');
const songTitle = document.querySelector('.title');

let isPlaying = false;
let currentSongIndex = 0;

function loadSong(index) {
    const music = playLists[index];
    audio.src = music.song;
    songPhoto.src = music.photo;
    songArtist.innerHTML = music.artist;
    songTitle.innerHTML = music.title;
}

playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '&#9654;';
    } else {
        audio.play()
        playButton.innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('loadedmetadata', () => {
   durationSong.textContent = formatTime(audio.duration);
   trackDuration.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
    trackDuration.value = audio.currentTime;
    currentTimeSong.textContent = formatTime(audio.currentTime);
});

trackDuration.addEventListener('input', () => {
    audio.currentTime = trackDuration.value;
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playLists.length) % playLists.length;
    loadSong(currentSongIndex);

    if(isPlaying) {
        audio.play();
    }
});

nextButton.addEventListener('click', () => {
    if (playLists.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % playLists.length;
    }
    loadSong(currentSongIndex);

    if(isPlaying) {
        audio.play();
    }
})

function formatTime(time) {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}