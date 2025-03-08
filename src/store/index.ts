import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VoteState {
  votedPosts: Record<string, boolean>; // e.g., { "post123": true }
  toggleLike: (postId: number) => void;
  setVotedPost: (postId: number, liked: boolean) => void;
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set) => ({
      votedPosts: {},
      toggleLike: (postId) =>
        set((state) => ({
          votedPosts: {
            ...state.votedPosts,
            [postId]: !state.votedPosts[postId], // Toggle the like status
          },
        })),
      setVotedPost: (postId, liked) =>
        set((state) => ({
          votedPosts: {
            ...state.votedPosts,
            [postId]: liked, // Set explicit like status
          },
        })),
    }),
    {
      name: "vote-posts-questions", // Key in localStorage
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
