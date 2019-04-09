import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutHelperService } from '../layout-helper.service';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private router: Router,
        public layoutHelper: LayoutHelperService
    ) { }

    ngOnInit() {
        $(document).scroll(() => {
            if ($(document).scrollTop() > 100) {
                $('.navbar.navbar-onscroll.fixed-top').show();
            } else {
                $('.navbar.navbar-onscroll.fixed-top').hide();
            }
        });
        $(() => {
            $(document).trigger('scroll');
        });
    }
}
