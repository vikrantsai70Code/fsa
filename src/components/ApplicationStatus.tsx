import React from 'react';
import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

interface Props {
  status: string;
  className?: string;
}

export default function ApplicationStatus({ status, className = '' }: Props) {
  const getStatusConfig = () => {
    switch (status) {
      case 'submitted':
        return {
          icon: ClipboardList,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          text: 'Submitted',
        };
      case 'under-review':
        return {
          icon: Search,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          text: 'Under Review',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-100',
          text: 'Approved',
        };
      case 'denied':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          text: 'Denied',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          text: 'Draft',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${config.bg} ${className}`}
    >
      <Icon className={`w-4 h-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}