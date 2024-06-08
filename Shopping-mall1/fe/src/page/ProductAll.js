import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";

const ProductAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.product.error);
  // 처음 로딩하면 상품리스트 불러오기
  const [query, setQuery] = useSearchParams();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  })

  useEffect(() => {
    const params = Object.fromEntries([...query]);
    setSearchQuery({
      page: params.page || 1,
      name: params.name || "",
    });
  }, [query]);

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }

    const params = new URLSearchParams(searchQuery);
    const query = params.toString();

    navigate("?" + query);

  }, [searchQuery]);

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <Container>
      <Row>
        {productList?.map((product, index) =>
          <Col key={index} md={3} sm={12}>
            <ProductCard product={product} />
          </Col>
        )}
      </Row>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default ProductAll;
