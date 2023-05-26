import React from "react";
import DonutChart from "react-donut-chart";

function PieChartDisplay(props) {
  const reactDonutChartdata = [
    {
      label: "Pending",
      value: props.summaryData.pending,
      color: "#FEB019",
    },
    {
      label: "Approved",
      value: props.summaryData.accepted,
      color: "#00E396",
    },
    {
      label: "Rejected",
      value: props.summaryData.rejected,
      color: "#FF4560",
    },
  ];
  const reactDonutChartBackgroundColor = ["#FEB019", "#00E396", "#FF4560"];
  const reactDonutChartInnerRadius = 2;
  const reactDonutChartSelectedOffset = 0.5;
  const reactDonutChartHandleClick = (item, toggled) => {};
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  return (
    <div className="donut">
      <DonutChart
        width={600}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={reactDonutChartdata}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
    </div>
  );
}

export default PieChartDisplay;
