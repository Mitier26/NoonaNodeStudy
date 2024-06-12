import React from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, loading } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.user)

  if (!user) {
    navigate('/login')
  }


  //오더리스트 들고오기
  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, [dispatch])
  console.log(orderList)

  // 로딩중이라면 스피너 보여주기
  if (loading)
    return (
      <Row className="color-ring">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </Row>
    );

  //오더리스트가 없다면 '주문한 상품이 없습니다' 보여주기
  if (orderList.length === 0) {
    return (
      <Container className="confirmation-page">
        <h2>주문한 상품이 없습니다.</h2>
        <div>
          <div className="text-align-center">
            <Link to={"/"}>상품 보러 메인페이지 가기</Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="status-card-container">
      {orderList && orderList.map((order) => <OrderStatusCard key={order._id} order={order} />)}
    </Container>
  );
};

export default MyPage;