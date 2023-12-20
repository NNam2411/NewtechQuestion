import { useEffect, useState } from "react";

import "./App.css";
import { Table } from "antd";
import axios from "axios";

function App() {
  const [listTopic, setListTopic] = useState([]); // State dùng để lưu danh sách topic. Ban đầu state này là một mảng rỗng
  const getListTopic = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/v1/topic/get?topicName=&status="
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  // Columns dùng cho table
  const columns = [
    {
      title: "Topic Name", // Tiêu đề
      dataIndex: "topicName", // Vị trí data trong API
      key: "topicName", // Key trong table
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Manage Lecturer",
      dataIndex: ["manageLecturer", "account", "fullName"],
      key: "manageLecturer",
      align: "center",
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "fullName"],
      key: "createdBy",
      align: "center",
    },
  ];

  useEffect(() => {
    getListTopic().then((res) => {
      setListTopic(res); // Sau khi lấy được dữ liệu từ API, gán vào state listTopic
      console.log("Topic List", res);
    });
  }, []);
  return (
    <>
      {/* Gán dự liệu cho table */}
      <Table columns={columns} dataSource={listTopic}></Table>
    </>
  );
}

export default App;
