# E-Commerce - Online Shopping Mall

## Project Overview
<!--
> React.js와 Firebase를 이용해 제작한 쇼핑몰 웹 사이트입니다
>-->
> An e-commerce website developed using React.js and Firebase, featuring a real-time shopping cart system and admin product management.

<br/>

## Motivation
<!--
- React Query의 데이터 캐싱 기능을 사용해보고 싶어서 장바구니 기능이 포함된 쇼핑몰 사이트를 제작했습니다
-->
- To explore React Query's data caching capabilities by implementing a real-time shopping cart feature
- To practice styling approaches using Tailwind CSS utility classes

<br/>

## Live Demo
[https://co-e-commerce.netlify.app](https://co-e-commerce.netlify.app)

<br/>

## Features
<!--
* 이미지 애니메이션
  - 기본적으로 이미지가 자동 전환되며 화살표 버튼을 통해 수동 전환도 가능함
  ![쇼핑몰_1](https://github.com/creamy-ocean/e-commerce/assets/93719660/0f3d681f-37d7-485e-bb97-92e42737b82c)
* 장바구니
  - 옵션을 선택한 뒤 상품을 장바구니에 담을 수 있음
  ![쇼핑몰_2](https://github.com/creamy-ocean/e-commerce/assets/93719660/6db79e3e-023e-454a-a80f-a291664f72dc)
  - 상품의 개수를 조정할 때마다 가격이 실시간으로 계산됨
  ![쇼핑몰_3](https://github.com/creamy-ocean/e-commerce/assets/93719660/ff6d9992-1bf8-4299-aa7e-e8e9a3f2fd78)
* 새로운 상품 추가
  - 관리자 계정으로 로그인 시 관리자 페이지를 통해 새로운 상품을 추가할 수 있음
  ![쇼핑몰_4](https://github.com/creamy-ocean/e-commerce/assets/93719660/2a7bc654-5560-4c1a-9746-c88b4b6dc348)
-->
### Image Carousel
  - Automatic image transitions with manual navigation using arrow buttons
  <img width="760" alt="Main page" src="https://github.com/user-attachments/assets/449a5646-3330-4fd2-92fc-555b6d9aca15" />

### Shopping Cart
  - Add products to cart with customisable options
  - Real-time cart item count updates
  - Dynamic price calculation based on quantity adjustments
  <img width="760" alt="Details Page" src="https://github.com/user-attachments/assets/90bc0d51-3503-4e7a-8be2-36bec9bf0ec3" />
  <img width="760" alt="Shopping Cart Page" src="https://github.com/user-attachments/assets/7390b8e8-2dba-4342-8833-3ee13799ec3f" />

### Admin Dashboard
  - Admin users can add new products through an admin page
  - Newly added products appear instantly in the product list
  <img width="760"  alt="Admin Page" src="https://github.com/user-attachments/assets/926f4bd2-a8fa-4c80-90ed-312ee1e46420" />


## Tech Stack
<!--
* React Query
  - 장바구니 상품 추가, 삭제 시 개수 실시간 반영
  - 관리자 페이지에서 새로운 상품 추가 시 즉시 상품 목록에 반영
* React Router
  - BrowserRouter를 이용해 CSR 구현
* Tailwind CSS
* Firebase Authentication, Realtime Database
-->
### Frontend

**React Query**
  - Real-time updates for adding/removing items in the cart
  - Instantly reflects new products added via the admin page
    
**React Router**
  - Implemented client-side routing using BrowserRouter
    
**Tailwind CSS**
  - Adopted adaptive design using Tailwind CSS

### Backend

**Firebase Authentication**
  - Secure user authentication with Google OAuth
    
**Firebase Realtime Database**
  - Real-time data synchronisation for cart and products
    
**Firebase Storage**
  - Image hosting for product photos
