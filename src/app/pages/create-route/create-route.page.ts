import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PlacesService} from "../../services/places.service";


@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.page.html',
  styleUrls: ['./create-route.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule]
})
export class CreateRoutePage implements OnInit {
  placeService = inject(PlacesService);





  constructor() {

  }

  ngOnInit() {
  }

}
