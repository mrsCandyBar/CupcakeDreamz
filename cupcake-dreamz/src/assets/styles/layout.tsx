import { Theme, createStyles } from '@material-ui/core';
import { color } from './colors';

export function pageStyles(theme: Theme) {
    return createStyles({
        container: {
            backgroundColor: '#222222',
            height: '100vh',
            textAlign: 'center',
            maxWidth: '980px',
            margin: '0 auto'
        },
        imgLarge: {
            height: '59vh',
            padding: '0.5vh 0px',
            transition: '1s ease-in-out',
            position: 'relative',
            zIndex: 5,
            '&.bigger': {
                marginBottom: '5vh',
                marginTop: '5vh',
                height: '69vh',
            }
        },
        halfSvg: { overflow: 'hidden' },
        holdPosition: {
            position: 'relative',
            overflow: 'hidden',
            height: '20vh',
            transition: '1s ease-in-out',
            '&.withoutActions': {
                height: '10vh',
            },
        },
        imgSmall: {
            height: '18vh',
            marginTop: '1vh',
            transition: '1s ease-in-out',
            '.withoutActions &': {
                height: '10vh',
            },

            '&.visible': { opacity: 1 },
            '&.invisible': { opacity: 0 },
            '&.animateIn': {
                animation: '$hideAnim 0.5s 0s',
                animationDirection: 'reverse',
                animationFillMode: 'backwards',
            },
            '&.animateOut': {
                animation: '$hideAnim 2s 0s',
                animationDirection: 'normal',
                animationFillMode: 'forwards',
            },
            '&.animateDown': {
                animation: '$retreatAnim 0.5s 0s',
                animationDirection: 'reverse',
                animationFillMode: 'backwards',
            },
            '&.animateUp': {
                animation: '$retreatAnim 2s 0s',
                animationDirection: 'normal',
                animationFillMode: 'forwards',
            },
        },
        "@keyframes hideAnim": {
            from: {
                marginTop: '0px',
                opacity: 1
            },
            to: {
                marginTop: '100px',
                opacity: 0
            }
        },
        "@keyframes retreatAnim": {
            from: {
                marginTop: '0px',
                opacity: 1
            },
            to: {
                marginTop: '-100px',
                opacity: 0
            }
        }
    })
};


let colors: any = [
    "#FFDE16",
    "#FCBA63",
    "#EE9D25",
    "#0B9444",
    "#8CC63F",
    "#D02127",
    "#E73439",
    "#D08D79",
    "#DC715D",
    "#2C4044",
    "#B6B8BA",
    "#283336",
    "#D91B5C",
    "#E08E79",
    "#FBBE97",
    "#DC334C",
    "#97C799",
    "#B2DCC1",
    "#FCF8C4",
    "#FFFF00",
    "#FF00FF",
    "#00FF00",
];

let randomConfettiStyles: any = {};

for (let i = 0; i < 100; i++) {
    randomConfettiStyles[`&_${i}`] = {
        width: Math.floor(Math.random() * 5) + 1 + 'vh',
        height: Math.floor(Math.random() * 10) + 1 + 'vh',
        left: Math.floor(Math.random() * 40) + 30 + '%',

        backgroundColor: colors[Math.floor(Math.random() * colors.length + 1)],
        transform: `rotate(${Math.random() * 45}deg)`,
        zIndex: Math.floor(Math.random() * 10) + 1,
        margin: `
            ${Math.floor(Math.random() * 150) + 1 + 'px'}
            ${Math.floor(Math.random() * 150) + 1 + 'px'} 
            ${Math.floor(Math.random() * 150) + 1 + 'px'}  
            ${Math.floor(Math.random() * 150) - 50 + 'px'}`,

        animation: `$testAnim_${Math.floor(Math.random() * 20)} 
                    ${Math.random() * 3 + 1 + 's'} 
                    ${Math.floor(Math.random() * 2) + 1 + 's'}
                `
    }
}

let randomAnimationSettings: any = {};
for (let i = 0; i < 50; i++) {
    randomAnimationSettings[`@keyframes testAnim_${i}`] = {
        from: {
            top: '-10vh',
            opacity: Math.random() + 0.3,
            margin: `${Math.floor(Math.random() * 45) + 1 + 'px'}
                ${Math.floor(Math.random() * 80) + 1 + 'px'} 
                ${Math.floor(Math.random() * 80) + 1 + 'px'}  
                ${Math.floor(Math.random() * 80) - 50 + 'px'}`
        },
        to: {
            top: `${Math.floor(Math.random() * 5) + 70 + 'vh'}`,
            opacity: 1,
            transform: `rotate(${Math.random() * 720 + 45}deg)`,
            margin: `${Math.floor(Math.random() * 80) + 1 + 'px'}
                ${Math.floor(Math.random() * 130) + 1 + 'px'} 
                ${Math.floor(Math.random() * 130) + 1 + 'px'}  
                ${Math.floor(Math.random() * 130) - 50 + 'px'}`
        }
    }
}

export function countStyles(theme: Theme) {
    return createStyles({
        fontStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            fontSize: '30vh',
            fontWeight: 'bold',
            top: 'calc(50vh - 15vh)',
            color: '#ffffff',
            zIndex: 10
        },
        timerStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            fontSize: '5vh',
            fontWeight: 'bold',
            top: 120,
            color: color.background,
            zIndex: 10
        },
        confetti: {
            position: 'absolute',
            right: 0,
            opacity: 0,
            animationTimingFunction: 'linear !important',
            animationFillMode: 'forwards !important',
            ...randomConfettiStyles
        },
        ...randomAnimationSettings
    })
};