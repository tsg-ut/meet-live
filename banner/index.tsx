import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Logo = () => <img src="./logo.svg" />;

const Points = (props: { kanto: number; kansai: number; }) => {
    return (
        <>
            <span>関東</span>
            <span>{props.kanto}</span>
            <span>VS</span>
            <span>{props.kansai}</span>
            <span>関西</span>
        </>
    );
};

const CommonHead = () => {
    return (
        <header>
            <Logo />
            <Points kanto={10} kansai={10} />
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