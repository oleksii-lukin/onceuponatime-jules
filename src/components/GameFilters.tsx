import React from 'react';

const GameFilters: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <label className="flex flex-col min-w-40 h-12 w-full flex-1">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
          <div className="text-gray-400 flex border border-gray-200/20 dark:border-white/20 bg-gray-100 dark:bg-white/10 items-center justify-center pl-4 rounded-l-lg border-r-0">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              search
            </span>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200/20 dark:border-white/20 bg-gray-100 dark:bg-white/10 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            placeholder="Search by room name or host..."
          />
        </div>
      </label>
      <div className="flex items-center gap-2">
        <input
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200/20 dark:border-white/20 bg-gray-100 dark:bg-white/10 h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
          placeholder="Enter join code..."
        />
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-gray-200 dark:bg-white/20 text-gray-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-white/30 transition-colors">
          <span className="truncate">Join</span>
        </button>
      </div>
    </div>
  );
};

export default GameFilters;
