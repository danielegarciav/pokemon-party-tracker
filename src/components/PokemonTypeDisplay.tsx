import type { PokemonType } from 'pokenode-ts';
import type { FC } from 'react';
import { type CSSProperties as CSSProps } from 'react';
import { getTypeBgColor } from '../data/pokemon-types';
import { kebabCaseToTitleCase as formatName } from '../util/case-conversion';
import css from './PokemonTypeDisplay.module.css';

export const PokemonTypeDisplay: FC<{ types: PokemonType[] }> = ({ types }) => (
  <div className={css.typesFlexContainer}>
    {types.map(type => (
      <span
        key={type.slot}
        className={css.typeBubble}
        style={{ '--bg-color': getTypeBgColor(type.type.name) } as CSSProps}
      >
        {formatName(type.type.name)}
      </span>
    ))}
  </div>
);
