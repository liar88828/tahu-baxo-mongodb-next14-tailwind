import React from 'react';

export function SkeletonCard() {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-20 w-full"></div>
    </div>
  );
}

export function SkeletonCardLong() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-full shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      <div className="skeleton h-20 w-full"></div>
    </div>
  );
}
