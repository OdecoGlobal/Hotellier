import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

const steps = ['Basic Info', 'Policies', 'Rooms and Rates'];

const HotelCreationSteps = ({ current = 0 }) => {
  return (
    <aside>
      <div className="hidden md:flex flex-col gap-10 py-6 w-fit px-20 h-screen bg-sidebar border-r-2">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;
          const isLast = i === steps.length - 1;
          return (
            <div key={step} className="relative">
              <div className="flex gap-2 items-start">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    isCompleted
                      ? 'bg-muted-foreground'
                      : isCurrent
                      ? 'bg-muted-foreground'
                      : 'border'
                  )}
                >
                  {isCompleted ? <Check /> : i + 1}
                </div>
                <div className="pt-1 text-sm">
                  <div>{step}</div>
                </div>
              </div>
              {!isLast && <div className={cn('w-px h-full ml-4 bg-border')} />}
            </div>
          );
        })}
      </div>
      {/* MOBILE */}
    </aside>
  );
};

export default HotelCreationSteps;
