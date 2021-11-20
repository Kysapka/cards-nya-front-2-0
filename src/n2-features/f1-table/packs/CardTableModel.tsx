import { ITableModel } from './TableCardPacks';

export const CardTableModel = (): ITableModel[] => [
  {
    title: (i: number) => (
      <div key={i} style={{ width: '60%' }}>
        CardPacks
      </div>
    ),
    render: (d: any, i: number) => (
      <div key={i} style={{ width: '60%' }}>
        {d.name}
      </div>
    ),
  },
];
