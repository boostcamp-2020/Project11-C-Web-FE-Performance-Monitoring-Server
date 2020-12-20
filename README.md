# Project11-C-Web-FE-Performance-Monitoring-Server (@Acent)

# 프로젝트 소개

![acent_image](./docs/image/acent.gif)

## Acent란?

- Acent는 웹 개발자 팀이 실시간으로 오류를 발견하고, 분류하고, 분석할 수 있도록 돕는 모니터링 시스템입니다.
- 서비스에 로그인하여 알맞은 프로젝트를 생성하고, 가이드에 따라 코드를 이식하는 것으로 사용이 가능합니다.

# 주요 기능

### 에러 및 로그 등의 이슈를 실시간으로 모니터링할 수 있습니다.

- 직접 서비스에 접속하지 않아도, 특정 이슈에 대해 이메일로 바로 알 수 있습니다.

### 에러 및 로그 분석을 용이하게 합니다.

- 운영체제, 브라우저 등의 환경, 그리고 어떤 요청으로 인해, 어떤 코드로 인해 발생할 수 있는지 보여줍니다.

### 에러 및 로그 등의 이슈들을 관리할 수 있습니다.

- Acent는 하나의 프로젝트에 여러 멤버를 초대하여 해당 이슈에 대한 해결 요청을 보낼 수 있습니다.

### 수집한 이슈들을 시각화하여 프로젝트의 문제점을 한눈에 파악할 수 있습니다.

- 어떤 종류의 이슈가 많이 발생하는지 알 수 있습니다.
- 어떤 날짜에 오류가 많이 발생했는지 알 수 있습니다.

# 팀원 소개

### J019\_권오민 (Web)

