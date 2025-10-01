import { useState, useEffect, useRef } from 'react';

const Playground = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);

  const lessons = [
    {
      id: 1,
      title: "Basic Navigation",
      description: "Learn essential commands for navigating the filesystem",
      steps: [
        {
          instruction: "Type 'pwd' to see your current directory",
          expectedCommand: "pwd",
          response: "/home/devops-user",
          hint: "pwd stands for 'print working directory'"
        },
        {
          instruction: "List all files and directories with 'ls'",
          expectedCommand: "ls",
          response: "Documents  Downloads  Pictures  projects  scripts",
          hint: "ls shows the contents of the current directory"
        },
        {
          instruction: "List files with detailed information using 'ls -la'",
          expectedCommand: "ls -la",
          response: `total 28
drwxr-xr-x 7 devops-user devops-user 4096 Jan 15 10:30 .
drwxr-xr-x 3 root        root        4096 Jan 10 09:15 ..
drwxr-xr-x 2 devops-user devops-user 4096 Jan 15 10:25 Documents
drwxr-xr-x 2 devops-user devops-user 4096 Jan 15 10:25 Downloads
drwxr-xr-x 2 devops-user devops-user 4096 Jan 15 10:25 Pictures
drwxr-xr-x 3 devops-user devops-user 4096 Jan 15 10:30 projects
drwxr-xr-x 2 devops-user devops-user 4096 Jan 15 10:25 scripts`,
          hint: "The -la flags show hidden files (-a) and detailed info (-l)"
        }
      ]
    },
    {
      id: 2,
      title: "File Operations",
      description: "Learn to create, copy, move, and delete files",
      steps: [
        {
          instruction: "Create a new file called 'test.txt' using touch",
          expectedCommand: "touch test.txt",
          response: "",
          hint: "touch creates empty files or updates timestamps"
        },
        {
          instruction: "Create a directory called 'myproject' using mkdir",
          expectedCommand: "mkdir myproject",
          response: "",
          hint: "mkdir creates new directories"
        },
        {
          instruction: "Copy the test.txt file to the myproject directory",
          expectedCommand: "cp test.txt myproject/",
          response: "",
          hint: "cp source destination copies files"
        },
        {
          instruction: "Move into the myproject directory using cd",
          expectedCommand: "cd myproject",
          response: "",
          hint: "cd changes your current directory"
        }
      ]
    },
    {
      id: 3,
      title: "Docker Basics",
      description: "Learn essential Docker commands for containerization",
      steps: [
        {
          instruction: "Check if Docker is installed with 'docker --version'",
          expectedCommand: "docker --version",
          response: "Docker version 24.0.7, build afdd53b",
          hint: "This shows the installed Docker version"
        },
        {
          instruction: "Pull the nginx image from Docker Hub",
          expectedCommand: "docker pull nginx",
          response: `Using default tag: latest
latest: Pulling from library/nginx
a2abf6c4d29d: Pull complete
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest`,
          hint: "docker pull downloads images from a registry"
        },
        {
          instruction: "List all Docker images on your system",
          expectedCommand: "docker images",
          response: `REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    605c77e624dd   2 weeks ago   141MB`,
          hint: "docker images shows all locally available images"
        },
        {
          instruction: "Run an nginx container in detached mode on port 8080",
          expectedCommand: "docker run -d -p 8080:80 nginx",
          response: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
          hint: "-d runs in background, -p maps host:container ports"
        }
      ]
    }
  ];

  const currentStep = lessons[currentLesson]?.steps[history.filter(h => h.lessonId === lessons[currentLesson]?.id && h.correct).length] || null;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentStep) return;

    const isCorrect = input.trim().toLowerCase() === currentStep.expectedCommand.toLowerCase();
    const newEntry = {
      command: input,
      response: isCorrect ? currentStep.response : `Command not recognized. ${currentStep.hint}`,
      correct: isCorrect,
      lessonId: lessons[currentLesson].id,
      timestamp: Date.now()
    };

    setHistory(prev => [...prev, newEntry]);
    setInput('');

    if (isCorrect && currentStep.response) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  const resetLesson = () => {
    setHistory([]);
    setInput('');
  };

  const currentLessonProgress = history.filter(h => h.lessonId === lessons[currentLesson]?.id && h.correct).length;
  const totalSteps = lessons[currentLesson]?.steps.length || 0;
  const isLessonComplete = currentLessonProgress >= totalSteps;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            CLI <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Practice bash and DevOps commands in a safe, interactive environment. Learn by doing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Lessons</h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      currentLesson === index
                        ? 'bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200'
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${
                        currentLesson === index ? 'text-blue-700' : 'text-slate-700'
                      }`}>
                        {lesson.title}
                      </h3>
                      <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                        {lesson.steps.length} steps
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{lesson.description}</p>
                  </button>
                ))}
              </div>
              
              {currentStep && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Current Task</h4>
                  <p className="text-sm text-blue-700 mb-3">{currentStep.instruction}</p>
                  <div className="flex items-center text-xs text-blue-600">
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentLessonProgress / totalSteps) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{currentLessonProgress}/{totalSteps}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-2">
            <div className="bg-terminal-bg rounded-2xl shadow-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-slate-300 text-sm font-mono">devops-playground</div>
                <button
                  onClick={resetLesson}
                  className="text-slate-400 hover:text-slate-200 text-sm"
                >
                  Clear
                </button>
              </div>

              {/* Terminal Body */}
              <div 
                ref={terminalRef}
                className="p-4 h-96 overflow-y-auto font-mono text-sm"
              >
                <div className="text-terminal-success mb-4">
                  Welcome to DevOps Playground! 🚀
                  <br />
                  Complete the tasks step by step to learn essential commands.
                </div>

                {history.map((entry, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center">
                      <span className="text-terminal-prompt">devops-user@playground:~$</span>
                      <span className="text-terminal-text ml-2">{entry.command}</span>
                    </div>
                    {entry.response && (
                      <div className={`mt-1 ${
                        entry.correct ? 'text-terminal-text' : 'text-terminal-error'
                      }`}>
                        {entry.response.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="text-terminal-text">
                    <span className="terminal-cursor">|</span>
                  </div>
                )}

                {isLessonComplete && (
                  <div className="text-terminal-success mt-4 p-3 border border-green-800 rounded">
                    🎉 Lesson completed! Great job mastering these commands.
                    <br />
                    Select the next lesson to continue learning.
                  </div>
                )}

                {!isLessonComplete && currentStep && (
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-terminal-prompt">devops-user@playground:~$</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="ml-2 bg-transparent text-terminal-text outline-none flex-1 font-mono"
                      placeholder="Enter command..."
                      autoFocus
                    />
                    <span className="text-terminal-text terminal-cursor">|</span>
                  </form>
                )}
              </div>
            </div>

            {/* Help Panel */}
            {currentStep && (
              <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Need Help?</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <p className="text-yellow-800 font-medium">Hint</p>
                      <p className="text-yellow-700 text-sm mt-1">{currentStep.hint}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;