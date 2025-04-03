# 아기 방명록 - Baby Guestbook

**멋쟁이사자처럼 Team 1 - 아기사자를 위한 방명록 프로젝트**

![test-badge](https://github.com/LIKELION-SEOULTECH/BabyGuestbook-Front/actions/workflows/test.yml/badge.svg)

## ✨ Preview 🖥️

https://github.com/user-attachments/assets/0cf718bf-4a33-44b7-a46a-0df86995c256


## ⚙️ 설치 및 실행

### 1. 로컬 개발

```bash
npm install
npm run dev
```
> 📌 Note
> dev 모드에서 mock api를 사용하려면 `.env`파일에 아래의 항목을 추가하세용
>
> ```bash
> VITE_API_URL=http://localhost:5174
> ```
> 포트는 app이 로컬에서 실행되는 포트와 동일합니다.


### 2. 테스트
```bash
npm run test
```

### 3. Docker 빌드 & 실행
```bash
docker compose up --build
```

