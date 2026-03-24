import { useCallback, useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CHIP_COMMANDS, COMMANDS, THEMES, getWelcomeLines, runCommand } from './terminalData';

function Prompt() {
  return (
    <>
      <span className="prompt-user">parith</span>
      <span className="prompt-at">@</span>
      <span className="prompt-host">portfolio</span>
      <span className="prompt-at">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-dollar">$</span>
    </>
  );
}

function TerminalLine({ item }) {
  if (item.children) {
    return (
      <div className={`line ${item.cls || ''}`}>
        {item.children.map((child, index) => {
          if (child.children) {
            return (
              <div key={index} className={child.cls || ''}>
                {child.children.map((grandchild, innerIndex) => (
                  <div key={innerIndex} className={grandchild.cls || ''}>
                    {grandchild.text}
                  </div>
                ))}
              </div>
            );
          }

          if (child.link) {
            const external = !child.link.startsWith('mailto:') && !child.link.startsWith('/');

            return (
              <a
                key={index}
                className="terminal-link"
                href={child.link}
                onClick={(event) => event.stopPropagation()}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {child.text}
              </a>
            );
          }

          return (
            <span key={index} className={child.cls || ''}>
              {child.text}
            </span>
          );
        })}
      </div>
    );
  }

  return <div className={`line ${item.cls || ''}`}>{item.text}</div>;
}

const bootLines = [
  { text: ' [BOOT] Initializing system...', cls: 'c-dim', delay: 0 },
  { text: ' [BOOT] Mounting /home/parith...', cls: 'c-dim', delay: 200 },
  { text: ' [BOOT] Loading resume data...', cls: 'c-dim', delay: 400 },
  { text: ' [  OK  ] System ready.', cls: 'c-green', delay: 700 },
];

