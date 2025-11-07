import type { Challenge } from "../../types";
import { Trophy, Users } from "lucide-react";
import { getDifficultyColor } from "../../utils/difficulty";
import { Badge } from "../common/Badge";

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (id: number) => void;
}

export const ChallengeCard = ({ challenge, onJoin }: ChallengeCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
            {challenge.status === "active" && (
              <Badge variant="success">Active</Badge>
            )}
            {challenge.status === "completed" && (
              <Badge variant="default">Completed</Badge>
            )}
          </div>
          <p className="text-gray-400 mb-3">{challenge.description}</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                challenge.difficulty
              )}`}
            >
              {challenge.difficulty}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Trophy className="w-4 h-4" />
              <span className="font-semibold">{challenge.reward} points</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-4 h-4" />
              <span>{challenge.participants} participants</span>
            </div>
          </div>
        </div>
        <div className="lg:text-right">
          <div className="text-sm text-gray-400 mb-3">Deadline</div>
          <div
            className={`text-lg font-bold ${
              challenge.status === "active" ? "text-white" : "text-gray-500"
            }`}
          >
            {challenge.deadline}
          </div>
          {challenge.status === "active" && (
            <button
              onClick={() => onJoin?.(challenge.id)}
              className="cursor-pointer mt-3 w-full lg:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Join Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
