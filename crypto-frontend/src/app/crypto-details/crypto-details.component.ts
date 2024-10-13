import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crypto-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crypto-details.component.html',
  styleUrl: './crypto-details.component.scss'
})
export class CryptoDetailsComponent implements OnInit {
  title = 'Crypto Exchange';
  cryptos: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getCryptos();
  }

  onSubmit(cryptoId: string) {
    this.router.navigate(['/details', cryptoId]);
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
