import React, { useEffect, useMemo } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	createColumnHelper,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, setPokemonPage } from '../redux/pokemonDataSlice';
import { fetchUserData, setUserPage } from '../redux/userSlice';
import Pagination from './Pagination';
import ReusableTable from './ReusableTable';

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
		return pokemonData
			.map((pokemon) => {
				return pokemon.abilities.map((ability) => ({
					name: pokemon.name,
					url: pokemon.url,
					abilityName: ability.ability.name,
					abilityUrl: ability.ability.url,
					isHidden: ability.is_hidden,
					slot: ability.slot,
				}));
			})
			.flat();
	}, [pokemonData]);

	const useTableInstance = (columns, data) => {
		return useReactTable({
			columns,
			data,
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
		});
	};

	const pokemonColumns = useMemo(
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
				cell: (info) => info.getValue().toString(),
			}),
		],
		[columnHelper]
	);
	const userColumns = useMemo(
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
		[columnHelper]
	);

	const pokemonTableInstance = useTableInstance(
		pokemonColumns,
		flattenedPokemonData
	);
	const userTableInstance = useTableInstance(userColumns, userData);

	const renderTable = (tableInstance, setPage, status) => {
		return (
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
				{status === 'loading' ? (
					<div className="text-blue-500 text-lg font-semibold">Loading...</div>
				) : status === 'failed' ? (
					<div className="text-red-500 text-lg font-semibold">
						No items to show
					</div>
				) : (
					<>
						<ReusableTable tableInstance={tableInstance} />
						<div className="mt-4">
							<Pagination tableInstance={tableInstance} setPage={setPage} />
						</div>
					</>
				)}
			</div>
		);
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<h2 className="text-2xl font-bold mb-4">Pokemon Data</h2>
			{renderTable(pokemonTableInstance, setPokemonPage, pokemonStatus)}
			<h2 className="text-2xl font-bold mt-8 mb-4">User Data</h2>
			{renderTable(userTableInstance, setUserPage, userStatus)}
		</div>
	);
};

export default PaginationTable;