- [@ohmink](https://github.com/ohmink) 🦉
- SDK > Frontend > Backend
- SDK 구현 및 배포
- 프론트 화면 구현 및 전체 디자인
- 그 외 문서화

### J101\_신동민 (Web)

- [@NukeStorm](https://github.com/NukeStorm) 🚀
- Backend > SDK > Frontend
- 서버 api구현
- 프로젝트 배포 및 운영

### J127\_유현우 (Web)

- [@puba5](https://github.com/puba5)
- Frontend > Backend > SDK
- 프론트 화면 구현

### J213\_하지수 (Web)

- [@JeesooHaa](https://github.com/JeesooHaa) 🙈
- Frontend > Backend > SDK
- Admin 사이트 화면 구현
- 서버 API 구현

# 배포 주소 

[http://101.101.208.107.xip.io/](http://101.101.208.107.xip.io/)

# 기술 특장점

## Server

### 에러 로그 수집 및 실시간 분석에 MongoDB를 효율적으로 활용

![server_stack_image](./docs/image/server_stack.png)

- 에러로그 저장과 실시간 분석을 효율적으로 진행하기 위해 mongoDB를 사용하였습니다.
- sdk로부터 수집되는 에러 이벤트 로그를 저장하고 aggregation을 통한 실시간 로그 분석한 결과를 그래프 데이터로 반환하는 api를 구현하였습니다.
- MongoDB의 queryplanner을 활용하여 쿼리의 성능을 분석한 결과를 바탕으로 인덱싱을 적용하여 MongoDB 쿼리 성능을 향상시켰습니다.
- Mongoose ODM을 통해 model schema를 정의하여 각 collection의 document 데이터 구조의 일관성을 유지하여 schemaless DB로서의 단점을 보완하였습니다.

---

### Docker를 활용한 효율적인 개발/배포환경 구성

![docker_image](./docs/image/docker.png)

- **프론트엔드, 백엔드 ,DB, 모두 도커(Docker) 컨테이너화하여 인프라 구성/변경 및 배포를 쉽게 하도록 구성했습니다.**

- docker-compose와 DockerFile를 통해 다음 작업을 자동으로 실행합니다.
  - 프론트엔드 : 리액트 빌드 및 Nginx 환경설정 적용후 도커이미지 빌드 및 자동 컨테이너 실행
  - 백엔드 : express + pm2 클러스터 모드로 구성된 도커이미지 빌드 및 자동 컨테이너 실행
  - DB : mongoDB 이미지 다운로드 후 DB 환경설정 적용하여 컨테이너 실행

### 서버 이중화 및 로드밸런싱 적용

- **서버 이중화와 Nginx의 로드밸런서를 활용한 부하 분산**

  - express + pm2 클러스터 모드로 구성된 api 서버 두대를 사용하여 이중화
  - Nginx를 리버스 프록시로 사용하여 모든 요청은 80번 포트로 받도록 설정
  - Nginx가 포트 80번으로 오는 모든 요청중 /api에 해당하는 요청은 백엔드 서버 컨테이너 두곳으로 분배하여 부하를 분산
  - 로드 밸런싱 알고리즘은 라운드 로빈 방식, 두 서버에 균등하게 트래픽 분배
    - 라운드 로빈 :  클라이언트의 요청을 순서대로 분배하는 방식
  
![](https://user-images.githubusercontent.com/22471977/102606766-9eb60580-416a-11eb-9b8b-a91285cc3943.png)

### Express.js+PM2를 통해 Express.js 서버 성능 및 안정성 향상

- **Node.js 프로세스 매니저인 PM2 사용**

  - Node.js가 하나의 코어만을 활용하여 서버의 CPU를 온전히 활용하지 못하는 것을 방지
  - 프로세스 상태를 안정적으로 관리

- **여러 개의 expres.js 서버 프로세스를 클러스터 모드로 생성**

  - 성능과 안정성을 향상
  - 클러스터 모드로 동작시키기 위해 express.js 서버를 stateless하게 구현
  - 동작하는 서버의 CPU 코어에 비례하도록 인스턴스 실행

## Admin(Front)

![admin_stack_image](./docs/image/admin_stack.png)

### 웹팩&바벨

- 웹팩을 모듈 번들러로 사용해 코드를 하나의 파일로 압축시켰습니다.
- 바벨을 사용해 다양한 브라우저 환경에서도 코드가 정상적으로 동작하도록 했습니다.
- gzip 압축을 통해 번들링된 파일 크기를 크게 줄여 초기 로딩시간을 개선했습니다.

### Material-ui + Custom design

- Material-ui를 일부 사용하여 깔끔한 느낌의 디자인을 추가했습니다. 주로 버튼과 아이콘 등에 사용됩니다.
- Materail-ui의 깔끔함과 어두운 분위기의 커스텀 디자인을 결합하여, 차별성을 두었습니다.

## SDK

- Node, Broswer 환경 모두에서 에러를 수집할 수 있습니다.
- 공통 기능을 담당하는 **@acent/core**와 각 플랫폼을 담당하는 **@acent/node**, **@acent/browser** 등을 분리하여 이용자가 효율적으로 사용할 수 있습니다.
- process 객체를 이용하여 에러를 수집합니다.
- process의 정보와 os 모듈, 요청 등을 이용하여 에러 환경 및 정보를 수집합니다.
- window 객체를 이용하여 에러를 수집합니다.
- window의 정보와 navigator 모듈 등을 이용하여 에러 환경 및 정보를 수집합니다.
- 사용자가 커스텀으로 처리하는 에러를 수집할 수 있도록 기능을 제공합니다.
- 프로미스 에러 또한 수집합니다.

## 프로젝트 구조

![project structure@2x (1)](https://user-images.githubusercontent.com/22471977/102718948-6101da00-432e-11eb-8ee3-84cf402a6dc4.png)

### flow chart
![flow](https://user-images.githubusercontent.com/22471977/102718878-fe104300-432d-11eb-8342-c7da191cc8e1.png)

- 프론트엔드, 백엔드, SDK 모두 타입스크립트를 도입
- 프론트엔드와 백엔드 모두를 도커 컨테이너화하여 배포&운영
- docker-compose로 프론트엔드,백엔드를 도커 이미지 빌드, 컨테이너 자동 실행하도록 docker-compose.yml 작성
- Naver Cloud Platform 서버에 배포하여 운영중
- 자세한 사항은 아래 wiki를 참조 ▼
  - [프로젝트 구조](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)
  



## 프로젝트 구조

![project structure@2x (1)](https://user-images.githubusercontent.com/22471977/102718948-6101da00-432e-11eb-8ee3-84cf402a6dc4.png)

- 프론트엔드, 백엔드, SDK 모두 타입스크립트를 도입
- 프론트엔드와 백엔드 모두를 도커 컨테이너화하여 배포&운영
- docker-compose로 프론트엔드,백엔드를 도커 이미지 빌드, 컨테이너 자동 실행하도록 docker-compose.yml 작성
- Naver Cloud Platform 서버에 배포하여 운영중
- 자세한 사항은 아래 wiki를 참조 ▼
  - [프로젝트 구조](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)

## 개발 환경

![Javascript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Typescript](https://img.shields.io/badge/TypeScript-1.1-white?logo=typescript)
![React](https://img.shields.io/badge/React-1.1-9cf?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-v12.18.3-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-v12.18.3-red?logo=Express)
![MongoDB](https://img.shields.io/badge/MongoDB-2.1-darkgreen?logo=MongoDB)
![Docker](https://img.shields.io/badge/Docker-v12.18.3-blue?logo=docker)


### WiKi

[Wiki Link](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server/wiki)

# Repository

- ## [Server](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server)

  [![GitHub Open Issues](https://img.shields.io/github/issues-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server?color=green)](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server)
  [![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server?color=red)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Open PR](https://img.shields.io/github/issues-pr-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server?color=blue)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Closed PR](https://img.shields.io/github/issues-pr-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server?color=yellow)](https://github.com/boostcamp-2020/IssueTracker-2/issues)

- ## [Admin](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Admin) : 에러를 볼 수 있는 Front Page

  [![GitHub Open Issues](https://img.shields.io/github/issues-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Admin?color=green)](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server)
  [![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Admin?color=red)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Open PR](https://img.shields.io/github/issues-pr-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Admin?color=blue)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Closed PR](https://img.shields.io/github/issues-pr-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Admin?color=yellow)](https://github.com/boostcamp-2020/IssueTracker-2/issues)

- ## [SDK](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-SDK)

  [![GitHub Open Issues](https://img.shields.io/github/issues-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-SDK?color=green)](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server)
  [![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-SDK?color=red)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Open PR](https://img.shields.io/github/issues-pr-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-SDK?color=blue)](https://github.com/boostcamp-2020/IssueTracker-2/issues)
  [![GitHub Closed PR](https://img.shields.io/github/issues-pr-closed-raw/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-SDK?color=yellow)](https://github.com/boostcamp-2020/IssueTracker-2/issues)


