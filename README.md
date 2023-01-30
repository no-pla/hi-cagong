# Hi, Cagong

💻 혹시 카페에서 공부해 보신 적 있으신가요?

아니면 나도 카페에서 공부하고 싶은데, 어디로 가야할 지 고민하신 적 있으신가요?

작은 카페는 눈치 보이기도 하고, 카페 분위기도 궁금하고, 좋은 자리가 있는지 콘센트는 얼마나 있는지 한번쯤은 궁금하셨을 거라고 생각합니다.

**Hi, 카공은 카공 리뷰 사이트로 이 카페의 장단점, 평점, 나만의 명당 등을 공유할 수 있는 사이트입니다.**

## 팀원 (6 can do it)

- [@songjihyun-dev](https://www.github.com/songjihyun-dev)
- [@young-02](https://www.github.com/young-02)
- [@hyeongkyu88](https://www.github.com/hyeongkyu88)
- [@Imjaae](https://www.github.com/Imjaae)

## API Reference

#### Get cafe reviews

| 화면          | HTTP Verbs | Endpoints                    | Action                        |
| ------------- | ---------- | ---------------------------- | ----------------------------- |
| 회원가입      | POST       | /api/user/signup             | 회원가입                      |
| 로그인        | POST       | /api/user/login              | 가입된 유저가 로그인          |
| 디테일 페이지 | POST       | /api/${cafeId}/review        | 카페에 리뷰 작성              |
| 디테일 페이지 | GET        | /api/${cafeId}/review        | 카페 별 리뷰 출력             |
| 디테일 페이지 | DELETE     | /api/${cafeId}/review        | 작성한 리뷰를 삭제            |
| 마이 페이지   | PATCH      | /api/${userId}               | 프로필 사진, 닉네임 수정      |
| 메인 페이지   | GET        | /api/link/map/${keyword}     | 키워드에 맞는 지도, 카페 출력 |
| 디테일 페이지 | GET        | /api/link/roadview/${cafeId} | cafeId에 맞는 로드뷰 출력     |

## 기술 스택

**Client:** React, Recoil, Typescript, Javascript

**Server:** Firebase

## 스크린샷

### 메인 화면

![hi-cagong-main](https://user-images.githubusercontent.com/88391843/215370003-98f9311e-c13e-4cfc-9d8a-455c5bc81803.gif)


### 로그인 화면

![App Screenshot](https://user-images.githubusercontent.com/88391843/215369886-98329980-f39b-4c9f-84fd-00a1fafeee23.png)

### 회원가입 화면

![App Screenshot](https://user-images.githubusercontent.com/88391843/215369882-5b779662-1207-41c9-9a37-faebf9c4f6a0.png)

### 디테일 화면

![App Screenshot](https://user-images.githubusercontent.com/88391843/215369894-a7432a22-f071-4b41-ab44-3e4e637a7399.png)

### 마이 페이지 화면

![App Screenshot](https://user-images.githubusercontent.com/88391843/215369870-bf7ce229-4a3a-4144-a0e4-139d84f62445.png)

## Features

- 카카오맵 검색
- 카카오맵 로드뷰
- 리뷰 CRUD
- 카페 평점 기능
- 로그인/회원가입
- 깃허브/구글 로그인

## 배포

[Hi, Cagong](https://hi-cagong.vercel.app/)
