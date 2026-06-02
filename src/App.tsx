import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./routes/index";
import { CategoryPage } from "./routes/category";
import { StoryPage } from "./routes/story";
import { SearchPage } from "./routes/search";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CmsLogin } from "./routes/cms/login";
import { CmsDashboard } from "./routes/cms/dashboard";
import { CmsEditor } from "./routes/cms/editor";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category/:id" element={<CategoryPage />} />
            <Route path="story/:slug" element={<StoryPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          
          <Route path="/cms/login" element={<CmsLogin />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/cms/dashboard" element={<CmsDashboard />} />
            <Route path="/cms/editor/:id" element={<CmsEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
