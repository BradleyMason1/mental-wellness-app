# ⏰ Test Cases for FR5 - Reminder Notifications

## ✅ Goal
Enable users to set daily reminders to log their mood and check in with their mental health.

---

### 🔍 Test Scenarios

| Test Case ID | Description | Input | Expected Output | Pass/Fail |
|--------------|-------------|-------|------------------|-----------|
| FR5-T1 | Set reminder time | Select 9:00 AM | Reminder saved | ✅ |
| FR5-T2 | Notification triggers | Time = 9:00 AM | User receives push/local notification | ✅ |
| FR5-T3 | No permission granted | User denies permission | Show message: "Enable notifications in settings" | ✅ |
| FR5-T4 | Change reminder time | Old: 9:00 AM → New: 7:00 PM | Only 7:00 PM reminder triggers | ✅ |
| FR5-T5 | Disable reminders | Toggle off | No notifications sent | ✅ |