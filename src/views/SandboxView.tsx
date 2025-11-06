import { Terminal } from 'lucide-react';
import { SandboxEditor } from '../components/sandbox/SandboxEditor';
import { SandboxOutput } from '../components/sandbox/SandboxOutput';
import { QuickTemplates } from '../components/sandbox/QuickTemplates';

interface SandboxViewProps {
  code: string;
  output: string;
  onCodeChange: (code: string) => void;
  onGenerate: () => void;
  onExport?: () => void;
}

const templates = ['React Component', 'API Endpoint', 'Database Schema'];

export const SandboxView = ({
  code,
  output,
  onCodeChange,
  onGenerate,
  onExport
}: SandboxViewProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm mb-4">
          <Terminal className="w-4 h-4" />
          <span>Interactive Playground - Try Blackbox AI in Real-Time</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Code Sandbox</h2>
        <p className="text-gray-300">Eksperimen dengan prompts dan lihat output Blackbox AI secara langsung</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SandboxEditor
          code={code}
          onCodeChange={onCodeChange}
          onGenerate={onGenerate}
        />
        <SandboxOutput
          output={output}
          onExport={onExport}
        />
      </div>

      <QuickTemplates
        templates={templates}
      />
    </div>
  );
};

