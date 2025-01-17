import { CreateQuestion } from "./_components/CreateQuestion";
import { InfiniteAnsweredQuestions } from "./_components/InfiniteAnsweredQuestions";

export default function Home() {
  return (
    <>
      <CreateQuestion />
      <InfiniteAnsweredQuestions />
    </>
  );
}
