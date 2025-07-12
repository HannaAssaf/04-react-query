import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface ReactPaginateProps {
  forcePage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<ReactPaginateProps> = ({
  forcePage: page,
  pageCount: totalPages,
  onPageChange: setPage,
}) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
