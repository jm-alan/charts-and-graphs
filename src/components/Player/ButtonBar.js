import { useDispatch, useSelector } from 'react-redux';

import VolumeSlider from './VolumeSlider';
import { Pause } from '../../store/player';

export default function ButtonBar () {
  const dispatch = useDispatch();

  const onPlay = useSelector(state => state.player.onPlay);
  const isPlaying = useSelector(state => state.player.playing);
  const currentSong = useSelector(state => state.player.currentSong);

  const onPause = () => dispatch(Pause());

  return (
    <div id='button-bar'>
      <div className='player-button'>
        Prev
      </div>
      <VolumeSlider />
      <div className='player-button'>
        Mute
      </div>
      {isPlaying
        ? (
          <div
            className='player-button'
            onClick={onPause}
          >
            Pause
          </div>
          )
        : (
          <div
            className={`player-button${
              currentSong ? '' : ' disabled'
            }`}
            onClick={currentSong && onPlay}
          >
            Play
          </div>
          )}
      <div className='player-button'>
        Next
      </div>
    </div>
  );
}
