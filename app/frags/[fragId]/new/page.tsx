import PostForm from "@/components/posts/PostForm";

export let metadata = {
  title: "새 게시글 작성 | FRAGS",
};

export default function NewPostPage({
  params,
}: {
  params: { fragId: string };
}) {
  const fragId = Number(params.fragId);

  return (
    <section className="flex items-start justify-center gap-10">
      <section className="flex w-96 flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-10 shadow-2xl">
        <div className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-4xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 stroke-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            게시글 작성하기
          </h2>
          <hr className="border border-slate-800" />
          <p className="mb-4">게시글 작성 전, 주의 사항을 꼭 읽어주세요!</p>
          <ol className="flex list-decimal flex-col items-start justify-center gap-6 px-4 pb-8 text-sm">
            <li className="text-slate-400">
              FRAG의 주제에 어울리는 글을 작성해주세요.
            </li>
            <li className="text-slate-400">
              게시글에 본인 혹은 타인의 개인정보를 포함시키지 마세요.
            </li>
            <li className="text-slate-400">
              비속어나 욕설이 포함되어 있거나 광고성을 띠는 게시글은 삭제될 수
              있어요.
            </li>
          </ol>
        </div>
      </section>
      <PostForm fragId={fragId} />
    </section>
  );
}
