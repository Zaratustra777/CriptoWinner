import React from 'react';
import axios from 'axios';

const App = () => {

    const newOrder = () => {
        const data1 = {
            symbol: 'LTCUSD',
            amount: '4',
            price: '222',
            exchange: 'bitfinex',
            side: 'sell',
            type: 'exchange market',
        };

        axios({
            method: 'POST',
            url: '/new',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data1,
        }).then(res => console.log(res.data.body));
    };

    const getHist = () => {
        axios({
            method: 'GET',
            url: '/hist',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => console.log(res.data));
    };

    const getTrades = () => {
        const nn = new Date();
        const nowDate = new Date();
        nowDate.setDate(nn.getDate() - 1);
        const now = nowDate.getTime();
        console.log('now=', now);
        console.log('nowDate=', nowDate.toLocaleString());

        let beforeDate = new Date(nowDate);
        beforeDate.setMinutes(nowDate.getMinutes() - 5);
        const before = beforeDate.getTime();
        console.log('before=', before);
        console.log('beforeDate=', beforeDate.toLocaleString());


        axios({
            method: 'GET',
            url: `/trades`,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                start: before,
                end: now,
            }
        }).then(res => {
            const tradesData = res.data;
            console.log(tradesData);
            let minSell = -1;
            let minBuy = -1;
            let maxSell = -1;
            let maxBuy = -1;

            let totalSell = 0;
            let totalBuy = 0;

            tradesData.forEach(obj => {
                const [id, ts, value, price] = obj;
                if (minSell < 0 || (value < 0 && minSell > price)) {
                    minSell = price;
                }
                if (minBuy < 0 || (value > 0 && minBuy > price)) {
                    minBuy = price;
                }

                if (maxSell < 0 || (value < 0 && maxSell < price)) {
                    maxSell = price;
                }
                if (maxBuy < 0 || (value > 0 && maxBuy < price)) {
                    maxBuy = price;
                }
                if (value < 0) {
                    totalSell += value;
                } else {
                    totalBuy += value;
                }
            });
            console.log('minSell=', minSell);
            console.log('maxSell=', maxSell);
            console.log('totalSell=', totalSell);

            console.log('===',);

            console.log('minBuy=', minBuy);
            console.log('maxBuy=', maxBuy);
            console.log('totalBuy=', totalBuy);


        });
    };

    const getBal = () => {
        axios({
            method: 'GET',
            url: '/bal',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => console.log(res.data));
    };
// Algo

    const indexLastIntersection = (exRates, movAv) => {
        let index = -1;
        for (let i = exRates.length - 1; i > 0; i--) {

            if (exRates[i] >= movAv[i] && exRates[i - 1] < movAv[i - 1]) {
                index = i - 1;
                break;
            } else if (exRates[i] <= movAv[i] && exRates[i - 1] > movAv[i - 1]) {
                index = i - 1;
                break;
            }
        }
        return index;
    };

    const indexOfLocalMinimum = (exRates, range) => {
        const indexList = [];
        for (let i = exRates.length - 1; i > 0; i--) {
            let isMinimum = true;
            let firstIndex = Math.max(0, i - range);
            let lastIndex = Math.min(exRates.length - 1, i + range);
            for (let j = firstIndex; j <= lastIndex; j++) {
                if (exRates[i] > exRates[j]) isMinimum = false;
            }
            if (isMinimum) indexList.push(i);
        }
        return indexList;
    };

    const getBuy = (exRates, movAv, minRange) => {
        let b = false;
        let lastIntersection = indexLastIntersection(exRates, movAv);

        const resArray = indexOfLocalMinimum(exRates, minRange);
        resArray.forEach(item => {
            if ((Math.abs(item - lastIntersection) < minRange) && (exRates[lastIntersection + 1] < movAv[lastIntersection + 1])) b = true;
        });
        return b;
    };

    const getCalc = () => {

        const rangeForMinimum = 2;

        const listExchangeRates = [7, 8, 4, 6, 5, 7, 2, 5, 3, 3];//Currency exchange rate
        const listMovingAverages = [6, 7, 5, 5, 6, 5, 4, 3, 4, 4];//Moving average

        // const listRelativeStrength = [];//relative strengeth index in percents
        //Индекс последнего пересечения графиков подвижного среднего и цены биткоина
        console.log("Index of intersection is ", indexLastIntersection(listExchangeRates, listMovingAverages));
        //Напечатать индексы локальных минимумов
        const resultArray = indexOfLocalMinimum(listExchangeRates, rangeForMinimum);
        console.log(resultArray);

        resultArray.forEach(item => {
            console.log(item);
        });

        const isBuy = getBuy(listExchangeRates, listMovingAverages, rangeForMinimum);
        console.log('isBuy=', isBuy);

    };

    // return (<div> test </div>);

    return (
        <div>
            <button
                onClick={newOrder}> New
                Order
            </button>
            <button
                onClick={getBal}> get
                Balance
            </button>
            <button
                onClick={getHist}> get
                History
            </button>
            <button
                onClick={getTrades}> get
                Trades
            </button>

            <button
                onClick={getCalc}> get
                Calc
            </button>

        </div>
    );
};

export default App;

