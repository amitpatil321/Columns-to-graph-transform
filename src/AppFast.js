import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";

import { setTableAction } from "./store/appReducer";

import AntdTableToGraph from "./component/AntdTableToGraph";
import Drawer from "./component/Drawer/Drawer";

import { countries } from "./data";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [graphType, setGraphType] = useState();
  const columns = [
    {
      title: "Country",
      dataIndex: "Importers",
      key: "Importers",
    },
    {
      title: "2018",
      dataIndex: "2018",
      key: "2018",
    },
    {
      title: "2019",
      dataIndex: "2019",
      key: "2019",
    },
    {
      title: "2020",
      dataIndex: "2020",
      key: "2020",
    },
    {
      title: "2021",
      dataIndex: "2021",
      key: "2021",
    },
  ];

  useEffect(() => {
    dispatch(setTableAction(graphType));
  }, [graphType]);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <AntdTableToGraph
          columns={columns}
          dataSource={countries}
          setGraphType={setGraphType}
        />
        <Drawer
          graphType={graphType}
          setGraphType={setGraphType}
          columns={columns}
        />
      </Col>
      <Col span={4} />
    </Row>
  );
};

export default App;
