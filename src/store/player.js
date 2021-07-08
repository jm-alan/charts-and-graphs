const SET_ENGINE = 'player/SET';
const SET_SOURCE = 'player/SOURCE';
const SET_PLAY = 'player/SET_PLAY';
const MUTE = 'player/MUTE';
const VOLUME = 'player/VOLUME';
const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';
const NEXT = 'player/NEXT';
const PREV = 'player/PREV';
const ENQUEUE = 'player/ENQUEUE';
const DURATION = 'player/DURATION';
const TIME = 'player/TIME';
const SEEK = 'player/SEEK';
const PREQUEUE = 'player/PREQUEUE';
const LOAD = 'player/LOAD';

export const SetPlayer = engine => ({
  type: SET_ENGINE,
  engine
});

export const SetSource = src => ({
  type: SET_SOURCE,
  src
});

export const SetOnPlay = onPlay => ({
  type: SET_PLAY,
  onPlay
});

export const EnqueueSong = song => ({
  type: ENQUEUE,
  song
});

export const Mute = () => ({
  type: MUTE
});

export const Volume = volume => ({
  type: VOLUME,
  volume
});

export const UpdateTime = () => ({
  type: TIME
});

export const UpdateDuration = () => ({
  type: DURATION
});

export const Seek = time => ({
  type: SEEK,
  time
});

const play = () => ({
  type: PLAY
});

export const Pause = () => ({
  type: PAUSE
});

export const NextSong = () => ({
  type: NEXT
});

export const PrevSong = () => ({
  type: PREV
});

export const PreQueue = () => ({
  type: PREQUEUE
});

export const Load = () => ({
  type: LOAD
});

export const Play = player => async dispatch => {
  await player.play();
  dispatch(play());
};

export default function reducer (
  state = {
    songs: [],
    loaded: false,
    currentSong: null,
    currentSongIndex: 0,
    playing: false,
    currentDuration: 0,
    currentTime: 0,
    currentVolume: 1,
    muteVolume: 0,
    onPlay: null,
    engine: null
  },
  { type, engine, song, time, volume, onPlay, src }
) {
  switch (type) {
    case LOAD:
      return { ...state, loaded: true };
    case SET_ENGINE:
      return { ...state, engine };
    case SET_SOURCE:
      return { ...state, src };
    case SET_PLAY:
      return { ...state, onPlay };
    case PREQUEUE:
      return { ...state, currentSong: state.songs[0] };
    case DURATION:
      return { ...state, currentDuration: state.engine.duration };
    case TIME:
      return { ...state, currentTime: state.engine.currentTime };
    case ENQUEUE:
      return { ...state, songs: [...state.songs, song] };
    case MUTE:
      return { ...state, currentVolume: state.muteVolume, muteVolume: state.currentVolume };
    case VOLUME:
      return { ...state, muteVolume: 0, currentVolume: volume };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      state.engine.pause();
      return { ...state, playing: false };
    case NEXT:
      return {
        ...state,
        currentTime: 0,
        currentSong: state.currentSongIndex === state.songs.length - 1
          ? state.songs[0]
          : state.songs[state.currentSongIndex + 1],
        currentSongIndex: state.currentSongIndex === state.songs.length - 1
          ? 0
          : state.currentSongIndex + 1
      };
    case PREV:
      return {
        ...state,
        currentTime: 0,
        currentSong: state.currentSongIndex
          ? state.songs[state.currentSongIndex - 1]
          : state.songs[state.songs.length - 1],
        currentSongIndex: state.currentSongIndex
          ? state.currentSongIndex - 1
          : state.songs.length - 1
      };
    case SEEK:
      if (time >= 0 && time <= state.engine.duration) state.engine.currentTime = time;
      return { ...state, currentTime: state.engine.currentTime };
    default:
      return state;
  }
}
