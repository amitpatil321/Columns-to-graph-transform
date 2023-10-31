import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Drawer, Segmented, Row, Col, Divider, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setTableAction } from "../../store/appReducer";

import PieChart from "../Charts/PieChart";
import Columns from "../Columns/Columns";
import BarChart from "../Charts/BarChart";
import StackedChart from "../Charts/StackedChart";

const GraphDrawer = ({ columns }) => {
  const dispatch = useDispatch();
  const { tableAction, selectedRows } = useSelector(
    ({ appReducer }) => appReducer,
  );

  console.log(tableAction);

  // setAction, selectedData, tableAction;
  const [graphColumns, setGraphColumns] = useState([]);
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    const result = selectedRows.map((item) => {
      const filteredObject = {};
      graphColumns.forEach((prop) => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty(prop)) {
          filteredObject[prop] = item[prop];
        }
      });
      return filteredObject;
    });
    setGraphData(result);
  }, [graphColumns]);

  return (
    <Drawer
      title="Statistics"
      placement="right"
      width="60%"
      onClose={() => dispatch(setTableAction(null))}
      open={tableAction || false}
      destroyOnClose>
      <Row gutter={[4, 16]}>
        <Col span={24}>
          <Tabs
            defaultActiveKey={tableAction}
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
            indicatorSize={(origin) => origin - 16}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

const PrintGraph = ({ graph, columns, graphColumns, setGraphColumns }) => (
  <>
    <Columns
      columns={columns}
      // graphColumns={graphColumns}
      // setGraphColumns={setGraphColumns}
    />
    <Divider />
    {graph}
  </>
);

PrintGraph.propTypes = {
  graphType: PropTypes.string,
  graph: PropTypes.element,
  columns: PropTypes.any,
  graphColumns: PropTypes.any,
  setGraphColumns: PropTypes.func,
};

GraphDrawer.propTypes = {
  columns: PropTypes.array,
};

export default GraphDrawer;
