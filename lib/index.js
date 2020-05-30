"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
// import classes from '*.module.css';
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function () { return ({
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
}); });
var source;
var startedAt;
var pausedAt;
var audioContext;
var scriptNode;
// Progress bar
var rate;
var offSetTimeForPause = 0;
var xPosition = 0;
// Audio Time
var minutes = 0;
var seconds = 0;
// to see if an audio is paused, so audio 1 is paused, but audio 2 is clicked to play, then audio should start at 0
var paused;
// isNew to determine whether an audio should play at start, for example, play forward or backward should has isNew as true.
// or an audio is paused and then play again, isNew should be false;
var isNew = true;
var AudioPlayer = function (_a) {
    var props = __rest(_a, []);
    var classes = useStyles();
    var _b = React.useState(0), playingIndex = _b[0], setPlayingIndex = _b[1];
    var _c = React.useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var _d = React.useState(0), audioDuration = _d[0], setAudioDuration = _d[1];
    var _e = React.useState(0), progressRate = _e[0], setProgressRate = _e[1];
    // audio info
    var _f = React.useState(''), title = _f[0], setTitle = _f[1];
    var _g = React.useState(''), authorName = _g[0], setAuthorName = _g[1];
    var _h = React.useState(''), imageUrl = _h[0], setImageUrl = _h[1];
    // const [audioUrl, setAudioUrl] = React.useState('');
    // TIMER
    var _j = React.useState(1), secondRunning = _j[0], setSecondRunning = _j[1];
    var _k = React.useState(0), minuteRunning = _k[0], setMinuteRunning = _k[1];
    var _l = React.useState(false), isActive = _l[0], setIsActive = _l[1];
    var resetTimer = function () {
        setSecondRunning(1);
        setProgressRate(0);
        setIsActive(false);
    };
    var pauseAudio = function () {
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
    };
    var playAudio = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, audioBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArrays[playingIndex].audioUrl;
                    return [4 /*yield*/, axios_1.default.get(url, {
                            responseType: 'arraybuffer',
                            headers: { 'Access-Control-Allow-Origin': '*' },
                        })];
                case 1:
                    response = _a.sent();
                    // setAudioUrl(props.audioObjectArrays[playingIndex].audioUrl);
                    setTitle(props.audioObjectArrays[playingIndex].title);
                    setAuthorName(props.audioObjectArrays[playingIndex].authorName);
                    setImageUrl(props.audioObjectArrays[playingIndex].imageUrl);
                    audioContext = getAudioContext();
                    return [4 /*yield*/, audioContext.decodeAudioData(response.data)];
                case 2:
                    audioBuffer = _a.sent();
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
                    }
                    else if (pausedAt && paused) {
                        startedAt = Date.now() - pausedAt;
                        source.start(0, pausedAt / 1000);
                        offSetTimeForPause = progressRate;
                    }
                    setIsActive(true);
                    setIsPlaying(true);
                    paused = false;
                    // progress bar
                    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer.numberOfChannels);
                    scriptNode.connect(audioContext.destination);
                    scriptNode.onaudioprocess = function (e) {
                        rate = offSetTimeForPause + (e.playbackTime * 100) / audioBuffer.duration;
                        setProgressRate(rate);
                    };
                    source.onended = function () {
                        setIsPlaying(false);
                        scriptNode.onaudioprocess = null;
                        if (playingIndex == props.audioObjectArrays.length - 1)
                            setPlayingIndex(0);
                        else
                            setPlayingIndex(playingIndex + 1);
                    };
                    return [2 /*return*/];
            }
        });
    }); };
    var playBackward = function () {
        stopPrevAudio();
        isNew = true;
        var nextIndex = playingIndex - 1;
        if (nextIndex < 0)
            setPlayingIndex(props.audioObjectArrays.length - 1);
        else
            setPlayingIndex(nextIndex);
    };
    var stopPrevAudio = function () {
        setIsActive(false);
        setSecondRunning(1);
        if (source != null) {
            source.stop();
            scriptNode.onaudioprocess = null;
            rate = 0;
        }
    };
    var playForward = function () {
        stopPrevAudio();
        isNew = true;
        var nextIndex = playingIndex + 1;
        if (nextIndex >= props.audioObjectArrays.length)
            setPlayingIndex(0);
        else
            setPlayingIndex(nextIndex);
    };
    var getAudioContext = function () {
        AudioContext = window.AudioContext;
        return new AudioContext();
    };
    var rewindTimer = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var rate, playbackTime, url, response, audioBuffer, progressTimeLocal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rate = ((e.clientX - xPosition) * 100) / e.target.offsetWidth;
                    playbackTime = (audioDuration * rate) / 100;
                    source.stop();
                    source.onended = null;
                    if (scriptNode != null)
                        scriptNode.onaudioprocess = null;
                    url = 'https://cors-anywhere.herokuapp.com/' + props.audioObjectArrays[playingIndex].audioUrl;
                    return [4 /*yield*/, axios_1.default.get(url, {
                            responseType: 'arraybuffer'
                        })];
                case 1:
                    response = _a.sent();
                    audioContext = getAudioContext();
                    return [4 /*yield*/, audioContext.decodeAudioData(response.data)];
                case 2:
                    audioBuffer = _a.sent();
                    source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    progressTimeLocal = (playbackTime / audioDuration) * 100;
                    setProgressRate(0);
                    setIsActive(true);
                    setIsPlaying(true);
                    paused = false;
                    setSecondRunning(Math.ceil(playbackTime % 60));
                    setMinuteRunning(Math.floor(playbackTime / 60));
                    source.start(0, playbackTime);
                    startedAt = Date.now() - playbackTime * 1000;
                    scriptNode = audioContext.createScriptProcessor(4096, audioBuffer.numberOfChannels, audioBuffer.numberOfChannels);
                    scriptNode.connect(audioContext.destination);
                    scriptNode.onaudioprocess = function (e) {
                        var newRate = progressTimeLocal + (e.playbackTime * 100) / audioBuffer.duration;
                        setProgressRate(newRate);
                    };
                    source.onended = function () {
                        setIsPlaying(false);
                        scriptNode.onaudioprocess = null;
                        if (playingIndex == props.audioObjectArrays.length - 1)
                            setPlayingIndex(0);
                        else
                            setPlayingIndex(playingIndex + 1);
                    };
                    return [2 /*return*/];
            }
        });
    }); };
    var getXPosition = function (el) {
        xPosition = el.getBoundingClientRect().x;
    };
    // TIMER
    React.useEffect(function () {
        var interval;
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
            interval = setInterval(function () {
                setSecondRunning(function (second) { return second + 1; });
            }, 1000);
        }
        else if (!isActive && secondRunning !== 0) {
            clearInterval(interval);
        }
        return function () { return clearInterval(interval); };
    }, [isActive, secondRunning]);
    React.useEffect(function () {
        // play audio
        console.log('playing new');
        isNew = true;
        // stop the rate of progress bar when a new audio is played
        if (scriptNode != null) {
            scriptNode.onaudioprocess = null;
        }
        playAudio();
    }, [playingIndex]); // starts at 0 index when users click an audio
    var audioPlayButtons;
    if (isPlaying) {
        audioPlayButtons = (React.createElement(React.Fragment, null,
            React.createElement("img", { alt: 'Back Button', src: 'images/backButton.png', onClick: playBackward }),
            React.createElement("img", { alt: 'Pause Button', src: 'images/pauseButton.png', onClick: pauseAudio }),
            React.createElement("img", { alt: 'Forward Button', src: 'images/forwardButton.png', onClick: playForward })));
    }
    else {
        audioPlayButtons = (React.createElement(React.Fragment, null,
            React.createElement("img", { alt: 'Back Button', src: 'images/backButton.png', onClick: playBackward }),
            React.createElement("img", { alt: 'Play Button', src: 'images/playButton.png', onClick: playAudio }),
            React.createElement("img", { alt: 'Forward Button', src: 'images/forwardButton.png', onClick: playForward })));
    }
    return (React.createElement("div", { style: { minWidth: '300px', textAlign: 'center', color: 'white' } },
        React.createElement("div", { className: classes.pictureContainer },
            React.createElement("div", { className: classes.pictureBorder },
                React.createElement("img", { className: classes.picture, alt: '', src: imageUrl }))),
        React.createElement("div", null,
            "Beat name: ",
            title),
        React.createElement("div", null,
            "Author name: ",
            authorName),
        React.createElement("progress", { ref: function (el) {
                // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
                if (!el)
                    return;
                getXPosition(el);
            }, onClick: rewindTimer, id: "timebar", value: progressRate, max: '100', style: { width: 200 } }),
        React.createElement("div", null,
            "Time: ",
            minuteRunning.toString().padStart(2, '0'),
            ":",
            secondRunning.toString().padStart(2, '0'),
            " / ",
            minutes.toString().padStart(2, '0'),
            ":",
            seconds.toString().padStart(2, '0')),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: ' center', alignContent: 'center' } }, audioPlayButtons)));
};
exports.default = AudioPlayer;
