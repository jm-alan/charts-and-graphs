import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import test from '../../assets/test.mp3';
import ButtonBar from './ButtonBar';
import SeekBar from './SeekBar';
import { EnqueueSong, Load, Play, SetOnPlay, SetPlayer, UpdateTime } from '../../store/player';

export default function AudioPlayer () {
  const dispatch = useDispatch();

  const isPlaying = useSelector(state => state.player.playing);
  const currentSong = useSelector(state => state.player.currentSong);

  const audioRef = useRef(null);

  useEffect(() => {
    const player = audioRef.current;
    if (player) {
      const onPlay = () => dispatch(Play(player));
      dispatch(SetOnPlay(onPlay));
      dispatch(SetPlayer(player));
    }
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        dispatch(UpdateTime());
      }, 250);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [dispatch, isPlaying]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') dispatch(EnqueueSong(test));
  }, [dispatch]);

  useEffect(() => {
    if (currentSong) dispatch(Load());
  });

  return (
    <>
      <audio
        ref={audioRef}
        id='audio-player-original'
        src={currentSong}
      >
        Your browser does not support audio playback
      </audio>
      <div id='audio-player-new'>
        <ButtonBar />
        <SeekBar />
      </div>
    </>
  );
}
