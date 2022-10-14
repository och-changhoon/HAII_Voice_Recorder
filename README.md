# 주식회사 하이 기업 과제 - 오디오 재생 프로그램 만들기

<img width="1440" alt="스크린샷 2022-10-14 오후 2 54 55" src="https://user-images.githubusercontent.com/107386533/195772663-87ad147d-bb2e-471d-8157-02837289d71b.png">


## 프로젝트 소개 
- 녹음 및 재생이 가능한 오디오 프로그램을 제작합니다. 
- 진행 기간 : 2022년10월11일 ~ 10월14일 
- 참여한 개발자 : 류승연, 오창훈, 조민재 

## 프로젝트 배포 링크
[오디오 재생 프로그램](https://comforting-choux-3f20d5.netlify.app) 

## 사용 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=black"> 

## 구현한 기능
  - 녹음 중 녹음 시간 표시 
  - 녹음된 음원 리스트 확인 및 음원별 재생 기능
  - 녹음된 음원 다운로드 
  - 녹음 및 재생 시 오디오 파형 표시 
  - 사용자에게 입력값을 받아 녹음 시간 컨트롤 

## 개인별 구현한 기능 및 코드 
- 류승연 
  - 레이아웃 및 UI 디자인 
  - 재생 시간 표시 기능
  - 녹음된 음원 다운로드 기능
  
  
- 오창훈
  - 레이아웃 및 UI 디자인 
  - 녹음 시간 표시 기능
  - 녹음 파일 리스트 화면 구현
  
  
- 조민재 
  - 녹음 시작 및 정지 기능 <br/>
    정지 버튼 클릭 시, 수집된 오디오데이터들을 배열에 저장하고 녹음을 정지합니다. 
    
  ```js
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
  ```
  - 입력값을 받아 제한 시간만큼만 녹음되는 기능 <br/>
   input창으로 제한 시간 입력값을 받고, `setTimeout`메서드를 사용하여 일정 시간이 지난 후 음원 데이터를 저장하고 정지하도록 합니다.
  
  ```js
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
        ```
