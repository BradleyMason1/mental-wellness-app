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
