import { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from '../utils/api'

function App({ user, setUser }) {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState('');


    const getTasks = async () => {
        const response = await api.get('/tasks');
        setTodoList(response.data.data);
    };

    const addTask = async () => {
        try {
            const response = await api.post('/tasks', { task: todoValue, isComplete: false });

            if (response.status === 200) {
                console.log("입력 성공");
                setTodoValue('');
                getTasks();
            } else {
                throw new Error("테스트 추가 실패");
            }
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    const deleteItem = async (id) => {
        try {
            console.log(id);
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, {
                isComplete: !task.isComplete,
            });
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const logout = () => {
        console.log("들어오니?");
        sessionStorage.removeItem("token");
        setUser(null);
    }

    return (
        <Container>
            <div className="logout"><span onClick={logout}>로그아웃</span></div>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={todoValue}
                        onChange={(event) => setTodoValue(event.target.value)}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>추가</button>
                </Col>
            </Row>

            <TodoBoard todoList={todoList}
                deleteItem={deleteItem}
                toggleComplete={toggleComplete} />
        </Container>
    );
}

export default App;
