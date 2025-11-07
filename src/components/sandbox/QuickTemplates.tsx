interface QuickTemplatesProps {
  templates: string[];
  onTemplateSelect?: (template: string) => void;
}

export const QuickTemplates = ({
  templates,
  onTemplateSelect
}: QuickTemplatesProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Quick Templates</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {templates.map((template, idx) => (
          <button 
            key={idx}
            onClick={() => onTemplateSelect?.(template)}
            className="p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="text-white font-semibold mb-1 group-hover:text-purple-300">{template}</div>
            <div className="text-sm text-gray-400">Click to load template</div>
          </button>
        ))}
      </div>
    </div>
  );
};

