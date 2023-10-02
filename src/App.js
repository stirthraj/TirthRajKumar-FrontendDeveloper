/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
function App() {
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
        'X-Authorization':
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyMSI6InBhc3N3b3JkMSIsImV4cCI6MTY5NjMxNzM3NH0.6oMPPsE3LwM_R829TLKjJtc2kz40wkR2jC0kO8wG1iU'
      }
    };
    // eslint-disable-next-line no-undef
    fetch(process.env.REACT_APP_BASE_URL + '/Capsule/', myInit)
      .then((res) => res.json())
      .then((res) => setCapsules(res.data));
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <header className="px-8 shadow-lg border-b-2 border-slate-300 p-6">Moqups</header>
      <nav></nav>
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
              className="p-2 w-full border-2 border-slate-300 rounded-2xl bg-black text-white ">
              Search
            </button>
          </div>
        </div>

        <section className="flex flex-wrap">
          {pages.map((cap, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setOpen({ open: !open, index: i });
              }}
              className="flex-1 flex justify-center px-4 py-4">
              <article className="p-2 rounded-lg shadow-lg border-2 border-b-slate-500 bg-gray-100 w-[240px] h-full">
                <h3 className="text-center font-bold py-2">{cap.type}</h3>
                <p className="text-center py-3">{cap.last_update}</p>
                <div className="text-center font-bold flex justify-between py-1">
                  <h6>Status:</h6>
                  <div>{cap.status}</div>
                </div>
                <div className="text-center flex justify-between font-bold py-1">
                  <h6>Serial:</h6>
                  <div>{cap.serial}</div>
                </div>
                <div className="text-center flex justify-between font-bold py-1">
                  <h6>Reuse Count:</h6>
                  <div>{cap.reuse_count}</div>
                </div>
                {/* <div className="text-center">{cap.reuse_count}
           {cap.water_landings}
           {cap.land_landings}</div> */}
              </article>
            </div>
          ))}
        </section>

        <section className="flex justify-between px-4 gap-4">
          <button
            className={
              page >= 1
                ? 'bg-slate-300 max-w-[110px] p-2 w-full text-black  rounded-2xl'
                : 'bg-black max-w-[110px] p-2 w-full text-white  rounded-2xl'
            }
            onClick={() => page >= 1 && setPage(page - 1)}>
            &lt;&lt;Prev
          </button>
          <button
            className={
              page < maxPage - 1
                ? 'bg-slate-300 max-w-[110px] p-2 w-full text-black rounded-2xl '
                : 'bg-black max-w-[110px] p-2 w-full text-white rounded-2xl '
            }
            onClick={() => page < maxPage - 1 && setPage(page + 1)}>
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

export const Popup = ({ open, cap, setOpen }) => (
  <section
    className={
      open.open
        ? 'fixed top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-50 invisible'
        : 'fixed top-0 bottom-0 left-0 right-0 bg-slate-800 visible'
    }>
    <div className="shadow-lg w-[300px] bg-white text-black p-4 m-auto my-4">
      <div className="float-right" onClick={() => setOpen({ ...open, open: !open.open })}>
        X
      </div>
      <div className="flex-1 flex justify-center px-4 py-4">
        <article className="p-2 shadow-lg border-2 border-b-slate-500 bg-gray-100 w-[240px] h-full">
          <h3 className="text-center font-bold py-2">{cap?.type}</h3>
          <p className="text-center py-3">{cap?.last_update}</p>
          <div className="text-center font-bold flex justify-between py-1">
            <h6>Status:</h6>
            <div>{cap?.status}</div>
          </div>
          <div className="text-center flex justify-between font-bold py-1">
            <h6>Serial:</h6>
            <div>{cap?.serial}</div>
          </div>
          <div className="text-center flex justify-between font-bold py-1">
            <h6>Reuse Count:</h6>
            <div>{cap?.reuse_count}</div>
          </div>
          <div className="text-center flex justify-between font-bold py-1">
            <h6>Water Landings:</h6>
            <div>{cap?.water_landings}</div>
          </div>
          <div className="text-center flex justify-between font-bold py-1">
            <h6>Land Landings:</h6>
            <div>{cap?.land_landings}</div>
          </div>
        </article>
      </div>
    </div>
  </section>
);
