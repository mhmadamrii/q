import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        imageUrl: z.string().optional(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          image_url: input.imageUrl,
          created_by: ctx.session.user.id,
        },
      });
    }),

  votePost: protectedProcedure
    .input(z.object({ postId: z.number(), type: z.enum(["UP", "DOWN"]) }))
    .mutation(async ({ ctx, input }) => {
      const { postId, type } = input;
      console.log("post id", postId);

      const existingVote = await ctx.db.postVote.findUnique({
        where: {
          user_id_post_id: {
            user_id: ctx.session.user.id,
            post_id: postId,
          },
        },
      });

      if (!existingVote) {
        await ctx.db.postVote.create({
          data: {
            user_id: ctx.session.user.id,
            post_id: postId,
            type,
          },
        });
      } else if (existingVote.type === type) {
        await ctx.db.postVote.delete({
          where: {
            user_id_post_id: {
              user_id: ctx.session.user.id,
              post_id: postId,
            },
          },
        });
      } else {
        await ctx.db.postVote.update({
          where: {
            user_id_post_id: {
              user_id: ctx.session.user.id,
              post_id: postId,
            },
          },
          data: {
            type,
          },
        });
      }
    }),
});
