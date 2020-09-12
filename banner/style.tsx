import React from 'react';
import styled, { css } from 'styled-components';

interface Meta {
    team?: 'kanto' | 'kansai';
}

const kantoColor = '#0066FF';
const kansaiColor = '#FF1D25';

export const setColor = (props: Meta) =>
    props.team ?
        props.team === 'kanto' ? css`
            color: ${kantoColor};
        ` : css`
            color: ${kansaiColor};
        `
    : undefined;

export const setBackgroundColor = (props: Meta) =>
    props.team ?
        props.team === 'kanto' ? css`
            background-color: ${kantoColor};
        ` : css`
            background-color: ${kansaiColor};
        `
    : undefined;

export const LineGDiv = styled.div`
    font-family: vdl-lineg, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setBackgroundColor}
`;

export const LineGSpan = styled.span`
    font-family: vdl-lineg, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setColor}
`;

export const LogonaDiv = styled.span`
    font-family: vdl-logona, sans-serif;
    font-weight: 400;
    font-style: normal;
    ${setBackgroundColor}
`;

export const NotoSansSpan = styled.span`
    font-family: noto-sans-cjk-jp,sans-serif;
    font-weight: 900;
    font-style: normal;
`;

export const PointsBox = styled(NotoSansSpan)<Meta>`
    display: inline-block;
    width: 24vw;
    margin: 0 2vw;
    ${setBackgroundColor}
    transform: skewX(-20deg);
`;