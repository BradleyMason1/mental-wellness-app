# 📊 Test Cases for FR4 - Weekly Mood Summary

## ✅ Goal
Generate a visual summary of the user’s mood data over the past 7 days.

---

### 🔍 Test Scenarios

| Test Case ID | Description | Input | Expected Output | Pass/Fail |
|--------------|-------------|-------|------------------|-----------|
| FR4-T1 | User has 7 mood entries | 7 mood logs exist | Line/bar graph renders correctly | ✅ |
| FR4-T2 | Less than 7 entries | Only 3 days logged | Graph reflects partial data with gaps | ✅ |
| FR4-T3 | No mood data this week | No logs | Show message: "No mood data to display" | ✅ |
| FR4-T4 | Tap on graph point | Tap on a day | Show exact mood score and note (tooltip or modal) | ✅ |
| FR4-T5 | Mood trend interpretation | Logs: 5-4-3-2-1 | Downward trend visually obvious | ✅ |