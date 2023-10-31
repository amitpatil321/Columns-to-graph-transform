import PropTypes from "prop-types";
import React, { memo } from "react";
import { Checkbox, Row, Col, Select, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";

import CONFIG from "../../config/config";
import { setGraphColumns } from "../../store/appReducer";

const Columns = memo(({ columns }) => {
  const dispatch = useDispatch();
  const { tableAction, graphColumns, selectedRows } = useSelector(
    ({ appReducer }) => appReducer,
  );

  const { category, values } = graphColumns;

  // Get all other column names except id, we dont want it
  const options = Object.keys(selectedRows[0])?.filter(
    (each) => each !== CONFIG.UNIQID_KEY,
  );
  const colOptions = [];
  options?.forEach((each) => {
    colOptions.push({
      label: columns?.find((col) => col.key === each)?.title,
      value: each,
    });
  });

  return (
    <Row gutter={[4, 16]}>
      <Col span={2}>
        <b>Category</b>
      </Col>
      <Col span={22}>
        <Select
          placeholder="Select a category"
          defaultValue={category}
          style={{ minWidth: 200 }}
          onChange={(selected) =>
            dispatch(setGraphColumns({ ...graphColumns, category: selected }))
          }
          options={colOptions}
        />
      </Col>
      <Col span={2}>
        <b>Series</b>
      </Col>
      <Col span={22}>
        {tableAction === "pie" ? (
          <Radio.Group
            options={colOptions?.filter((each) => each.value !== category)}
            value={values[0] || null}
            onChange={(event) => {
              dispatch(
                setGraphColumns({
                  ...graphColumns,
                  values: [event.target.value],
                }),
              );
            }}
          />
        ) : (
          <Checkbox.Group
            defaultValue={graphColumns.values}
            options={colOptions?.filter(
              (each) => each.value !== graphColumns?.category,
            )}
            onChange={(selected) =>
              dispatch(
                setGraphColumns({ ...graphColumns, values: [...selected] }),
              )
            }
          />
        )}
      </Col>
    </Row>
  );
});

Columns.propTypes = {
  columns: PropTypes.array,
};

export default Columns;
