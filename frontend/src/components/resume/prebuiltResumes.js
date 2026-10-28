/**
 * 30 Industry-Standard Canva-Style Prebuilt Resumes
 * Features the Canva Two-Column Classic Layout matching the user's reference image (Isabel Mercado style).
 */

const resumeTemplates = [
  {
    id: "canva-isabel-marketing",
    title: "Canva Two-Column Classic (Isabel Mercado)",
    category: "Business & Marketing",
    tagline: "Product Design Manager, Brand Strategy, Leadership",
    color: "#2C3545", // Exact slate navy matching the user's reference image
    layout: "canva-slate",
    experienceLevel: "Mid - Senior",
    data: {
      name: "Isabel Mercado",
      title: "Marketing Manager",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      email: "hello@reallygreatsite.com",
      phone: "+123-456-7890",
      location: "123 Anywhere St., Any City",
      linkedin: "isabel-mercado",
      github: "isabelmercado.me",
      summary: "Dynamic Marketing Manager with 6+ years of expertise in brand positioning, cross-functional product design management, and digital customer acquisition. Proven track record of scaling consumer reach and leading multi-disciplinary creative squads.",
      skills: "Management Skills, Creativity, Digital Marketing, Negotiation, Critical Thinking, Leadership, Brand Strategy, Market Research",
      languages: "English (Native), Spanish (Fluent), French (Basic)",
      awards: "2019 | Ingoude Company - The Best Employee of the Year\n2018 | Timmerman Industries - Outstanding Creative Leadership Award",
      experience: [
        {
          company: "Arowwai Industries",
          role: "Product Design Manager",
          duration: "2020 – 2023",
          location: "New York, NY",
          description: "• Spearheaded end-to-end product design and market positioning across 5 flagship product launches.\n• Managed a team of 14 designers, copywriters, and performance marketers driving 42% revenue growth.\n• Standardized creative review workflows, cutting campaign turnaround time from 6 weeks to 18 days."
        },
        {
          company: "Ingoude Company",
          role: "Product Design Manager",
          duration: "2019 – 2020",
          location: "San Francisco, CA",
          description: "• Directed rebranding initiative that elevated brand awareness by 55% across North American target markets.\n• Partnered with C-suite stakeholders to establish corporate design guidelines and omni-channel marketing playbooks."
        },
        {
          company: "Timmerman Industries",
          role: "Product Design Manager",
          duration: "2017 – 2019",
          location: "Austin, TX",
          description: "• Led creative strategy for digital ad campaigns generating $3.2M in annual recurring pipeline.\n• Conducted consumer focus groups and usability interviews to optimize conversion on core landing pages."
        }
      ],
      education: [
        {
          degree: "Bachelor of Business Management",
          institution: "Wardiere University",
          year: "2020 – 2023",
          score: "Dean's Honor List • GPA 3.9/4.0"
        },
        {
          degree: "Bachelor of Business Management",
          institution: "Wardiere University",
          year: "2016 – 2020",
          score: "First Class with Distinction"
        },
        {
          degree: "Associate Degree in Communication Design",
          institution: "Wardiere University",
          year: "2012 – 2016",
          score: "Magna Cum Laude"
        }
      ],
      projects: [
        {
          title: "Global Omnichannel Brand Relaunch",
          link: "isabelmercado.me/brand-case-study",
          tech: "Figma, Brand Guidelines, Digital Ads, Market Research",
          description: "• Comprehensive corporate brand restructuring including typography, color palette, and high-converting marketing collateral."
        },
        {
          title: "Executive Endorsement & References",
          link: "harumi@wardiere.com | bailey@wardiere.com",
          tech: "Harumi Kobayashi (CEO) • Bailey Dupont (VP)",
          description: "• Professional references available upon request with top recommendation ratings from past executive directors."
        }
      ]
    }
  },
  {
    id: "fullstack-mern",
    title: "Full Stack Developer (MERN)",
    category: "Tech & IT",
    tagline: "React, Node.js, Express, MongoDB, Next.js",
    color: "#1E3A5F",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Aarav Sharma",
      title: "Senior Full Stack Engineer",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "aarav.sharma@gmail.com",
      phone: "+91 98765 43210",
      location: "Bengaluru, Karnataka",
      linkedin: "aarav-sharma-dev",
      github: "aarav-codes",
      summary: "Full Stack Developer with 3+ years of experience engineering high-throughput SaaS platforms using React, Node.js, and MongoDB. Reduced API latency by 35% and scaled microservices handling 500k+ daily requests.",
      skills: "React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, Redis, Docker, Tailwind CSS, REST APIs, GraphQL, Git",
      languages: "English (Fluent), Hindi (Native)",
      awards: "2023 | Nexus Tech Labs - Developer of the Year\n2022 | Smart India Hackathon Winner",
      experience: [
        {
          company: "Nexus Tech Labs",
          role: "Full Stack Engineer",
          duration: "June 2023 - Present",
          location: "Bengaluru, India",
          description: "• Architected responsive customer dashboard in Next.js 14 and Tailwind, boosting user retention by 28%.\n• Designed RESTful microservices with Node.js and Redis caching, cutting average p99 response times from 420ms to 95ms.\n• Implemented automated CI/CD pipelines with GitHub Actions, reducing deployment errors by 60%."
        },
        {
          company: "CodeCraft Solutions",
          role: "Associate Frontend Developer",
          duration: "Aug 2022 - May 2023",
          location: "Remote, India",
          description: "• Built reusable React component libraries adhering to WCAG accessibility standards across 4 client projects.\n• Integrated Redux Toolkit state management, eliminating state synchronization bugs across 12 product modules."
        }
      ],
      projects: [
        {
          title: "DevCollab - Real-Time Code Collaboration",
          tech: "React, Node.js, Socket.io, Monaco Editor, Docker",
          link: "https://devcollab.io",
          description: "• Built browser-based multiplayer code editor with operational transformation supporting 50 concurrent editors.\n• Containerized code execution environment using Docker and isolated Linux cgroups for secure syntax evaluation."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science & Engineering",
          institution: "Vellore Institute of Technology (VIT)",
          year: "2018 - 2022",
          score: "CGPA: 8.7/10"
        }
      ]
    }
  },
  {
    id: "fresher-cs",
    title: "Computer Science Fresher (2024)",
    category: "Freshers & Interns",
    tagline: "DSA, Java, Python, Web Dev, Academic Projects",
    color: "#2E384D",
    layout: "canva-slate",
    experienceLevel: "Fresher (0-1 yrs)",
    data: {
      name: "Rohan Verma",
      title: "Graduate Software Engineer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      email: "rohan.verma.cs@gmail.com",
      phone: "+91 91234 56789",
      location: "Noida, Uttar Pradesh",
      linkedin: "rohan-verma-cs",
      github: "rohan-codes-24",
      summary: "Recent Computer Science Graduate (2024) with strong foundation in Data Structures, Algorithms, Object-Oriented Programming, and Full Stack Web Development. Solved 450+ LeetCode problems and winner of 2 inter-college hackathons.",
      skills: "Java, Python, C++, Data Structures & Algorithms, React.js, Node.js, Express, MySQL, MongoDB, Git, GitHub, Linux, OOP, DBMS",
      languages: "English (Professional), Hindi (Native)",
      awards: "2024 | First Prize - Inter-College Hackathon (500+ participants)\n2023 | LeetCode Knight (Rating 1850+)",
      experience: [
        {
          company: "InnoTech Softwares",
          role: "Software Development Intern",
          duration: "Jan 2024 - June 2024",
          location: "Noida, India",
          description: "• Collaborated on building customer feedback portal using React and Express, handling 10k monthly active users.\n• Automated unit testing suite using Jest, increasing test coverage from 45% to 78%.\n• Participated in daily Agile standups, code reviews, and sprint retrospectives."
        }
      ],
      projects: [
        {
          title: "Smart Campus - Student Attendance & Grievance Portal",
          tech: "React.js, Node.js, MongoDB, JWT, Tailwind CSS",
          link: "https://github.com/rohan-codes-24/smart-campus",
          description: "• Built role-based access system for 2,000+ students and professors with automated QR attendance tracking."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science & Engineering",
          institution: "APJ Abdul Kalam Technical University (AKTU)",
          year: "2020 - 2024",
          score: "Aggregate: 82.4%"
        }
      ]
    }
  },
  {
    id: "uiux-designer",
    title: "UI/UX & Product Designer",
    category: "Design & Creative",
    tagline: "Figma, Wireframing, Prototyping, User Research, Design Systems",
    color: "#382942",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Tanya Kapoor",
      title: "Senior Product Designer",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      email: "tanya.kapoor.design@gmail.com",
      phone: "+91 98991 12233",
      location: "New Delhi, Delhi",
      linkedin: "tanya-kapoor-design",
      github: "tanya-designs",
      summary: "UI/UX Designer with 3+ years of experience transforming complex user journeys into delightful, intuitive digital experiences. Proficient in end-to-end product design, wireframing, high-fidelity interactive prototyping in Figma, and usability testing.",
      skills: "Figma, Adobe XD, User Research, Wireframing, High-Fidelity Prototyping, Design Systems, Information Architecture, Usability Testing, HTML/CSS Basics",
      languages: "English (Fluent), Hindi (Native)",
      awards: "2023 | Behance Featured Project of the Month\n2022 | NID Design Excellence Award",
      experience: [
        {
          company: "Vivid Product Lab",
          role: "Lead UI/UX Designer",
          duration: "Aug 2022 - Present",
          location: "New Delhi, India",
          description: "• Redesigned B2B SaaS onboarding flow, reducing customer drop-off by 32% and increasing activation within 48 hours.\n• Created comprehensive design token system in Figma with 120+ components, accelerating dev handoff time by 40%.\n• Conducted 25+ moderated user interviews and usability tests, translating findings into prioritized product roadmaps."
        }
      ],
      projects: [
        {
          title: "CarePlus - Telehealth & Prescription Mobile App",
          tech: "Figma, User Research, Interactive Prototype, Design System",
          link: "https://www.figma.com/@tanya_design",
          description: "• Designed comprehensive patient booking and doctor video consultation mobile flow with 98% positive task completion in user testing."
        }
      ],
      education: [
        {
          degree: "Bachelor of Design (B.Des) in Interaction Design",
          institution: "National Institute of Design (NID)",
          year: "2018 - 2022",
          score: "CGPA: 8.8/10"
        }
      ]
    }
  },
  {
    id: "frontend-react",
    title: "Frontend React Specialist",
    category: "Tech & IT",
    tagline: "React, TypeScript, Redux, Performance Optimization",
    color: "#1E3A5F",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Priya Patel",
      title: "Frontend React Engineer",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
      email: "priya.patel.ui@gmail.com",
      phone: "+91 97123 45678",
      location: "Pune, Maharashtra",
      linkedin: "priya-patel-frontend",
      github: "priyapatel-ui",
      summary: "Passionate Frontend Developer specializing in React.js, TypeScript, and modern UI architectures. Proven record of converting complex Figma wireframes into pixel-perfect, accessible, and 60 FPS web applications.",
      skills: "React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux Toolkit, Zustand, Framer Motion, Jest, Vite, Webpack",
      languages: "English, Hindi, Gujarati",
      awards: "2023 | Pixelwave Frontend Innovator Award",
      experience: [
        {
          company: "Pixelwave Interactive",
          role: "Frontend Engineer",
          duration: "Jan 2023 - Present",
          location: "Pune, India",
          description: "• Spearheaded frontend migration from legacy jQuery to React 18, enhancing Lighthouse performance score from 52 to 96.\n• Built an internal design system with 40+ atomic components used by 18 engineers across 3 squads.\n• Optimized bundle size by 42% through code-splitting, tree-shaking, and lazy-loading heavy vendor assets."
        }
      ],
      projects: [
        {
          title: "FinTrack - Personal Finance Visualizer",
          tech: "React, TypeScript, Chart.js, Tailwind CSS, LocalStorage",
          link: "https://fintrack-app.web.app",
          description: "• Engineered intuitive budget dashboard with interactive charts, exportable CSV reports, and zero cloud dependencies."
        }
      ],
      education: [
        {
          degree: "B.E. in Information Technology",
          institution: "Pune Institute of Computer Technology (PICT)",
          year: "2019 - 2023",
          score: "CGPA: 8.9/10"
        }
      ]
    }
  },
  {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    category: "AI & Data",
    tagline: "PyTorch, TensorFlow, LangChain, LLMs, Computer Vision",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Sneha Kulkarni",
      title: "Senior AI / ML Research Engineer",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      email: "sneha.kulkarni.ai@gmail.com",
      phone: "+91 99887 76655",
      location: "Bengaluru, Karnataka",
      linkedin: "sneha-kulkarni-ml",
      github: "sneha-ml-lab",
      summary: "AI/ML Engineer with 3+ years of experience developing deep learning architectures, LLM fine-tuning pipelines, and high-performance inference endpoints. Experienced in RAG frameworks, LangChain, and deploying models to AWS SageMaker.",
      skills: "Python, PyTorch, TensorFlow, Scikit-learn, LangChain, LlamaIndex, Hugging Face, Transformers, OpenCV, FastAPI, Docker, MLflow, AWS SageMaker",
      languages: "English, Hindi, Marathi",
      awards: "2023 | IEEE Best Paper Presentation in Applied Deep Learning",
      experience: [
        {
          company: "CognitiveAI Labs",
          role: "Machine Learning Engineer",
          duration: "Feb 2023 - Present",
          location: "Bengaluru, India",
          description: "• Architected retrieval-augmented generation (RAG) assistant indexing 200k+ corporate documents with Milvus vector DB.\n• Fine-tuned open-source Llama-3 8B model using QLoRA, improving domain QA accuracy by 34% over baseline models.\n• Quantized transformer models into ONNX/TensorRT format, achieving 4.2x faster inference latency on GPU instances."
        }
      ],
      projects: [
        {
          title: "Multi-Modal Medical Image Classifier",
          tech: "PyTorch, Vision Transformers (ViT), FastAPI, Docker",
          link: "https://github.com/sneha-ml-lab/med-vision",
          description: "• Trained Vision Transformer to detect thoracic pathologies from chest X-rays with 94.6% AUC on NIH ChestX-ray14 dataset."
        }
      ],
      education: [
        {
          degree: "M.Tech in Artificial Intelligence & Data Science",
          institution: "Indian Institute of Science (IISc)",
          year: "2021 - 2023",
          score: "CGPA: 9.1/10"
        }
      ]
    }
  },
  {
    id: "backend-nodejs",
    title: "Backend Engineer (Node.js & Go)",
    category: "Tech & IT",
    tagline: "Distributed Systems, Microservices, PostgreSQL, Kafka",
    color: "#1E3A2F",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Vikram Malhotra",
      title: "Backend Systems Architect",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      email: "vikram.malhotra.dev@gmail.com",
      phone: "+91 98450 12345",
      location: "Hyderabad, Telangana",
      linkedin: "vikram-backend",
      github: "vikram-systems",
      summary: "Backend Engineer with 3 years of experience developing low-latency distributed APIs and resilient database pipelines. Expert in PostgreSQL indexing, Redis caching, Apache Kafka event streaming, and Docker orchestration.",
      skills: "Node.js, Express, Go (Golang), PostgreSQL, MongoDB, Redis, Apache Kafka, Docker, Kubernetes, AWS (EC2, S3, RDS), gRPC, Microservices",
      languages: "English, Hindi, Telugu",
      awards: "2023 | AWS Certified Solutions Architect Associate",
      experience: [
        {
          company: "CloudScale Systems",
          role: "Backend Software Engineer",
          duration: "Aug 2022 - Present",
          location: "Hyderabad, India",
          description: "• Designed asynchronous messaging pipeline using Apache Kafka processing 4.5 million telemetry events daily.\n• Tuned complex PostgreSQL queries and partial indexes, slashing database CPU utilization from 85% to 28%.\n• Built secure OAuth2.0 authentication service with JWT token rotation and Redis session invalidation."
        }
      ],
      projects: [
        {
          title: "Distributed Rate Limiter Service",
          tech: "Go, Redis, gRPC, Docker",
          link: "https://github.com/vikram-systems/rate-limiter",
          description: "• Implemented token bucket and sliding window rate limiting algorithms in Golang achieving under 2ms latency per check."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science",
          institution: "NIT Warangal",
          year: "2018 - 2022",
          score: "CGPA: 8.5/10"
        }
      ]
    }
  },
  {
    id: "product-manager",
    title: "Associate Product Manager",
    category: "Product & Management",
    tagline: "PRDs, Product Strategy, User Analytics, Agile/Scrum, Roadmap",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Rhea Sen",
      title: "Senior Product Manager",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
      email: "rhea.sen.pm@gmail.com",
      phone: "+91 99200 44556",
      location: "Bengaluru, Karnataka",
      linkedin: "rhea-sen-pm",
      github: "rhea-product",
      summary: "Data-informed Product Manager with 3 years of experience leading cross-functional engineering and design squads in delivering high-growth fintech & SaaS products. Skilled in writing detailed PRDs, conducting user research, and driving North Star metrics.",
      skills: "Product Strategy, PRD Writing, Agile & Scrum, Mixpanel, Amplitude, Google Analytics 4, JIRA, A/B Testing, User Research, Stakeholder Management",
      languages: "English, Hindi, Bengali",
      awards: "2023 | Product School Certified Product Manager (CPM)",
      experience: [
        {
          company: "PayFlow Technologies",
          role: "Associate Product Manager",
          duration: "Aug 2022 - Present",
          location: "Bengaluru, India",
          description: "• Owned product roadmap for merchant checkout module, driving 24% boost in transaction completion and ₹35 Cr monthly volume.\n• Authored 18+ comprehensive PRDs, working closely with 12 engineers and 2 UX designers across bi-weekly sprint cycles.\n• Ran 8 multivariate A/B experiments to optimize one-click checkout flow, increasing repeat buyer conversion by 17%."
        }
      ],
      projects: [
        {
          title: "Instant Refund Flow Optimization",
          tech: "Mixpanel, User Testing, Wireframing, API Specification",
          link: "https://rhea-product.notion.site",
          description: "• Spearheaded end-to-end revamp of customer refund flow, cutting average support tickets related to refunds by 45%."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science + Minor in Economics",
          institution: "Delhi Technological University (DTU)",
          year: "2018 - 2022",
          score: "CGPA: 8.7/10"
        }
      ]
    }
  },
  {
    id: "data-analyst",
    title: "Data Analyst & BI Specialist",
    category: "AI & Data",
    tagline: "SQL, Power BI, Advanced Excel, Python, Dashboards",
    color: "#2E384D",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Ananya Deshmukh",
      title: "Business Intelligence Analyst",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "ananya.analytics@gmail.com",
      phone: "+91 98220 33445",
      location: "Pune, Maharashtra",
      linkedin: "ananya-deshmukh-analytics",
      github: "ananya-analyst",
      summary: "Results-driven Data Analyst skilled in extracting actionable insights from disparate datasets. Expert in writing complex SQL queries, window functions, DAX calculations, and crafting intuitive Power BI dashboards for operational teams.",
      skills: "SQL (PostgreSQL, MySQL), Power BI, Tableau, Advanced Excel (VLOOKUP, Pivot, Macros), Python (Pandas, Matplotlib), ETL, Data Cleaning",
      languages: "English, Hindi, Marathi",
      awards: "2023 | Microsoft Certified Power BI Data Analyst Associate",
      experience: [
        {
          company: "RetailEdge Solutions",
          role: "Business Data Analyst",
          duration: "July 2022 - Present",
          location: "Pune, India",
          description: "• Automated weekly sales reporting in Power BI connecting to PostgreSQL warehouse, saving 15 manual analyst hours per week.\n• Performed cohort retention analysis on 350k customer transactions, uncovering key repeat purchase triggers.\n• Collaborated with inventory team to optimize safety stock parameters, reducing stockouts by 22%."
        }
      ],
      projects: [
        {
          title: "Global Supply Chain Performance Dashboard",
          tech: "Power BI, SQL, DAX, Excel",
          link: "https://github.com/ananya-analyst/supply-chain-bi",
          description: "• Built comprehensive multi-page dashboard tracking freight transit times, carrier SLAs, and cost per shipment across 14 zones."
        }
      ],
      education: [
        {
          degree: "B.Com in Computer Applications & Statistics",
          institution: "Symbiosis International University",
          year: "2019 - 2022",
          score: "Percentage: 84.5%"
        }
      ]
    }
  },
  {
    id: "devops-engineer",
    title: "DevOps & Cloud Engineer",
    category: "Tech & IT",
    tagline: "AWS, Kubernetes, Terraform, Docker, CI/CD, Monitoring",
    color: "#1E3A5F",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Karan Singhal",
      title: "Senior Cloud & DevOps Engineer",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      email: "karan.singhal.devops@gmail.com",
      phone: "+91 98111 22334",
      location: "Gurugram, Haryana",
      linkedin: "karan-singhal-cloud",
      github: "karan-devops",
      summary: "Certified AWS Solutions Architect and DevOps Engineer with 3+ years managing containerized infrastructure at scale. Proven expertise in zero-downtime blue/green deployments, Infrastructure as Code with Terraform, and Prometheus/Grafana observability.",
      skills: "AWS, Docker, Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions, Linux, Bash Scripting, Prometheus, Grafana, ELK Stack, Helm",
      languages: "English, Hindi, Punjabi",
      awards: "2023 | Certified Kubernetes Administrator (CKA)",
      experience: [
        {
          company: "InfraPulse Technologies",
          role: "Cloud DevOps Engineer",
          duration: "Sept 2022 - Present",
          location: "Gurugram, India",
          description: "• Managed multi-region Kubernetes (EKS) clusters hosting 60+ microservices maintaining 99.99% system uptime.\n• Implemented Terraform modules managing AWS VPCs, RDS clusters, and autoscaling groups with automated state locking.\n• Cut monthly AWS infrastructure spend by $4,200 (23%) through Spot instances and automated scheduling."
        }
      ],
      projects: [
        {
          title: "GitOps Automated Kubernetes Pipeline",
          tech: "Kubernetes, ArgoCD, Helm, GitHub Actions, Prometheus",
          link: "https://github.com/karan-devops/gitops-infra",
          description: "• Built fully automated GitOps deployment pipeline syncing Git repo commits directly to EKS cluster with zero downtime."
        }
      ],
      education: [
        {
          degree: "B.Tech in Information Technology",
          institution: "Delhi Technological University (DTU)",
          year: "2018 - 2022",
          score: "CGPA: 8.4/10"
        }
      ]
    }
  },
  {
    id: "mobile-flutter",
    title: "Mobile App Developer (Flutter & React Native)",
    category: "Tech & IT",
    tagline: "Flutter, Dart, React Native, Firebase, App Store, Play Store",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Arjun Nair",
      title: "Senior Cross-Platform Mobile Engineer",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      email: "arjun.nair.mobile@gmail.com",
      phone: "+91 97456 12345",
      location: "Kochi, Kerala",
      linkedin: "arjun-nair-flutter",
      github: "arjunnair-dev",
      summary: "Mobile Application Developer with 4 years creating consumer-facing apps on iOS and Android with 500k+ downloads. Expertise in Flutter state management with BLoC, native bridging, offline-first SQLite sync, and push notifications.",
      skills: "Flutter, Dart, React Native, iOS (Swift basics), Android (Kotlin basics), Firebase, SQLite, BLoC Pattern, REST APIs, App Store Connect, Google Play Console",
      languages: "English, Malayalam, Hindi",
      awards: "2023 | Google Play Featured App Developer",
      experience: [
        {
          company: "AppSphere Studios",
          role: "Senior Flutter Developer",
          duration: "May 2022 - Present",
          location: "Kochi, India",
          description: "• Built flagship multi-vendor grocery app achieving 4.8-star rating on Google Play Store from 12k reviews.\n• Implemented background geo-location tracking and push notifications with Firebase FCM, improving delivery SLA by 18%.\n• Optimized widget rebuilding trees and memory leaks, boosting frame rate to stable 60 FPS on budget devices."
        }
      ],
      projects: [
        {
          title: "MeditateNow - Mindfulness & Habit Tracker",
          tech: "Flutter, Hive DB, AudioPlayers, In-App Purchases",
          link: "https://github.com/arjunnair-dev/meditate-now",
          description: "• Audio meditation app with custom sound equalizer, offline playback, and daily streak gamification."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science",
          institution: "Cochin University of Science and Technology (CUSAT)",
          year: "2017 - 2021",
          score: "CGPA: 8.6/10"
        }
      ]
    }
  },
  {
    id: "cybersecurity-soc",
    title: "Cybersecurity Analyst & SOC Specialist",
    category: "Tech & IT",
    tagline: "SIEM, Penetration Testing, Wireshark, Threat Intelligence, ISO 27001",
    color: "#1E2A38",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Aditya Rao",
      title: "Senior Cybersecurity & Threat Analyst",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      email: "aditya.rao.sec@gmail.com",
      phone: "+91 99001 22334",
      location: "Bengaluru, Karnataka",
      linkedin: "aditya-rao-cyber",
      github: "aditya-sec-lab",
      summary: "Security professional specializing in Security Operations Center (SOC) incident response, vulnerability assessments, and cloud penetration testing. Proficient with Splunk SIEM, Burp Suite Pro, and NIST Cybersecurity Framework.",
      skills: "SIEM (Splunk, QRadar), Wireshark, Burp Suite Pro, Nmap, Metasploit, Python Scripting, Threat Hunting, Vulnerability Assessment, ISO 27001, SOC 2",
      languages: "English, Hindi, Kannada",
      awards: "2023 | Certified Information Systems Security Professional (CISSP)\n2022 | CEH v12 Certified",
      experience: [
        {
          company: "SecureNet Defense Corp",
          role: "SOC Level 2 Security Analyst",
          duration: "Oct 2022 - Present",
          location: "Bengaluru, India",
          description: "• Monitored security alerts across 1,200 server endpoints, identifying and mitigating 14 critical ransomware intrusion attempts.\n• Conducted regular internal vulnerability scanning with Nessus, reducing unpatched CVE exposures by 74%.\n• Drafted Incident Response Playbooks and conducted tabletop exercises with executive IT stakeholders."
        }
      ],
      projects: [
        {
          title: "Automated Phishing URL Detection Agent",
          tech: "Python, VirusTotal API, Machine Learning, WHOIS Scraper",
          link: "https://github.com/aditya-sec-lab/phish-detector",
          description: "• Machine learning classifier identifying malicious domain typosquatting in incoming corporate emails with 99.1% precision."
        }
      ],
      education: [
        {
          degree: "B.Tech in Information Security",
          institution: "Manipal Institute of Technology",
          year: "2018 - 2022",
          score: "CGPA: 8.8/10"
        }
      ]
    }
  },
  {
    id: "java-microservices",
    title: "Java Microservices Specialist",
    category: "Tech & IT",
    tagline: "Spring Boot, Kafka, Hibernate, PostgreSQL, Docker, Kubernetes",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid - Senior",
    data: {
      name: "Meera Nambiar",
      title: "Lead Java Backend Engineer",
      photo: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&auto=format&fit=crop&q=80",
      email: "meera.nambiar.java@gmail.com",
      phone: "+91 98401 56789",
      location: "Chennai, Tamil Nadu",
      linkedin: "meera-nambiar-java",
      github: "meera-backend",
      summary: "Senior Java Engineer with 5+ years building enterprise fintech banking applications with Spring Boot and distributed microservices. Specialized in transactional integrity, distributed tracing with OpenTelemetry, and high-throughput Kafka streaming.",
      skills: "Java 21, Spring Boot 3, Spring Cloud, Hibernate, JPA, Apache Kafka, PostgreSQL, Redis, Maven, Docker, Kubernetes, JUnit 5, Mockito",
      languages: "English, Tamil, Hindi",
      awards: "2023 | FinServ Enterprise Engineering Excellence Award",
      experience: [
        {
          company: "Global FinServe Systems",
          role: "Lead Java Developer",
          duration: "Jan 2022 - Present",
          location: "Chennai, India",
          description: "• Engineered core payments ledger microservice in Spring Boot 3 processing 1.2M transactions daily with zero loss.\n• Implemented CQRS and event sourcing architecture with Apache Kafka, eliminating distributed lock bottlenecks.\n• Reduced unit and integration testing suite execution from 35 minutes to 7 minutes with testcontainers."
        }
      ],
      projects: [
        {
          title: "High-Throughput Order Matching Engine",
          tech: "Java, LMAX Disruptor, Spring Boot, WebSockets",
          link: "https://github.com/meera-backend/order-engine",
          description: "• Low-latency financial order book matching buy/sell bids with microsecond-level latency."
        }
      ],
      education: [
        {
          degree: "B.E. in Computer Science",
          institution: "College of Engineering, Guindy (Anna University)",
          year: "2017 - 2021",
          score: "CGPA: 9.0/10"
        }
      ]
    }
  },
  {
    id: "data-scientist-nlp",
    title: "Data Scientist & NLP Researcher",
    category: "AI & Data",
    tagline: "NLP, LLMs, Transformer Models, Python, PyTorch, RAG",
    color: "#253342",
    layout: "canva-slate",
    experienceLevel: "Senior",
    data: {
      name: "Dr. Kabir Mehta",
      title: "Principal Data Scientist",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      email: "dr.kabir.mehta@gmail.com",
      phone: "+91 99112 33445",
      location: "New Delhi, Delhi",
      linkedin: "dr-kabir-nlp",
      github: "kabirmehta-nlp",
      summary: "Data Scientist with Ph.D. in Natural Language Processing and 4+ years of industrial applied research experience. Led end-to-end delivery of conversational LLM systems, semantic search engines, and multi-lingual sentiment pipelines for Fortune 500 clients.",
      skills: "Python, PyTorch, HuggingFace Transformers, LangChain, Spacy, NLTK, Scikit-learn, Vector DBs (Chroma, Pinecone), Docker, AWS SageMaker",
      languages: "English, Hindi, German",
      awards: "2023 | 5 Published Papers in ACL & EMNLP\n2021 | Best Doctoral Thesis in Artificial Intelligence",
      experience: [
        {
          company: "Nexus AI Research Labs",
          role: "Principal Data Scientist",
          duration: "Aug 2022 - Present",
          location: "New Delhi, India",
          description: "• Directed team of 6 researchers in building multilingual summarization model supporting 12 Indic languages with 89.2 ROUGE score.\n• Spearheaded semantic search pipeline indexing 5 million legal contracts using hybrid sparse/dense embeddings.\n• Authored 3 patents on context compression in autoregressive generative transformer models."
        }
      ],
      projects: [
        {
          title: "IndicSummarize - Cross-Lingual Abstractive Summarizer",
          tech: "PyTorch, T5, HuggingFace, FastAPI",
          link: "https://github.com/kabirmehta-nlp/indic-summarize",
          description: "• Open-source cross-lingual news summarizer downloaded over 85,000 times on HuggingFace Hub."
        }
      ],
      education: [
        {
          degree: "Ph.D. in Computer Science (NLP Focus)",
          institution: "IIT Delhi",
          year: "2017 - 2021",
          score: "Distinction Award"
        }
      ]
    }
  },
  {
    id: "digital-marketing-growth",
    title: "Digital Marketing & Growth Specialist",
    category: "Business & Marketing",
    tagline: "Performance Marketing, SEO, Meta Ads, Google Ads, CAC/LTV",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Simran Kaur",
      title: "Growth & Performance Marketing Lead",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      email: "simran.kaur.growth@gmail.com",
      phone: "+91 98777 88990",
      location: "Mumbai, Maharashtra",
      linkedin: "simran-kaur-growth",
      github: "simrankaur.co",
      summary: "Growth Marketing Specialist with 4+ years driving customer acquisition across D2C and B2B SaaS verticals. Managed ₹2.5 Cr+ in annual ad spend across Google, Meta, and LinkedIn while maintaining 3.8x blended ROAS.",
      skills: "Google Ads, Meta Ads Manager, LinkedIn Ads, Technical SEO, Ahrefs, SEMrush, Google Analytics 4, Hubspot, Copywriting, Conversion Rate Optimization (CRO)",
      languages: "English, Hindi, Punjabi",
      awards: "2023 | Meta Certified Media Buying Professional\n2022 | Google Search Ads Master Certification",
      experience: [
        {
          company: "Aura Lifestyle Brands",
          role: "Performance Marketing Manager",
          duration: "June 2022 - Present",
          location: "Mumbai, India",
          description: "• Scaled monthly brand revenue from ₹40L to ₹1.8 Cr within 14 months through optimized Meta & Google ad campaigns.\n• Slashed Customer Acquisition Cost (CAC) by 31% by restructuring creative testing frameworks and custom lookalike audiences.\n• Led technical SEO audit resolving 450+ crawl errors and doubling organic non-brand search traffic in 6 months."
        }
      ],
      projects: [
        {
          title: "High-Converting D2C Landing Page Funnel",
          tech: "Shopify Plus, VWO A/B Testing, Hotjar, Google Tag Manager",
          link: "https://simrankaur.co/case-studies",
          description: "• Redesigned product PDP page driving a 2.4% -> 4.1% conversion rate lift across 80,000 monthly visitors."
        }
      ],
      education: [
        {
          degree: "MBA in Marketing",
          institution: "Narsee Monjee Institute of Management Studies (NMIMS)",
          year: "2019 - 2021",
          score: "CGPA: 3.8/4.0"
        }
      ]
    }
  },
  {
    id: "b2b-enterprise-sales",
    title: "B2B Enterprise Sales Executive",
    category: "Business & Marketing",
    tagline: "Quota Attainment, Salesforce CRM, Solution Selling, Deal Negotiation",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Aman Gupta",
      title: "Senior Enterprise Account Executive",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      email: "aman.gupta.sales@gmail.com",
      phone: "+91 99100 44556",
      location: "Gurugram, Haryana",
      linkedin: "aman-gupta-sales",
      github: "amangupta.biz",
      summary: "Top-performing B2B Sales Executive with 4 years closing high-value cloud SaaS solutions to mid-market and enterprise enterprise clients. Consistent track record of 135%+ annual quota attainment with strong MEDDIC qualification.",
      skills: "Enterprise Sales, Solution Selling, Salesforce, HubSpot, MEDDPICC, Lead Qualification, Contract Negotiation, Cold Outreach, Strategic Account Planning",
      languages: "English, Hindi",
      awards: "2023 | Presidents Club Winner - Top Sales Rep of the Year\n2022 | 142% Annual Quota Attainment",
      experience: [
        {
          company: "CloudCore SaaS Solutions",
          role: "Senior Account Executive",
          duration: "July 2022 - Present",
          location: "Gurugram, India",
          description: "• Generated ₹8.2 Cr in Net New ARR, exceeding annual individual sales quota by 138% across FY 23-24.\n• Sourced and closed company's largest deal of the year: a 3-year enterprise contract worth ₹2.4 Cr with a Fortune 500 retailer.\n• Partnered with Solution Engineering and Customer Success teams to ensure 98% first-year contract renewal rate."
        }
      ],
      projects: [
        {
          title: "Outbound Enterprise Playbook",
          tech: "Salesforce, Apollo.io, Gong.io, SalesLoft",
          link: "https://amangupta.biz/sales-playbook",
          description: "• Authored multi-touch cold outreach cadence adopted by 15 SDRs, boosting qualified demo conversion by 26%."
        }
      ],
      education: [
        {
          degree: "BBA in International Business",
          institution: "Amity University",
          year: "2017 - 2020",
          score: "Aggregate: 81.2%"
        }
      ]
    }
  },
  {
    id: "qa-automation-lead",
    title: "QA Automation & SDET Specialist",
    category: "Tech & IT",
    tagline: "Selenium, Cypress, Playwright, API Testing, CI/CD, Postman",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Kavita Joshi",
      title: "Lead SDET & QA Automation Engineer",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      email: "kavita.joshi.qa@gmail.com",
      phone: "+91 97234 56780",
      location: "Ahmedabad, Gujarat",
      linkedin: "kavita-joshi-qa",
      github: "kavitajoshi-qa",
      summary: "Software Development Engineer in Test (SDET) with 4 years designing scalable end-to-end automation frameworks using Cypress, Playwright, and Selenium. Reduced regression testing cycles from 24 hours to 45 minutes in CI/CD pipelines.",
      skills: "Cypress, Playwright, Selenium WebDriver, Java, JavaScript, Python, Postman, RestAssured, Jest, GitHub Actions, Docker, TestNG, JIRA",
      languages: "English, Hindi, Gujarati",
      awards: "2023 | Quality First Engineering Award\n2021 | ISTQB Certified Tester Foundation Level",
      experience: [
        {
          company: "FinSecure Technologies",
          role: "Lead QA Automation Engineer",
          duration: "Aug 2022 - Present",
          location: "Ahmedabad, India",
          description: "• Architected distributed Playwright automation framework with parallel test runners, covering 800+ regression flows.\n• Built automated REST API regression suite using RestAssured, catching 45+ critical bugs before staging deployments.\n• Integrated automated accessibility and performance checks into pull request verification with GitHub Actions."
        }
      ],
      projects: [
        {
          title: "Cloud Test Grid Automation Framework",
          tech: "Playwright, TypeScript, Docker, Allure Reports",
          link: "https://github.com/kavitajoshi-qa/playwright-framework",
          description: "• Modular test harness running 50 parallel browser threads with automated video recordings and Allure dashboards."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Engineering",
          institution: "Nirma University",
          year: "2018 - 2022",
          score: "CGPA: 8.6/10"
        }
      ]
    }
  },
  {
    id: "mechanical-cad-engineer",
    title: "Mechanical CAD & Design Engineer",
    category: "Freshers & Interns",
    tagline: "SolidWorks, AutoCAD, GD&T, FEA Simulation, Manufacturing",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Harshvardhan Patil",
      title: "Mechanical Design & Simulation Engineer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      email: "harsh.patil.mech@gmail.com",
      phone: "+91 98231 23456",
      location: "Pune, Maharashtra",
      linkedin: "harsh-patil-mech",
      github: "harsh-cad-design",
      summary: "Mechanical Design Engineer with 2+ years of experience in 3D CAD modeling, Geometric Dimensioning and Tolerancing (GD&T), and finite element analysis (FEA). Proven record in prototyping automotive sheet-metal assemblies and injection molded parts.",
      skills: "SolidWorks, AutoCAD, CATIA V5, ANSYS FEA, GD&T, Sheet Metal Design, 3D Printing, DFM/DFA, CNC Machining basics, MATLAB",
      languages: "English, Hindi, Marathi",
      awards: "2023 | Certified SolidWorks Professional (CSWP)\n2022 | SAE BAJA India Design Finalist",
      experience: [
        {
          company: "Precision AutoTech Ltd",
          role: "Design Engineer",
          duration: "July 2022 - Present",
          location: "Pune, India",
          description: "• Designed 18 precision sheet metal enclosures for EV battery management modules adhering to IP67 ingress standards.\n• Conducted linear static and thermal FEA simulations in ANSYS, identifying stress concentration points and saving 14% raw material weight.\n• Created 2D engineering fabrication drawings with strict GD&T tolerances for automated laser cutting and CNC bending."
        }
      ],
      projects: [
        {
          title: "All-Terrain Vehicle (ATV) Roll Cage & Suspension Design",
          tech: "SolidWorks, ANSYS Mechanical, Lotus Shark Suspension Analysis",
          link: "https://grabcad.com/harsh.patil",
          description: "• Designed and simulated lightweight tubular roll cage withstanding 4G rollover impacts for SAE Baja collegiate competition."
        }
      ],
      education: [
        {
          degree: "B.E. in Mechanical Engineering",
          institution: "College of Engineering Pune (COEP)",
          year: "2018 - 2022",
          score: "CGPA: 8.5/10"
        }
      ]
    }
  },
  {
    id: "embedded-iot-engineer",
    title: "Embedded Systems & IoT Engineer",
    category: "Tech & IT",
    tagline: "Embedded C/C++, STM32, ESP32, FreeRTOS, PCB Design, MQTT",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Nikhil Bansal",
      title: "Embedded Firmware & IoT Systems Engineer",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      email: "nikhil.bansal.iot@gmail.com",
      phone: "+91 99912 33445",
      location: "Bengaluru, Karnataka",
      linkedin: "nikhil-bansal-iot",
      github: "nikhil-firmware",
      summary: "Firmware Engineer specializing in Embedded C/C++, ARM Cortex-M microcontrollers (STM32, ESP32), and real-time operating systems (FreeRTOS). Experienced in low-power wireless sensor networks, BLE, Zigbee, and MQTT cloud telemetry.",
      skills: "Embedded C, C++, FreeRTOS, STM32CubeIDE, ESP-IDF, I2C, SPI, UART, CAN Bus, KiCAD PCB Design, MQTT, BLE 5.0, Git, Oscilloscope / Logic Analyzer",
      languages: "English, Hindi",
      awards: "2023 | Texas Instruments Embedded Design Contest Finalist",
      experience: [
        {
          company: "SenseGrid IoT Solutions",
          role: "Embedded Firmware Engineer",
          duration: "Aug 2022 - Present",
          location: "Bengaluru, India",
          description: "• Programmed ultra-low-power industrial sensor node on STM32 achieving 3-year battery life on a single coin cell.\n• Implemented secure MQTT client over TLS 1.3 with automated OTA (Over-The-Air) firmware update fail-safes.\n• Designed 4-layer mixed-signal PCB in KiCAD for industrial sensor gateway with optical isolation."
        }
      ],
      projects: [
        {
          title: "Smart Smart Agriculture Telemetry Gateway",
          tech: "ESP32, FreeRTOS, LoRaWAN, MQTT, AWS IoT Core",
          link: "https://github.com/nikhil-firmware/lora-agri-node",
          description: "• Long-range LoRaWAN telemetry network reading soil moisture and ambient temperature across 5km rural radius."
        }
      ],
      education: [
        {
          degree: "B.Tech in Electronics & Communication Engineering",
          institution: "NIT Kurukshetra",
          year: "2018 - 2022",
          score: "CGPA: 8.7/10"
        }
      ]
    }
  },
  {
    id: "finance-investment-analyst",
    title: "Financial Analyst & Investment Banking",
    category: "Business & Marketing",
    tagline: "Financial Modeling, DCF, M&A, Valuation, Excel, Bloomberg Terminal",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Siddharth Agarwal",
      title: "Senior Financial Analyst & Valuation Specialist",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      email: "siddharth.agarwal.cfa@gmail.com",
      phone: "+91 98101 23450",
      location: "Mumbai, Maharashtra",
      linkedin: "siddharth-agarwal-finance",
      github: "siddharth-models",
      summary: "CFA Level II Candidate with 3+ years experience in discounted cash flow (DCF) valuation, comparable company analysis (CCA), and three-statement financial modeling. Advised on ₹450 Cr+ across 3 successful mid-market M&A transactions.",
      skills: "Financial Modeling, DCF Valuation, LBO Models, M&A Analysis, Advanced Excel (VBA, Macros), Bloomberg Terminal, FactSet, PowerPoint Pitchbooks",
      languages: "English, Hindi",
      awards: "2023 | CFA Institute Level II Passed (Top 10 Percentile)\n2022 | Best Equity Research Presentation Award",
      experience: [
        {
          company: "CapitalEdge Advisory",
          role: "Investment Banking Analyst",
          duration: "July 2022 - Present",
          location: "Mumbai, India",
          description: "• Built comprehensive 3-statement financial models and sensitivity analyses for 6 corporate clients evaluating capital raises.\n• Authored 12 institutional confidential information memorandums (CIM) and pitchbooks presented to private equity sponsors.\n• Executed transaction due diligence and synergy benchmarking on ₹320 Cr logistics company acquisition."
        }
      ],
      projects: [
        {
          title: "Public Tech IPO Valuation Model",
          tech: "Excel Financial Model, DCF, Precedent Transactions, Monte Carlo",
          link: "https://siddharth-models.notion.site",
          description: "• In-depth equity research model on Indian tech unicorn IPO with dynamic revenue cohorts and scenario-based valuations."
        }
      ],
      education: [
        {
          degree: "Bachelor of Commerce (Honours) in Finance",
          institution: "Shri Ram College of Commerce (SRCC), Delhi University",
          year: "2019 - 2022",
          score: "Percentage: 92.4%"
        }
      ]
    }
  },
  {
    id: "hr-talent-partner",
    title: "HR Business Partner & Talent Acquisition",
    category: "Business & Marketing",
    tagline: "Tech Recruiting, Employee Engagement, HR Analytics, Workday, Culture",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Pooja Hegde",
      title: "Senior Technical Recruiter & HR Business Partner",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      email: "pooja.hegde.hr@gmail.com",
      phone: "+91 99881 22334",
      location: "Bengaluru, Karnataka",
      linkedin: "pooja-hegde-hr",
      github: "poojahegde.me",
      summary: "HR professional with 4 years managing full-cycle technical recruiting and employee engagement for hyper-growth technology companies. Successfully closed 120+ senior engineering, product, and leadership hires while cutting average time-to-hire by 28%.",
      skills: "Technical Recruiting, LinkedIn Recruiter, Applicant Tracking Systems (Greenhouse, Lever), HR Analytics, Workday, Compensation Benchmarking, Onboarding, Performance Reviews",
      languages: "English, Hindi, Kannada",
      awards: "2023 | SHRM-CP Certified Professional\n2022 | Recruiter of the Year Award",
      experience: [
        {
          company: "InnoScale Technologies",
          role: "Senior Tech Talent Partner",
          duration: "May 2022 - Present",
          location: "Bengaluru, India",
          description: "• Scaled engineering and AI research teams from 45 to 130 employees within 16 months across Bengaluru and remote hubs.\n• Optimized candidate offer-acceptance rate from 72% to 89% through structured compensation benchmarking and transparent interview loops.\n• Designed and implemented bi-annual employee feedback surveys resulting in a 14-point jump in overall eNPS."
        }
      ],
      projects: [
        {
          title: "Structured Engineering Competency Matrix",
          tech: "Greenhouse ATS, Notion, Google Workspace, CultureAmp",
          link: "https://poojahegde.me/hr-playbook",
          description: "• Created standardized leveling guides and rubric-based interview questions to eliminate hiring bias across 8 technical squads."
        }
      ],
      education: [
        {
          degree: "MBA in Human Resource Management",
          institution: "Symbiosis Institute of Business Management (SIBM)",
          year: "2018 - 2020",
          score: "CGPA: 3.7/4.0"
        }
      ]
    }
  },
  {
    id: "technical-content-strategist",
    title: "Technical Writer & Documentation Strategist",
    category: "Design & Creative",
    tagline: "Developer Docs, API Reference, Markdown, OpenAPI/Swagger, GitBook",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Divya Sundaram",
      title: "Senior Developer Documentation Lead",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      email: "divya.docs@gmail.com",
      phone: "+91 98411 33445",
      location: "Chennai, Tamil Nadu",
      linkedin: "divya-sundaram-docs",
      github: "divyadocs",
      summary: "Technical Documentation Specialist with 4 years creating developer documentation, OpenAPI references, interactive tutorials, and SDK guides for cloud infrastructure and SaaS APIs. Passionate about Docs-as-Code workflows.",
      skills: "Technical Writing, Markdown, MDX, OpenAPI/Swagger, Postman, Docusaurus, GitBook, ReadMe.io, Git, HTML/CSS, Python Basics, Developer Relations",
      languages: "English, Tamil, Hindi",
      awards: "2023 | Write the Docs Community Speaker",
      experience: [
        {
          company: "CloudAPI Platform",
          role: "Lead Technical Writer",
          duration: "June 2022 - Present",
          location: "Chennai, India",
          description: "• Authored end-to-end REST API documentation and quickstart guides used by 40,000+ registered third-party developers.\n• Reduced developer onboarding support tickets by 38% by introducing interactive Postman collections and code snippet generators.\n• Migrated documentation pipeline to Docusaurus + GitHub Actions, enabling automated continuous deployment on every PR."
        }
      ],
      projects: [
        {
          title: "Public Developer Documentation Portal",
          tech: "Docusaurus, React, Algolia Search, OpenAPI 3.0",
          link: "https://github.com/divyadocs/developer-docs-template",
          description: "• Open-source modern developer documentation template with dark mode, full-text search, and multi-language code tabs."
        }
      ],
      education: [
        {
          degree: "B.Tech in Information Technology",
          institution: "SSN College of Engineering",
          year: "2017 - 2021",
          score: "CGPA: 8.7/10"
        }
      ]
    }
  },
  {
    id: "web3-blockchain-developer",
    title: "Blockchain & Web3 Developer",
    category: "Tech & IT",
    tagline: "Solidity, Ethereum, Hardhat, Ethers.js, DeFi, Smart Contracts",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Yash Chopra",
      title: "Smart Contract & Web3 Engineer",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      email: "yash.chopra.web3@gmail.com",
      phone: "+91 97110 99887",
      location: "New Delhi, Delhi",
      linkedin: "yash-chopra-web3",
      github: "yash-solidity",
      summary: "Blockchain Developer with 3 years developing audited Solidity smart contracts, DeFi liquidity protocols, and decentralized Web3 applications. Hands-on experience with Hardhat testing, Foundry fuzzing, and OpenZeppelin security standards.",
      skills: "Solidity, Ethereum, EVM, Hardhat, Foundry, Ethers.js, Web3.js, OpenZeppelin, IPFS, Slither, TypeScript, Next.js, React",
      languages: "English, Hindi",
      awards: "2023 | ETHGlobal Hackathon Winner (DeFi Track)\n2022 | Certified Blockchain Developer",
      experience: [
        {
          company: "Nexus Web3 Labs",
          role: "Smart Contract Developer",
          duration: "Sept 2022 - Present",
          location: "New Delhi, India",
          description: "• Developed ERC-20 staking and reward distribution smart contracts managing $4.8M in Total Value Locked (TVL).\n• Conducted gas optimization reviews reducing contract deployment gas by 22% and transfer function execution cost by 18%.\n• Collaborated with external security auditors (CertiK) to resolve all informational and medium vulnerability findings."
        }
      ],
      projects: [
        {
          title: "Decentralized P2P Lending Protocol",
          tech: "Solidity, Foundry, Next.js, Ethers.js, Chainlink Oracles",
          link: "https://github.com/yash-solidity/p2p-lending",
          description: "• Over-collateralized crypto loan protocol utilizing Chainlink price feeds with automated liquidator bots."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science",
          institution: "Indraprastha Institute of Information Technology (IIIT Delhi)",
          year: "2018 - 2022",
          score: "CGPA: 8.6/10"
        }
      ]
    }
  },
  {
    id: "game-developer-unity",
    title: "Game Developer (Unity & C#)",
    category: "Design & Creative",
    tagline: "Unity 3D, C#, Physics, Shaders, 3D Mathematics, Mobile Games",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Devansh Trivedi",
      title: "3D Game Programmer & Physics Specialist",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      email: "devansh.trivedi.games@gmail.com",
      phone: "+91 99201 34567",
      location: "Mumbai, Maharashtra",
      linkedin: "devansh-game-dev",
      github: "devanshgamedev",
      summary: "Unity Game Developer with 3 years building 2D and 3D indie titles, gameplay systems, and custom physics simulation. Strong background in linear algebra, object pooling, procedural level generation, and shader development.",
      skills: "Unity 3D, C#, 3D Math, HLSL / Shader Graph, Object Pooling, NavMesh AI, Blender Basics, Git, Performance Profiling, Mobile Game Optimization",
      languages: "English, Hindi, Gujarati",
      awards: "2023 | India Game Developer Conference (IGDC) Finalist\n2022 | Global Game Jam Winner",
      experience: [
        {
          company: "PixelForge Studios",
          role: "Unity Game Developer",
          duration: "May 2022 - Present",
          location: "Mumbai, India",
          description: "• Engineered core combat and inventory mechanics for an action RPG downloaded over 300,000 times on Steam and Google Play.\n• Profiled and optimized draw calls and memory garbage collection, boosting mobile frame rates from 35 FPS to a silky 60 FPS.\n• Implemented state machine AI system for enemy NPCs with adaptive pathfinding and line-of-sight detection."
        }
      ],
      projects: [
        {
          title: "ChronoDrift - 3D Sci-Fi Vehicle Racing Game",
          tech: "Unity 3D, C#, Custom Vehicle Physics, Post-Processing",
          link: "https://devanshgamedev.itch.io/chrono-drift",
          description: "• Sci-fi anti-gravity hovercraft racing game with split-screen multiplayer and responsive controller support."
        }
      ],
      education: [
        {
          degree: "B.Sc. in Computer Science & Game Development",
          institution: "D.Y. Patil International University",
          year: "2018 - 2022",
          score: "CGPA: 8.8/10"
        }
      ]
    }
  },
  {
    id: "fresher-bca-it",
    title: "Software Trainee (BCA / MCA Fresher)",
    category: "Freshers & Interns",
    tagline: "C++, Java, HTML, CSS, JavaScript, SQL, Web Projects",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Fresher (0-1 yrs)",
    data: {
      name: "Manish Kumar",
      title: "Graduate Software Engineering Trainee",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      email: "manish.kumar.bca@gmail.com",
      phone: "+91 98112 45678",
      location: "Patna, Bihar",
      linkedin: "manish-kumar-bca",
      github: "manish-codes-24",
      summary: "Enthusiastic BCA graduate (2024) with foundational expertise in Java, Object-Oriented Programming, relational databases (MySQL), and frontend web development. Quick learner eager to contribute to enterprise software development teams.",
      skills: "Java, C++, HTML5, CSS3, JavaScript, MySQL, JDBC, Git, GitHub, OOPs, SDLC, Postman Basics",
      languages: "English, Hindi",
      awards: "2024 | College Topper - Final Year BCA\n2023 | Winner - State Level Coding Competition",
      experience: [
        {
          company: "Apex Infotech Services",
          role: "Web Development Intern",
          duration: "Jan 2024 - April 2024",
          location: "Patna, India",
          description: "• Designed and developed responsive landing pages for 3 local client businesses using HTML5, CSS3, and JavaScript.\n• Created MySQL database schemas and stored procedures for customer appointment booking system.\n• Tested web forms across major browsers to ensure cross-browser compatibility and responsive layout."
        }
      ],
      projects: [
        {
          title: "Online Book Library Management System",
          tech: "Java, Swing, JDBC, MySQL",
          link: "https://github.com/manish-codes-24/library-management",
          description: "• Desktop management system allowing librarians to track issued books, calculate fines, and manage member records."
        }
      ],
      education: [
        {
          degree: "Bachelor of Computer Applications (BCA)",
          institution: "Patna University",
          year: "2021 - 2024",
          score: "Aggregate: 84.8%"
        }
      ]
    }
  },
  {
    id: "customer-success-manager",
    title: "Customer Success & Client Relations Lead",
    category: "Business & Marketing",
    tagline: "SaaS Retention, Net Revenue Retention (NRR), Churn Prevention",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Neha Saxena",
      title: "Senior Customer Success Manager",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      email: "neha.saxena.csm@gmail.com",
      phone: "+91 98990 12345",
      location: "Noida, Uttar Pradesh",
      linkedin: "neha-saxena-csm",
      github: "nehasaxena.co",
      summary: "Customer Success Manager with 4+ years driving product adoption, net retention (115% NRR), and executive client relationships for enterprise SaaS platforms. Expert in conducting Executive Business Reviews (EBR) and proactive churn mitigation.",
      skills: "Customer Success, Gainsight, Salesforce, Zendesk, Churn Reduction, Upselling & Cross-selling, Executive Business Reviews (EBR), Onboarding Workflows",
      languages: "English, Hindi",
      awards: "2023 | Customer Success Excellence Award - Top NRR Retention",
      experience: [
        {
          company: "MetricStream SaaS",
          role: "Customer Success Manager",
          duration: "May 2022 - Present",
          location: "Noida, India",
          description: "• Managed portfolio of 42 enterprise accounts representing ₹12 Cr in Annual Recurring Revenue (ARR).\n• Achieved 118% Net Revenue Retention (NRR) and reduced annual gross logo churn from 8.5% down to 2.1%.\n• Conducted quarterly business reviews with enterprise VP/C-level stakeholders to demonstrate measurable ROI and product value."
        }
      ],
      projects: [
        {
          title: "Automated Enterprise Customer Onboarding Playbook",
          tech: "Gainsight, HubSpot, Loom, Intercom",
          link: "https://nehasaxena.co/onboarding-case-study",
          description: "• Restructured 30-day onboarding journey cutting time-to-first-value (TTFV) from 24 days to 9 days."
        }
      ],
      education: [
        {
          degree: "MBA in International Business",
          institution: "FORE School of Management",
          year: "2018 - 2020",
          score: "CGPA: 3.6/4.0"
        }
      ]
    }
  },
  {
    id: "network-systems-admin",
    title: "Network & Systems Administrator",
    category: "Tech & IT",
    tagline: "Cisco, CCNA, Active Directory, VMware, Firewall, Linux Administration",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Rahul Deshpande",
      title: "Senior Network & Infrastructure Engineer",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      email: "rahul.deshpande.net@gmail.com",
      phone: "+91 97654 32109",
      location: "Pune, Maharashtra",
      linkedin: "rahul-deshpande-net",
      github: "rahul-sysadmin",
      summary: "Network Engineer with 4 years managing enterprise campus networks, Cisco routing/switching, Fortinet next-gen firewalls, and Windows Active Directory infrastructure. Specialized in high-availability network redundancy and VPN tunnels.",
      skills: "Cisco Routing & Switching, Fortinet Firewall, VMware ESXi, Windows Server, Active Directory, DNS/DHCP, Linux (RHEL/Ubuntu), Bash Scripting, Wireshark, Nagios",
      languages: "English, Hindi, Marathi",
      awards: "2023 | Cisco Certified Network Associate (CCNA 200-301)\n2022 | VMware Certified Professional",
      experience: [
        {
          company: "TechnoCore IT Infrastructure",
          role: "Senior Systems & Network Admin",
          duration: "April 2022 - Present",
          location: "Pune, India",
          description: "• Administered multi-site enterprise network supporting 1,500+ employees with 99.98% network availability.\n• Configured site-to-site IPsec VPN tunnels and VLAN segregation on Fortigate firewalls, isolating production workloads.\n• Deployed VMware ESXi cluster hosting 45 virtual servers with automated daily snapshot backups."
        }
      ],
      projects: [
        {
          title: "Zero-Trust Office Network Architecture",
          tech: "Cisco Catalyst, FortiGate, 802.1X Radius, Active Directory",
          link: "https://github.com/rahul-sysadmin/network-automation",
          description: "• Implemented 802.1X network access control ensuring only authorized company laptops connect to internal corporate subnets."
        }
      ],
      education: [
        {
          degree: "B.E. in Electronics & Telecommunication",
          institution: "Government College of Engineering, Pune",
          year: "2017 - 2021",
          score: "CGPA: 8.4/10"
        }
      ]
    }
  },
  {
    id: "ecommerce-growth-lead",
    title: "E-Commerce Growth & Operations Specialist",
    category: "Business & Marketing",
    tagline: "Shopify, Amazon Seller Central, Inventory, Catalog Optimization, CRO",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Mid-Level",
    data: {
      name: "Zoya Siddiqui",
      title: "Senior E-Commerce Operations Lead",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
      email: "zoya.siddiqui.ecom@gmail.com",
      phone: "+91 99345 67890",
      location: "Bengaluru, Karnataka",
      linkedin: "zoya-siddiqui-ecom",
      github: "zoyaecom.me",
      summary: "E-Commerce Manager with 4 years scaling D2C brands across Shopify Plus, Amazon, and Flipkart. Experienced in end-to-end catalog management, supply chain forecasting, return-to-origin (RTO) reduction, and promotional marketing.",
      skills: "Shopify Plus, Amazon Seller Central, Flipkart Marketplace, Google Analytics 4, Inventory Management, RTO Reduction, Email Marketing (Klaviyo), Unicommerce",
      languages: "English, Hindi, Urdu",
      awards: "2023 | D2C Brand of the Year - Operations Excellence",
      experience: [
        {
          company: "UrbanAura Retail",
          role: "E-Commerce Operations Lead",
          duration: "June 2022 - Present",
          location: "Bengaluru, India",
          description: "• Managed end-to-end storefront operations on Shopify generating ₹3.4 Cr monthly GMV across 14 product categories.\n• Cut Return-To-Origin (RTO) rate on Cash-on-Delivery orders from 28% to 14% via automated OTP verification.\n• Scaled Klaviyo email marketing channel to generate 24% of total brand online revenue at a 42x ROI."
        }
      ],
      projects: [
        {
          title: "Multi-Warehouse Inventory Routing Engine",
          tech: "Shopify API, Unicommerce, Shiprocket, Python",
          link: "https://zoyaecom.me/case-study",
          description: "• Automated intelligent order routing to closest regional fulfillment center, cutting average delivery transit time by 1.8 days."
        }
      ],
      education: [
        {
          degree: "BBA in Retail & Supply Chain Management",
          institution: "Christ University, Bengaluru",
          year: "2018 - 2021",
          score: "CGPA: 3.8/4.0"
        }
      ]
    }
  },
  {
    id: "social-media-content-creator",
    title: "Social Media Strategist & Creator",
    category: "Design & Creative",
    tagline: "Short-Form Video, Instagram, YouTube, Content Calendar, Viral Growth",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Junior - Mid",
    data: {
      name: "Tara Chandran",
      title: "Lead Social Media Strategist & Content Creator",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      email: "tara.chandran.media@gmail.com",
      phone: "+91 98881 23456",
      location: "Mumbai, Maharashtra",
      linkedin: "tara-chandran-social",
      github: "tarachandran.me",
      summary: "Creative Social Media Strategist with 3 years executing viral organic social campaigns, short-form video creation (Reels, TikTok, YouTube Shorts), and brand community building. Scaled brand social footprint from 20k to 450k+ followers.",
      skills: "Content Strategy, Video Editing (Premiere Pro, CapCut), Canva, Copywriting, Instagram Reels, YouTube Shorts, Community Management, Trend Analysis, Influencer Marketing",
      languages: "English, Hindi, Malayalam",
      awards: "2023 | Creator Economy Rising Star Award\n2022 | Best Brand Social Campaign Finalist",
      experience: [
        {
          company: "WaveMedia Creator Studio",
          role: "Senior Content Strategist",
          duration: "May 2022 - Present",
          location: "Mumbai, India",
          description: "• Directed social media strategy producing 65+ short-form videos monthly generating over 45 million organic views.\n• Scaled official Instagram handle from 35k to 380k followers in 12 months with 6.2% engagement rate.\n• Managed 40+ micro-influencer partnerships for product launch campaigns, generating ₹65L in trackable affiliate sales."
        }
      ],
      projects: [
        {
          title: "Viral FinTech Awareness Campaign (50M+ Views)",
          tech: "CapCut, Premiere Pro, Canva, Instagram Analytics",
          link: "https://tarachandran.me/portfolio",
          description: "• Conceptualized and edited viral 10-part financial literacy reel series featured on top business podcasts."
        }
      ],
      education: [
        {
          degree: "Bachelor of Mass Media (BMM) in Advertising",
          institution: "St. Xavier's College, Mumbai",
          year: "2019 - 2022",
          score: "First Class with Distinction"
        }
      ]
    }
  },
  {
    id: "executive-cto",
    title: "Chief Technology Officer (CTO / VP Eng)",
    category: "Product & Management",
    tagline: "Engineering Leadership, Cloud Architecture, Scalability, Team Building",
    color: "#2C3545",
    layout: "canva-slate",
    experienceLevel: "Executive (10+ yrs)",
    data: {
      name: "Rajesh Krishnan",
      title: "Chief Technology Officer (CTO)",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      email: "rajesh.krishnan.cto@gmail.com",
      phone: "+91 99000 11223",
      location: "Bengaluru, Karnataka",
      linkedin: "rajesh-krishnan-cto",
      github: "rajesh-krishnan",
      summary: "Visionary engineering executive with 12+ years of experience leading 100+ engineer organizations through Series A to Series C hyper-growth. Architected fault-tolerant systems handling 100M+ monthly requests and managed $4M+ annual technology budgets.",
      skills: "Executive Leadership, Cloud Architecture (AWS/GCP), Microservices, Technical Strategy, Team Mentorship, Budgeting & P&L, SOC2/ISO Compliance, M&A Diligence",
      languages: "English, Hindi, Tamil",
      awards: "2023 | Top 50 Tech Leaders of India\n2021 | CTO Innovation Award",
      experience: [
        {
          company: "CloudScale Enterprise Group",
          role: "Chief Technology Officer",
          duration: "2021 - Present",
          location: "Bengaluru, India",
          description: "• Built and led engineering organization of 85+ software engineers, data scientists, and DevOps across 6 squads.\n• Oversaw architectural overhaul from legacy monolithic backend to event-driven Kubernetes microservices on AWS.\n• Achieved SOC2 Type II and ISO 27001 security compliance, enabling enterprise contracts with Fortune 500 banks."
        },
        {
          company: "VentureTech Software",
          role: "VP of Engineering",
          duration: "2017 - 2021",
          location: "Bengaluru, India",
          description: "• Scaled engineering department from 12 to 55 engineers while cutting average deployment cycle time from 3 weeks to daily releases.\n• Managed $2.8M annual cloud and tooling budget, negotiating 32% savings on enterprise AWS contracts."
        }
      ],
      education: [
        {
          degree: "M.S. in Computer Science",
          institution: "IIT Madras",
          year: "2009 - 2011",
          score: "Gold Medalist"
        },
        {
          degree: "B.Tech in Computer Science & Engineering",
          institution: "NIT Trichy",
          year: "2005 - 2009",
          score: "First Class with Distinction"
        }
      ],
      projects: [
        {
          title: "Enterprise Distributed Event Streaming Architecture",
          tech: "Kafka, Golang, Kubernetes, AWS EKS, Terraform",
          link: "https://rajeshkrishnan.io/architecture",
          description: "• High-throughput telemetry pipeline ingesting 15 billion events monthly with 99.999% reliability."
        }
      ]
    }
  }
];

