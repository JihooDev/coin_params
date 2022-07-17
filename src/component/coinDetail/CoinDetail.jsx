import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import styles from './coin_detail.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinDetail = ({ data }) => {
	const { id } = useParams();
	const detailData = data.find(it => parseInt(it.id) === parseInt(id));

	useEffect(() => {
		console.log(detailData);
	}, []);
	const price = detailData.quote.USD;
	const dayList = [
		{ id: 0, days: '90일' },
		{ id: 1, days: '60일' },
		{ id: 2, days: '30일' },
		{ id: 3, days: '24시간' },
		{ id: 4, days: '7일' },
		{ id: 5, days: '1시간' },
	];

	const grapeData = [
		price.percent_change_90d,
		price.percent_change_60d,
		price.percent_change_30d,
		price.percent_change_24h,
		price.percent_change_7d,
		price.percent_change_1h,
	];

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const labels = dayList.map(it => {
		return it.days;
	});

	const coinData = {
		labels,
		datasets: [
			{
				label: '거래량',
				data: grapeData.map(it => {
					return it;
				}),
				borderColor: '#C8F1E2',
				backgroundColor: 'green',
				borderWidth: 5,
			},
		],
		options: {
			layout: {
				padding: '20px',
			},
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	useEffect(() => {}, []);

	return (
		<div className={styles.coin_detail}>
			<div className={styles.container}>
				<div className={styles.coin_about_box}>
					<div className={styles.left}>
						<img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`} alt="logo_Img" />
						<h1>{detailData.name}</h1>
					</div>
					<div className={styles.right}>
						<h1>시가 총액</h1>
						<p>${detailData.quote.USD.market_cap}</p>
					</div>
				</div>
				<div className={styles.grape_data}>
					<Line data={coinData} options={options} />
				</div>
			</div>
		</div>
	);
};

export default CoinDetail;
