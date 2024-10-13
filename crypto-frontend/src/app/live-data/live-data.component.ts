import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { Chart, registerables } from 'chart.js';

interface HistoricalDataPoint {
  timestamp: number;
  price: number;
}

@Component({
  selector: 'app-live-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit {
  cryptoId?: string;
  cryptoHistory: any[] = [];
  cryptoDetails: any;
  crypto: any = {};
  errorMessage: string | null = null;
  chart!: Chart;

  constructor(private route: ActivatedRoute, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.cryptoId = this.route.snapshot.params['id'];
    this.getCryptoDetails();
    this.getCryptoHistory(this.cryptoId!);
  }

  async getCryptoDetails() {
    try {
      const response = await axios.get(`http://localhost:3000/api/cryptos/${this.cryptoId}`);
      this.cryptoDetails = response.data;
    } catch (error) {
      console.error('Error fetching crypto details:', error);
    }
  }

  async getCryptoHistory(id: string) {
    try {
      const response = await axios.get<HistoricalDataPoint[]>(`http://localhost:3000/api/cryptos/${id}/history?timePeriod=7d`);
      const history: HistoricalDataPoint[] = response.data;
      const labels = history.map(point => {
        return new Date(point.timestamp * 1000).toLocaleDateString();
      });
      const prices = history.map(point => point.price);
      this.chart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Price in USD',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      });
    } catch (error) {
      console.error('Error fetching crypto history:', error);
    }
  }

  renderChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.cryptoHistory.map(data => new Date(data.timestamp).toLocaleDateString()),
          datasets: [{
            label: 'Price over time',
            data: this.cryptoHistory.map(data => data.price),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            x: { type: 'time', time: { unit: 'day' } },
            y: { beginAtZero: false }
          }
        }
      });
    } else {
      console.error('Failed to retrieve the canvas context. Chart cannot be rendered.');
    }
  }


  goBack() {
    this.router.navigate(['/main']);
  }
}
