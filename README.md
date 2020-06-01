# brainbeat-audio-player

# Installation
React: 13.10.1
```
npm i brainbeats-audio-player
```
or
```
yarn add brainbeats-audio-player
```

# Properties for the component
style?: React.CSSProperties
audioObjectArray: AudioObject[]

where AudioObject is:
interface AudioObject {
  title: string,
  authorName: string,
  imageUrl: string,
  audioUrl: string
}

# Usage
```
import AudioPlayer from 'brainbeats-audio-player';

const Player = () => {
  <AudioPlayer 
    style={{textAlign: 'center', color: 'white', width: '100%'}} 
    audioObjectArray={audioObjectArray} 
  />
}
```
