import { cn } from "@rallly/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rallly/ui/tooltip";
import { InfoIcon } from "lucide-react";

export const Settings = ({ children }: React.PropsWithChildren) => {
  return <div className="">{children}</div>;
};

export const SettingsHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="mb-4 text-lg font-semibold md:mb-8">
      <h2>{children}</h2>
    </div>
  );
};

export const SettingsContent = ({ children }: React.PropsWithChildren) => {
  return <div className="space-y-6">{children}</div>;
};

export const SettingsSection = (props: {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-10">
      <div className="col-span-3">
        <h2 className="mb-1 text-base font-semibold">{props.title}</h2>
        <p className="text-muted-foreground text-sm">{props.description}</p>
      </div>
      <div className="col-span-7">{props.children}</div>
    </div>
  );
};

export const SettingsGroup = ({ children }: React.PropsWithChildren) => {
  return <dl className="grid gap-3 md:gap-6">{children}</dl>;
};

export const SettingsItem = ({ children }: React.PropsWithChildren) => {
  return <div className="grid gap-1.5">{children}</div>;
};
export const SettingsItemTitle = ({
  children,
  hint,
}: React.PropsWithChildren<{ hint?: React.ReactNode }>) => {
  return (
    <div className="flex items-center gap-x-2">
      <dt className="text-sm font-medium text-gray-500">{children}</dt>
      {hint ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="inline-block h-4 w-4 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm">
            {hint}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
};

export const SettingsItemValue = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <dd className={cn("text-sm text-gray-900", className)}>{children}</dd>;
};
