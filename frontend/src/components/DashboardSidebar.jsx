const TABS = [
  { id: "posts", label: "BLOG POSTS" },
  { id: "work", label: "PROJECTS" },
  { id: "designs", label: "GALLERY" },
];

const DashboardSidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className="z-100 w-full lg:w-48 border-b lg:border-b-0 lg:border-r border-line py-4 lg:py-8 lg:pr-6 flex flex-row lg:flex-col gap-2 shrink-0 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-left whitespace-nowrap text-xs font-mono tracking-wide px-3 py-2.5 border transition-colors ${
            activeTab === tab.id
              ? "bg-accent text-white border-accent"
              : "border-line text-muted hover:text-ink"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
};

export default DashboardSidebar;