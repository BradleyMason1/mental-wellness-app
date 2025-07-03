# 🧠 Test Cases for FR2 - Daily Mood Logging

## ✅ Goal
Allow users to log their mood each day with a rating and optional note.

---

### 🔍 Test Scenarios

| Test Case ID | Description | Input | Expected Output | Pass/Fail |
|--------------|-------------|-------|------------------|-----------|
| FR2-T1 | Valid mood entry | Mood: 4, Note: "Feeling good" | Entry saved successfully | ✅ |
| FR2-T2 | Mood only, no note | Mood: 3 | Entry saved successfully | ✅ |
| FR2-T3 | No mood selected | (empty input) | Show warning: "Please select a mood" | ✅ |
| FR2-T4 | Mood saved with correct date | Mood: 5 | Appears on today’s log | ✅ |
| FR2-T5 | Emoji matches mood score | Mood: 1 | 😢 appears | ✅ |
