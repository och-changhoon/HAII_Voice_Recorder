import { Fragment, useState } from 'react';
import { BsMic, BsPlayFill, BsSquareFill } from 'react-icons/bs';

export const Record = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioData, setAudioData] = useState([]);
  const [audioDataList, setAudioDataList] = useState([]);
  const [limit, setLimit] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currTrack, setCurrTrack] = useState();

  const [blobUrl, setBlobUrl] = useState('');

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

        setIsRecording(false);
      }
    });

    setIsRecording(true);
  };

  const stopRec = () => {
    media.ondataavailable = function (e) {
      // setAudioData(e.data);
      setAudioData(() => {
        const prevAudioData = [...audioData];
        prevAudioData.push(e.data);
        setAudioData(prevAudioData);
      });
      setAudioDataList(() => {
        const prevAudioDataList = [...audioDataList];
        prevAudioDataList.push({
          data: e.data,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          time: '00:04',
        });
        setAudioDataList(prevAudioDataList);
      });
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

    setIsRecording(false);
  };

  const play = index => {
    if (index >= 0) {
      const audio = new Audio(URL.createObjectURL(audioDataList[index].data));
      audio.loop = false;
      audio.volume = 1;
      audio.play();
    }
  };

  console.log(currTrack);
  console.log('audioDataList: ', audioDataList);

  return (
    <div className="flex justify-center items-center">
      {/* 981px 언더 반응형 */}
      <div className="flex justify-center items-center flex-col w-1/3 max-w-[400px] min-w-[300px] p-[20px] h-screen bg-slate-100">
        <div className="flex justify-start items-end w-full h-full max-h-[100px] border-b-[3px]">
          <span className="text-3xl font-black pb-[10px]">Recorded List</span>
        </div>
        <div className="flex justify-start items-start flex-col w-full h-full py-[10px] overflow-scroll">
          {audioDataList &&
            audioDataList.map((data, index) => {
              return (
                <div
                  className={`${
                    currTrack === index &&
                    'border-l-[5px] border-red-500 bg-slate-50'
                  } flex justify-center items-start flex-col w-full min-h-[75px]`}
                  key={index}
                  onClick={() =>
                    currTrack === index ? setCurrTrack() : setCurrTrack(index)
                  }
                >
                  <div
                    className={`${
                      currTrack === index ? 'pl-[15px]' : 'pl-[20px]'
                    } pr-[20px] w-full`}
                  >
                    <p>Track {index}</p>
                    <div className="flex justify-between items-center w-full">
                      <p>{data.date}</p>
                      <p>{data.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center w-full h-full pt-[20px] border-t-[3px] max-h-[150px]">
          {!isRecording ? (
            <button
              className="flex justify-center items-center w-[75px] h-[75px] rounded-full bg-red-500"
              onClick={startRec}
            >
              <BsMic className="text-4xl" />
            </button>
          ) : (
            <button
              className="flex justify-center items-center w-[75px] h-[75px] rounded-full bg-red-500"
              onClick={stopRec}
            >
              <BsSquareFill className="text-3xl" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center flex-col w-full h-screen bg-slate-500">
        {currTrack >= 0 ? (
          <Fragment>
            <input className="border" onChange={setLimitTime} />
            <button
              className="flex justify-center items-center w-[75px] h-[75px] rounded-full bg-blue-500"
              onClick={() => play(currTrack)}
            >
              <BsPlayFill className="text-3xl" />
            </button>
            <audio controls src={blobUrl}>
              Play
            </audio>
          </Fragment>
        ) : (
          <div className="text-base">
            녹음을 시작하려면 녹음 버튼을 클릭하십시오.
          </div>
        )}
      </div>
    </div>
  );
};