const resumeLayouts = [
  { id: 'canva-slate', name: 'Slate Classic' },
  { id: 'modern-tech', name: 'Modern Tech' },
  { id: 'ats-classic', name: 'ATS Classic' },
  { id: 'creative-split', name: 'Creative Split' },
  { id: 'executive-banner', name: 'Executive Banner' },
  { id: 'editorial-minimal', name: 'Editorial Minimal' },
];

const colorVariants = ['#1E3A5F', '#0F766E', '#7C3AED', '#9A3412', '#334155', '#BE185D', '#047857', '#A16207'];
const TEMPLATE_CATALOG_SIZE = 100;

export const PREBUILT_RESUMES = Array.from({ length: TEMPLATE_CATALOG_SIZE }, (_, index) => {
  const baseIndex = index % resumeTemplates.length;
  const version = Math.floor(index / resumeTemplates.length);
  const baseTemplate = resumeTemplates[baseIndex];
  const layout = resumeLayouts[(baseIndex + version) % resumeLayouts.length];
  const isNew = index >= 90;

  return {
    ...baseTemplate,
    id: version === 0 ? baseTemplate.id : `${baseTemplate.id}-${layout.id}-v${version + 1}`,
    title: version === 0
      ? baseTemplate.title
      : `${isNew ? '2026 Fresh Design' : layout.name} - ${baseTemplate.title}`,
    layout: layout.id,
    color: version === 0 ? baseTemplate.color : colorVariants[(baseIndex * 3 + version) % colorVariants.length],
    isNew,
    isFeatured: index < 6,
  };
});

export const RESUME_CATEGORIES = [
  "All Templates",
  "Business & Marketing",
  "Tech & IT",
  "AI & Data",
  "Design & Creative",
  "Product & Management",
  "Freshers & Interns"
];



