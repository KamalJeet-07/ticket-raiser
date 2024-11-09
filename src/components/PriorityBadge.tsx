import React from 'react';
import { AlertCircle, AlertTriangle, BellRing } from 'lucide-react';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className = '' }: PriorityBadgeProps) {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'low':
        return {
          classes: 'bg-green-100 text-green-800 border-green-200',
          icon: AlertCircle
        };
      case 'medium':
        return {
          classes: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle
        };
      case 'high':
        return {
          classes: 'bg-red-100 text-red-800 border-red-200',
          icon: BellRing
        };
      default:
        return {
          classes: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle
        };
    }
  };

  const { classes, icon: Icon } = getPriorityStyles();

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${classes} ${className}`}>
      <Icon className="w-3 h-3" />
      {priority}
    </span>
  );
}