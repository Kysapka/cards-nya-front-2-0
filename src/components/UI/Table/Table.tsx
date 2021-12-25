import React, {FC, ReactNode} from 'react'

export type TableModel = {
    header: (index: number) => ReactNode
    body: (data: any) => ReactNode
}

type TableProps = {
    model: TableModel[]
    data: any[]
}

export const Table: FC<TableProps> = props => {
    const {model, data} = props

    return (
        <div style={{overflowX: 'auto'}}>
            <table>
                <thead>
                <tr>{model.map((m, index) => m.header(index))}</tr>
                </thead>

                <tbody>
                {data.map((item: any, index: number) => (
                    <tr key={'row' + (item._id || index)}>{model.map(m => m.body(item))}</tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}