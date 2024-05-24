import { useRef } from "react";

export default function SearchInput({
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex w-96 justify-between gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(searchInputRef.current?.value as string);
      }}
    >
      <input
        className="flex-grow rounded-2xl border-4 border-slate-700 bg-slate-800 px-4 py-2 placeholder:text-slate-500 focus:border-slate-500 focus:outline-0"
        placeholder="검색어를 입력하세요"
        ref={searchInputRef}
      />
      <button
        className=" rounded-2xl bg-slate-800 p-3 hover:bg-slate-700 "
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}
