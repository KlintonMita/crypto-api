import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Crypto Exchange';
  cryptos: any[] = [];

  ngOnInit() {
    this.getCryptos();
  }

  async getCryptos() {
    try {
      const response = await axios.get('http://localhost:3000/api/cryptos');
      this.cryptos = response.data;
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  }
}
