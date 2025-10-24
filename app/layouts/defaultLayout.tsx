import { useRouter } from "next/navigation";

interface DefaultLayoutProps {
  children: React.ReactNode;
  title: string;
  next?: () => void;
  prev?: () => void;
  hasBack?: boolean;
  hasSearch?: boolean;
  offset?: number;
}

export default function DefaultLayout( props: DefaultLayoutProps ) {
  const { children, title, offset, hasBack, hasSearch, next, prev } = props;

  const router = useRouter();

  const goBack = () => {
    return router.push(`/?offset=${offset ?? 0}`)
  }

  return(
    <div className="flex flex-col h-full overflow-hidden">
      <div className="header bg-white shadow-md relative z-10">
        <div className="container h-12 px-4 flex items-center">
          <div className="flex-1 flex items-center justify-start">
            {hasBack && (
              <button onClick={goBack} className="button button-small red">
                Back
              </button>
            )}
          </div>
          <div className="font-bold text-lg text-center text-black">
            Pokedex
          </div>
          <div className="flex-1 flex items-center justify-end">
            {hasSearch && (
              <button className="button button-small gradient">
                Search
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 overflow-x-hidden">
        <div className="container p-4">
          {children}
        </div>
      </div>
      <div className="bg-white shadow-md relative z-10 border-t border-gray-200">
        <div className="container h-12 px-4 flex items-center">
          <div className="flex-1 flex items-center justify-start">
            <button onClick={prev} disabled={!prev} className="button button-small gradient">
              Prev
            </button>
          </div>
          <div className="font-bold text-lg text-center capitalize text-black">
            { hasBack && title}
          </div>
          <div className="flex-1 flex items-center justify-end">
            <button onClick={next} disabled={!next} className="button button-small gradient">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}