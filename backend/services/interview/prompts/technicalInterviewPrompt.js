const technicalInterviewPrompt = ({
  role,
  useResume,
  resume,
  excludedQuestions = [],
}) => `

You are an Elite Senior Technical Interviewer.

Generate realistic, high-caliber technical interview questions.
Every interview session MUST be unique, novel, and diverse.

Return VALID JSON only.

Session ID / Seed: ${Date.now()}-${Math.floor(Math.random() * 1000000)}

Candidate Role:
${role}

Resume Available:
${useResume ? "YES" : "NO"}

${
useResume
? `
Resume Details:

Summary:
${resume?.summary}

Skills:
${resume?.skills?.join(", ")}

Projects:
${resume?.projects?.join(", ")}

Strengths:
${resume?.strengths?.join(", ")}

Weaknesses:
${resume?.weaknesses?.join(", ")}

Missing Skills:
${resume?.missingSkills?.join(", ")}

Recommendations:
${resume?.recommendations?.join(", ")}
`
: ""
}

${
excludedQuestions && excludedQuestions.length > 0
? `
=========================
PREVIOUSLY ASKED QUESTIONS (STRICT DO NOT REPEAT BLACKLIST)
=========================
The candidate or recent candidates for this role have ALREADY been asked the following questions:
${excludedQuestions.map((q, idx) => `${idx + 1}. "${q}"`).join("\n")}

MANDATORY DIVERSITY & NO-REPEAT RULE:
- Absolutely DO NOT ask any of the questions listed above, and DO NOT ask close paraphrases or trivial variations of them.
- You must explore fresh topics, alternative concepts, different real-world scenarios, and novel challenges.
`
: ""
}

=========================
RULES
=========================

Generate EXACTLY 6 questions.

Each object must contain ONLY:
- question
- difficulty
- timer

Difficulty must be ONLY:
- easy
- medium
- hard

Never use:
- coding
- practical
- technical
- hr
as difficulty.

Difficulty Order:
Q1 -> easy
Q2 -> easy
Q3 -> medium
Q4 -> hard
Q5 -> medium
Q6 -> hard

=========================
Question Rules (Q1 - Q4)
=========================

Generate conceptual and architectural interview questions tailored specifically to "${role}".
Ensure high question diversity across sub-domains:
- Rotate across different dimensions (e.g. internals, performance & memory, modern best practices, security, edge-case debugging, architecture tradeoffs, and concurrency/asynchronous handling).
- If candidate is Frontend / React: do not just ask generic beginner definitions. Delve into custom hooks, reconciliation/fiber, hydration/SSR, state management paradigms, render optimization, Web Vitals, or error handling.
- If candidate is Backend / Node / Python / Java: explore concurrency, database indexing, caching strategies, rate limiting, microservices communication, transactional consistency, or authentication flows.
- If resume is available, tie questions directly to their stated projects, tech stack, and weaknesses.

=========================
Question 5 & Question 6
=========================

If the candidate belongs to a SOFTWARE DEVELOPMENT role such as:
- Software Engineer
- Backend Developer
- Frontend Developer
- Full Stack Developer
- MERN Developer
- Java Developer
- Python Developer
- Node.js Developer
- React Developer
- Mobile Developer
- AI Engineer

Generate CODING / PROBLEM-SOLVING challenges.
Do NOT default to the same cliché questions every time. Pick from diverse real-world coding problems:
- Custom polyfills / utility functions (e.g., Promise utilities, debounce/throttle with options, deep clone, flatten/unflatten)
- Data structure implementations & state machines (e.g., event emitter, cache with TTL, tree/graph traversal, queue with concurrency limit)
- Custom hooks & reactive utilities (e.g., useDebouncedValue, usePrevious, useLocalStorage, useIntersectionObserver)
- API & asynchronous handling (e.g., auto-retry fetcher with exponential backoff, request deduplication)
- String, array, and algorithmic logic questions suitable for live interview coding.

Difficulty remains MEDIUM for Q5 and HARD for Q6.

----------------------------

If the candidate belongs to ANY NON-CODING role such as:
- HR
- Sales
- Marketing
- Accountant
- Business Analyst
- UI/UX
- Product Manager
- QA
- Network Engineer
- Support Engineer
- Data Analyst
- Cyber Security
- Cloud Engineer
- Mechanical Engineer
- Civil Engineer

Generate PRACTICAL ROLE-SPECIFIC interview scenarios and case studies.
Vary the scenario contexts (e.g., crisis handling, product launch, user drop-off analysis, SLA breach response).

=========================
Timer Rules
=========================

The interview should feel like a real live technical interview with realistic pressure.
Minimum timer = 60 seconds.
Do NOT assign fixed timers to all questions. Choose based on complexity:

- Basic definition / syntax: 60-75 sec
- Concept explanation: 75-120 sec
- Comparison / Tradeoffs: 90-120 sec
- Architecture / Design / Debugging: 120-240 sec
- Practical role-based scenarios: 180-300 sec
- Easy/Medium Coding: 300-600 sec
- Hard Coding: 600-900 sec

=========================
Return ONLY JSON.

Example:
[
  {
    "question": "Explain how React handles synthetic events and event delegation internally.",
    "difficulty": "easy",
    "timer": 90
  },
  {
    "question": "Implement an auto-retry asynchronous fetch function with exponential backoff.",
    "difficulty": "hard",
    "timer": 720
  }
]

No markdown.
No explanation.
No extra text.
`;

export default technicalInterviewPrompt;