import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, Review, WaitlistEntry } from "../backend";
import { createActorWithConfig } from "../config";
import { useActor } from "./useActor";

export type { Review };

export function useWaitlistCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["waitlistCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWaitlistEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<WaitlistEntry[]>({
    queryKey: ["waitlistEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitWaitlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { name: string; phone: string; isWhatsApp: boolean; city: string }
  >({
    mutationFn: async ({ name, phone, isWhatsApp, city }) => {
      // Use cached actor if available, otherwise create a fresh anonymous one
      const resolvedActor = actor ?? (await createActorWithConfig());
      return resolvedActor.submitWaitlist(name, phone, isWhatsApp, city);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitlistCount"] });
    },
  });
}

export function useDeleteEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitlistEntries"] });
    },
  });
}

export function useListPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPost(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPost(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { title: string; description: string; content: string; publishDate: string }
  >({
    mutationFn: async ({ title, description, content, publishDate }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPost(title, description, content, publishDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    {
      id: bigint;
      title: string;
      description: string;
      content: string;
      publishDate: string;
    }
  >({
    mutationFn: async ({ id, title, description, content, publishDate }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePost(id, title, description, content, publishDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useLeadStatuses() {
  const { actor, isFetching } = useActor();
  return useQuery<Map<string, string>>({
    queryKey: ["leadStatuses"],
    queryFn: async () => {
      if (!actor) return new Map();
      const pairs = await actor.getLeadStatuses();
      return new Map(
        pairs.map(([id, status]: [bigint, string]) => [id.toString(), status]),
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateLeadStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: bigint; status: string }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateLeadStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadStatuses"] });
    },
  });
}

export function useGetApprovedReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["approvedReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["pendingReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { name: string; city: string; rating: number; message: string }
  >({
    mutationFn: async ({ name, city, rating, message }) => {
      const resolvedActor = actor ?? (await createActorWithConfig());
      return resolvedActor.submitReview(name, city, BigInt(rating), message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}

export function useApproveReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveReview(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}

export function useDeleteReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteReview(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingReviews"] });
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}

export function useAddManualReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { name: string; city: string; rating: number; message: string }
  >({
    mutationFn: async ({ name, city, rating, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addManualReview(name, city, BigInt(rating), message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
  });
}
