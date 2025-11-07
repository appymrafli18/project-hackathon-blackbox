import { Brain, Download, Sparkles } from 'lucide-react';

interface SandboxOutputProps {
  output: string;
  onExport?: () => void;
}

export const SandboxOutput = ({
  output,
  onExport
}: SandboxOutputProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          AI Output
        </h3>
        <button 
          onClick={onExport}
          className="px-4 cursor-pointer py-2 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      <div className="w-full h-64 bg-slate-900 border border-white/20 rounded-xl p-4 text-green-400 font-mono text-sm overflow-auto">
        {output || '// AI generated code will appear here...\n// Click "Generate with AI" to see the magic! ✨'}
      </div>
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-blue-300 mb-1">Pro Tip</div>
            <div className="text-xs text-gray-400">Be specific with your prompts! Include technology stack, styling preferences, and functionality requirements for best results.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

