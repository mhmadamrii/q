import Link from "next/link";

import { motion } from "framer-motion";
import { CardQuestionFooter } from "~/components/CardQuestionFooter";
import { CardQuestionHeader } from "~/components/CardQuestionHeader";
import { itemVariants } from "~/lib/animate-variants";
import { PostType } from "~/server/api/client";
import { IKImage, ImageKitProvider } from "imagekitio-next";

const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export function PostLists({ post }: { post: PostType }) {
  console.log("post", post);
  return (
    <motion.div
      key={post.id}
      className="flex w-full items-center justify-between gap-2 border-b"
      variants={itemVariants}
      transition={{ type: "tween" }}
    >
      <section className="flex min-h-[80px] w-full flex-col p-2">
        <CardQuestionHeader
          avatar={post.user.image ?? ""}
          name={post.user.name ?? ""}
          createdAt={post.created_at}
          questionId={post.id}
        />
        <div className="flex gap-2 p-2">
          <div className="flex-1">
            <Link href={`/questions/${post.id}`} className="text-2xl font-bold">
              {post.content}
            </Link>
            <div className="w-full">
              <IKImage
                urlEndpoint={URL_ENDPOINT}
                src={post.image_url ?? ""}
                path="default-image.jpg"
                  width={600}
                  height={300}
                alt="Alt text"
                className="rounded-sm"
              />
            </div>
            <CardQuestionFooter
              userVotes={[]}
              upvote={0}
              downvote={0}
              questionId={post.id}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
