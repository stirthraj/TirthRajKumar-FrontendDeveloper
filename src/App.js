import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataAdd } from './redux/capsule/capsuleSlice';
const Article = React.lazy(() => import('./components/Article'));
import PropTypes from 'prop-types';
function App() {
  // const capsulesData = useSelector((state) => state.capsule.value);
  const dispatch = useDispatch();
  const items = 12;
  const [capsules, setCapsules] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState({
    open: true,
    index: 0
  });
  const maxPage = capsules.length / items;
  const [input, setInput] = useState({
    type: '',
    keyword: ''
  });
  const [search, setSearch] = useState({
    type: '',
    keyword: ''
  });
  const pages = useMemo(() => {
    if (search.type === '' && search.keyword === '')
      return capsules?.slice(page * items, page * items + items);
    else return capsules?.filter((cps) => cps[search.type] === search.keyword);
  }, [capsules, page, search]);

  function fetchAPI() {
    const myInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
      }
    };
    // eslint-disable-next-line no-undef
    fetch(process.env.REACT_APP_BASE_URL + '/Capsule/', myInit)
      .then((res) => res.json())
      .then((res) => {
        dispatch(dataAdd(res.data || []));
        setCapsules(res.data || []);
      });
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <header className="px-8 shadow-lg border-b-2 border-slate-300 text-2xl p-6">Moqups</header>
      <nav></nav>
      {/* {JSON.stringify(capsulesData)} */}
      <main className="laptop:px-8 px-2 relative">
        <div className="flex items-center flex-col laptop:flex-row gap-2 mb-6">
          <video className="relative top-[24px] bg-black pb-10 h-full w-full" autoPlay muted>
            <source
              type="video/mp4"
              src="https://www.spacex.com/media/DragonTrunk_Animation_Render_Desktop.mp4"
            />
            <source
              type="video/webm"
              src="https://www.spacex.com/media/DragonTrunk_Animation_Render_Desktop.webm"
            />
          </video>
          <div className="flex-1 laptop:w-1/2 absolute p-2 py-8 text-white laptop:p-8">
            <h1 className="laptop:text-4xl laptop:p-2 laptop:pb-4">
              DRAGON
              <br />
              SENDING HUMANS AND CARGO INTO SPACE
            </h1>
            <p className="laptop:text-2xl laptop:p-2">
              The Dragon spacecraft is capable of carrying up to 7 passengers to and from Earth
              orbit, and beyond.
            </p>
          </div>
          <div className="flex-2 laptop:m-2 rounded-2xl">{/*  */}</div>
        </div>
        <h2 className="p-4 text-4xl">Search Form</h2>

        <div className="flex flex-wrap">
          <div className="laptop:w-1/2 w-full px-2 py-2">
            <input
              placeholder="Capsules by Status"
              className="p-2 w-full border-2 border-slate-300 rounded-2xl"
              onChange={(e) => setInput({ type: 'status', keyword: e.target.value })}
            />
          </div>
          <div className="laptop:w-1/2 w-full px-2 py-2">
            <input
              placeholder="Capsules by Serial"
              className="p-2 w-full border-2 border-slate-300 rounded-2xl"
              onChange={(e) => setInput({ type: 'serial', keyword: e.target.value })}
            />
          </div>
          <div className="laptop:w-1/2 w-full px-2 py-2">
            <input
              placeholder="Capsules by Type"
              className="p-2 w-full border-2 border-slate-300 rounded-2xl"
              onChange={(e) => setInput({ type: 'type', keyword: e.target.value })}
            />
          </div>

          <div className="laptop:w-1/2 w-full px-2 py-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSearch({ type: input.type, keyword: input.keyword });
                console.log(search);
              }}
              className="p-2 w-full border-2 border-slate-300 rounded-2xl bg-black text-white "
            >
              Search
            </button>
          </div>
        </div>

        <section className="flex flex-wrap">
          {pages.length &&
            pages.map((cap, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen({ open: !open, index: i });
                }}
                className="flex-1 flex justify-center px-4 py-4"
              >
                <Article
                  type={cap.type}
                  last_update={cap.last_update}
                  status={cap.status}
                  serial={cap.serial}
                  reuse_count={cap.reuse_count}
                />
              </div>
            ))}
        </section>

        <section className="flex justify-between px-4 gap-4">
          <button
            className={
              page >= 1
                ? 'bg-slate-300 max-w-[110px] p-2 w-full text-black  rounded-2xl'
                : 'bg-gray-400 max-w-[110px] p-2 w-full text-white  rounded-2xl'
            }
            onClick={() => page >= 1 && setPage(page - 1)}
          >
            &lt;&lt;Prev
          </button>
          <button
            className={
              page < maxPage - 1
                ? 'bg-slate-300 max-w-[110px] p-2 w-full text-black rounded-2xl '
                : 'bg-gray-400 max-w-[110px] p-2 w-full text-white rounded-2xl '
            }
            onClick={() => page < maxPage - 1 && setPage(page + 1)}
          >
            Next&gt;&gt;
          </button>
        </section>

        {/* Pagination */}
      </main>
      <footer className="px-8 py-4 mt-4 shadow-lg border-t-2 border-slate-300">
        Made by React Redux Tailwind
      </footer>
      <Popup open={open} setOpen={setOpen} cap={pages[open.index]} />
    </>
  );
}

export default App;

export function Popup({ open, cap, setOpen }) {
  if (cap?.type)
    return (
      <section
        className={
          open.open
            ? 'fixed top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-50 invisible'
            : 'fixed top-0 bottom-0 left-0 right-0 bg-slate-800 visible'
        }
      >
        <div className="shadow-lg w-[300px] bg-white text-black p-4 m-auto my-4">
          <div className="float-right" onClick={() => setOpen({ ...open, open: !open.open })}>
            X
          </div>
          <div className="flex-1 flex justify-center px-4 py-4">
            <Article
              type={cap.type}
              last_update={cap.last_update}
              status={cap.status}
              serial={cap.serial}
              reuse_count={cap.reuse_count}
            />
          </div>
        </div>
      </section>
    );
  else return <section>No Data, Network Error</section>;
}

Popup.propTypes = {
  open: PropTypes.object.isRequired,
  cap: PropTypes.object || PropTypes.bool,
  setOpen: PropTypes.func.isRequired
};
