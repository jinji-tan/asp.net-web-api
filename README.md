# Backend

### Commands
```bash
dotnet new webapi -n api
dotnet add package dapper
dotnet add package Microsoft.Data.SqlClient
dotnet add package Swashbuckle.AspNetCore --version 7.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet remove package Microsoft.AspNetCore.OpenApi
```

### Steps

#### 1. Setup Data DbContext and `appsettings.json`
```json
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=YOUR_DATABASE_NAME;Trusted_Connection=true;TrustServerCertificate=true;"
},
"Jwt": {
    "TokenKey": "Your_Super_Secret_Random_Key_That_Is_At_Least_64_Characters_LongaB3!dE7@hJ9#kL1%mN4^pQ6&rS8*tU0+vX2$yZ5!cF7@gH1!xY9#kL2&mN8@pQ7"
}
```

#### 2. Models and DTOs
#### 3. Helpers (Login and Register)
#### 4. Services (Token Service)
#### 5. Controllers

---

# Frontend

### Commands
```bash
npm create vite@latest frontend
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install react-scroll
npm install react-hook-form
```

### Steps
1. **Setup `vite.config.js`**
2. **First Services (`api.js`) API Fetch**
