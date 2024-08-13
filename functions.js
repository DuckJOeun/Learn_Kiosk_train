/* 
[키오스크 - 기차표 예매]

1. 메인 화면 
2. 출발/도착역 선택창
3. 가는날/시간 선택 화면
4. 인원 선택 화면
5. 열차 조회 화면
6. 좌석 선택 화면
7. 결제 화면
*/

/* 전역 변수 */
let isDestinationSelected = false;  // 도착지가 선택되었는지 여부
let isDataSelected = true;          // 가는날이 선택되었는지 여부
let isTimeSelected = true;          // 시간이 선택되었는지 여부
let isPeopleSelected = true;        // 인원이 선택되었는지 여부

let isTrainSelected = false;        // 열차가 선택되었는지 여부

let isInstallmentSelected = false;  // 할부기간이 선택되었는지 여부

let 출발역 = "동대구";
let 도착역 = " "; // 도착역

let 가는날 = "2024년 XX월 11일 (목) ";
let 시간 = "09:00"; // 출발 시간

var element_시간 = null;

let 인원수 = 1;
let 인원 = "어른 1명";
let peopleList = {
    어른: 1,
    어린이: 0,
    경로: 0,
};

let 열차 = "";

let 좌석선택수 = 0;
let seatList = {};

let 선택좌석 = "";

let 할부개월 = "";

let inst_idx = 0;
let to_next_inst = true;
let instructions = [
    "안녕하세요<br>만나서 반가워요<br><br>지금부터 저와<br>기차표를 예매하는 방법을<br>배워봐요",
    "키오스크의 첫 화면에서는<br>열차를 찾기 전에 필요한<br>정보들을 선택할 수 있어요",
    "동대구역에서 경주역으로 갈 거예요 <br><br> 먼저 \"도착지를 선택해주세요\" 버튼을 눌러 주세요",
]

/* 지시문 관련 변수 */
let 클릭_도착지버튼 = false;

var audio = new Audio('voice/voice_0_1.mp3');
audio.loop = false;
audio.autoplay = true;
audio.volume = 1.0;

/* 지시문 다음 버튼 */
function instBtn() {
    if (to_next_inst) {
        inst_write(instructions[inst_idx]);
        console.log("다음 버튼 클릭됨.");
        inst_idx += 1;

        switch (inst_idx) {
            case 1: 
                document.getElementById("다음지시").innerText = '다음';
                
                audio.play();

                break;
            case 2:
                document.getElementById("다음지시").innerText = '다음';
                
                audio.pause();
                audio.src = "voice/voice_0_2.mp3";
                audio.load();

                break;
            case 3:
                audio.pause(); 
                step1();
        }
    }
    else {
        console.log("먼저 미션을 완료해주세요.");
    }
}

function inst_write(string) {
    document.getElementById("instruction").innerHTML = string;
}

