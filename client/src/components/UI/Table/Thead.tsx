import React, {FC} from 'react';
import classes from "./styles.module.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {TablePropsType} from "./Table";
import {faSortDown, faSortUp} from "@fortawesome/pro-light-svg-icons";

interface TheadProps extends TablePropsType{
  selectedRow: (string | number)[]
  onSelectedRow?: any
  sortHandler: (fn: ()=>any, dataIndex: string)=>any
  sortBy: {dataIndex: string, order: number},
  dataSource: any
  columns: any
  checkBox?: boolean
}

const Thead: FC<TheadProps> = (props) => {
  const { sortBy, sortHandler, columns, checkBox, selectedRow, dataSource, onSelectedRow  } = props
  
  function handleClickCheckbox(){
    if(dataSource) {
      let allKeys = dataSource.map((d: any)=>d.key)
      if(selectedRow.length === dataSource.length){
        onSelectedRow && onSelectedRow(null, [])
      } else{
        onSelectedRow && onSelectedRow(null, allKeys)
      }
    }
  }
  
  function onChangeSort(column: any){
    if(column.sorter && column.sorter.compare) {
      sortHandler && sortHandler(column.sorter.compare, column.dataIndex)
    }
  }
  
  return (
    <>
      {checkBox && <colgroup>
        {columns?.map((col: any, i: number)=>(
          <col key={i} style={{minWidth: col.width ? col.width : "auto"}}/>
        ))}
      </colgroup> }
      <thead className={classes["my-table-thead"]}>
      <tr>
        {checkBox && <th className={[classes["my-table-cell"], classes['my-table-selection-column']].join(" ")}>
          <div className={classes["my-table-selection"]}>
            <label className={classes["my-checkbox-wrapper"]}>
                <span
                  className={[classes["my-checkbox"], (selectedRow?.length > 0) ? classes["my-checkbox-indeterminate"]: ""].join(" ")}>
                  <input
                    onChange={()=>handleClickCheckbox()}
                    type="checkbox" className={classes["my-checkbox-input"]}
                    checked={(selectedRow?.length > 0) }
                  />
                  <span className={classes["my-checkbox-inner"]} />
                </span>
            </label>
          </div>
        </th> }
        {columns && columns.map((column: any, i: number)=>(
          <th className={classes["my-table-cell"]} key={i} onClick={()=> onChangeSort(column) }>
            <div className={column.className ? column.className : ""}>
            { column.sorter && (
              <FontAwesomeIcon className="mr-1" icon={sortBy.dataIndex === column.dataIndex ? faSortUp : faSortDown} />
            )}
              {column.title}
            </div>
          </th>
        ))}
      </tr>
      </thead>
    </>
  );
};

Thead.displayName = "Thead"
export default Thead;