import React, {FC} from 'react';
import {ColumnType, DataType, TablePropsType} from "./Table";

import classes from "./styles.module.scss"


interface TbodyProps extends TablePropsType{
  selectedRow: (string | number)[]
  onSelectedRow?: any
  dataSource: any
  columns: any
  checkBox?: boolean
}



const Tbody: FC<TbodyProps> = (props) => {
  
  const { dataSource, columns, selectedRow, checkBox, onSelectedRow } = props
  
  function handleChangeCheckbox(key: string){
    onSelectedRow && onSelectedRow(key, null)
  }
  
  function isSelected(key: string){
    let cls = false
     selectedRow?.map(s=>{
      if(s == key){
        cls = true
      }
    })
    return cls
  }
  
  return (
    <tbody className={classes["my-table-tbody"]}>
      {  dataSource.map((data: any, i: number)=>(
          <tr data-row-key={i} className={[classes["my-table-row"], isSelected(data.key) ? classes["my-table-row-selected"]: ""].join(" ")}>
            {checkBox &&  <td className={[classes["my-table-cell"], classes["my-table-selection-column"]].join(" ")}>
              <label className={[classes["my-checkbox-wrapper"], isSelected(data.key) ? classes["my-checkbox-wrapper-checked"]: ""].join(" ")}>
                <span
                  className={[classes["my-checkbox"], isSelected(data.key) ? classes["my-checkbox-checked"]: ""].join(" ")}
                >
                <input
                  onChange={(e)=>handleChangeCheckbox(data.key)}
                  checked={selectedRow?.indexOf(data.key) != -1}
                  type="checkbox"
                  className={classes["my-checkbox-input"]} value={data.key} />
                  <span className={classes["my-checkbox-inner"]}/>
                </span>
              </label>
            </td> }
            {
              columns && columns.map((col: ColumnType)=>(
  
                <td className={classes["my-table-cell"]}>
                  {
                    (() => {
                      if (col.dataIndex) {
                        if(col.render){
                          return col.render(data[col.dataIndex])
                        } else {
                          return  data[col.dataIndex]
                        }
                      } else {
                        return col.render(data)
                      }
                    })()
                  }
                </td>
                
              ))
            }
          </tr>
      )) }
    </tbody>
  );
};
     {/*{  col.render ? col.render(data[col.dataIndex]) : data[col.dataIndex] }</td>*/}
Tbody.displayName = "Tbody"
export default Tbody;