/* 튜토리얼 단계별 */
function step1() {
    /* 도착지 선택 */
    document.getElementById("다음지시").style.display = 'none';

    audio.src = "voice/voice_1_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        document.getElementById('지시부분_도착').style.border = '3px solid red';
        document.getElementById('지시부분_도착').style.pointerEvents = 'auto';
    }, {once : true});
}
function step1_1() {
    audio.pause();
    document.getElementById('지시부분_도착').style.border = 'none';
    document.getElementById('지시부분_도착').style.pointerEvents = 'none';

    /* 도착역 선택 */
    string = "도착지인 경주역을 선택한 후,<br>확인 버튼을 눌러 주세요";
    inst_write(string);

    audio.src = "voice/voice_1_2.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        document.getElementById("출발_도착_선택창").style.pointerEvents = 'auto';
        document.getElementById("출발_도착_선택창").style.border = '3px solid red';
        
        console.log('오디오 재생 완료됨.');
    }, {once : true});
}
function step1_2() {
    /* 가는날 선택 */
    string = "다음으로 가는날과 시간을<br>선택할 거예요 <br><br>가는날 선택 버튼을 눌러 주세요";
    inst_write(string);

    audio.src = "voice/voice_1_3.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        document.getElementById("지시부분_가는날").style.border = '3px solid red';
        document.getElementById("지시부분_가는날").style.pointerEvents = 'auto';
        
        console.log('오디오 재생 완료됨.');
    }, {once : true});
    
}
function step1_3() {
    /* 가는 시간 선택 */
    string = "오늘은 11일이에요<br><br>그리고 11시 이후에 출발하는 기차를 타려고 해요.";
    inst_write(string);

    audio.src = "voice/voice_1_4_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        string = "\"11시\"를 찾아서 선택한 후,<br>확인 버튼을 눌러 주세요";
        inst_write(string);

        audio.src = "voice/voice_1_4_2.mp3";
        audio.load();
        audio.addEventListener('ended', function() {
            document.getElementById("시간").style.border = '3px solid red';
            document.getElementById("가는날_시간_선택화면").style.pointerEvents = 'auto';
        }, {once:true});
    }, {once:true});
}
function step1_4() {
    document.getElementById("지시부분_가는날").style.border = 'none';
    document.getElementById("지시부분_가는날").style.pointerEvents = 'none';
    /* 인원 선택 */
    string = "다음으로 인원을 선택할 거예요<br><br>인원 선택 버튼을 눌러 주세요";
    inst_write(string);

    audio.src = "voice/voice_1_5.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        document.getElementById("지시부분_인원").style.border = '3px solid red';
        document.getElementById("지시부분_인원").style.pointerEvents = 'auto';
        console.log('오디오 재생 완료됨.');
    }, {once : true});
}   
function step1_5() {
    /* 연령별 인원 선택 */
    string = "(+) 버튼과 (-) 버튼을 눌러서<br>인원수를 바꿀 수 있어요";
    inst_write(string);

    audio.src = "voice/voice_1_6_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        string = "경로 1명과 어른 1명이<br>열차에 타려고 해요";
        inst_write(string);

        audio.src = "voice/voice_1_6_2.mp3";
        audio.load();

        audio.addEventListener('ended', function() {
            string = "(+) 또는 (-) 버튼을 눌러서<br>경로 1명과 어른 1명을<br>추가해주세요<br><br>완료되면 확인 버튼을 눌러주세요";
            inst_write(string);

            audio.src = "voice/voice_1_6_3.mp3";
            audio.load();
            
            audio.addEventListener('ended', function() {
                document.getElementById("인원선택화면").style.pointerEvents = 'auto';
                document.getElementById("지시부분_어른").style.border = '3px solid red';
                document.getElementById("지시부분_경로").style.border = '3px solid red';
            }, {once:true});
        }, {once:true});
    }, {once:true});
}
function step1_6() {
    /* 열차 조회하기 버튼 클릭 */
    string = "열차 조회를 위한 준비가 끝났어요<br><br>\"열차 조회하기\" 버튼을<br>눌러 주세요";
    inst_write(string);

    document.getElementById("지시부분_인원").style.border = 'none';
    document.getElementById("지시부분_인원").style.pointerEvents = 'none';

    audio.src = "voice/voice_1_7.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        document.getElementById("열차조회버튼").style.border = '2px solid red';
        document.getElementById("열차조회버튼").style.pointerEvents = 'auto';
        console.log('오디오 재생 완료됨.');
    }, {once : true});
}

function step2() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("열차조회화면").style.display ='grid';

    document.getElementById("다음지시").style.display = 'none';

    /* 열차 클릭 */
    string = "열차의 종류와 객실을<br>선택할 수 있는<br>[열차 조회] 화면이에요";
    inst_write(string);

    audio.src = "voice/voice_2_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        string = "제일 일찍 출발하는<br>무궁화호를 타려고 해요";
        inst_write(string);

        audio.src = "voice/voice_2_2.mp3";
        audio.load();

        audio.addEventListener('ended', function() {
            string = "무궁화호의 일반실을 선택한 후,<br>선택 완료 버튼을<br>눌러 주세요";
            inst_write(string);

            audio.src = "voice/voice_2_3.mp3";
            audio.load();

            audio.addEventListener('ended', function() {
                document.getElementById("열차조회화면").style.pointerEvents = 'auto';
            }, {once:true});
        }, {once:true});
    }, {once : true});
}

