export const StandByView = ({ setLimitTime }) => {
  return (
    <>
      <div className="bg-base bg-stop bg-center bg-no-repeat bg-cover w-full h-4/5" />
      <div className="flex flex-col justify-center items-center h-1/5 leading-loose">
        녹음을 시작하려면 녹음 버튼을 클릭하십시오.
        <span>
          타이머 지정 시{' '}
          <input
            className="border w-12 text-center text-black"
            onChange={e => setLimitTime(e)}
          />{' '}
          초 동안 녹음하기
        </span>
      </div>
    </>
  );
};
