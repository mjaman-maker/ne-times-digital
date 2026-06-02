import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import type { Story } from "@/data/mock";

const CATEGORIES = ["Assam", "Northeast", "India", "Politics", "Sports", "Education"];

export function CmsEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tag, setTag] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("Just now");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const fetchArticle = async () => {
        try {
          const docRef = doc(db, "stories", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Story;
            setTitle(data.title);
            setSlug(data.slug || "");
            setTag(data.tag);
            setExcerpt(data.excerpt || "");
            setContent(data.content || "");
            setTime(data.time || "Just now");
            setImageUrl(data.img);
          } else {
            alert("Article not found!");
            navigate("/cms/dashboard");
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, isNew, navigate]);

  // Auto-generate slug from title if empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isNew && !slug) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // preview
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      alert("Please fill in the title, slug, and content.");
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const imageRef = ref(storage, `articles/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!finalImageUrl) {
        alert("Please select a cover image.");
        setSaving(false);
        return;
      }

      const articleData = {
        title,
        slug,
        tag,
        excerpt,
        content,
        time,
        img: finalImageUrl,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        // Add createdAt only for new articles
        await addDoc(collection(db, "stories"), {
          ...articleData,
          createdAt: serverTimestamp(),
        });
      } else if (id) {
        await setDoc(doc(db, "stories", id), articleData, { merge: true });
      }

      navigate("/cms/dashboard");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (loading) return <div className="p-10 text-center">Loading editor...</div>;

  return (
    <div className="min-h-screen bg-muted/20 pb-20 font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-background border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/cms/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <div className="h-4 w-px bg-border mx-2"></div>
            <span className="text-sm font-medium text-muted-foreground">
              {isNew ? "New Article" : "Editing Article"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground mr-2">
              {saving ? "Saving changes..." : "All changes saved"}
            </span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-navy text-white hover:bg-navy-deep px-5 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-70"
            >
              <Save size={16} /> Publish
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1400px] w-full mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: EDITOR (approx 70%) */}
        <div className="flex-1 max-w-4xl space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-border">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full text-4xl md:text-5xl font-extrabold bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground/50 tracking-tight"
                placeholder="Article Title..."
              />
            </div>
            
            <div className="flex-1 min-h-[600px] flex flex-col">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="flex-1 flex flex-col [&>.ql-toolbar]:border-x-0 [&>.ql-toolbar]:border-t-0 [&>.ql-toolbar]:bg-muted/10 [&>.ql-container]:border-0 [&>.ql-container]:flex-1 [&>.ql-editor]:text-lg [&>.ql-editor]:p-8 [&>.ql-editor]:min-h-[500px]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR (approx 30%) */}
        <aside className="w-full lg:w-[360px] space-y-6">
          
          {/* Card: Article Settings */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">Publishing Details</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-muted/50 border border-transparent focus:bg-background focus:border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
                placeholder="my-article-slug"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Publish Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-muted/50 border border-transparent focus:bg-background focus:border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
                placeholder="e.g. 2h ago"
              />
            </div>
          </div>

          {/* Card: Taxonomy */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">Taxonomy</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-muted/50 border border-transparent focus:bg-background focus:border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all cursor-pointer"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Card: Media */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">Cover Image</h3>
            
            <div className="group relative rounded-lg border-2 border-dashed border-border hover:border-navy/50 hover:bg-navy/5 transition-all overflow-hidden flex items-center justify-center min-h-[160px] bg-muted/20">
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Cover preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-md text-sm font-medium shadow-lg hover:bg-gray-100">
                      Change Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-6 text-center">
                  <ImageIcon size={32} className="text-muted-foreground mb-3 group-hover:text-navy transition-colors" />
                  <span className="text-sm font-medium text-foreground">Click to upload cover image</span>
                  <span className="text-xs text-muted-foreground mt-1">Recommended: 1200x630px</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Card: Excerpt */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">Summary</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-muted/50 border border-transparent focus:bg-background focus:border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all min-h-[100px] resize-y"
                placeholder="A brief summary of the article..."
              />
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}
