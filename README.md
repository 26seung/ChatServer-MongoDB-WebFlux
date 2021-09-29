# ChatServer-MongoDB-WebFlux
___

## 깃허브 이슈
- 에러 발생  (2021년 08월 13일 부로 , 더 이상 패스워드 기반 인증을 진행하지 않는다고 한다.)

<pre>
  remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
  remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
</pre>

해결 방법은 다음 `깃 ssh 인증`, `깃 토큰 인증` 두 가지 방법중 *SSH 인증방식* 을 사용하였다.

이유는 
1. RSA 방식의 (**비밀키**, **개인키**) 높은 보안성 
2. 등록시 ID,PW 값 입력 요구하지 않아 간편함
3. 토큰 인증 방식은 access-token 으로 기한설정 및 PW 값으로 **"토큰 값"** 을 항시 기입해야 하는 번거로움 

---
#### 1. SSH key 생성
>    ssh-keygen -t rsa  
* -t rsa : rsa 암호화 방식으로 키를 생성 하는 것 
* key 를 생성하는 동안 아무것도 입력하지말고 엔터키를 두번 입력.
<!---->
>    ssh-keygen -t ed25519 -C "yousi7@naver.com"
* key 를 생성하는 동안 아무것도 입력하지말고 엔터키를 두번 입력.
 
#### 2. 키 생성 완료
`ls -al` 커맨드 입력시 홈 디렉터리 내부에 *.ssh* 파일 생성 확인 가능  
`cd .ssh` 입력 하여 진입시 파일 생성 모습 

> <img width="504" alt="스크린샷 2021-09-23 오후 8 04 04" src="https://user-images.githubusercontent.com/79305451/134496563-5467a10c-43ce-4cb9-bae3-5ca5eaaab411.png">.   
>> * id_rsa: 개인키로 타인에게 노출되면 절대 안되는 Private Key .  
>> * 이 키를통해 암호화된 메시지를 복호화 할 수 있습니다.
>> * id_rsa.pub: 공개되어도 문제없는 Public Key 입니다.
>> * 해당 키로는 복호화를 할 수 없습니다.
 
그 후 "`cat id_ed25519.pub`" 입력 하여 공개키에 접근 하여 키값 확인
    
#### 3. 키 값 **깃허브** 등록
깃허브 웹 내부설정

    settings  ->  SSH and GPG keys  ->  New SSH key
에 위치한 [해당경로](https://github.com/settings/keys) 로 접근하여 공개키 값 입력하여 주면 등록이 완료된다.

<br/>

___

### 몽고 DB 사용 이유

- NoSQL 데이터 베이스 이다
- 네이티브 데이터로 비동기 처리에 유리하다

RDBMS
- 중복 ❌ (중복이 허용되지 않음)
- 데이터의 관계가 설정되어 있어 데이터의 변경이 쉬움
- 


MongoDB(NoSQL)
- 데이터를 조회하는 점에서 강점 보유
  - 관계형과 달리 테이블 하나만 조회 하기 때문에 편리
  - 많은 사용자가 한번에 사용 할 때 유리함
- 하지만 데이터의 일관성을 유지하기 어려움 (수정시 어려움)

---

스프링 5.0 서버 사용  
- Netty 서버 
- MongoDB 연결  

비동기 서버를 사용하면 DB도 비동기를 사용해야 한다.  
`RDBMS` 에도 `R2DBC` 라는 라이브러리를 사용하면 사용이 가능하다고 한다

도커 사용을 통해 작업 환경 준비
> docker run -p 27017:27017 --name chatDB -d mongo


