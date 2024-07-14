import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type TAreaChartProps = {
  width?: number;
  height?: number;
  stockPriceArray: number[];
  stockDateArray: string[];
  selected: string;
};

export default function AreaChart(props: TAreaChartProps) {
  const { width, height, stockPriceArray, stockDateArray, selected } = props;

  const options = {
    responsive: true,
    tension: 0.3,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9F9F9F",
          maxTicksLimit: selected === "1년" || selected === "10년" ? 4 : 3,
          align: "start" as "start",
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
  };

  const labels = stockDateArray;

  const datas = stockPriceArray;

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: datas,
        borderColor: "#00ACF2",
        pointRadius: 0,
        borderWidth: 1,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(71, 180, 225, 0.7)");
          gradient.addColorStop(0.6, "rgba(71, 180, 225, 0.07)");
          return gradient;
        },
        fill: "origin",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
}
