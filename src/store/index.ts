import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkState {
  questionPosts: Record<string, boolean>;
  toggleBookmark: (postId: number, isBookmarked: boolean) => void;
  setBookmarmQuestion: (postId: number, isBookmarked: boolean) => void;
}
interface VoteState {
  votedPosts: Record<number, boolean | undefined>; // true = upvoted, false = downvoted, undefined = neutral
  setVote: (postId: number, vote: boolean | undefined) => void; // Set or clear vote
  removeVotePost: (postId: number) => void; // Remove vote (set to undefined)
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set) => ({
      votedPosts: {},
      setVote: (postId, vote) =>
        set((state) => ({
          votedPosts: {
            ...state.votedPosts,
            [postId]: vote, // true, false, or undefined
          },
        })),
      removeVotePost: (postId) =>
        set((state) => {
          const { [postId]: _, ...rest } = state.votedPosts;
          return { votedPosts: rest };
        }),
    }),
    {
      name: "vote-posts-questions",
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

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      questionPosts: {},
      setBookmarmQuestion: (postId, isBookmarked) =>
        set((state) => ({
          questionPosts: {
            ...state.questionPosts,
            [postId]: isBookmarked,
          },
        })),
      toggleBookmark(postId, isBookmarked) {
        set((state) => ({
          questionPosts: {
            ...state.questionPosts,
            [postId]: isBookmarked,
          },
        }));
      },
    }),
    {
      name: "post-bookmark", // Key in localStorage
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
