import { FileCode, Copy, Rocket } from "lucide-react";

interface SandboxEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onGenerate: () => void;
  onLoadExample?: () => void;
}

export const SandboxEditor = ({
  code,
  onCodeChange,
  onGenerate,
  onLoadExample,
}: SandboxEditorProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-purple-400" />
          Your Prompt
        </h3>
        <button
          onClick={onLoadExample}
          className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-all"
        >
          Load Example
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Type your prompt here...&#x0a;Example: Create a React component for a pricing card with 3 tiers"
        className="w-full h-64 bg-slate-900 border border-white/20 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
      />
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={onGenerate}
          className="flex-1 cursor-pointer px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
        >
          <Rocket className="w-5 h-5" />
          Generate with AI
        </button>
        <button className="px-4 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center">
          <Copy className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
