import * as React from 'react';
interface AudioObject {
    title: string;
    authorName: string;
    imageUrl: string;
    audioUrl: string;
}
interface AudioPlayerProps {
    audioObjectArrays: AudioObject[];
}
declare const AudioPlayer: React.FC<AudioPlayerProps>;
export default AudioPlayer;
