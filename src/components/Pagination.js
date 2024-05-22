import React from 'react'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const Pagination = ({ tableInstance, setPage }) => {
    const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between my-4">
        <button
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Previous
        </button>
        <button
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Next
        </button>
        <span className="mx-2">
            Page <strong>{tableInstance.getState().pagination.pageIndex + 1}</strong>{' '}
        </span>
        <span className="mx-2">
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={tableInstance.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    tableInstance.setPageIndex(page);
                    dispatch(setPage(page));
                }}
                className="border-2 border-gray-300 rounded w-20 pl-2"
            />

        </span>
        <span className="mx-2">| Page size: {tableInstance.getPageCount()}</span>
    </div>
  )
}

Pagination.propTypes = {
    tableInstance: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default Pagination