function step3() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("좌석선택화면").style.display ='grid';

    document.getElementById("다음지시").style.display = 'none';

    인원수 = 2;

    /* 좌석 선택 */
    string = "좌석을 선택할 수 있는<br>[좌석선택] 화면이에요";
    inst_write(string);

    audio.src = "voice/voice_3_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        string = "회색 자리는 선택할 수 없고,<br><br>흰색 자리만 선택할 수 있어요";
        inst_write(string);

        audio.src = "voice/voice_3_2.mp3";
        audio.load();

        audio.addEventListener('ended', function() {
            string = "흰색 좌석 중에서<br>두 개의 자리를 선택한 후,<br>선택 완료 버튼을 눌러 주세요";
            inst_write(string);

            audio.src = "voice/voice_3_3.mp3";
            audio.load();

            audio.addEventListener('ended', function() {
                document.getElementById("좌석선택화면").style.pointerEvents = 'auto';
            }, {once:true});
        }, {once:true});
    }, {once : true});
}

function step4() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("결제화면").style.display ='grid';

    document.getElementById("다음지시").style.display = 'none';
    
    /* 결제 */
    string = "앞의 화면들에서 선택한<br>예매 내용을 확인하고<br>결제할 수 있는<br>[결제] 화면이에요";
    inst_write(string);

    audio.src = "voice/voice_4_1.mp3";
    audio.load();

    audio.addEventListener('ended', function() {
        string = "일시불로 결제하려 해요<br><br> 할부 기간의 \"일시불\"을 누르고<br> \"결제/발권\" 버튼을 눌러 주세요";
        inst_write(string);

        audio.src = "voice/voice_4_2.mp3";
        audio.load();

        audio.addEventListener('ended', function() {
            document.getElementById("결제화면").style.pointerEvents = 'auto';
            document.getElementById("할부정보").style.border = '3px solid red';
        }, {once:true});
    }, {once:true});
}

function step5() {
    /* 완료! */
    string = "기차표 예매가<br>완료되었어요!<br><br>앞으로는 혼자서도<br>잘 할 수 있을 거예요";
    inst_write(string);

    audio.src = "voice/voice_5.mp3";
    audio.load();
}

/* 메인 화면 - 도착지 버튼 클릭 */
function destinationBtn() {
    console.log("도착지 선택하기");

    클릭_도착지버튼 = true;

    document.getElementById("나머지화면").style.display = 'none';
    document.getElementById("출발_도착_선택창").style.display = 'flex';

    step1_1();
}

/* 메인 화면 - 가는날 선택 버튼 클릭 */
function select_dateBtn() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("가는날_시간_선택화면").style.display = 'grid';
    console.log("가는날 선택하기");

    step1_3();
}

/* 메인 화면 - 인원 선택 버튼 클릭 */
function select_peopleBtn() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("인원선택화면").style.display = 'grid';
    console.log("인원 선택하기");

    step1_5();
}

/* 메인 화면 - 열차 조회하기 버튼 클릭 */
function searchTrainBtn() {
    if (isDestinationSelected && isDataSelected && isTimeSelected && isPeopleSelected) {
        console.log("열차 조회하기");

        document.getElementById("메인화면").style.display ='none';
        document.getElementById("열차조회화면").style.display ='grid';

        step2();
    }
    else {
        console.log("도착지, 가는날, 인원을 먼저 선택해주세요.");
    }
}

/* 도착역 선택창 - 역 버튼 클릭 */
function destStationBtn(id) {
    document.getElementById("station_도착").innerText = id;
    document.getElementById("station_도착").style.fontSize = 'x-large';

    도착역 = id;
    isDestinationSelected = true;
    console.log("도착역 " + 도착역 + " clicked!");
}

