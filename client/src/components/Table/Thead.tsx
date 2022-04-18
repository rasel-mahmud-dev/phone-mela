import React, {FC} from 'react';
import classes from "./styles.module.scss"

import {TablePropsType} from "UI/Table/Table";

interface TheadProps extends TablePropsType{
  selectedRow: (string | number)[]
  onSelectedRow?: any
  sortHandler: (fn: ()=>any, dataIndex: string)=>any
  sortBy: {dataIndex: string, order: number}
}

const Thead: FC<TheadProps> = (props) => {
  const { sortBy, sortHandler, columns, selectedRow, dataSource, onSelectedRow  } = props
  
  
  function handleClickCheckbox(e){
    if(dataSource) {
      let allKeys = dataSource.map(d=>d.key)
      if(selectedRow.length === dataSource.length){
        onSelectedRow && onSelectedRow(null, [])
      } else{
        onSelectedRow && onSelectedRow(null, allKeys)
      }
    }
  }
  
  function onChangeSort(column){
    if(column.sorter && column.sorter.compare) {
      sortHandler && sortHandler(column.sorter.compare, column.dataIndex)
    }
  }
  
  return (
    <>
      <colgroup>
        {columns?.map(col=>(
          <col style={{minWidth: col.width ? col.width : "auto"}}/>
        ))}
      </colgroup>
      <thead className={classes["my-table-thead"]}>
      <tr>
        <th className={[classes["my-table-cell"], classes['my-table-selection-column']].join(" ")}>
          <div className={classes["my-table-selection"]}>
            <label className={classes["my-checkbox-wrapper"]}>
                <span
                  className={[classes["my-checkbox"], (selectedRow?.length > 0) ? classes["my-checkbox-indeterminate"]: ""].join(" ")}>
                  <input
                    onChange={(e)=>handleClickCheckbox(e)}
                    type="checkbox" className={classes["my-checkbox-input"]}
                    checked={(selectedRow?.length > 0) }
                  />
                  <span className={classes["my-checkbox-inner"]} />
                </span>
            </label>
          </div>
        </th>
        {columns && columns.map((column: any, i)=>(
          <th className={classes["my-table-cell"]} key={i} onClick={()=> onChangeSort(column) }>
            { column.sorter && (
              <i className={["fal mr-2", sortBy.dataIndex === column.dataIndex ? "fa-sort-up": "fa-sort-down"].join(" ")} />
            ) }
            {column.title}</th>
        ))}
      </tr>
      </thead>
    </>
  );
};

Thead.displayName = "Thead"
export default Thead;