import { useState, useEffect } from 'react';
import { Player, PlayList, StandByView, RecordingView } from '.';

export const AudioRecorder = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioDataList, setAudioDataList] = useState([]);
  const [limit, setLimit] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [currTrack, setCurrTrack] = useState();
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(0);

  const setLimitTime = e => {
    setLimit(e.target.value);
  };

  const startRec = () => {
    setIsRecording(true);

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

          setLimit(0);
          setIsRecording(false);

          mediaRecorder.ondataavailable = function (e) {
            setAudioDataList(() => {
              const prevAudioDataList = [...audioDataList];
              prevAudioDataList.push({
                data: e.data,
                date: new Date()
                  .toISOString()
                  .replace('T', ' ')
                  .substring(0, 19),
                time: `${minute}:${second}`,
              });
              setAudioDataList(prevAudioDataList);
            });
          };
        }, Number(limit) * 1000);

        stopTimer();
      }
    });
  };

  const stopRec = () => {
    media.ondataavailable = function (e) {
      setAudioDataList(() => {
        const prevAudioDataList = [...audioDataList];
        prevAudioDataList.push({
          data: e.data,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          time: `${minute}:${second}`,
        });
        setAudioDataList(prevAudioDataList);
      });
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();

    setIsRecording(false);
    stopTimer();
  };

  useEffect(() => {
    let intervalId;

    if (isRecording) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter(counter => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRecording, counter]);

  const stopTimer = () => {
    setCounter(0);
    setSecond('00');
    setMinute('00');
  };

  return (
    <div className="flex justify-center items-center font-pretendard">
      {/* 981px 언더 반응형 */}
      <PlayList
        audioDataList={audioDataList}
        currTrack={currTrack}
        setCurrTrack={setCurrTrack}
        isRecording={isRecording}
        startRec={startRec}
        stopRec={stopRec}
      />

      <div className="flex justify-center items-center flex-col w-full h-screen bg-slate-500 text-white">
        {currTrack >= 0 ? (
          <Player src={URL.createObjectURL(audioDataList[currTrack].data)} />
        ) : isRecording ? (
          <RecordingView minute={minute} second={second} />
        ) : (
          <StandByView setLimitTime={setLimitTime} />
        )}
      </div>
    </div>
  );
};
