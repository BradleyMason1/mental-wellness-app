# ✅ Test Cases for FR1 - User Registration & Login

## ✅ Goal
Ensure users can securely register and log in using email and password.

---

### 🔍 Test Scenarios

| Test Case ID | Description | Input | Expected Output | Pass/Fail |
|--------------|-------------|-------|------------------|-----------|
| FR1-T1 | Valid registration | Email: test@mail.com, Pw: abc123 | Success message | ✅ Pass |
| FR1-T2 | Invalid email format | Email: bademail, Pw: abc123 | Show "invalid email" error | ✅ Pass |
| FR1-T3 | Short password | Email: test@mail.com, Pw: 12 | Show "password too short" | ✅ Pass |
| FR1-T4 | Valid login | Email: test@mail.com, Pw: abc123 | Logged in successfully | ✅ Pass |
| FR1-T5 | Wrong password | Email: test@mail.com, Pw: wrongpass | Show "invalid credentials" | ✅ Pass |


### 📋 Manual Test Steps
1. Start the backend server:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Send a POST request to `/register` with a valid email and password.
   - Example: `bkmaso01@outlook.com / bkmaso01`
   - Expect a success message and new user entry in `database/db.json`.
3. Try registering with an invalid email or short password.
   - Server responds with validation errors.
4. Send a POST request to `/login` with the valid credentials.
   - Response contains `"Login successful"` and a JWT token.
5. Use that token to call `/profile` with `Authorization: Bearer <token>`.
   - Profile data is returned, proving the token works.
6. Attempt to log in with the wrong password.
   - Server returns `"Invalid credentials"`.

These steps were followed using PowerShell's `Invoke-RestMethod` and confirmed that the authentication flow functions as expected.

From the terminal: Proof of calling a profile using the JWT token.

message : Login successful
token   : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMGM5NmIyZC1jNjY0LTRlMTMtODA3OS1mM2UwNjMyZjdkMjciLCJpYXQi
          OjE3NTI0NDM1NDAsImV4cCI6MTc1MjQ0NzE0MH0.j2J0MrkngftKgF8f7-K1YnjRRmMw64khIKJ8IJvQCb0



PS C:\Users\bkmas\mental-wellness-app> Invoke-RestMethod -Uri http://localhost:3000/profile `
>>   -Method GET `
>>   -Headers @{ Authorization = "Bearer $($response.token)" }

email
-----
bkmaso01@outlook.com


PS C:\Users\bkmas\mental-wellness-app>