/* 도착역 선택창 - 확인 버튼 클릭 */
function destSelectedBtn() {
    if (isDestinationSelected && (도착역 == "경주")) {
        document.getElementById("출발_도착_선택창").style.display = 'none';
        document.getElementById("나머지화면").style.display = 'grid';

        console.log("도착역 " + 도착역 + " 선택 완료");
        step1_2();
    }
    else {
        console.log("도착역 <경주>를 선택해주세요");
    }
}

/* 가는날/시간 선택 화면 - 시간 버튼 클릭 */
function timeBtn(time, element) {
    시간 = time;
    isTimeSelected = true;

    element_시간 = document.getElementById("선택된_시간")
    if (element_시간) {
        element_시간.removeAttribute("id");
        element.id = "선택된_시간";

        document.getElementById("가는날_시간").innerText = 가는날 + 시간;
        console.log("출발 시간 " + 시간 + " clicked!");
    }
    else {
        console.log("시간 선택 오류!!");
    }
}

/* 가는날/시간 선택 화면 - 확인 버튼 클릭 */
function date_and_timeSelectedBtn() {
    if (isDataSelected && isTimeSelected && (시간 == "11:00")) {
        document.getElementById("가는날_시간_선택화면").style.display = 'none';
        document.getElementById("가는날_text").innerText = 가는날 + 시간;
        document.getElementById("메인화면").style.display = 'grid';

        console.log("가는날/시간 : " + 가는날 + "/ " + 시간 + " 선택 완료");
        step1_4();
    }
    else {
        console.log("가는날과 시간(11시)을 먼저 선택해주세요.");
    }
}

/* 인원 선택 화면 - '-' 버튼 클릭 */
function minusBtn(id) {
    if (peopleList[id] > 0) {
        peopleList[id] -= 1;

        인원수 -= 1;

        document.getElementById("인원수_" + id).innerText = peopleList[id];
        console.log(id + " 인원 1명 빼기 성공!");
        
        if (peopleList[id] == 0) {
            document.getElementById("minus_" + id).classList = 'isZero';
        }

        updatePeopleText();
    }
    else {
        console.log(id + "는 0명이라 더 줄일 수 없습니다.");
    }
}

/* 인원 선택 화면 - '+' 버튼 클릭 */
function plusBtn(id) {
    if (인원수 < 4 ) {
        peopleList[id] += 1;

        인원수 += 1;

        document.getElementById("인원수_" + id).innerText = peopleList[id];
        console.log(id + " 인원 1명 추가 성공!");

        if (peopleList[id] == 1) {
            document.getElementById("minus_" + id).removeAttribute("class");
        }

        updatePeopleText();
    }
    else {
        console.log("인원수는 4명을 초과할 수 없습니다.");
    }
}

/* 인원 선택 화면 - 총 인원 텍스트 업데이트 */
function updatePeopleText() {
    if (인원수 > 1) {
        인원 = "총 " + 인원수 + "명";
    }
    else if (인원수 == 1) {
        for (var key in peopleList) {
            if (peopleList[key] > 0) {
                인원 = key + " 1명";
                break;
            }
        }
    }
    else {
        인원 = "";
    }
    
    document.getElementById("총인원").innerText = 인원;
}

/* 인원 선택 화면 - 확인 버튼 클릭 */
function peopleSelectedBtn() {
    if ((인원수 == 2) && (peopleList['어른'] == 1) 
        && (peopleList['경로'] == 1) && isPeopleSelected) {
        document.getElementById("인원선택화면").style.display = 'none';
        document.getElementById("인원_text").innerText = 인원;
        document.getElementById("메인화면").style.display = 'grid';

        console.log("인원 선택 완료");
        step1_6();
    }
    else {
        console.log("어른 1명, 경로 1명을 선택해주세요.");
        console.log("어른: " + peopleList['어른']);
        console.log("경로: " + peopleList['경로']);
    }
}

