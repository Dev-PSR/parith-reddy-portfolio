export const COMMANDS = [
  'help',
  'whoami',
  'experience',
  'projects',
  'skills',
  'contact',
  'education',
  'theme',
  'clear',
  'welcome',
  'ls',
  'history',
  'resume',
  'sudo',
  'project',
];

export const THEMES = ['dark', 'green', 'blue', 'light'];
export const CHIP_COMMANDS = ['whoami', 'experience', 'projects', 'skills', 'contact'];

const divider = (length) => '-'.repeat(length);

const asciiName = [
  '  ____            _ _   _       ____          _     _       ',
  ' |  _ \\ __ _ _ __(_) |_| |__   |  _ \\ ___  __| | __| |_   _ ',
  " | |_) / _` | '__| | __| '_ \\  | |_) / _ \\/ _` |/ _` | | | |",
  ' |  __/ (_| | |  | | |_| | | | |  _ <  __/ (_| | (_| | |_| |',
  ' |_|   \\__,_|_|  |_|\\__|_| |_| |_| \\_\\___|\\__,_|\\__,_|\\__, |',
  '                                                        |___/ ',
];

const infoRow = (label, value, options = {}) => ({
  cls: 'info-row',
  children: [
    { text: `  ${label}`, cls: 'info-label' },
    {
      text: value,
      cls: ['info-value', options.cls].filter(Boolean).join(' '),
      link: options.link,
    },
  ],
});

const commandSections = {
  whoami: [
    { text: '' },
    { text: ' IDENTITY', cls: 'c-cyan c-bold' },
    { text: divider(40), cls: 'section-divider' },
    { text: '' },
    infoRow('Name', 'Parith Reddy', { cls: 'c-white c-bold' }),
    infoRow('School', 'University of Wisconsin-Madison'),
    infoRow('Major', 'B.S. Computer Science (May 2027)'),
    infoRow('Honors', "Dean's List - Fall 2024, Spring 2025", { cls: 'c-yellow' }),
    infoRow('Focus', 'Backend systems, data pipelines, NLP'),
    infoRow('Languages', 'English · Telugu · Hindi · French'),
    { text: '' },
  ],
  skills: [
    { text: '' },
    { text: ' STACK', cls: 'c-cyan c-bold' },
    { text: divider(40), cls: 'section-divider' },
    { text: '' },
    infoRow('Languages', 'Python · Java · JavaScript · SQL · Bash', { cls: 'c-yellow' }),
    infoRow('Frameworks', 'React · Docker · Git · Supabase', { cls: 'c-blue' }),
    infoRow('Systems', 'Linux · Shell Scripting · Networking', { cls: 'c-green' }),
    infoRow('Other', 'API Integration · RAG Systems', { cls: 'c-purple' }),
    { text: '' },
  ],
  education: [
    { text: '' },
    { text: ' EDUCATION', cls: 'c-cyan c-bold' },
    { text: divider(40), cls: 'section-divider' },
    { text: '' },
    infoRow('School', 'University of Wisconsin-Madison', { cls: 'c-white c-bold' }),
    infoRow('Degree', 'B.S. Computer Science · May 2027'),
    infoRow('Honors', "Dean's List - Fall 2024, Spring 2025", { cls: 'c-yellow' }),
    { text: '' },
    { text: '  Relevant Coursework:', cls: 'c-white c-bold' },
    { text: '  Data Structures & Algorithms · Deep Learning for NLP', cls: 'c-gray' },
    { text: '  Cryptography · Machine Organization', cls: 'c-gray' },
    { text: '  Linear Algebra · Matrix Methods for ML', cls: 'c-gray' },
    { text: '' },
  ],
  contact: [
    { text: '' },
    { text: ' CONTACT', cls: 'c-cyan c-bold' },
    { text: divider(40), cls: 'section-divider' },
    { text: '' },
    infoRow('Email', 'parith0413@gmail.com', { link: 'mailto:parith0413@gmail.com' }),
    infoRow('GitHub', 'github.com/Dev-PSR', { link: 'https://github.com/Dev-PSR' }),
    infoRow('LinkedIn', 'linkedin.com/in/parith-reddy', {
      link: 'https://www.linkedin.com/in/parith-reddy-366b98256/',
    }),
    { text: '' },
  ],
};

