# 📚 Test Cases for FR3 - Mental Health Resource Center

## ✅ Goal
Provide users with categorized and searchable mental health resources (articles, videos, hotlines).

---

### 🔍 Test Scenarios

| Test Case ID | Description | Input | Expected Output | Pass/Fail |
|--------------|-------------|-------|------------------|-----------|
| FR3-T1 | View all resources | App launched | Resource categories are displayed | ✅ |
| FR3-T2 | View a specific category | Select "Anxiety" | Only anxiety resources shown | ✅ |
| FR3-T3 | Open resource | Tap on "How to Cope with Stress" | Opens article/video in new view | ✅ |
| FR3-T4 | Invalid resource link | Click broken link | Show fallback or error message | ✅ |
| FR3-T5 | Search bar filter | Search: "sleep" | Only resources with “sleep” appear | ✅ |