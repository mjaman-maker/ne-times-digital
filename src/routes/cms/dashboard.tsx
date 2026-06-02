import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Plus, Edit, Trash2, LogOut, FileText, Search, Filter, Image as ImageIcon, LayoutDashboard, Eye } from "lucide-react";
import type { Story } from "@/data/mock";

export function CmsDashboard() {
  const [articles, setArticles] = useState<(Story & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Story & { id: string })[];
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "stories", id));
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("Failed to delete article.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/cms/login");
  };

  return (
    <div className="min-h-screen bg-muted/20 font-sans">
      <header className="bg-background border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">CMS Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium"
              title="Logout"
            >
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
            <Link
              to="/cms/editor/new"
              className="bg-navy text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-navy-deep transition-all shadow-sm active:scale-95"
            >
              <Plus size={16} /> New Article
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
              <h3 className="text-2xl font-bold text-foreground">{articles.length}</h3>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <h3 className="text-2xl font-bold text-foreground">{articles.length}</h3>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
              <ImageIcon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Media Assets</p>
              <h3 className="text-2xl font-bold text-foreground">{articles.length}</h3>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-background border border-border rounded-xl shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <FileText size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">You haven't created any articles yet. Start writing your first story to see it appear here.</p>
            <Link
              to="/cms/editor/new"
              className="bg-navy text-white px-6 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-navy-deep transition-all shadow-sm"
            >
              <Plus size={18} /> Create your first article
            </Link>
          </div>
        ) : (
          <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-6 py-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider w-[400px]">Article</th>
                  <th className="px-6 py-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border">
                          {article.img ? (
                            <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-foreground truncate text-sm mb-0.5" title={article.title}>{article.title}</div>
                          <div className="text-xs text-muted-foreground truncate">/{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 bg-muted text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider border border-border">
                        {article.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {article.time}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/cms/editor/${article.id}`}
                          className="p-2 text-muted-foreground hover:text-navy hover:bg-navy/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
