import React from 'react';
import { TopBar } from '../../components/layout/TopBar';

const DOCS_SECTIONS = [
  {
    title: 'Getting Started',
    links: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'installation', label: 'Installation' },
    ],
  },
  {
    title: 'Core Features',
    links: [
      { id: 'pattern-input', label: 'Pattern Input' },
      { id: 'flag-toggles', label: 'Flag Toggles' },
      { id: 'match-highlighting', label: 'Match Highlighting' },
      { id: 'regex-explainer', label: 'Regex Explainer' },
    ],
  },
  {
    title: 'Saving & Exporting',
    links: [
      { id: 'saved-patterns', label: 'Saved Patterns' },
      { id: 'export-as-json', label: 'Export as JSON' },
      { id: 'export-as-csv', label: 'Export as CSV' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <TopBar />
      
      <main className="flex-1 mt-14 pt-8 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
        
        {/* Mobile Dropdown Navigation */}
        <div className="md:hidden">
          <details className="group border border-border2 bg-bg2 rounded-lg">
            <summary className="p-4 font-bold text-text cursor-pointer list-none flex justify-between items-center">
              Documentation Menu
              <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 border-t border-border2 flex flex-col gap-6">
              {DOCS_SECTIONS.map((section) => (
                <div key={`mobile-${section.title}`} className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted">{section.title}</h4>
                  <ul className="flex flex-col gap-2">
                    {section.links.map((link) => (
                      <li key={`mobile-${link.id}`}>
                        <a href={`#${link.id}`} className="text-sm text-text hover:text-accent transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Desktop Sticky Sidebar */}
        <aside className="hidden md:block">
          <nav className="sticky top-24 flex flex-col gap-8 pr-4">
            {DOCS_SECTIONS.map((section) => (
              <div key={`desktop-${section.title}`} className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted">{section.title}</h4>
                <ul className="flex flex-col gap-2.5 border-l border-border2 ml-1">
                  {section.links.map((link) => (
                    <li key={`desktop-${link.id}`}>
                      <a 
                        href={`#${link.id}`} 
                        className="text-sm text-text hover:text-accent transition-colors -ml-[1px] border-l border-transparent hover:border-accent pl-4 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Documentation Content */}
        <div className="flex flex-col gap-16 pb-24 max-w-3xl">
          
          {/* Getting Started */}
          <section className="flex flex-col gap-8">
            <div id="introduction" className="scroll-mt-24">
              <h1 className="text-3xl font-bold mb-4 text-text">Introduction</h1>
              <p className="text-muted leading-relaxed mb-4">
                RegexLab is a powerful, client-side regular expression tester and explainer. Built with modern web technologies, it ensures your data never leaves your browser while providing instant, real-time evaluation of complex patterns.
              </p>
              <p className="text-muted leading-relaxed">
                Whether you are a beginner trying to understand how groups work, or an expert crafting intricate validation rules, RegexLab provides the tools you need to build and debug with confidence.
              </p>
            </div>

            <div id="quick-start" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Quick Start</h2>
              <p className="text-muted leading-relaxed mb-4">
                To begin testing your regular expressions, simply navigate to the main application page.
              </p>
              <ol className="list-decimal list-inside text-muted leading-relaxed flex flex-col gap-2 ml-4">
                <li>Type your regular expression in the top input field.</li>
                <li>Adjust the active flags (like Global or Case Insensitive) using the toggle buttons.</li>
                <li>Enter the text you want to test against in the large text area below.</li>
                <li>Observe the highlighted matches and capture group details instantly.</li>
              </ol>
            </div>

            <div id="installation" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Installation</h2>
              <p className="text-muted leading-relaxed mb-4">
                RegexLab is available as a web application and does not require local installation. However, if you wish to run it locally, ensure you have Node.js installed and follow these steps:
              </p>
              <pre className="bg-bg2 border border-border2 p-4 rounded-lg overflow-x-auto font-mono text-sm text-accent-light mb-4">
                <code>
                  git clone https://github.com/example/regexlab.git{'\n'}
                  cd regexlab{'\n'}
                  npm install{'\n'}
                  npm run dev
                </code>
              </pre>
            </div>
          </section>

          {/* Core Features */}
          <section className="flex flex-col gap-8">
            <div id="pattern-input" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Pattern Input</h2>
              <p className="text-muted leading-relaxed">
                The pattern input field is where you define your regular expression. It features a monospace font for precise character alignment and provides immediate visual feedback. If the syntax is invalid, the input box will highlight in red and an error banner will appear explaining the issue.
              </p>
            </div>

            <div id="flag-toggles" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Flag Toggles</h2>
              <p className="text-muted leading-relaxed mb-4">
                Regular expression behavior is heavily influenced by flags. RegexLab provides quick toggles for all standard JavaScript RegExp flags:
              </p>
              <ul className="list-disc list-inside text-muted leading-relaxed flex flex-col gap-2 ml-4 font-mono text-sm">
                <li><span className="text-accent font-bold">g</span> (Global) - Match all occurrences</li>
                <li><span className="text-accent font-bold">i</span> (Case Insensitive) - Ignore case differences</li>
                <li><span className="text-accent font-bold">m</span> (Multiline) - Anchors match start/end of line</li>
                <li><span className="text-accent font-bold">s</span> (DotAll) - Dot matches newlines</li>
                <li><span className="text-accent font-bold">u</span> (Unicode) - Full unicode support</li>
                <li><span className="text-accent font-bold">d</span> (Indices) - Generate substring indices</li>
              </ul>
            </div>

            <div id="match-highlighting" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Match Highlighting</h2>
              <p className="text-muted leading-relaxed">
                As you type, matches in your test string are highlighted immediately. The application uses alternating colors to help you distinguish between adjacent matches. Hovering over any highlighted section reveals a tooltip detailing the exact index, length, and capture groups for that specific match.
              </p>
            </div>

            <div id="regex-explainer" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Regex Explainer</h2>
              <p className="text-muted leading-relaxed">
                Located in the sidebar, the Regex Explainer breaks down your pattern into readable tokens. Each component of your regular expression is analyzed and described in plain text. This is an invaluable tool for understanding complex legacy patterns or learning regular expression syntax step-by-step.
              </p>
            </div>
          </section>

          {/* Saving & Exporting */}
          <section className="flex flex-col gap-8">
            <div id="saved-patterns" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Saved Patterns</h2>
              <p className="text-muted leading-relaxed">
                RegexLab allows you to save frequently used patterns directly in your browser using local storage. You can provide a label and description for context. Saved patterns can be reloaded instantly with a single click, completely replacing your current workspace state.
              </p>
            </div>

            <div id="export-as-json" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Export as JSON</h2>
              <p className="text-muted leading-relaxed">
                Need to use your matches programmatically? The JSON export feature generates a structured document containing your pattern, flags, the test string, and an array of all matches including their respective capture groups and positional indices.
              </p>
            </div>

            <div id="export-as-csv" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 border-b border-border2 pb-2">Export as CSV</h2>
              <p className="text-muted leading-relaxed">
                For data analysis tasks, you can export your match results to a Comma-Separated Values (CSV) file. This export includes the match index, the matched value, start position, end position, and the total length of the match, ready to be imported into any spreadsheet software.
              </p>
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}
