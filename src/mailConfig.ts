import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
 *
 * nodemailer 설정
 * google 하루 전송량 500개로 제한되어 네이버 기준으로 구현
 */

const config = {
  port: process.env.SMTP_PORT, // smtp 서버 포트 네이버 : 587
  smtpServerURL: process.env.SMTP_SERVER_URL, // smtp서버 url 네이버 :smtp.naver.com
  authUser: process.env.SMTP_AUTH_USER, // smtp 메일계정 -본인 네이버 메일
  authPass: process.env.SMTP_AUTH_PASS, // smtp 메일계정 비밀번호 - 본인 네이버계정비밀번호
  fromEmail: process.env.MAIL_FROM.replace(
    // 발신자 표시
    '${SMTP_AUTH_USER}',
    process.env.SMTP_AUTH_USER
  ),
  service: process.env.MAIL_SERVICE, // 서비스명 네이버 :Naver
};
export default config;
