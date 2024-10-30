# 預覽圖片畫面

提供一系列婚禮照片供使用者下載

### 使用方式  

把圖片丟進 `image` 資料夾中即可  

---

### 安裝方式  

`git clone ` 

`cd` 

`npm i` 

`npm run dev` : local模式： http://localhost:3000 可以看到畫面 

`npm run build` : generates an optimized version of your application for production

`npm run start` : run the built files.

---

#### 功能：

- [x] infinite scroll
      -> try : react-infinite-scroll-component  
      -> https://codesandbox.io/p/sandbox/439v8rmqm0?file=%2Fsrc%2Findex.js%3A3%2C29-3%2C60
- [x] flex arrange with button
- [x] multi-download  
      -> [x] make it be able to multiselect: maybe use a button to start select ? or long press ?  
             : implement by useHook library useLongPress, and prevent default contextMenu  
      -> [x] implement download  
      -> [x] implement multidownload : need test
      refer: https://www.youtube.com/watch?v=6T_tiHBEvq8&ab_channel=FahadCodeJourney  
             https://stackoverflow.com/questions/75204443/first-download-image-button-click-is-downloading-html-file-in-react-js-next-j
- [x] IMPORTANT ! make image smaller. current loading is too slow
      https://stackoverflow.com/questions/67402947/bulk-convert-entire-folder-of-images-with-sharp
      https://dev.to/dpnunez/nextjs-image-loading-with-blur-effect-a-step-by-step-guide-4f64
- [ ] download for origin picture


- [x] grid display in small picture
- [ ] modal to show big picture ? -> long press show big picture full size
- [ ] adjust some detail: 
      -> background image
      -> rwd
      -> change select button
--- 

#### Logs:

2024.10.28  
  project init.  
  photos display.  
  display-mode: three in rows.  

2024.10.29  
  implement infinite scroll.  
  add feature of multiselect.  
  add feature of download image.  

---
