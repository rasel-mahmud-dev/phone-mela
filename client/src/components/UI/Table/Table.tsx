import React from 'react';
import Thead from "./Thead";
import Tbody from "./Tbody";
import classes from "./styles.module.scss"


export interface ColumnType {
  key: React.Key,
  title: string,
  dataIndex?: string,
  width?: number,
  render?: any
}


export type DataType =  object

interface TableBasePropsType extends TablePropsType{
  scroll?: { x?: number, y?: number | string }
  pagination?: { pageSize: number }
  fixedHeader?: boolean
}

export interface TablePropsType{
  dataSource: DataType[]
  columns?: ColumnType[]
  rowSelection?: { onChange: any },
  checkBox?: boolean

}


interface TableStateType{
  selectedRow: (string | number)[]
  sortedList: any[]
  sortBy: { dataIndex: string, order: number }
  pagination: { perPage: number, pageNumber: number}
  windowWidth: number
}

class Table extends React.Component<TableBasePropsType, TableStateType>{
  
  state: TableStateType = {
    selectedRow: [],
    sortedList: [],
    sortBy: { dataIndex: "", order: 1 },
    pagination: { perPage: 1, pageNumber: 1},
    windowWidth: 0
  }
  el: HTMLDivElement | undefined;
  
  tableRef = React.createRef<HTMLDivElement>()
  tableScrollRef = React.createRef<HTMLDivElement>()

  // constructor(props) {
  //   super(props);
  //   this.
  // }
  

  componentDidMount() {
  
    this.setState({
      ...this.state,
      sortedList: this.props.dataSource
    })
    
    if(this.props.pagination) {
      this.setState({
        ...this.state,
        // sortedList: this.props.dataSource
        pagination: {
          perPage: this.props.pagination.pageSize,
          pageNumber: 1
        }
      })
    }
    
    
    window.addEventListener("resize", this.handleResponsive)
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResponsive)
  }
  
  handleResponsive=()=>{
    if(this.tableRef){
      let f = (this.tableRef.current) as HTMLDivElement;

      
      let h =  this.tableRef.current?.parentElement
      // console.log(h?.offsetWidth)
      
      // let w = h?.offsetWidth
      // console.log(w)
      if(this.tableScrollRef){
        let w = (this.tableScrollRef.current as HTMLDivElement).offsetWidth
        // console.log(w)
        // f.style.maxWidth = w +"px"
        // f.style.overflowX = "auto"
      }
    }
  }
  
  componentDidUpdate(prevProps: Readonly<TablePropsType>, prevState: Readonly<TableStateType>, snapshot?: any) {
    if(prevProps.dataSource !== this.props.dataSource){
      this.setState({
        ...this.state,
        sortedList: this.props.dataSource
      })
    }
  }
  
  sortHandler=(compareFn: any, dataIndex: any)=>{
    
    if(this.state.sortBy.order === 1) {
      let sorted = this.props.dataSource.sort((a: any, b: any) => {
        return compareFn(a, b)
      })
      this.setState({
        ...this.state,
        sortedList: sorted,
        sortBy: {dataIndex: dataIndex, order: -1}
      })
    } else {
      let sorted = this.props.dataSource.sort((a: any, b: any) => {
        return compareFn(b, a)
      })
      this.setState({
        ...this.state,
        sortedList: sorted,
        sortBy: {dataIndex: dataIndex, order: 1}
      })
    }
  }
  
  changeSelectedRow=(rowNum: (string | number | null), allRow: any)=>{
    let updatedSelectedRow: (string | number)[] = [...this.state.selectedRow]
    if(!allRow) {
      let index  = -1;
      for (let i = 0; i < updatedSelectedRow.length; i++) {
        if(rowNum == updatedSelectedRow[i]){
          index = i
        }
      }
      if (index !== -1) {
        updatedSelectedRow.splice(index, 1)
      } else {
        // @ts-ignore
        updatedSelectedRow.push(rowNum)
      }
    } else {
      updatedSelectedRow = allRow
    }
  
    this.setState({
      ...this.state,
      selectedRow: updatedSelectedRow
    })
    
    if(this.props.rowSelection && this.props.rowSelection.onChange){
      this.props.rowSelection.onChange(updatedSelectedRow)
    }
  }
  
  renderThead(){
    const { columns, dataSource } = this.props
    return (
      <Thead
        checkBox={this.props.checkBox}
        sortBy={this.state.sortBy}
        sortHandler={this.sortHandler}
        dataSource={dataSource}
        columns={columns}
        selectedRow={this.state.selectedRow}
        onSelectedRow={this.changeSelectedRow}
      />
    )
  }
  
  renderTbody(){
    const { dataSource, columns } = this.props
    const { pagination } = this.state
    
    let data: any[] = []
 
    // let perPage = 10;
    // let total = 20;
    
    
    if(this.props.pagination){
      let pageSize = pagination.perPage
      data = this.state.sortedList.slice(0,  pageSize * pagination.pageNumber )
    } else {
      data = this.state.sortedList
    }
    
    return <Tbody
      checkBox={this.props.checkBox}
      dataSource={data}
      columns={columns}
      selectedRow={this.state.selectedRow}
      onSelectedRow={this.changeSelectedRow}
    />
  }
  
  
  renderPaginatedButton=()=>{
    let that = this
    
    function handlePageChange(item: any){
      that.setState({
        ...that.state,
        pagination: {
          perPage: that.state.pagination.perPage,
          pageNumber: item
        }
      })
    }
  
    
    let perPage = this.state.pagination.perPage
    let pageSize = Math.ceil(this.props.dataSource.length / perPage)
    
    let i = 1
    let arr: number[] = []
    while (i <= pageSize ){
      arr.push(i)
      i++
    }
    
    return (
      <div className={classes["my-table-pagination"]}>
        {arr.map(item=>(
          <button
            className={[classes["pagination-item"], item === this.state.pagination.pageNumber ? classes["pagination-item__current"] : ""].join(" ")}
            onClick={()=>handlePageChange(item)}>{item}</button>
        ))}
          {/*<button className="pagination-item"  onClick={()=>handlePageChange(perPage)}>{perPage}</button>*/}
      </div>
    )
  }
  
  
  
  render() {
    
    const {scroll, pagination, fixedHeader} = this.props
    let tableWrapperCls = [""]
    if(fixedHeader){
      tableWrapperCls.push(classes["table-fixed-header"])
    }
    
    let tableStyle: React.CSSProperties = {}
    if(scroll){
      if(scroll.y) {
        if(typeof scroll.y === "string"){
          tableStyle.maxHeight = scroll.y
        } else {
          tableStyle.maxHeight = scroll.y + "px"
        }
      }
      if(scroll.x){
        tableStyle.maxWidth = scroll.x + "px"
      }
      tableStyle.overflow = "auto"
    }
    
    return (
      <div ref={this.tableScrollRef}>
        <div  className={tableWrapperCls.join(" ")}>
          <div ref={this.tableRef} style={tableStyle}>
            <table className={classes["table-layout"]}>
              <colgroup>
                <col className={classes["my-table-selection-col"]}/>
              </colgroup>
              {this.renderThead()}
              {this.renderTbody()}
            </table>
          </div>
          { pagination && (
            <div>
              {this.renderPaginatedButton()}
            </div>
          ) }
        </div>
      </div>
    );
  }
};



export default Table;