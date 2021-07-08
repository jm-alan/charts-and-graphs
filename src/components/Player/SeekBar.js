import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PreQueue, Seek, SetSource, UpdateDuration } from '../../store/player';

export default function SeekBar () {
  const dispatch = useDispatch();

  const stateSrc = useSelector(state => state.player.src);
  const loaded = useSelector(state => state.player.loaded);
  const songCount = useSelector(state => state.player.songs.length);
  const currentTime = useSelector(state => state.player.currentTime);
  const currentDuration = useSelector(state => state.player.currentDuration);
  const engineSrc = useSelector(state => state.player.engine && state.player.engine.src);

  const currentMinute = Math.floor(currentTime / 60);
  const currentSecond = Math.round(currentTime % 60);
  const durationMinute = Math.floor(currentDuration / 60);
  const durationSecond = Math.round(currentDuration % 60);
  const timeStamp = `${currentMinute}:${currentSecond > 9 ? currentSecond : `0${currentSecond}`}`;
  const durationStamp = `${durationMinute}:${durationSecond > 9 ? durationSecond : `0${durationSecond}`}`;
  const progressWidth = (currentTime / (currentDuration || 1)) * 300;

  const onSeek = ({ nativeEvent: { offsetX } }) => {
    const positionPercentage = offsetX / 300;
    const preOp = Math.round((positionPercentage + Number.EPSILON) * 100);
    dispatch(Seek((preOp / 100) * currentDuration));
  };

  const onDrag = (e) => {
    e.stopPropagation();
    const positionPercentage = e.nativeEvent.offsetX / 300;
    const preOp = Math.round((positionPercentage + Number.EPSILON) * 100);
    dispatch(Seek((preOp / 100) * currentDuration));
  };

  useEffect(() => {
    if (songCount) dispatch(PreQueue());
  }, [dispatch, songCount]);

  useEffect(() => {
    if (engineSrc) {
      dispatch(SetSource(engineSrc));
    }
  }, [dispatch, engineSrc]);

  useEffect(() => {
    if (loaded && stateSrc) {
      setTimeout(() => {
        dispatch(UpdateDuration());
      }, 100);
    }
  }, [dispatch, loaded, stateSrc]);

  return (
    <div id='seekbar-container'>
      <div id='timestamp-position-container'>
        <div id='timestamp-container'>
          <div id='current-time-container'>
            {timeStamp} / {durationStamp}
          </div>
        </div>
      </div>
      <div
        id='seekbar-click-shroud'
        draggable
        onMouseDown={onSeek}
        onDrag={onDrag}
      />
      <div id='seekbar-wrapper'>
        <div
          id='seekbar-inner'
          style={{
            minWidth: progressWidth,
            maxWidth: progressWidth
          }}
        />
        <div
          id='seekbar-knob'
        />
      </div>
    </div>
  );
}
