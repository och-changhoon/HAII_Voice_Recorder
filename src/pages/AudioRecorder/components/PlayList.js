import { BsMic, BsSquareFill, BsDownload } from 'react-icons/bs';

export const PlayList = ({
  audioDataList,
  currTrack,
  setCurrTrack,
  isRecording,
  startRec,
  stopRec,
}) => {
  const clickDownloadBtn = index => {
    const url = URL.createObjectURL(audioDataList[index].data);
    const a = document.createElement('a');
    a.href = url;
    a.download = `음성녹음.mp3`;
    a.click();
    a.remove();
  };

  return (
    <div className="flex justify-center items-center flex-col w-1/3 max-w-[400px] min-w-[300px] p-[20px] h-screen bg-slate-100">
      <div className="flex justify-start items-end w-full h-full max-h-[100px] border-b-[3px]">
        <span className="text-3xl font-black pb-[10px]">Recorded List</span>
      </div>
      <div className="flex justify-start items-start flex-col w-full h-full py-[10px] overflow-auto">
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
                  <div className="flex items-center justify-between">
                    <p>Track {index}</p>
                    <BsDownload
                      className="text-sm cursor-pointer"
                      onClick={() => clickDownloadBtn(index)}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p>{data.date}</p>
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
  );
};
