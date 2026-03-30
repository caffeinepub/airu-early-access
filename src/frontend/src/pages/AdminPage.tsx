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
  MessageCircle,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { BlogPost, WaitlistEntry } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  type Review,
  useAddManualReview,
  useApproveReview,
  useCreatePost,
  useDeleteEntry,
  useDeletePost,
  useDeleteReview,
  useGetApprovedReviews,
  useGetPendingReviews,
  useIsAdmin,
  useLeadStatuses,
  useListPosts,
  useUpdateLeadStatus,
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

const LEAD_STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Not Interested",
] as const;

function leadStatusStyle(status: string): string {
  switch (status) {
    case "Contacted":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Interested":
      return "bg-green-50 text-green-700 border-green-200";
    case "Not Interested":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function exportCSV(
  entries: WaitlistEntry[],
  leadStatuses: Map<string, string>,
) {
  const header = "#,Name,Phone,WhatsApp,City,Lead Status,Date";
  const rows = entries.map(
    (e, i) =>
      `${i + 1},"${e.name}","${e.phone}","${e.isWhatsApp ? "Yes" : "No"}","${e.city}","${leadStatuses.get(e.id.toString()) ?? "New"}","${formatDate(e.timestamp)}"`,
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lumaair-reservations-${new Date().toISOString().slice(0, 10)}.csv`;
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
          LumaAir Admin
        </p>
        <p className="text-[#888] text-sm mb-8">
          Sign in to view and manage reservations.
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

function ClaimAdminScreen() {
  const { actor } = useActor();
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState("");

  const handleClaim = async () => {
    if (!actor) return;
    if (!adminToken.trim()) {
      setError("Please enter your admin token.");
      return;
    }
    setIsClaiming(true);
    setError(null);
    try {
      await actor._initializeAccessControlWithSecret(adminToken.trim());
      await queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      await queryClient.refetchQueries({ queryKey: ["isAdmin"] });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.toLowerCase().includes("already") ||
        msg.toLowerCase().includes("initialized")
      ) {
        setError(
          "An admin already exists. Only the original admin account can access this dashboard.",
        );
      } else {
        setError(
          "Failed to claim admin access. Please check your token and try again.",
        );
      }
    } finally {
      setIsClaiming(false);
    }
  };

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
          Set Up Admin Access
        </p>
        <p className="text-[#888] text-sm mb-6">
          Enter your admin token from the Caffeine dashboard to claim admin
          access.
        </p>
        <input
          type="password"
          placeholder="Paste admin token here"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          className="w-full border border-[#ddd] rounded-xl px-4 py-3 text-sm text-[#111] mb-4 focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleClaim}
          disabled={isClaiming || !actor}
          className="w-full rounded-full bg-[#111111] text-white py-3 font-medium text-sm hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mb-3"
          data-ocid="admin.primary_button"
        >
          {isClaiming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Claiming...
            </>
          ) : (
            "Claim Admin Access"
          )}
        </button>
        <button
          type="button"
          onClick={clear}
          className="w-full rounded-full border border-[#ddd] bg-white py-3 font-medium text-sm text-[#555] hover:bg-[#f9f9f9] transition-colors"
          data-ocid="admin.secondary_button"
        >
          Logout
        </button>
        {error && (
          <p
            className="mt-4 text-red-500 text-sm"
            data-ocid="admin.error_state"
          >
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function WaitlistTab() {
  const { data: entries = [], isLoading, refetch } = useWaitlistEntries();
  const { data: leadStatuses = new Map<string, string>() } = useLeadStatuses();
  const deleteEntry = useDeleteEntry();
  const updateLeadStatus = useUpdateLeadStatus();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");

  const uniqueCities = useMemo(() => {
    const cities = Array.from(new Set(entries.map((e) => e.city))).sort();
    return cities;
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesSearch =
        search === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search);
      const matchesCity = cityFilter === "all" || e.city === cityFilter;
      return matchesSearch && matchesCity;
    });
  }, [entries, search, cityFilter]);

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteEntry.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleWhatsApp = (entry: WaitlistEntry) => {
    const phone = entry.phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi ${entry.name}, thanks for reserving LumaAir. We'll notify you when it launches.`,
    );
    window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
  };

  const handleLeadStatusChange = (id: bigint, status: string) => {
    updateLeadStatus.mutate({ id, status });
  };

  return (
    <div>
      {/* Stats + controls row */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-[#111111]">
              {isLoading ? (
                <span className="text-[#aaa]">Loading...</span>
              ) : (
                `Total Reservations: ${entries.length}`
              )}
            </p>
            {!isLoading && filtered.length !== entries.length && (
              <p className="text-sm text-[#888] mt-0.5">
                Showing {filtered.length} of {entries.length}
              </p>
            )}
          </div>
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
              onClick={() =>
                entries.length > 0 && exportCSV(entries, leadStatuses)
              }
              disabled={entries.length === 0}
              className="flex items-center gap-1.5 rounded-full bg-[#111111] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
              data-ocid="admin.primary_button"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Search & filter */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
            <input
              type="text"
              placeholder="Search by name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#ddd] bg-white pl-9 pr-4 py-2 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              data-ocid="admin.search_input"
            />
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-full border border-[#ddd] bg-white px-4 py-2 text-sm text-[#444] focus:outline-none focus:ring-2 focus:ring-[#111111]"
            data-ocid="admin.select"
          >
            <option value="all">All cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[#999]" />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-20 text-[#aaa]"
          data-ocid="admin.empty_state"
        >
          {entries.length === 0
            ? "No reservations yet."
            : "No results match your search or filter."}
        </div>
      ) : (
        <div
          className="bg-white rounded-2xl shadow-card overflow-hidden"
          data-ocid="admin.table"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#f0ebe3]">
                  <TableHead className="text-[#888] font-medium w-10">
                    #
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    Name
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    Phone
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    WhatsApp
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    City
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    Lead Status
                  </TableHead>
                  <TableHead className="text-[#888] font-medium">
                    Date
                  </TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((entry, i) => {
                  const status = leadStatuses.get(entry.id.toString()) ?? "New";
                  return (
                    <TableRow
                      key={entry.id.toString()}
                      className="border-[#f9f7f4] hover:bg-[#faf8f5]"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="text-[#aaa] text-sm">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium text-[#111111]">
                        {entry.name}
                      </TableCell>
                      <TableCell className="text-[#555]">
                        {entry.phone}
                      </TableCell>
                      <TableCell className="text-[#555]">
                        {entry.isWhatsApp ? (
                          <span className="text-green-600 font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-[#aaa]">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-[#555]">
                        {entry.city}
                      </TableCell>
                      <TableCell>
                        <select
                          value={status}
                          onChange={(e) =>
                            handleLeadStatusChange(entry.id, e.target.value)
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#111111] cursor-pointer ${leadStatusStyle(status)}`}
                          data-ocid={`admin.select.${i + 1}`}
                        >
                          {LEAD_STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="text-[#888] text-sm">
                        {formatDate(entry.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleWhatsApp(entry)}
                            className="flex items-center gap-1 rounded-full bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 text-xs font-medium transition-colors"
                            data-ocid={`admin.secondary_button.${i + 1}`}
                            title="Message on WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3" /> Message
                          </button>
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
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
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

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span style={{ letterSpacing: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= rating ? "#d97706" : "#ddd" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 focus:outline-none"
          style={{
            color: i <= (hovered || value) ? "#d97706" : "#ccc",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
          }}
          aria-label={`${i} star${i !== 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  onApprove,
  onDelete,
  isPending: isPendingReview,
}: {
  review: Review;
  onApprove?: () => void;
  onDelete: () => void;
  isPending?: boolean;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-[#f0ebe3] p-5 flex flex-col gap-3"
      data-ocid="reviews.card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-[#111] text-sm">{review.name}</p>
          <p className="text-[#888] text-xs">{review.city}</p>
        </div>
        <StarDisplay rating={Number(review.rating)} />
      </div>
      <p className="text-[#333] text-sm leading-relaxed">
        &ldquo;{review.message}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#f0ebe3]">
        <p className="text-[#aaa] text-xs">{formatDate(review.createdAt)}</p>
        <div className="flex gap-2">
          {isPendingReview && onApprove && (
            <button
              type="button"
              onClick={onApprove}
              className="flex items-center gap-1.5 rounded-full bg-[#0a0a0a] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#333] transition-colors"
              data-ocid="reviews.primary_button"
            >
              Approve
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-full border border-red-200 text-red-500 px-3 py-1.5 text-xs font-medium hover:bg-red-50 transition-colors"
            data-ocid="reviews.delete_button"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab() {
  const {
    data: pendingReviews = [],
    isLoading: loadingPending,
    refetch: refetchPending,
  } = useGetPendingReviews();
  const {
    data: approvedReviews = [],
    isLoading: loadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedReviews();
  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();
  const addManualReview = useAddManualReview();
  const [manualForm, setManualForm] = useState({
    name: "",
    city: "",
    rating: 5,
    message: "",
  });
  const [manualSubmitted, setManualSubmitted] = useState(false);
  const [manualError, setManualError] = useState("");

  const handleApprove = async (id: bigint) => {
    await approveReview.mutateAsync(id);
    refetchPending();
    refetchApproved();
  };

  const handleDelete = async (id: bigint) => {
    await deleteReview.mutateAsync(id);
    refetchPending();
    refetchApproved();
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualError("");
    if (
      !manualForm.name.trim() ||
      !manualForm.city.trim() ||
      !manualForm.message.trim()
    ) {
      setManualError("Please fill in all fields.");
      return;
    }
    try {
      await addManualReview.mutateAsync(manualForm);
      setManualForm({ name: "", city: "", rating: 5, message: "" });
      setManualSubmitted(true);
      refetchApproved();
      setTimeout(() => setManualSubmitted(false), 3000);
    } catch {
      setManualError("Failed to add review.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Pending Reviews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#111]">Pending Reviews</h2>
          <span className="text-sm text-[#888]">
            {pendingReviews.length} pending
          </span>
        </div>
        {loadingPending ? (
          <div
            className="flex items-center gap-2 text-[#888] py-4"
            data-ocid="reviews.loading_state"
          >
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : pendingReviews.length === 0 ? (
          <div
            className="bg-[#faf8f5] rounded-2xl border border-[#f0ebe3] p-8 text-center text-[#aaa] text-sm"
            data-ocid="reviews.empty_state"
          >
            No pending reviews
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingReviews.map((r) => (
              <ReviewCard
                key={r.id.toString()}
                review={r}
                isPending
                onApprove={() => handleApprove(r.id)}
                onDelete={() => handleDelete(r.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Approved Reviews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#111]">
            Approved Reviews
          </h2>
          <span className="text-sm text-[#888]">
            {approvedReviews.length} approved
          </span>
        </div>
        {loadingApproved ? (
          <div
            className="flex items-center gap-2 text-[#888] py-4"
            data-ocid="reviews.loading_state"
          >
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : approvedReviews.length === 0 ? (
          <div
            className="bg-[#faf8f5] rounded-2xl border border-[#f0ebe3] p-8 text-center text-[#aaa] text-sm"
            data-ocid="reviews.empty_state"
          >
            No approved reviews yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {approvedReviews.map((r) => (
              <ReviewCard
                key={r.id.toString()}
                review={r}
                onDelete={() => handleDelete(r.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Manual Review */}
      <div>
        <h2 className="text-lg font-semibold text-[#111] mb-4">
          Add Manual Review
        </h2>
        <div className="bg-white rounded-2xl border border-[#f0ebe3] p-6 max-w-xl">
          {manualSubmitted && (
            <div
              className="mb-4 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-medium"
              data-ocid="reviews.success_state"
            >
              Review added successfully!
            </div>
          )}
          <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="manual-name"
                  className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                >
                  Name
                </label>
                <input
                  id="manual-name"
                  type="text"
                  required
                  placeholder="Customer name"
                  value={manualForm.name}
                  onChange={(e) =>
                    setManualForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  data-ocid="reviews.input"
                />
              </div>
              <div>
                <label
                  htmlFor="manual-city"
                  className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                >
                  City
                </label>
                <input
                  id="manual-city"
                  type="text"
                  required
                  placeholder="City"
                  value={manualForm.city}
                  onChange={(e) =>
                    setManualForm((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  data-ocid="reviews.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="manual-rating"
                className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
              >
                Rating
              </label>
              <StarSelector
                value={manualForm.rating}
                onChange={(v) => setManualForm((p) => ({ ...p, rating: v }))}
              />
            </div>
            <div>
              <label
                htmlFor="manual-message"
                className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
              >
                Message
              </label>
              <textarea
                id="manual-message"
                required
                rows={3}
                placeholder="Review message…"
                value={manualForm.message}
                onChange={(e) =>
                  setManualForm((p) => ({ ...p, message: e.target.value }))
                }
                className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-none"
                data-ocid="reviews.textarea"
              />
            </div>
            {manualError && (
              <p
                className="text-red-500 text-sm"
                data-ocid="reviews.error_state"
              >
                {manualError}
              </p>
            )}
            <button
              type="submit"
              disabled={addManualReview.isPending}
              className="flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#333] transition-colors disabled:opacity-60"
              data-ocid="reviews.submit_button"
            >
              {addManualReview.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add Review
            </button>
          </form>
        </div>
      </div>
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
            LumaAir Admin
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
        <Tabs defaultValue="reservations">
          <TabsList
            className="mb-8 bg-white border border-[#eee] rounded-full p-1"
            data-ocid="admin.tab"
          >
            <TabsTrigger
              value="reservations"
              className="rounded-full text-sm"
              data-ocid="admin.tab"
            >
              Reservations
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-full text-sm"
              data-ocid="admin.tab"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="rounded-full text-sm"
              data-ocid="admin.tab"
            >
              Blog Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reservations">
            <WaitlistTab />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab />
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
    return <ClaimAdminScreen />;
  }

  return <AdminDashboard />;
}