export default function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const commandHistoryRef = useRef([]);

  const isCoarsePointer = useCallback(
    () => window.matchMedia?.('(pointer: coarse)').matches ?? false,
    [],
  );

  useEffect(() => {
    commandHistoryRef.current = commandHistory;
  }, [commandHistory]);

  useEffect(() => {
    const updateViewportHeight = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${viewportHeight}px`);
    };

    const visualViewport = window.visualViewport;

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    visualViewport?.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      visualViewport?.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!bodyRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (!booted || isCoarsePointer()) {
      return;
    }

    inputRef.current?.focus();
  }, [booted, isCoarsePointer]);

  const animateLines = useCallback(
    (lines) => {
      if (!lines.length) {
        return;
      }

      setAnimating(true);

      let index = 0;
      const visibleLines = [];

      const step = () => {
        if (index >= lines.length) {
          setAnimating(false);
          return;
        }

        visibleLines.push(lines[index]);
        index += 1;

        setHistory((previous) => {
          const next = [...previous];
          const lastEntry = next[next.length - 1];

          if (lastEntry?.animated) {
            next[next.length - 1] = { type: 'output', lines: [...visibleLines], animated: true };
            return next;
          }

          next.push({ type: 'output', lines: [...visibleLines], animated: true });
          return next;
        });

        scrollToBottom();
        setTimeout(step, 25);
      };

      step();
    },
    [scrollToBottom],
  );

  const executeCommand = useCallback(
    (rawCommand) => {
      setHistory((previous) => [...previous, { type: 'input', text: rawCommand }]);

      const result = runCommand(rawCommand, commandHistoryRef.current);

      if (result.action === 'CLEAR') {
        setHistory([]);
      } else if (result.action === 'THEME') {
        document.documentElement.setAttribute('data-theme', result.theme);
        animateLines([
          { text: '' },
          { text: `  Theme switched to: ${result.theme}`, cls: 'c-green' },
          { text: '' },
        ]);
      } else {
        animateLines(result.lines || []);
      }

      if (rawCommand.trim()) {
        setCommandHistory((previous) => [rawCommand, ...previous]);
      }

      setHistoryIndex(-1);
    },
    [animateLines],
  );

  const autoTypeCommand = useCallback(
    (command) => {
      setAnimating(true);
      let index = 0;

      const timer = setInterval(() => {
        index += 1;
        setInput(command.slice(0, index));

        if (index < command.length) {
          return;
        }

        clearInterval(timer);

        setTimeout(() => {
          executeCommand(command);
          setInput('');
          setAnimating(false);
        }, 300);
      }, 60);
    },
    [executeCommand],
  );

  useEffect(() => {
    const timers = bootLines.map((line) =>
      setTimeout(() => {
        setHistory((previous) => [...previous, { type: 'output', lines: [line] }]);
      }, line.delay),
    );

    timers.push(
      setTimeout(() => {
        setHistory((previous) => [...previous, { type: 'output', lines: getWelcomeLines() }]);
      }, 1100),
    );

    timers.push(
      setTimeout(() => {
        setBooted(true);
        autoTypeCommand('help');
      }, 1800),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [autoTypeCommand]);

  const focusInput = useCallback(() => {
    if (!animating && !isCoarsePointer()) {
      inputRef.current?.focus();
    }
  }, [animating, isCoarsePointer]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (animating) {
      return;
    }

    executeCommand(input);
    setInput('');
  };

  const handleChipClick = (command) => {
    if (!animating) {
      executeCommand(command);
    }
  };

  const handleKeyDown = (event) => {
    if (animating) {
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || '');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = historyIndex - 1;

      if (nextIndex < 0) {
        setHistoryIndex(-1);
        setInput('');
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || '');
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    event.preventDefault();
    const partial = input.trim().toLowerCase();

    if (!partial) {
      return;
    }

    if (partial.startsWith('theme ')) {
      const nextTheme = partial.slice('theme '.length);
      const themeMatches = THEMES.filter((theme) => theme.startsWith(nextTheme));

      if (themeMatches.length === 1) {
        setInput(`theme ${themeMatches[0]}`);
      }

      return;
    }

    const matches = COMMANDS.filter((command) => command.startsWith(partial));

    if (matches.length === 1) {
      setInput(matches[0]);
      return;
    }

    if (matches.length > 1) {
      setHistory((previous) => [
        ...previous,
        { type: 'input', text: input },
        { type: 'output', lines: [{ text: `  ${matches.join('  ')}`, cls: 'c-yellow' }] },
      ]);
    }
  };

  return (
    <div className="terminal-window" onClick={focusInput}>
      <div className="noise" />
      <div className="scanlines" />

      <div className="terminal-topbar">
        <div className="dot dot-red" />
        <div className="dot dot-yellow" />
        <div className="dot dot-green" />
        <span className="topbar-title">parith@portfolio: ~</span>
      </div>

      <div className="terminal-tabs">
        <div className="tab active">
          <span className="tab-icon">o</span> portfolio
        </div>
      </div>

      <div className="terminal-body" ref={bodyRef} aria-live="polite">
        {history.map((entry, entryIndex) => {
          if (entry.type === 'input') {
            return (
              <div key={entryIndex} className="line">
                <Prompt />
                <span className="c-white">{entry.text}</span>
              </div>
            );
          }

          return (
            <div key={entryIndex}>
              {entry.lines.map((line, lineIndex) => (
                <TerminalLine key={`${entryIndex}-${lineIndex}`} item={line} />
              ))}
            </div>
          );
        })}

        {!booted && <span className="cursor-blink" />}
      </div>

      {booted && (
        <div className="terminal-controls">
          <form onSubmit={handleSubmit} className="input-line terminal-inputbar">
            <Prompt />
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onFocus={scrollToBottom}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="type a command..."
              readOnly={animating}
              aria-disabled={animating}
            />
          </form>

          <div className="chips-bar">
            {CHIP_COMMANDS.map((command) => (
              <button
                key={command}
                type="button"
                className="chip"
                onClick={() => handleChipClick(command)}
              >
                {command}
              </button>
            ))}
            <button type="button" className="chip chip-help" onClick={() => handleChipClick('help')}>
              help
            </button>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
}
