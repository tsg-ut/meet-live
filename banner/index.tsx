import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import './style.css';

const Logo = () => <img src="./logo.svg" />;

interface Meta {
    team?: 'kanto' | 'kansai';
}

const kantoColor = '#0066FF';
const kansaiColor = '#FF1D25';

const setColor = (props: Meta) =>
    props.team ?
        props.team === 'kanto' ? css`
            color: ${kantoColor};
        ` : css`
            color: ${kansaiColor};
        `
    : undefined;

const setBackgroundColor = (props: Meta) =>
    props.team ?
        props.team === 'kanto' ? css`
            background-color: ${kantoColor};
        ` : css`
            background-color: ${kansaiColor};
        `
    : undefined;

const LineGDiv = styled.div`
    font-family: vdl-lineg, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setBackgroundColor}
`;

const LineGSpan = styled.span`
    font-family: vdl-lineg, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setColor}
`;

const LogonaSpan = styled.span`
    font-family: vdl-logona, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setColor}
`;

const NotoSansSpan = styled.span`
    font-family: noto-sans-cjk-jp,sans-serif;
    font-weight: 900;
    font-style: normal;
`;

const PointsBox = styled(NotoSansSpan)<Meta>`
    display: inline-block;
    width: 24vw;
    margin: 0 2vw;
    ${setBackgroundColor}
`;

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

const CommonHead = () => {
    return (
        <header>
            <Logo />
            <Points kanto={1234} kansai={5678} />
        </header>
    );
};

const App = () => {
    return <>
        <CommonHead />
    </>;
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);