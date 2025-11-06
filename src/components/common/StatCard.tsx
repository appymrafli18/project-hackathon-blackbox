import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  iconColor?: string;
}

export const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  iconColor = 'text-purple-400' 
}: StatCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
      <Icon className={`w-8 h-8 ${iconColor} mx-auto mb-2`} />
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

