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
}

/* 메인 화면 - 인원 선택 버튼 클릭 */
function select_peopleBtn() {
    document.getElementById("메인화면").style.display ='none';
    document.getElementById("인원선택화면").style.display = 'grid';
    console.log("인원 선택하기");
}

/* 메인 화면 - 열차 조회하기 버튼 클릭 */
function searchTrainBtn() {
    if (isDestinationSelected && isDataSelected && isTimeSelected && isPeopleSelected) {
        console.log("열차 조회하기");

        document.getElementById("메인화면").style.display ='none';
        document.getElementById("열차조회화면").style.display ='grid';
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
    if (isDestinationSelected) {
        document.getElementById("출발_도착_선택창").style.display = 'none';
        document.getElementById("나머지화면").style.display = 'grid';

        console.log("도착역 " + 도착역 + " 선택 완료");
    }
    else {
        console.log("도착역을 먼저 선택해주세요");
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
    if (isDataSelected && isTimeSelected) {
        document.getElementById("가는날_시간_선택화면").style.display = 'none';
        document.getElementById("가는날_text").innerText = 가는날 + 시간;
        document.getElementById("메인화면").style.display = 'grid';

        console.log("가는날/시간 " + 가는날 + "/" + 시간 + " 선택 완료");
    }
    else {
        console.log("가는날과 시간을 먼저 선택해주세요.");
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
    if (인원수 > 0 && isPeopleSelected) {
        document.getElementById("인원선택화면").style.display = 'none';
        document.getElementById("인원_text").innerText = 인원;
        document.getElementById("메인화면").style.display = 'grid';
    }
    else {
        console.log("인원을 최소 1명 이상 선택해주세요.");
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
    if (isTrainSelected) {
        console.log("열차 - " + 열차 + " 선택 완료");

        document.getElementById("열차조회화면").style.display = 'none';
        document.getElementById("좌석선택화면").style.display = 'grid';
    }
    else {
        console.log("열차를 선택해주세요");
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
    }
    else {
        console.log("인원수에 맞게 좌석을 선택해주세요");
    }
}

var install_before = null;
/* 결제 화면 - 할부 개월 버튼 클릭 */
function installmentBtn(element) {
    if (install_before == element) {
        isInstallmentSelected = false;
        install_before.removeAttribute('id');
        install_before = null;
        console.log("할부 기간 선택 취소");
        return;
    }
    isInstallmentSelected = true;

    element.id = "선택된_할부";

    if (install_before) {
        install_before.removeAttribute('id');
    }
    install_before = element;
    console.log("할부 기간 선택됨");
}

/* 결제 화면 - 결제하기 버튼 클릭 */
function paymentBtn() {
    if (isInstallmentSelected) {
        console.log("결제 완료!!");

        document.getElementById("결제화면").style.display = 'none';
        document.getElementById("완료화면").style.display = 'grid';
    }
    else {
        console.log("할부 기간을 먼저 선택해주세요.");
    }
}