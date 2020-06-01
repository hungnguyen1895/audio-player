import * as React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

interface AudioObject {
  title: string,
  authorName: string,
  imageUrl: string,
  audioUrl: string
}

interface AudioPlayerProps { 
  audioObjectArray: AudioObject[],
  style?: React.CSSProperties
}

const useStyles = makeStyles(() => ({
  pictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureBorder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    height: 110,
    width: 110,
    border: 'solid rgb(208, 53, 30) 1px',
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: '50%'
  }
}));

let source:AudioBufferSourceNode;
let startedAt: number;
let pausedAt: number;
let audioContext: AudioContext;
let scriptNode: ScriptProcessorNode;

// Progress bar
let rate: number;
let offSetTimeForPause: number = 0;
let xPosition: number = 0;

// Audio Time
let minutes: number = 0;
let seconds: number = 0;

// to see if an audio is paused, so audio 1 is paused, but audio 2 is clicked to play, then audio should start at 0
let paused: boolean;

// isNew to determine whether an audio should play at start, for example, play forward or backward should has isNew as true.
// or an audio is paused and then play again, isNew should be false;
let isNew: boolean = true;

const AudioPlayer: React.FC<AudioPlayerProps> = ({...props}) => {
  const classes = useStyles();

  const [playingIndex, setPlayingIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [progressRate, setProgressRate] = React.useState(0);

  // audio info
  const [title, setTitle] = React.useState('');
  const [authorName, setAuthorName] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  // const [audioUrl, setAudioUrl] = React.useState('');

  // TIMER
  const [secondRunning, setSecondRunning] = React.useState(1);
  const [minuteRunning, setMinuteRunning] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const resetTimer = () => {
    setSecondRunning(1);
    setProgressRate(0);
    setIsActive(false);
  }

  const pauseAudio = () => {

    isNew = false;

    // testing
    source.onended = null;
    if (scriptNode != null)
      scriptNode.onaudioprocess = null;

    source.stop();
    setIsActive(false);
    pausedAt = Date.now() - startedAt;
    setIsPlaying(false);
    paused = true;
  }

  const playAudio = async () => {
    const url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArray[playingIndex].audioUrl;
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {'Access-Control-Allow-Origin': '*'},
    });

    // setAudioUrl(props.audioObjectArray[playingIndex].audioUrl);
    setTitle(props.audioObjectArray[playingIndex].title);
    setAuthorName(props.audioObjectArray[playingIndex].authorName);
    setImageUrl(props.audioObjectArray[playingIndex].imageUrl);
    
    audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(response.data);
    setAudioDuration(Math.ceil(audioBuffer.duration));

    minutes = Math.floor(Math.ceil(audioBuffer.duration) / 60);
    seconds = Math.ceil(audioBuffer.duration) % 60;

    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    if (isNew) {
      startedAt = Date.now();
      source.start();
      setSecondRunning(1);
      setMinuteRunning(0);

      // progress rate always start at 0 for new audio
      setProgressRate(0);
      offSetTimeForPause = 0;
    } else if (pausedAt && paused) {
      startedAt = Date.now() - pausedAt;
      source.start(0, pausedAt / 1000);
      offSetTimeForPause = progressRate;
    }

    setIsActive(true);
    setIsPlaying(true);
    paused = false;

    // progress bar
    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer. numberOfChannels);
    scriptNode.connect(audioContext.destination);

    scriptNode.onaudioprocess = (e: any) => {
      rate = offSetTimeForPause + (e.playbackTime * 100) / audioBuffer.duration;
      setProgressRate(rate);
    }

    source.onended = () => {
      setIsPlaying(false);
      scriptNode.onaudioprocess = null;

      if (playingIndex == props.audioObjectArray.length - 1)
          setPlayingIndex(0);
        else 
          setPlayingIndex(playingIndex + 1);
    }
  }

  const playBackward = () => {
    stopPrevAudio();

    isNew = true;

    let nextIndex = playingIndex - 1;
    if (nextIndex < 0)
      setPlayingIndex(props.audioObjectArray.length - 1);
    else
      setPlayingIndex(nextIndex);
  }

  const stopPrevAudio = () => {
    setIsActive(false);
    setSecondRunning(1);
    if (source != null) {
      source.stop();
      scriptNode.onaudioprocess = null;
      rate = 0;
    }
  }

  const playForward = () => {
    stopPrevAudio();

    isNew = true;

    let nextIndex = playingIndex + 1;
    if (nextIndex >= props.audioObjectArray.length)
      setPlayingIndex(0);
    else
      setPlayingIndex(nextIndex);
  }

  const getAudioContext = () => {
    AudioContext = window.AudioContext;
    return new AudioContext();
  }

  const rewindTimer = async (e: any) => {
    const rate:number = ((e.clientX - xPosition) * 100) / e.target.offsetWidth;
    const playbackTime:number = (audioDuration * rate) / 100;

    source.stop();
    source.onended = null;

    if (scriptNode != null)
      scriptNode.onaudioprocess = null;

    const url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArray[playingIndex].audioUrl;
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(response.data);

    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    let progressTimeLocal = (playbackTime / audioDuration) * 100;    
    setProgressRate(0);

    setIsActive(true);
    setIsPlaying(true);
    paused = false;

    setSecondRunning(Math.ceil(playbackTime%60));
    setMinuteRunning(Math.floor(playbackTime / 60));


    source.start(0, playbackTime);

    startedAt = Date.now() - playbackTime * 1000;

    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer. numberOfChannels);
    scriptNode.connect(audioContext.destination);

    scriptNode.onaudioprocess = (e) => {
      let newRate = progressTimeLocal + (e.playbackTime * 100) / audioBuffer.duration;
      setProgressRate(newRate);
    }

    source.onended = () => {
      setIsPlaying(false);
      scriptNode.onaudioprocess = null;
      
      if (playingIndex == props.audioObjectArray.length - 1)
        setPlayingIndex(0);
      else 
        setPlayingIndex(playingIndex + 1);
    }
  }
  
  const getXPosition = (el: any) => {
    xPosition = el.getBoundingClientRect().x;
  }

  // TIMER
  React.useEffect(() => {
    let interval: any;
    if (secondRunning >= 60) {
      setSecondRunning(0);
      setMinuteRunning(minuteRunning + 1);
    }
    if (audioDuration !== 0) {
      if (audioDuration === secondRunning + minuteRunning * 60) {
        clearInterval(interval);

        isNew = true;
        resetTimer();
      }
    }  
    if (isActive) {
      interval = setInterval(() => {
        setSecondRunning(second => second + 1);
      }, 1000);
    } else if (!isActive && secondRunning !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, secondRunning]);

  React.useEffect(() => {
    // play audio
    console.log('playing new');
    isNew = true;

    // stop the rate of progress bar when a new audio is played
    if (scriptNode != null ) {
      scriptNode.onaudioprocess = null;
    }
      

    playAudio();

  }, [playingIndex]); // starts at 0 index when users click an audio
  let audioPlayButtons;

  if (isPlaying) {
    audioPlayButtons = (
      <>
        <img alt='Back Button' src='images/backButton.png' onClick={playBackward}></img>
        <img alt='Pause Button' src='images/pauseButton.png' onClick={pauseAudio}></img>
        <img alt='Forward Button' src='images/forwardButton.png' onClick={playForward}></img>
      </>
    );
  } else {
    audioPlayButtons = (
      <>
        <img alt='Back Button' src='images/backButton.png' onClick={playBackward}></img>
        <img alt='Play Button' src='images/playButton.png' onClick={playAudio}></img>
        <img alt='Forward Button' src='images/forwardButton.png' onClick={playForward}></img>
      </>
    )
  }

  return (
    <div style={props.style}>
      <div className={classes.pictureContainer}>
        <div className={classes.pictureBorder}>
          <img className={classes.picture} alt='' src={imageUrl}></img>
        </div>
      </div>
      <div>Beat name: {title}</div>
      <div>Author name: {authorName}</div>
      <progress
        ref={el => {
          // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
          if (!el) return;

          getXPosition(el);
        }}
       onClick={rewindTimer} id="timebar" value={progressRate} max='100' style={{width: 200}}
       >
       </progress>
      <div>Time: {minuteRunning.toString().padStart(2, '0')}:{secondRunning.toString().padStart(2, '0')} / {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:' center', alignContent: 'center'}}>
        {audioPlayButtons}  
      </div>
      
    </div>
  );
};

export default AudioPlayer;

