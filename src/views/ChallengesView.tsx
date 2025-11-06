import type { Challenge, UserProgress } from '../types';
import { Trophy, CheckCircle, Target } from 'lucide-react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';

interface ChallengesViewProps {
  challenges: Challenge[];
  userProgress: UserProgress;
  onJoinChallenge?: (id: number) => void;
}

export const ChallengesView = ({
  challenges,
  userProgress,
  onJoinChallenge
}:ChallengesViewProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm mb-4">
          <Trophy className="w-4 h-4" />
          <span>Compete, Learn, and Earn Rewards!</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Weekly Challenges</h2>
        <p className="text-gray-300">Complete challenges untuk meningkatkan skill dan mendapatkan badges</p>
      </div>

      {/* User Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
          <Trophy className="w-10 h-10 text-yellow-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{userProgress.points}</div>
          <div className="text-sm text-gray-300">Total Points</div>
        </div>
        <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
          <CheckCircle className="w-10 h-10 text-green-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{userProgress.completed}</div>
          <div className="text-sm text-gray-300">Completed</div>
        </div>
        <div className="bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
          <Target className="w-10 h-10 text-blue-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{userProgress.inProgress}</div>
          <div className="text-sm text-gray-300">In Progress</div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onJoin={onJoinChallenge}
          />
        ))}
      </div>
    </div>
  );
};

