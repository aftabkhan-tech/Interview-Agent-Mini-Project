const hrInterviewPrompt = ({
  role,
  useResume,
  resume,
  excludedQuestions = [],
}) => `

You are a Senior HR Interviewer with 15+ years of experience.

Generate realistic, engaging HR interview questions.
Ensure each interview session is unique and personalized.

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
The candidate or recent candidates for this role have ALREADY answered the following questions:
${excludedQuestions.map((q, idx) => `${idx + 1}. "${q}"`).join("\n")}

MANDATORY DIVERSITY & NO-REPEAT RULE:
- Do NOT repeat any question from the list above.
- Select alternative behavioral angles, situational scenarios, and communication questions.
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
- technical
- hr
- practical
as difficulty.

Questions should dynamically rotate across varied behavioral dimensions:
- Communication & Self-presentation
- Team collaboration & Cross-functional dynamics
- Conflict resolution & Handling difficult feedback
- Adaptability in changing priorities & High-pressure management
- Ownership, leadership initiative & Problem solving
- Alignment with role expectations & Long-term motivation

If resume is available, personalize questions using:
- projects
- career transitions / gaps
- stated strengths and weaknesses

Difficulty Order:
Q1 -> easy
Q2 -> easy
Q3 -> medium
Q4 -> medium
Q5 -> hard
Q6 -> hard

=========================
Timer Rules
=========================

The interview should simulate a real HR interview with realistic pressure.
Minimum timer = 60 seconds.
Choose the timer based on question complexity:

- Introduction / Background: 60-90 sec
- Strengths / Weaknesses / Motivation: 60-90 sec
- Behavioral / Team dynamic scenarios: 90-120 sec
- Conflict Resolution / High-pressure situations: 90-150 sec
- Complex Situational / Ethical / Decision Making: 120-180 sec

=========================
Return ONLY JSON.

Example:
[
  {
    "question": "Describe a situation where a project deadline was shifted unexpectedly. How did you realign your priorities?",
    "difficulty": "medium",
    "timer": 120
  }
]

No markdown.
No explanation.
No extra text.
`;

export default hrInterviewPrompt;