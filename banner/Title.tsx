import React from 'react';
import styled from 'styled-components';
import { LineGDiv } from './style';

const programs = [
    'オープニングトーク',
    'ライブゲームプログラミング',
    'ライブコードゴルフ大会',
    'ライブ競技プログラミング (マラソン)',
    'ライブCTF',
    'ライブハッキング',
] as const;
type Program = typeof programs[number];

const Catch = styled.div`
    color: #EEEEEE;
    background-color: green;
`;

const Title = (props: { program: Program }) => {
    switch (props.program) {
        case 'オープニングトーク':
            return (
                <>
                    <Catch>TSG LIVE! 5 開幕です!!</Catch>
                    <LineGDiv>
                        オープニング
                        <br />
                        トーク
                    </LineGDiv>
                </>
            );
        case 'ライブゲームプログラミング':
            return (
                <>
                    <Catch>90分でゲームを完成させます!!</Catch>
                    <LineGDiv>
                        ライブ
                        <br />
                        ゲーム
                        <br />
                        プログラミング
                    </LineGDiv>
                </>
            );
        case 'ライブコードゴルフ大会':
            return (
                <>
                    <Catch></Catch>
                    <LineGDiv>オープニングトーク</LineGDiv>
                </>
            );
        case 'ライブ競技プログラミング (マラソン)':
            return (
                <>
                    <Catch>
                        90分で極限までプログラムを最適化しろ!!
                    </Catch>
                    <LineGDiv>
                        ライブ競プロ
                        <br />
                        〜マラソンマッチ〜
                    </LineGDiv>
                </>
            );
        case 'ライブCTF':
            return (
                <>
                    <Catch></Catch>
                    <LineGDiv>オープニングトーク</LineGDiv>
                </>
            );
        case 'ライブハッキング':
            return (
                <>
                    <Catch></Catch>
                    <LineGDiv>オープニングトーク</LineGDiv>
                </>
            );
    }
};

export default Title;