const projects = [
  {
    slug: 'wattbot',
    title: 'WattBot RAG',
    summary: 'RAG system for AI emissions & resource estimates',
    problem: 'No easy way to query scientific literature on AI energy consumption',
    approach: 'PDF chunking -> vector embeddings -> LLM with citation-backed responses',
    stack: 'Python · Pinecone · OpenAI API',
    detailTitle: 'RAG System for AI Emissions & Resource Estimates',
    detailLines: [
      "  Researchers studying AI's environmental impact had no",
      '  efficient way to query across dense scientific papers',
      '  with tables, figures, and conflicting data.',
      '',
      '  A retrieval-augmented generation pipeline that:',
      '  1. Ingests PDFs with structured segmentation',
      '  2. Indexes embeddings in Pinecone',
      '  3. Produces answers with inline citations and extracted data',
    ],
  },
  {
    slug: 'manhwa',
    title: 'Manhwa Translator Pipeline',
    summary: 'CV -> OCR -> translation -> typesetting automation',
    problem: 'Manual manga translation is slow and repetitive',
    approach: 'A full pipeline automating detection, erasure, translation, and layout',
    stack: 'Python · OpenCV · Tesseract OCR',
    detailTitle: 'Automated Manga/Manhwa Localization',
    detailLines: [
      '  Translating manga/manhwa usually requires multiple',
      '  manual steps across every page in a chapter.',
      '',
      '  A fully automated pipeline that:',
      '  1. Detects speech bubbles via contour analysis',
      '  2. Generates masks to remove source text',
      '  3. Runs OCR, translation, wrapping, and typesetting',
      '  4. Supports resumable batch processing and retries',
    ],
  },
  {
    slug: 'agrisure',
    title: 'AgriSure',
    summary: 'Crop insurance risk analysis platform',
    problem: 'Farmers need better ways to evaluate insurance ROI under climate risk',
    approach: 'USDA + NOAA data -> Monte Carlo simulations -> risk scoring',
    stack: 'Python · USDA API · NOAA API',
    detailTitle: 'Crop Insurance Risk Analysis Platform',
    detailLines: [
      '  Farmers and insurers need clearer ways to evaluate',
      '  whether crop insurance is worth the premium as yield',
      '  volatility changes over time.',
      '',
      '  A platform that:',
      '  1. Aggregates USDA and NOAA data',
      '  2. Models yield volatility across scenarios',
      '  3. Produces a practical risk score for policy decisions',
    ],
  },
];

export function getWelcomeLines() {
  return [
    ...asciiName.map((text) => ({ text, cls: 'ascii-block' })),
    { text: '' },
    { text: ' Software Engineer · CS @ UW-Madison', cls: 'c-cyan' },
    { text: '' },
    { text: divider(60), cls: 'section-divider' },
    { text: '' },
    { text: ' Welcome to my interactive portfolio.', cls: 'c-gray' },
    { text: ' Type a command or click a button below to explore.', cls: 'c-gray' },
    { text: '' },
  ];
}

function getHelpLines() {
  return [
    { text: '' },
    { text: ' Available Commands:', cls: 'c-white c-bold' },
    { text: divider(44), cls: 'section-divider' },
    { text: '  whoami          Who I am', cls: 'c-green' },
    { text: '  experience      Work experience', cls: 'c-green' },
    { text: '  projects        Things I have built', cls: 'c-green' },
    { text: '  skills          Languages, tools, frameworks', cls: 'c-green' },
    { text: '  education       Coursework and academics', cls: 'c-green' },
    { text: '  contact         How to reach me', cls: 'c-green' },
    { text: '  resume          Download my resume', cls: 'c-green' },
    { text: '  theme <name>    Switch theme (dark/green/blue/light)', cls: 'c-green' },
    { text: '  history         Show command history', cls: 'c-green' },
    { text: '  clear           Clear the terminal', cls: 'c-green' },
    { text: '' },
    { text: '  Tip: Press Tab to autocomplete, arrow keys for history', cls: 'c-dim' },
    { text: '  Suggested: whoami -> experience -> projects', cls: 'c-yellow' },
    { text: '' },
  ];
}

