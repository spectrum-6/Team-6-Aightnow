import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type TRadarChartProps = {
  width?: number;
  height?: number;
  labels?: boolean;
  // promptResult: any;
  promptResult?: any;
};

export default function RadarChart(props: TRadarChartProps) {
  const { width, height, labels, promptResult } = props;

  const stockPrice = promptResult?.indicators.stockPrice.currentValue / 10;
  const investmentIndex =
    promptResult?.indicators.investmentIndex.currentValue / 10;
  const profitability =
    promptResult?.indicators.profitability.currentValue / 10;
  const growthPotential =
    promptResult?.indicators.growthPotential.currentValue / 10;
  const interestLevel =
    promptResult?.indicators.interestLevel.currentValue / 10;

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 2,
          display: false,
        },
        grid: {
          color: ["#9F9F9F", "#E9E9E9", "#E9E9E9", "#E9E9E9", "#E9E9E9"],
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  const data = {
    labels: labels
      ? ["주가", "투자지수", "관심도", "성장성", "수익성"]
      : ["", "", "", "", ""],
    datasets: [
      {
        label: "AI 리포트",
        data: promptResult
          ? [
              stockPrice,
              investmentIndex,
              profitability,
              growthPotential,
              interestLevel,
            ]
          : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(178, 230, 250, 0.3)",
        borderColor: "rgba(0, 172, 242, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Radar data={data} options={options} width={width} height={height} />
    </div>
  );
}
