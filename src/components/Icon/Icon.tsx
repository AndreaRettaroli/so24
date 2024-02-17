import React from 'react';
import annulSvg from '@Icons/annul.svg';
import arrowSvg from '@Icons/arrow.svg';
import backgroundSvg from '@Icons/background.svg';
import dieSvg from '@Icons/die.svg';
import dieDisabledSvg from '@Icons/disabled-die.svg';
import pauseSvg from '@Icons/pause.svg';
import playSvg from '@Icons/play.svg';
import plusSvg from '@Icons/plus.svg';

type Icon = 'annul' | 'arrow' | 'background' | 'die' | 'dieDisabled' | 'pause' | 'play' | 'plus';

const iconMapper: Record<Icon, string> = {
    annul: annulSvg,
    arrow: arrowSvg,
    background: backgroundSvg,
    die: dieSvg,
    dieDisabled: dieDisabledSvg,
    pause: pauseSvg,
    play: playSvg,
    plus: plusSvg,
};

interface IconProps {
    alt: string;
    icon: Icon;
    className?: string;
    height?: string;
    width?: string;
}

export const Icon: React.FC<IconProps> = ({ alt, className, icon, height, width }) => (
    <img className={className} src={iconMapper[icon]} alt={alt} height={height} width={width} />
);
