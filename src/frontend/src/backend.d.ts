import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishDate: string;
    createdAt: bigint;
    description: string;
}
export interface WaitlistEntry {
    id: bigint;
    city: string;
    name: string;
    timestamp: bigint;
    phone: string;
    isWhatsApp: boolean;
}
export interface UserProfile {
    name: string;
}
export type ReviewStatus = { pending: null } | { approved: null };
export interface Review {
    id: bigint;
    name: string;
    city: string;
    rating: bigint;
    message: string;
    status: ReviewStatus;
    createdAt: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, description: string, content: string, publishDate: string): Promise<bigint>;
    deleteEntry(id: bigint): Promise<void>;
    deletePost(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCount(): Promise<bigint>;
    getEntries(): Promise<Array<WaitlistEntry>>;
    getLeadStatuses(): Promise<Array<[bigint, string]>>;
    getPost(id: bigint): Promise<BlogPost | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listPosts(): Promise<Array<BlogPost>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitWaitlist(name: string, phone: string, isWhatsApp: boolean, city: string): Promise<bigint>;
    updateLeadStatus(id: bigint, status: string): Promise<void>;
    updatePost(id: bigint, title: string, description: string, content: string, publishDate: string): Promise<void>;
    // Review system
    submitReview(name: string, city: string, rating: bigint, message: string): Promise<bigint>;
    getApprovedReviews(): Promise<Array<Review>>;
    getPendingReviews(): Promise<Array<Review>>;
    approveReview(id: bigint): Promise<void>;
    deleteReview(id: bigint): Promise<void>;
    addManualReview(name: string, city: string, rating: bigint, message: string): Promise<bigint>;
}
