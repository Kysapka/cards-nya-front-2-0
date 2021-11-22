import { ITableModel } from './TableCardPacks';
import { CardInPackType } from './types';

export const CardTableModel = (): ITableModel[] => [
  {
    title: (i: number) => (
      <div key={i} style={{ width: '60%' }}>
        CardPacks
      </div>
    ),

    render: (d: CardInPackType, i: number) => (
      <div key={i} style={{ width: '60%' }}>
        {d.name}
      </div>
    ),
  },
  {
    title: (i: number) => (
      <div key={i} style={{ width: '60%' }}>
        User name
      </div>
    ),
    render: (d: CardInPackType, i: number) => (
      <div key={i} style={{ width: '60%' }}>
        {d.user_name}
      </div>
    ),
  },
];
