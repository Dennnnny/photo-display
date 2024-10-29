# 預覽圖片畫面

提供一系列婚禮照片供使用者下載

### 使用方式  

把圖片丟進 `image` 資料夾中即可  

---

#### 功能：

- [x] infinite scroll
      -> try : react-infinite-scroll-component  
      -> https://codesandbox.io/p/sandbox/439v8rmqm0?file=%2Fsrc%2Findex.js%3A3%2C29-3%2C60
- [x] flex arrange with button
- [ ] multi-download  
      -> [x] make it be able to multiselect: maybe use a button to start select ? or long press ?  
             : implement by useHook library useLongPress, and prevent default contextMenu  
      -> [x] implement download  
      -> [x] implement multidownload : need test
      -> [ ] modal to show big picture ? -> long press show big picture full size
      refer: https://www.youtube.com/watch?v=6T_tiHBEvq8&ab_channel=FahadCodeJourney  
             https://stackoverflow.com/questions/75204443/first-download-image-button-click-is-downloading-html-file-in-react-js-next-j
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
