# SDC Nexus — Project Context & System Architecture

## Overview
**SDC Nexus** is the official digital workspace and collaboration ecosystem of the Software Developer Club (SDC). It serves as the single source of truth for student developer projects, sprint tasks, meeting schedules, member profiles, transparent attendance records, and leadership allocations.

---

## Technical Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (`src/styles/global.css`)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Architecture**: Modular Client-Side Architecture (UI -> Service Layer -> Mock Data Layer)

---

## Authorization & Leadership Hierarchy
SDC Nexus enforces a 5-tier system role hierarchy:
1. **Faculty Coordinator**: Highest administrative authority. Full system access, project controls, meeting oversight, member directory access, and **Position Management** (create, assign, change, remove positions).
2. **Club President**: Executive student leader. Access to all member profiles, project administration, meeting scheduling, and attendance logs.
3. **Project Leader**: Project-level administrator. Manages assigned projects, sprint tasks, project meetings, and project member access.
4. **Normal Member**: Standard student developer. Access to own dashboard, own profile, digital member ID, assigned projects, assigned tasks, and meetings.
5. **Alumni**: Graduated club members. Distinct badge and visual status with access to public directory and community projects.

---

## Key Product Rules
- **Profile Privacy**: Normal members can strictly access only their own private profile, digital member ID, assigned tasks, and attendance. Unauthorized cross-profile access is blocked at the route and service level.
- **Digital Member ID**: Visual member badge containing photo, member ID, name, position, department, and academic year. **Strictly contains no QR codes**.
- **No Performance Metrics**: Attendance is attendance; tasks are tasks. No artificial leaderboards, performance scores, or productivity gamification exist.
- **Strict Color Policy**: Purple, violet, magenta, pink, and lavender are strictly forbidden. The visual identity uses deep black (`#0A0A0B`), charcoal (`#14151A`), off-white (`#F3F4F6`), and SDC Orange (`#FF5500`).
