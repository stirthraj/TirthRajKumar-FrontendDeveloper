import React from 'react';
import PropTypes from 'prop-types';
function Article({ type, last_update, status, serial, reuse_count }) {
  return (
    <article className="p-2 grid content-between rounded-lg shadow-lg border-2 border-b-slate-500 bg-gray-100 w-[280px] h-full">
      <h3 className="text-center font-bold py-2">{type}</h3>
      <p className="text-center py-3">{last_update}</p>
      <div className="text-center flex justify-between">
        <h6 className="font-bold">Status:</h6>
        <div>{status}</div>
      </div>
      <div className="text-center flex justify-between">
        <h6 className="font-bold">Serial:</h6>
        <div>{serial}</div>
      </div>
      <div className="text-center flex justify-between">
        <h6 className="font-bold">Reuse Count:</h6>
        <div>{reuse_count}</div>
      </div>
    </article>
  );
}

export default Article;

Article.propTypes = {
  type: PropTypes.string.isRequired,
  last_update: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  serial: PropTypes.string.isRequired,
  reuse_count: PropTypes.number.isRequired
};
