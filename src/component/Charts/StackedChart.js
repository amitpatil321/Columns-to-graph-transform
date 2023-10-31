import React, { useEffect } from "react";
// eslint-disable-next-line camelcase
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5percent from "@amcharts/amcharts5/percent";
import { useSelector } from "react-redux";

import GraphDiv from "../GraphDiv/GraphDiv";

const StackedChart = () => {
  const { graphColumns, selectedRows } = useSelector(
    ({ appReducer }) => appReducer,
  );

  const { category } = graphColumns;

  const makeGraph = () => {
    let chart = null;
    const root = am5.Root.new("stackedChartdiv");
    // eslint-disable-next-line camelcase
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      }),
    );

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      }),
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {});
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: category,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(selectedRows);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      }),
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          stacked: true,
          xAxis,
          yAxis,
          valueYField: fieldName,
          valueYShow: "valueYTotalPercent",
          categoryXField: category,
        }),
      );

      series.columns.template.setAll({
        tooltipText:
          "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
        tooltipY: am5.percent(10),
      });
      series.data.setAll(selectedRows);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(() =>
        am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{valueYTotalPercent.formatNumber('#.#')}%",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        }),
      );

      legend.data.push(series);
    }

    graphColumns?.values?.map((each) => makeSeries(each, each));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    return root;
  };

  useEffect(() => {
    let root = null;
    if (graphColumns?.category && graphColumns?.values.length)
      root = makeGraph();

    return () => root && root.dispose();
  }, [graphColumns]);

  return <GraphDiv graphColumns={graphColumns} graphDiv="stackedChartdiv" />;
};

export default StackedChart;
