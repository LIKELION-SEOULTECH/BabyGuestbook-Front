import axios from "axios";

// axios 인스턴스 생성
export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// 요청 인터셉터 설정
// 401 에러, 인증이 필요한 경우 처리
client.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: {
        response: {
            status: number;
        };
    }) => {
        if (error.response.status === 401) {
            alert("로그인이 필요합니다.");
            //   window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
