# Project11-C-Web-FE-Performance-Monitoring-Server (@Acent)
## 개발 환경

![Javascript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Typescript](https://img.shields.io/badge/TypeScript-1.1-white?logo=typescript)
![React](https://img.shields.io/badge/React-1.1-9cf?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-v12.18.3-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-v12.18.3-red?logo=Express)
![MongoDB](https://img.shields.io/badge/MongoDB-2.1-darkgreen?logo=MongoDB)
![Docker](https://img.shields.io/badge/Docker-v12.18.3-blue?logo=docker)

# 배포 주소 

[http://101.101.208.107.xip.io/](http://101.101.208.107.xip.io/)

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

### flow chart
![flow](https://user-images.githubusercontent.com/22471977/102718878-fe104300-432d-11eb-8342-c7da191cc8e1.png)

## 프로젝트 구조

![project structure@2x (1)](https://user-images.githubusercontent.com/22471977/102718948-6101da00-432e-11eb-8ee3-84cf402a6dc4.png)

- 프론트엔드, 백엔드, SDK 모두 타입스크립트를 도입
- 프론트엔드와 백엔드 모두를 도커 컨테이너화하여 배포&운영
- docker-compose로 프론트엔드,백엔드를 도커 이미지 빌드, 컨테이너 자동 실행하도록 docker-compose.yml 작성
- Naver Cloud Platform 서버에 배포하여 운영중
- 자세한 사항은 아래 wiki를 참조 ▼
  - [프로젝트 구조](https://github.com/boostcamp-2020/Project11-C-Web-FE-Performance-Monitoring-Server/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)


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


