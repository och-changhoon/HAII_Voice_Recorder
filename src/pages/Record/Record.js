import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Record = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioData, setAudioData] = useState([]);
  const [limit, setLimit] = useState(0);

  const [blobUrl, setBlobUrl] = useState('');

  const navigate = useNavigate();

  const setLimitTime = e => {
    setLimit(e.target.value);
  };

  const startRec = () => {
    const audioCtx = new AudioContext();

    const analyser = audioCtx.createAnalyser();
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      if (Number(limit) > 0) {
        setTimeout(() => {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();

          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioData(e.data);
          };
        }, Number(limit) * 1000);

        const blob = new Blob(audioData, { type: 'audio/ogg codecs=opus' });
        audioData.splice(0);

        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);
      }
    });
  };

  const stopRec = () => {
    media.ondataavailable = function (e) {
      setAudioData(e.data);
    };
    const blob = new Blob(audioData, { type: 'audio/ogg codecs=opus' });
    audioData.splice(0);

    const blobURL = URL.createObjectURL(blob);
    setBlobUrl(blobURL);

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  };

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioData));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  return (
    <div>
      <input className="border" onChange={setLimitTime} />
      <button className="border bg-slate-300" onClick={startRec}>
        Record Start
      </button>
      <button className="border bg-red-500" onClick={stopRec}>
        Stop Record
      </button>
      <button className="border bg-blue-500" onClick={play}>
        Play
      </button>
      <audio controls src={blobUrl}>
        Play
      </audio>
      <button onClick={() => navigate(`/play`)}>Go to Play</button>
    </div>
  );
};