var train_before = null;
/* 열차 선택 화면 - 열차/객실 선택*/
function trainBtn(id, element) {
    if (열차 == id) {
        열차 = "";
        isTrainSelected = false;

        element.removeAttribute('id');

        console.log("열차 선택 취소됨");

        train_before = null;
    }
    else {
        열차 = id;
        isTrainSelected = true;

        element.id = "선택된_열차";

        if (train_before) {
            train_before.removeAttribute('id');
        }
        train_before = element;
        console.log("열차-" + 열차 + " selected");
    }
    
}

/* 열차 선택 화면 - 선택완료 버튼 클릭 */
function trainSelectedBtn() {
    if (isTrainSelected && (열차 == "무궁화호 1791 (일반실)")) {
        console.log("열차 - " + 열차 + " 선택 완료");

        document.getElementById("열차조회화면").style.display = 'none';
        document.getElementById("좌석선택화면").style.display = 'grid';
    
        step3();
    }
    else {
        console.log("열차(무궁화호/일반실)를 선택해주세요");
    }
}

/* 좌석 선택 화면 - 좌석 선택 */
function seatBtn(id, element) {
    if (id in seatList) {
        delete seatList[id];

        element.classList.remove('선택된_좌석');

        console.log("좌석 " + id + " 선택 취소");
        console.log(seatList);

        좌석선택수 -= 1;        
    }
    else if (인원수 == 좌석선택수) {
        console.log("이미 좌석을 인원수만큼 선택했습니다.");
        return;
    }
    else {
        seatList[id] = 1;

        element.classList.add('선택된_좌석');

        console.log("좌석 " + id + " 선택!");
        console.log(seatList);

        좌석선택수 += 1;
    }
    updateSeatText();
}

/* 좌석 선택 화면 - 선택 좌석 정보 업데이트 */
function updateSeatText() {
    document.getElementById("좌석선택_총인원").innerText = 좌석선택수 + "명 좌석 선택 / 총 2명";
       
    if (좌석선택수 > 0) {
        선택좌석 ="1호차 ";
        var seatKey = Object.keys(seatList);

        for (var i=0; i<seatKey.length; i++) {
            선택좌석 += seatKey[i];
            if (i != seatKey.length-1)
                선택좌석 += ", ";
        }
        document.getElementById("호차_좌석").innerText = 선택좌석;
    }
    else {
        document.getElementById("호차_좌석").innerText = "";
    }  
}

/* 좌석 선택 화면 - 선택완료 버튼 클릭 */
function seatsSelectedBtn() {
    if (인원수 == 좌석선택수) {
        console.log("좌석 선택 완료");

        document.getElementById("좌석선택화면").style.display = 'none';
        document.getElementById("좌석정보").innerText = 선택좌석;
        document.getElementById("결제화면").style.display = 'grid';

        step4();
    }
    else {
        console.log("인원수에 맞게 좌석을 선택해주세요");
    }
}

var install_before = null;
/* 결제 화면 - 할부 개월 버튼 클릭 */
function installmentBtn(value, element) {
    if (install_before == element) {
        isInstallmentSelected = false;
        install_before.removeAttribute('id');
        install_before = null;
        할부개월 = "";

        console.log("할부 기간 선택 취소");
        return;
    }
    isInstallmentSelected = true;

    element.id = "선택된_할부";

    if (install_before) {
        install_before.removeAttribute('id');
    }
    install_before = element;
    할부개월 = value;
    console.log("할부 기간 선택됨");
}

/* 결제 화면 - 결제하기 버튼 클릭 */
function paymentBtn() {
    if (isInstallmentSelected && (할부개월 == "일시불")) {
        console.log("결제 완료!!");

        document.getElementById("결제화면").style.display = 'none';
        document.getElementById("완료화면").style.display = 'grid';

        step5();
    }
    else {
        console.log("할부 기간(일시불)을 먼저 선택해주세요.");
    }
}