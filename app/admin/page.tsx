'use client';

import React from 'react';
import { FaUsers, FaMusic, FaPlay, FaHeadphones, FaChartLine, FaHeart, FaComments, FaMicrophone, FaNewspaper, FaCalendar } from "react-icons/fa";
import { IconType } from 'react-icons';

type ActivityType = 'TRACK_ADDED' | 'PLAYLIST_CREATED' | 'NEW_FOLLOWER' | 'NEW_COMMENT';
type ContentType = 'Track' | 'Artist' | 'Playlist';

interface Metric {
  name: string;
  value: string;
  change: string;
  period: string;
  icon: IconType;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: ActivityType;
}

interface Content {
  id: number;
  title: string;
  type: ContentType;
  artist?: string;
  plays?: string;
  followers?: string;
  trend: string;
}

const performanceMetrics: Metric[] = [
  {
    name: "Blog Posts",
    value: "6",
    change: "+2",
    period: "this week",
    icon: FaNewspaper
  },
  {
    name: "Music Tracks",
    value: "3",
    change: "+1",
    period: "this month",
    icon: FaMusic
  },
  {
    name: "Upcoming Events",
    value: "4",
    change: "2",
    period: "this week",
    icon: FaCalendar
  }
];

const activityTypes: Record<ActivityType, { color: string; bgColor: string; icon: IconType }> = {
  TRACK_ADDED: {
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    icon: FaMusic
  },
  PLAYLIST_CREATED: {
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    icon: FaPlay
  },
  NEW_FOLLOWER: {
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    icon: FaHeart
  },
  NEW_COMMENT: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    icon: FaComments
  }
};

const recentActivity: Activity[] = [
  {
    id: 1,
    user: "Sarah Williams",
    action: "released a new track",
    target: "Midnight Dreams",
    time: "2 hours ago",
    type: "TRACK_ADDED"
  },
  {
    id: 2,
    user: "DJ Beats",
    action: "created a playlist",
    target: "Summer Vibes 2024",
    time: "4 hours ago",
    type: "PLAYLIST_CREATED"
  },
  {
    id: 3,
    user: "Music Lover",
    action: "started following",
    target: "Electronic Beats",
    time: "6 hours ago",
    type: "NEW_FOLLOWER"
  },
  {
    id: 4,
    user: "Alex Producer",
    action: "commented on",
    target: "Deep House Mix",
    time: "8 hours ago",
    type: "NEW_COMMENT"
  }
];

const contentCategories: Record<ContentType, { icon: IconType; metric: 'plays' | 'followers'; color: string }> = {
  'Track': {
    icon: FaMusic,
    metric: 'plays',
    color: "text-blue-400"
  },
  'Artist': {
    icon: FaMicrophone,
    metric: 'followers',
    color: "text-purple-400"
  },
  'Playlist': {
    icon: FaPlay,
    metric: 'plays',
    color: "text-green-400"
  }
};

const popularContent: Content[] = [
  {
    id: 1,
    title: "Summer Beats Mix",
    type: "Track",
    artist: "DJ Groove",
    plays: "45.2K",
    trend: "+25%",
  },
  {
    id: 2,
    title: "Electronic Dreams",
    artist: "Sarah Williams",
    type: "Artist",
    followers: "12.8K",
    trend: "+18%",
  },
  {
    id: 3,
    title: "Top Hits 2024",
    type: "Playlist",
    plays: "28.5K",
    trend: "+32%",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
          <div key={metric.name} className="glass-effect rounded-2xl p-6 hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{metric.name}</p>
                <p className="text-4xl font-semibold text-white mt-2">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {metric.change.startsWith('+') ? metric.change : ''} {metric.period}
                </p>
              </div>
              <div className="p-3 bg-[#1e2b3d] rounded-xl">
                <metric.icon className="h-6 w-6 text-[#3b82f6]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className={`w-8 h-8 rounded-full ${activityTypes[activity.type].bgColor} flex items-center justify-center ${activityTypes[activity.type].color} text-sm font-medium`}>
                  {activity.user[0]}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className={activityTypes[activity.type].color}>{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
                <div className={`${activityTypes[activity.type].bgColor} p-1.5 rounded-lg`}>
                  {React.createElement(activityTypes[activity.type].icon, {
                    className: `h-4 w-4 ${activityTypes[activity.type].color}`
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Content */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Trending Content</h2>
          <div className="space-y-4">
            {popularContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-xl ${contentCategories[content.type].color.replace('text', 'bg')}/10 flex items-center justify-center ${contentCategories[content.type].color}`}>
                    {React.createElement(contentCategories[content.type].icon, {
                      className: "h-5 w-5"
                    })}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{content.title}</p>
                    {content.artist && (
                      <p className="text-xs text-blue-400">{content.artist}</p>
                    )}
                    <p className="text-xs text-gray-400">{content.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {content[contentCategories[content.type].metric]}
                  </p>
                  <p className="text-xs text-green-400">{content.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 