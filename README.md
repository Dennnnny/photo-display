# 預覽圖片畫面

提供一系列婚禮照片供使用者下載

### 使用方式  

~~把圖片丟進 `images` 資料夾中即可~~  

~~執行 `node ./src/utils/sharp.js ./src` => 圖片壓縮~~

壓縮過的圖片放在 `/blur` 資料夾中展示用  

下載時從 google storage 下載  

新增一個 `.env` 檔案  
裡面建立四個環境變數  
```
GOOGLE_PRIVATE_KEY=""
GOOGLE_CLIENT_EMAIL=""
GOOGLE_PROJECT_NAME=""
GOOGLE_BUCKET_NAME=""
```

壓縮圖片指令  
在 ./src/images 裡面放原圖，先確認已有 /images 資料夾  
執行 `npm run blur`  

---

### 安裝方式  

`git clone {專案}` 

`cd {專案資料夾}` 

`npm i` 

`npm run dev` : local模式： http://localhost:3000 可以看到畫面 

`npm run build` : 產生正式環境的程式

`npm run start` : 執行指令

---
