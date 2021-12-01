import React, { CSSProperties, ReactElement, ReactNode } from 'react';

import { useSelector } from 'react-redux';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initAppStateType } from '../../../n1-main/m2-bll/app-reducer';

import { CardInPackType, CardPacksType } from './types';

export interface ITableModel {
  title: (index: number) => ReactNode;
  render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
  // loading: boolean;
  // error: string;
  //
  // logoutCallback: () => void;
  model: ITableModel[];
  // data: any;
  headerStyle?: CSSProperties;
  tableStyle?: CSSProperties;
  rowsStyle?: CSSProperties;
  rowStyle?: CSSProperties;
  // disabled: boolean;
}

export const TableCardPacks: React.FC<ITableProps> = ({
  // loading,
  // error,
  // logoutCallback,
  model,
  // data,
  headerStyle,
  tableStyle,
  rowsStyle,
  rowStyle,
  // disabled,
}): ReactElement => {
  console.log('CARDTableRender');
  const data = useSelector<AppRootStateType, CardInPackType[]>(
    state => state.cardPacks.cardPacks!,
  );
  const disabled = useSelector<AppRootStateType, boolean>(
    state => state.cardPacks.disabled!,
  );
  const { isLoading } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  if (isLoading) return <Loader />;
  return (
    <div
      style={{
        margin: '0 10px',
        // minHeight: '80vh',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...tableStyle,
      }}
    >
      <h2>CARD PACKS</h2>
      {/* {loading /}
      {/ ? <div style={{color: 'orange'}}>loading...</div> /}
      {/: error /}
      {/ ? <div style={{color: 'red'}}>{error}</div> /}
      {/: <div><br/></div> /}
      {/ } */}
      <div
        style={{
          border: '1px solid grey',
          width: '100%',
          display: 'flex',
          flexFlow: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '5px',
          padding: '10px',
          background: 'white',
          ...headerStyle,
        }}
      >
        {model.map((m: ITableModel, index: number) => m.title(index))}
      </div>
      {disabled ? (
        <Loader />
      ) : (
        <table
          className="table table-striped"
          style={{
            border: '1px solid grey',
            width: '100%',
            margin: '20px',
            padding: '10px',
            background: 'white',
            ...rowsStyle,
          }}
        >
          {data.map((dataItem: any, dataIndex: number) => (
            <tr
              key={dataItem._id || dataIndex}
              style={{
                padding: '8px',
                width: '100%',
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...rowStyle,
              }}
            >
              {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};
