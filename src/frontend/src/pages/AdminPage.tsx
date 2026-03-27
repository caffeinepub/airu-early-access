import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import {
  Download,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { BlogPost, WaitlistEntry } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreatePost,
  useDeleteEntry,
  useDeletePost,
  useIsAdmin,
  useListPosts,
  useUpdatePost,
  useWaitlistEntries,
} from "../hooks/useQueries";

function formatDate(ts: bigint) {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function exportCSV(entries: WaitlistEntry[]) {
  const header = "#,Name,Phone,WhatsApp,City,Date";
  const rows = entries.map(
    (e, i) =>
      `${i + 1},"${e.name}","${e.phone}","${e.isWhatsApp ? "Yes" : "No"}","${e.city}","${formatDate(e.timestamp)}"`,
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `airu-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function LoginScreen() {
  const { login, isLoggingIn, isLoginError } = useInternetIdentity();
  return (
    <div className="min-h-screen bg-[#f0ebe3] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-card p-10 max-w-sm w-full text-center"
        data-ocid="admin.panel"
      >
        <p className="font-display text-2xl font-bold text-[#111111] mb-2">
          Airu Admin
        </p>
        <p className="text-[#888] text-sm mb-8">
          Sign in to view and manage waitlist submissions.
        </p>
        <button
          type="button"
          onClick={login}
          disabled={isLoggingIn}
          className="w-full rounded-full bg-[#111111] text-white py-3 font-medium text-sm hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          data-ocid="admin.primary_button"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Login with Internet Identity"
          )}
        </button>
        {isLoginError && (
          <p
            className="mt-4 text-red-500 text-sm"
            data-ocid="admin.error_state"
          >
            Login failed. Please try again.
          </p>
        )}
      </motion.div>
    </div>
  );
}

function WaitlistTab() {
  const { data: entries = [], isLoading, refetch } = useWaitlistEntries();
  const deleteEntry = useDeleteEntry();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteEntry.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-[#888] text-sm">
          {isLoading ? "Loading..." : `${entries.length} total submissions`}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center gap-1.5 rounded-full border border-[#ddd] bg-white px-4 py-2 text-sm text-[#444] hover:bg-[#f9f9f9] transition-colors"
            data-ocid="admin.secondary_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            type="button"
            onClick={() => entries.length > 0 && exportCSV(entries)}
            disabled={entries.length === 0}
            className="flex items-center gap-1.5 rounded-full bg-[#111111] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
            data-ocid="admin.primary_button"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[#999]" />
        </div>
      ) : entries.length === 0 ? (
        <div
          className="text-center py-20 text-[#aaa]"
          data-ocid="admin.empty_state"
        >
          No submissions yet.
        </div>
      ) : (
        <div
          className="bg-white rounded-2xl shadow-card overflow-hidden"
          data-ocid="admin.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-[#f0ebe3]">
                <TableHead className="text-[#888] font-medium w-12">
                  #
                </TableHead>
                <TableHead className="text-[#888] font-medium">Name</TableHead>
                <TableHead className="text-[#888] font-medium">Phone</TableHead>
                <TableHead className="text-[#888] font-medium">
                  WhatsApp
                </TableHead>
                <TableHead className="text-[#888] font-medium">City</TableHead>
                <TableHead className="text-[#888] font-medium">Date</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, i) => (
                <TableRow
                  key={entry.id.toString()}
                  className="border-[#f9f7f4] hover:bg-[#faf8f5]"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <TableCell className="text-[#aaa] text-sm">{i + 1}</TableCell>
                  <TableCell className="font-medium text-[#111111]">
                    {entry.name}
                  </TableCell>
                  <TableCell className="text-[#555]">{entry.phone}</TableCell>
                  <TableCell className="text-[#555]">
                    {entry.isWhatsApp ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-[#aaa]">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-[#555]">{entry.city}</TableCell>
                  <TableCell className="text-[#888] text-sm">
                    {formatDate(entry.timestamp)}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#ccc] hover:text-red-500 transition-colors disabled:opacity-50"
                      data-ocid={`admin.delete_button.${i + 1}`}
                    >
                      {deletingId === entry.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

interface PostFormData {
  title: string;
  description: string;
  content: string;
  publishDate: string;
}

function BlogTab() {
  const { data: posts = [], isLoading, refetch } = useListPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PostFormData>({
    title: "",
    description: "",
    content: "",
    publishDate: new Date().toISOString().slice(0, 10),
  });
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      content: "",
      publishDate: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      description: post.description,
      content: post.content,
      publishDate: post.publishDate,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updatePost.mutateAsync({ id: editing.id, ...form });
    } else {
      await createPost.mutateAsync(form);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this post?")) return;
    setDeletingId(id);
    try {
      await deletePost.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#ddd] px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] bg-white";
  const labelClass =
    "block text-xs font-medium text-[#888] mb-1.5 uppercase tracking-wide";

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#111111]">
            {editing ? "Edit Post" : "New Post"}
          </h3>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="admin.cancel_button"
          >
            Cancel
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-2xl"
          data-ocid="admin.modal"
        >
          <div>
            <label htmlFor="bf-title" className={labelClass}>
              Title
            </label>
            <input
              id="bf-title"
              className={inputClass}
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              required
              placeholder="Post title"
              data-ocid="admin.input"
            />
          </div>
          <div>
            <label htmlFor="bf-desc" className={labelClass}>
              Description
            </label>
            <textarea
              id="bf-desc"
              className={`${inputClass} resize-none`}
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              required
              placeholder="Short description (shown on list)"
              data-ocid="admin.textarea"
            />
          </div>
          <div>
            <label htmlFor="bf-content" className={labelClass}>
              Content
            </label>
            <textarea
              id="bf-content"
              className={`${inputClass} resize-y font-mono text-xs`}
              rows={14}
              value={form.content}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
              required
              placeholder="Full post content. Use **bold** for bold text, blank lines to separate paragraphs."
              data-ocid="admin.textarea"
            />
          </div>
          <div>
            <label htmlFor="bf-date" className={labelClass}>
              Publish Date
            </label>
            <input
              id="bf-date"
              type="date"
              className={inputClass}
              value={form.publishDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, publishDate: e.target.value }))
              }
              required
              data-ocid="admin.input"
            />
          </div>
          {(createPost.isError || updatePost.isError) && (
            <p className="text-red-500 text-sm" data-ocid="admin.error_state">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={createPost.isPending || updatePost.isPending}
            className="rounded-full bg-[#111111] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center gap-2"
            data-ocid="admin.submit_button"
          >
            {createPost.isPending || updatePost.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : editing ? (
              "Update Post"
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#888] text-sm">
          {isLoading ? "Loading..." : `${posts.length} posts`}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center gap-1.5 rounded-full border border-[#ddd] bg-white px-4 py-2 text-sm text-[#444] hover:bg-[#f9f9f9] transition-colors"
            data-ocid="admin.secondary_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-1.5 rounded-full bg-[#111111] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors"
            data-ocid="admin.open_modal_button"
          >
            <Plus className="w-3.5 h-3.5" /> New Post
          </button>
        </div>
      </div>

      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[#999]" />
        </div>
      ) : posts.length === 0 ? (
        <div
          className="text-center py-20 text-[#aaa]"
          data-ocid="admin.empty_state"
        >
          No blog posts yet. Create your first post.
        </div>
      ) : (
        <div
          className="bg-white rounded-2xl shadow-card overflow-hidden"
          data-ocid="admin.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-[#f0ebe3]">
                <TableHead className="text-[#888] font-medium">Title</TableHead>
                <TableHead className="text-[#888] font-medium">
                  Publish Date
                </TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, i) => (
                <TableRow
                  key={post.id.toString()}
                  className="border-[#f9f7f4] hover:bg-[#faf8f5]"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <TableCell className="font-medium text-[#111111]">
                    {post.title}
                  </TableCell>
                  <TableCell className="text-[#888] text-sm">
                    {post.publishDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(post)}
                        className="p-1.5 rounded-lg hover:bg-[#f5f5f5] text-[#ccc] hover:text-[#555] transition-colors"
                        data-ocid={`admin.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#ccc] hover:text-red-500 transition-colors disabled:opacity-50"
                        data-ocid={`admin.delete_button.${i + 1}`}
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function AdminDashboard() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <header className="bg-white border-b border-[#eee] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <p className="font-display text-xl font-bold text-[#111111]">
            Airu Admin
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#999] hidden sm:block">
              {identity?.getPrincipal().toString().slice(0, 16)}...
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#111] transition-colors"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111111]">Dashboard</h1>
        </div>
        <Tabs defaultValue="waitlist">
          <TabsList
            className="mb-8 bg-white border border-[#eee] rounded-full p-1"
            data-ocid="admin.tab"
          >
            <TabsTrigger
              value="waitlist"
              className="rounded-full text-sm"
              data-ocid="admin.tab"
            >
              Waitlist
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="rounded-full text-sm"
              data-ocid="admin.tab"
            >
              Blog Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="waitlist">
            <WaitlistTab />
          </TabsContent>
          <TabsContent value="blog">
            <BlogTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (isInitializing || (identity && adminLoading)) {
    return (
      <div
        className="min-h-screen bg-[#f0ebe3] flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-[#999]" />
      </div>
    );
  }

  if (!identity) {
    return <LoginScreen />;
  }

  if (isAdmin === false) {
    return (
      <div
        className="min-h-screen bg-[#f0ebe3] flex items-center justify-center"
        data-ocid="admin.error_state"
      >
        <div className="bg-white rounded-3xl shadow-card p-10 max-w-sm w-full text-center">
          <p className="text-xl font-semibold text-[#111111] mb-2">
            Access Denied
          </p>
          <p className="text-[#888] text-sm">
            You don't have admin privileges.
          </p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