function getExperienceLines() {
  return [
    { text: '' },
    { text: ' EXPERIENCE', cls: 'c-cyan c-bold' },
    { text: divider(60), cls: 'section-divider' },
    { text: '' },
    { text: '  Software Engineering Researcher', cls: 'c-white c-bold' },
    { text: '  UW-Madison CS · Advisor: Prof. Meena Syamkumar', cls: 'c-blue' },
    { text: '  Sep 2025 - Present · Madison, WI', cls: 'c-gray' },
    { text: '' },
    {
      cls: 'stat-row',
      children: [
        { cls: 'stat-item', children: [{ text: '300+', cls: 'stat-num' }, { text: 'students served', cls: 'stat-label' }] },
        { cls: 'stat-item', children: [{ text: '9,600 -> 3,900', cls: 'stat-num' }, { text: 'tokens / request', cls: 'stat-label' }] },
        { cls: 'stat-item', children: [{ text: '<20ms', cls: 'stat-num' }, { text: 'response time', cls: 'stat-label' }] },
      ],
    },
    { text: '' },
    { text: '  - Deployed a Python backend for real-time code evaluation', cls: 'c-gray' },
    { text: '    used by 300+ students in production', cls: 'c-gray' },
    { text: '  - Optimized query paths and database operations to', cls: 'c-gray' },
    { text: '    sustain sub-20ms response times', cls: 'c-gray' },
    { text: '  - Reduced request context from 9,600 tokens to 3,900', cls: 'c-gray' },
    { text: '    while cutting compute cost', cls: 'c-gray' },
    { text: '  - Managed reliability, logs, and cost tracking on Linux', cls: 'c-gray' },
    { text: '' },
    { text: divider(60), cls: 'section-divider' },
    { text: '' },
    { text: '  Guest Services Associate', cls: 'c-white c-bold' },
    { text: '  Wisconsin Athletics', cls: 'c-blue' },
    { text: '  Sep 2025 - Present · Madison, WI', cls: 'c-gray' },
    { text: '' },
    { text: '  - Managed guest flow for football and volleyball events', cls: 'c-gray' },
    { text: '  - Resolved real-time incidents and coordinated ADA access', cls: 'c-gray' },
    { text: '' },
  ];
}

function getProjectsLines() {
  const lines = [
    { text: '' },
    { text: ' PROJECTS', cls: 'c-cyan c-bold' },
    { text: divider(60), cls: 'section-divider' },
    { text: '' },
  ];

  projects.forEach((project) => {
    lines.push(
      { text: `  [${project.title}]`, cls: 'c-white c-bold' },
      { text: `  Problem:  ${project.problem}`, cls: 'c-gray' },
      { text: `  Approach: ${project.approach}`, cls: 'c-gray' },
      { text: `  Stack:    ${project.stack}`, cls: 'c-blue' },
      { text: `  Type:     project ${project.slug}`, cls: 'c-yellow' },
      { text: '' },
    );
  });

  return lines;
}

function getProjectDetailLines(slug) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return null;
  }

  return [
    { text: '' },
    { text: ` ${project.title.toUpperCase()}`, cls: 'c-cyan c-bold' },
    { text: ` ${project.detailTitle}`, cls: 'c-blue' },
    { text: ` ${divider(52)}`, cls: 'section-divider' },
    { text: '' },
    ...project.detailLines.map((text) => ({ text, cls: text ? 'c-gray' : undefined })),
    { text: '' },
    { text: '  STACK', cls: 'c-white c-bold' },
    { text: `  ${project.stack}`, cls: 'c-blue' },
    { text: '' },
    { text: '  LINKS', cls: 'c-white c-bold' },
    infoRow('GitHub', 'github.com/Dev-PSR', { link: 'https://github.com/Dev-PSR' }),
    { text: '' },
  ];
}

function getDirectoryLines() {
  return [
    { text: '' },
    { text: '  drwxr-xr-x  about.txt', cls: 'c-blue' },
    { text: '  drwxr-xr-x  projects/', cls: 'c-blue' },
    { text: '  drwxr-xr-x  experience/', cls: 'c-blue' },
    { text: '  -rw-r--r--  ParithReddyResume.pdf', cls: 'c-white' },
    { text: '  -rw-r--r--  skills.json', cls: 'c-white' },
    { text: '  -rw-r--r--  contact.md', cls: 'c-white' },
    { text: '' },
    { text: '  Try: cat ParithReddyResume.pdf', cls: 'c-dim' },
    { text: '' },
  ];
}

