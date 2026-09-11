import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../lib/api";
import DashboardSidebar from "../components/DashboardSidebar";
import PostForm from "../components/PostForm";
import BlogList from "../components/BlogList";
import WorkForm from "../components/WorkForm";
import WorkList from "../components/WorkList";
import DesignForm from "../components/DesignForm";
import DesignList from "../components/DesignList";
import PixelBg from "../components/PixelBg";

const Dashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [workItems, setWorkItems] = useState([]);
  const [editingWork, setEditingWork] = useState(null);
  const [designItems, setDesignItems] = useState([]);
  const [editingDesign, setEditingDesign] = useState(null);
  const [blogItems, setBlogItems] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchWork = async () => {
    const res = await fetch(`${API_URL}/api/work`);
    const data = await res.json();
    setWorkItems(data);
  };
  const handleWorkReorder = async (reorderedItems) => {
    setWorkItems(reorderedItems); // optimistic UI update

    try {
      const res = await fetch(`${API_URL}/api/work/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order: reorderedItems.map((item) => item.slug),
        }),
      });
      if (!res.ok) throw new Error("Failed to save order");
    } catch (error) {
      alert(error.message);
      fetchWork(); // roll back to server state if the save failed
    }
  };

  const fetchDesign = async () => {
    const res = await fetch(`${API_URL}/api/design`);
    const data = await res.json();
    setDesignItems(data);
  };

  const handleDesignReorder = async (reorderedItems) => {
    setDesignItems(reorderedItems);

    try {
      const res = await fetch(`${API_URL}/api/design/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order: reorderedItems.map((item) => item.slug),
        }),
      });
      if (!res.ok) throw new Error("Failed to save order");
    } catch (error) {
      alert(error.message);
      fetchDesign();
    }
  };

  const fetchBlog = async () => {
    const res = await fetch(`${API_URL}/api/posts`);
    const data = await res.json();
    setBlogItems(data);
  };
  const handleBlogReorder = async (reorderedItems) => {
    setBlogItems(reorderedItems); // optimistic update

    try {
      const res = await fetch(`${API_URL}/api/posts/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order: reorderedItems.map((item) => item.slug),
        }),
      });
      if (!res.ok) throw new Error("Failed to save order");
    } catch (error) {
      alert(error.message);
      fetchBlog(); // roll back to server state on failure
    }
  };

  useEffect(() => {
    if (activeTab === "work") fetchWork();
    if (activeTab === "designs") fetchDesign();
    if (activeTab === "posts") fetchBlog();
  }, [activeTab]);

  return (
    <section className="bg-bg px-6 lg:px-11 py-12 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl flex flex-wrap gap-4 justify-between items-center mb-8 lg:mb-10">
        <h1 className="font-mono font-extrabold text-2xl lg:text-3xl text-ink">
          DASHBOARD
        </h1>
        <button
          onClick={logout}
          className="border border-ink text-ink text-xs font-bold tracking-wide px-4 py-2"
        >
          LOG OUT
        </button>
      </div>

      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-10">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1">
          {activeTab === "posts" && (
            <>
              <PostForm
                editingItem={editingBlog}
                onCancelEdit={() => setEditingBlog(null)}
                onSuccess={() => {
                  setEditingBlog(null);
                  fetchBlog();
                }}
              />
              <BlogList
                items={blogItems}
                onEdit={(item) => setEditingBlog(item)}
                onDeleted={(slug) =>
                  setBlogItems((prev) => prev.filter((w) => w.slug !== slug))
                }
                onReorder={handleBlogReorder}
              />
            </>
          )}
          {activeTab === "work" && (
            <>
              <WorkForm
                editingItem={editingWork}
                onCancelEdit={() => setEditingWork(null)}
                onSuccess={() => {
                  setEditingWork(null);
                  fetchWork();
                }}
              />
              <WorkList
                items={workItems}
                onEdit={(item) => setEditingWork(item)}
                onDeleted={(slug) =>
                  setWorkItems((prev) => prev.filter((w) => w.slug !== slug))
                }
                onReorder={handleWorkReorder}
              />
            </>
          )}

          {activeTab === "designs" && (
            <>
              <DesignForm
                editingItem={editingDesign}
                onCancelEdit={() => setEditingDesign(null)}
                onSuccess={() => {
                  setEditingDesign(null);
                  fetchDesign();
                }}
              />
              <DesignList
                items={designItems}
                onEdit={(item) => setEditingDesign(item)}
                onDeleted={(slug) =>
                  setDesignItems((prev) => prev.filter((w) => w.slug !== slug))
                }
                onReorder={handleDesignReorder}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
