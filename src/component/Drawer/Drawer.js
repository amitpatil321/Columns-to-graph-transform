import PropTypes from "prop-types";
import React, { useState } from "react";
import { Drawer, Row, Col, Divider, Tabs } from "antd";
import { useDispatch } from "react-redux";

import { setTableAction } from "../../store/appReducer";

import PieChart from "../Charts/PieChart";
import Columns from "../Columns/Columns";
import BarChart from "../Charts/BarChart";
import StackedChart from "../Charts/StackedChart";

const GraphDrawer = ({ columns, graphType, setGraphType }) => {
  const dispatch = useDispatch();
  const [graphColumns, setGraphColumns] = useState([]);

  return (
    <Drawer
      title="Statistics"
      placement="right"
      width="60%"
      // onClose={() => dispatch(setTableAction(null))}
      onClose={() => setGraphType(false)}
      open={graphType}
      destroyOnClose>
      <Row gutter={[4, 16]}>
        <Col span={24}>
          <Tabs
            defaultActiveKey={graphType}
            items={[
              {
                key: "clustered",
                label: "Clustered Bar Chart",
                children: (
                  <PrintGraph
                    graph={<BarChart />}
                    columns={columns}
                    graphColumns={graphColumns}
                    setGraphColumns={setGraphColumns}
                  />
                ),
              },
              {
                key: "stacked",
                label: "Stacked Bar Chart",
                children: (
                  <PrintGraph
                    graph={<StackedChart />}
                    columns={columns}
                    graphColumns={graphColumns}
                    setGraphColumns={setGraphColumns}
                  />
                ),
              },
              {
                key: "pie",
                label: "Pie Chart",
                children: (
                  <PrintGraph
                    graph={<PieChart />}
                    columns={columns}
                    graphColumns={graphColumns}
                    setGraphColumns={setGraphColumns}
                  />
                ),
              },
            ]}
            onChange={(selected) => dispatch(setTableAction(selected))}
            // onChange={(selected) => setActiveTab(selected)}
            indicatorSize={(origin) => origin - 16}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

const PrintGraph = ({ graph, columns }) => (
  <>
    <Columns columns={columns} />
    <Divider />
    {graph}
  </>
);

PrintGraph.propTypes = {
  graph: PropTypes.element,
  columns: PropTypes.any,
};

GraphDrawer.propTypes = {
  columns: PropTypes.array,
  graphType: PropTypes.bool,
  setGraphType: PropTypes.func,
};

export default GraphDrawer;
