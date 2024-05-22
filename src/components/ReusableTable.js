import React from 'react';
import PropTypes from 'prop-types';
import { flexRender } from '@tanstack/react-table';

const ReusableTable = ({ tableInstance }) => {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								{tableInstance.getHeaderGroups().map((headerGroup) => {
									return (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map((header) => {
												return (
													<th
														id={header.id}
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														{' '}
														{header.isPlaceholder
															? null
															: flexRender(
																	header.column.columnDef.header,
																	header.getContext()
															  )}
													</th>
												);
											})}
										</tr>
									);
								})}
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{tableInstance.getRowModel().rows.map((row, i) => {
									return (
										<tr
											key={row.id}
											className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
										>
											{row.getVisibleCells().map((cell) => {
												return (
													<td
														key={cell.id}
														className="px-6 py-4 whitespace-nowrap"
													>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

ReusableTable.propTypes = {
	tableInstance: PropTypes.object.isRequired,
};

export default ReusableTable;
