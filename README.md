# 나만의 쇼핑몰 (E-Commerce)

## 프로젝트 소개 (Project Overview)
> React.js와 Firebase를 이용해 제작한 쇼핑몰 웹 사이트입니다
>
> An e-commerce website developed using React.js and Firebase.

<br/>

## 제작 계기 (Motivation for Development)
- React Query의 데이터 캐싱 기능을 사용해보고 싶어서 장바구니 기능이 포함된 쇼핑몰 사이트를 제작했습니다
- To explore the data caching capabilities of React Query, a shopping mall project with a cart feature was implemented.

<br/>

## 배포 링크 (Deployment Link)
[https://co-e-commerce.netlify.app/](https://co-e-commerce.netlify.app/)

<br/>

## 기능 (Features)
* 이미지 애니메이션
  - 기본적으로 이미지가 자동 전환되며 화살표 버튼을 통해 수동 전환도 가능함
* Image Animation
  - Automatic image transitions with manual controls using arrow buttons
  ![쇼핑몰_1](https://github.com/creamy-ocean/e-commerce/assets/93719660/0f3d681f-37d7-485e-bb97-92e42737b82c)
* 장바구니
  - 옵션을 선택한 뒤 상품을 장바구니에 담을 수 있음
* Shopping Cart
  - Add products to the cart after selecting options.
  ![쇼핑몰_2](https://github.com/creamy-ocean/e-commerce/assets/93719660/6db79e3e-023e-454a-a80f-a291664f72dc)
  - 상품의 개수를 조정할 때마다 가격이 실시간으로 계산됨
  - Real-time price calculation when adjusting the product quantity in the cart.
  ![쇼핑몰_3](https://github.com/creamy-ocean/e-commerce/assets/93719660/ff6d9992-1bf8-4299-aa7e-e8e9a3f2fd78)
* 새로운 상품 추가
  - 관리자 계정으로 로그인 시 관리자 페이지를 통해 새로운 상품을 추가할 수 있음
* Add New Products
  - Admin users can add new products through the admin page.
  ![쇼핑몰_4](https://github.com/creamy-ocean/e-commerce/assets/93719660/2a7bc654-5560-4c1a-9746-c88b4b6dc348)

## 기술 (Skills)
* React Query
  - 장바구니 상품 추가, 삭제 시 개수 실시간 반영
  - 관리자 페이지에서 새로운 상품 추가 시 즉시 상품 목록에 반영
* React Router
  - BrowserRouter를 이용해 CSR 구현
* Tailwind CSS
* Firebase Authentication, Realtime Database
* React Query
  - Real-time updates for adding/removing items in the cart.
  - Instantly reflects new products added via the admin page.
* React Router
  - Implemented client-side rendering (CSR) using BrowserRouter.
* Tailwind CSS
* Firebase Authentication and Realtime Database
  - Used for user authentication and real-time data management.
