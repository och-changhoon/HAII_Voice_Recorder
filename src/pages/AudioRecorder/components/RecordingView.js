export const RecordingView = ({ minute, second }) => {
  return (
    <>
      <div className="bg-base bg-play bg-center bg-no-repeat bg-cover w-full h-4/5" />
      <div className="flex items-center h-1/5 text-3xl font-mono">
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
    </>
  );
};