function getResumeLines() {
  return [
    { text: '' },
    { text: '  Resume', cls: 'c-white c-bold' },
    { text: '' },
    infoRow('Download', 'ParithReddyResume.pdf', { link: '/ParithReddyResume.pdf' }),
    { text: '' },
    { text: '  Place your resume at public/ParithReddyResume.pdf to enable download.', cls: 'c-dim' },
    { text: '' },
  ];
}

function getHistoryLines(commandHistory) {
  return [
    { text: '' },
    ...commandHistory.map((command, index) => ({
      text: `  ${String(index + 1).padStart(4)}  ${command}`,
      cls: 'c-gray',
    })),
    { text: '' },
  ];
}

export function runCommand(command, commandHistory) {
  const normalized = command.trim().toLowerCase();
  const [base, argument] = normalized.split(/\s+/);

  switch (base) {
    case '':
      return { lines: [] };
    case 'help':
      return { lines: getHelpLines() };
    case 'whoami':
      return { lines: commandSections.whoami };
    case 'experience':
    case 'exp':
      return { lines: getExperienceLines() };
    case 'projects':
    case 'proj':
      return { lines: getProjectsLines() };
    case 'project': {
      if (!argument) {
        return { lines: getProjectsLines() };
      }

      const detailLines = getProjectDetailLines(argument);

      if (detailLines) {
        return { lines: detailLines };
      }

      return {
        lines: [
          { text: '' },
          { text: `  Project not found: ${argument}`, cls: 'c-red' },
          { text: '  Available: wattbot, manhwa, agrisure', cls: 'c-gray' },
          { text: '' },
        ],
      };
    }
    case 'skills':
    case 'stack':
      return { lines: commandSections.skills };
    case 'education':
    case 'edu':
      return { lines: commandSections.education };
    case 'contact':
      return { lines: commandSections.contact };
    case 'resume':
    case 'cv':
      return { lines: getResumeLines() };
    case 'welcome':
      return { lines: getWelcomeLines() };
    case 'clear':
      return { action: 'CLEAR' };
    case 'ls':
    case 'dir':
      return { lines: getDirectoryLines() };
    case 'cat':
      if (argument === 'parithreddyresume.pdf') {
        return { lines: getResumeLines() };
      }

      if (argument === 'about.txt') {
        return { lines: commandSections.whoami };
      }

      if (argument === 'contact.md') {
        return { lines: commandSections.contact };
      }

      if (argument === 'skills.json') {
        return { lines: commandSections.skills };
      }

      return {
        lines: [
          { text: `  cat: ${argument || '?'}: No such file`, cls: 'c-red' },
          { text: '' },
        ],
      };
    case 'sudo':
      if ((normalized.split(/\s+/).slice(1).join(' ')).includes('hire')) {
        return {
          lines: [
            { text: '' },
            { text: '  ACCESS GRANTED', cls: 'c-green c-bold' },
            { text: '  Congratulations, you have hired Parith Reddy as your next SWE.', cls: 'c-green' },
            { text: '  Starting date: Immediately', cls: 'c-green' },
            { text: '  Salary: Yes please', cls: 'c-green' },
            { text: '' },
          ],
        };
      }

      return {
        lines: [
          { text: '  sudo: permission denied (but nice try)', cls: 'c-red' },
          { text: '' },
        ],
      };
    case 'history':
      return { lines: getHistoryLines(commandHistory) };
    case 'theme':
      if (argument && THEMES.includes(argument)) {
        return { action: 'THEME', theme: argument };
      }

      return {
        lines: [
          { text: '' },
          { text: `  Available themes: ${THEMES.join(', ')}`, cls: 'c-yellow' },
          { text: '  Usage: theme <name>', cls: 'c-gray' },
          { text: '' },
        ],
      };
    default:
      return {
        lines: [
          { text: '' },
          { text: `  Command not found: ${normalized}`, cls: 'c-red' },
          { text: '  Type help to see available commands.', cls: 'c-gray' },
          { text: '' },
        ],
      };
  }
}
