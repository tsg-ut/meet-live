import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import Title from './Title';
import { NotoSansSpan, LineGSpan, PointsBox } from './style';
import './style.css';

const Logo = () => <img src="./logo.svg" />;

// const CarouselBox = (
//         <img src='carousel/comment.png' />
//         <img src='carousel/hashtag.png' />
//         <img src='carousel/survey.png' />
// );

const Points = (props: { kanto: number; kansai: number; }) => {
    return (
        <>
            <LineGSpan team='kanto'>関東</LineGSpan>
            <PointsBox team='kanto'>{props.kanto}</PointsBox>
            <NotoSansSpan>VS</NotoSansSpan>
            <PointsBox team='kansai'>{props.kansai}</PointsBox>
            <LineGSpan team='kansai'>関西</LineGSpan>
        </>
    );
};

const App = () => {
    return <>
        <Logo />
        <Points kanto={1234} kansai={5678} />
        <Title program='ライブハッキング' />
        {/* {CarouselBox} */}
    </>;
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);