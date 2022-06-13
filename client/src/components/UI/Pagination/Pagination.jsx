import React, {memo} from 'react'
import "./Pagination.scss"

const Pagination = (props) => {
  const { totalProducts, perPageShow, currentPage, onPageChange } = props
  
  const [pageNumber, setPage] = React.useState(1)
  let [cPage, setCPage] = React.useState()
  
  React.useEffect(()=>{
    setCPage(currentPage  )
  }, [pageNumber, currentPage])

  let pagesNum = Math.ceil(totalProducts / perPageShow)
  
  function handlePageChange(page){
    if(page === "prev"){
      if(pageNumber <= 1){
        setPage(pagesNum)
        onPageChange && onPageChange(pagesNum)
      } else {
        setPage(pageNumber - 1)
        onPageChange && onPageChange(pageNumber - 1)
      }
      // setPage(pageNumber - 1)
      // onPageChange && onPageChange(pageNumber - 1)
    } else  if(page === "next"){
      if(pageNumber >= pagesNum  ){
        setPage(1)
        onPageChange && onPageChange(1)
      } else {
        setPage(pageNumber  + 1)
        onPageChange && onPageChange(pageNumber + 1)
      }
      
    } else{
      setPage(page)
      onPageChange && onPageChange(page)
    }
  }
  
  let pages = []

  for (let i = 1; i <= pagesNum; i++) {
    pages.push(i)
  }
  
  
  
  return (
      <div className="pagination">
        <ul>
          {pages.length > 1 && <li onClick={(e)=> handlePageChange("prev") } className="pagination--item prev-page" >Prev </li> }
          { pages.length > 1 && pages.map(item=>(
              <li onClick={()=>handlePageChange(item)} className={["pagination--item", cPage == item ? "active-page" : ""].join(" ")} key={item}>
                {item}
              </li>
          )) }
          {pages.length > 1 && <li onClick={(e)=> handlePageChange("next") } className="pagination--item next-page">Next</li> }
        </ul>
      </div>
  )
}



export default memo(Pagination)
