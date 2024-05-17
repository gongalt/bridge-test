import React, { useEffect, useMemo } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
	createColumnHelper,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, setPokemonPage } from '../redux/pokemonDataSlice';
import { fetchUserData, setUserPage } from '../redux/userSlice';

const PaginationTable = () => {
	const dispatch = useDispatch();
	const {
		data: pokemonData,
		page: pokemonPage,
		status: pokemonStatus,
	} = useSelector((state) => state.pokemonData);
	const {
		data: userData,
		page: userPage,
		status: userStatus,
	} = useSelector((state) => state.userData);
	const columnHelper = createColumnHelper();

	useEffect(() => {
		dispatch(fetchPokemon(pokemonPage));
		dispatch(fetchUserData(userPage));
	}, [dispatch, pokemonPage, userPage]);

    const flattenedPokemonData = useMemo(() => {
        return pokemonData.map(pokemon => {
          return pokemon.abilities.map(ability => ({
            name: pokemon.name,
            url: pokemon.url,
            abilityName: ability.ability.name,
            abilityUrl: ability.ability.url,
            isHidden: ability.is_hidden,
            slot: ability.slot
          }));
        }).flat();
      }, [pokemonData]);


	const pokemonColumns = React.useMemo(
		() => [
			columnHelper.accessor('name', {
				id: 'name',
				header: 'Name',
			}),
			columnHelper.accessor('url', {
				id: 'url',
				header: 'URL',
			}),
			columnHelper.accessor('abilityName', {
                id: 'abilityName',
                header: 'Ability Name',
              }),
              columnHelper.accessor('abilityUrl', {
                id: 'abilityUrl',
                header: 'Ability URL',
              }),
              columnHelper.accessor('isHidden', {
                id: 'isHidden',
                header: 'Is Hidden',
                cell: info => info.getValue().toString(),
              }),
		],
		[]
	);
	const userColumns = React.useMemo(
		() => [
			columnHelper.accessor('id', {
				id: 'id',
				header: 'ID',
			}),
			columnHelper.accessor('email', {
				id: 'email',
				header: 'Email',
			}),
			columnHelper.accessor('first_name', {
				id: 'first_name',
				header: 'First Name',
			}),
			columnHelper.accessor('last_name', {
				id: 'last_name',
				header: 'Last Name',
			}),
			columnHelper.accessor('avatar', {
				id: 'avatar',
				header: 'Avatar',
				cell: (url) => <img src={url.getValue()} alt="Avatar" className="" />,
			}),
		],
		[]
	);

	const pokemonTableInstance = useReactTable({
		columns: pokemonColumns,
		data: flattenedPokemonData,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: { pageIndex: pokemonPage },
		manualPagination: true,
		pageCount: 100,
	});

	console.log('pokemonTableInstance', pokemonTableInstance);

	const userTableInstance = useReactTable({
		columns: userColumns,
		data: userData,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: { pageIndex: userPage },
		manualPagination: true,
		pageCount: 100,
	});

	console.log('userTableInstance', userTableInstance);

	if (!pokemonTableInstance.state) {
		pokemonTableInstance.state = { pageIndex: 0 };
	}

	if (!userTableInstance.state) {
		userTableInstance.state = { pageIndex: 0 };
	}

	const renderTable = (tableInstance, setPage) => {
		const {
			getCanPreviousPage,
			getCanNextPage,
			nextPage,
			previousPage,
			state: { pageIndex, pagination },
		} = tableInstance;

		const pageSize = pagination ? pagination.pageSize : 10;

		return (
			<div>
				<table>
					<thead>
						{tableInstance.getHeaderGroups().map((headerGroup) => {
							return (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<th id={header.id}>
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
					<tbody>
						{tableInstance.getRowModel().rows.map((row) => {
							return (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
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
				<div>
					<button
						onClick={() => previousPage()}
						disabled={!getCanPreviousPage()}
					>
						Previous
					</button>
					<button onClick={() => nextPage()} disabled={!getCanNextPage()}>
						Next
					</button>
					<span>
						Page <strong>{pageIndex + 1}</strong>{' '}
					</span>
					<span>
						| Go to page:{' '}
						<input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								tableInstance.gotoPage(page);
								dispatch(setPage(page));
							}}
							style={{ width: '100px' }}
						/>
					</span>
					<span>| Page size: {pageSize}</span>
				</div>
			</div>
		);
	};

	return (
		<div>
			<h2>Pokemon Data</h2>
			{renderTable(pokemonTableInstance, setPokemonPage)}
			<h2>User Data</h2>
			{renderTable(userTableInstance, setUserPage)}
		</div>
	);
};

export default PaginationTable;
