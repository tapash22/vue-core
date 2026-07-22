// src/utils/chartRegistry.ts
import {
  ArcElement,
  // Controllers
  BarController,
  // Elements
  BarElement,
  BubbleController,
  // Scales
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  // Plugins
  Title,
  Tooltip,
} from 'chart.js';

export function registerChartJS(): void {
  ChartJS.register(
    // Scales
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    LogarithmicScale,
    TimeScale,
    TimeSeriesScale,
    // Elements
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    // Controllers
    BarController,
    LineController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    BubbleController,
    ScatterController,
    // Plugins
    Title,
    Tooltip,
    Legend,
    SubTitle,
    Filler
  );
}
