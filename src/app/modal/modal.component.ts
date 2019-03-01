import { animate, trigger, state, transition, style, query, animateChild } from '@angular/animations';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { SharedService } from 'app/services/shared.service';

declare var $:any;
@Component({
    selector: 'app-modal',
    exportAs: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation:ViewEncapsulation.None ,
    host:{'[@modalView]':'navigationCount'},
    animations: [
      trigger(
          "modalView",
          [
              // If this modal-view is rendered as part of a page refresh, we don't
              // want to include any animations - animations are for mental modal; and,
              // if this is the initial page load, there can be no meaningful mental
              // model portrayed for the user and the modal window. As such, we need to
              // denote the modal-view has having a "transition" so that the nested
              // view transitions will be inherently blocked.
              transition( "void => 0", [] ),

              // While we don't want a transition on page-refresh, we certainly do want
              // the animations to play when the modal-view is opened or closed during
              // the normal control flow of the application. As such, for the :enter
              // :leave transitions, we want to query for the router-outlet component
              // and ask its animations to run (if it has any).
              transition(
                  ":enter, :leave",
                  [
                      // As the modal-view enters or leaves, we want to allow any of
                      // nested view animations to execute.
                      // --
                      // CAUTION: This query selector does not get the simulated
                      // encapsulation attribute selectors. This will go DEEP through
                      // the descendant DOM tree if you're not careful. As such, we
                      // MUST USE the "limit" property to prevent deeper matches from
                      // being exercised.
                      query(
                          "@*",
                          animateChild(),
                          {
                              limit: 1,
                              optional: true
                          }
                      )
                  ]
              ),

              // By default, we want to block all nested animations (and then
              // selectively re-enable them using the transitions above). As such, we
              // have to define a generic no-op transition from every state to every
              // other state. This transition will inherently block the transitions
              // contained within any nested views.
              transition( "* <=> *", [] )
          ]
      )
],
  })
  export class ModalComponent implements OnInit ,OnDestroy{
  navigationCount: number;
  ngOnDestroy(): void {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    this.display='none';
  }
    display:string;
    ngOnInit(): void {
      this.display='block';
      //this.shared.modalOpened=true
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }   
    @Input() size:string="md";
    @Output() modalClose : EventEmitter<any> = new EventEmitter<any>();
    constructor( private router : Router,private shared:SharedService) {
      this.navigationCount = router.navigated
            ? 0
            : -1 ;// First navigation will transition ( -1 => 0 )
    }
      
    onClose() {
     // this.display = 'none';
      //Allow fade out animation to play before navigating back
      setTimeout(
        () => this.router.navigate([{outlets: {modal: null}}]),
        100
      );
    }

    closeModal( $event=null ) {
      
      // if($event!=null && $event.target.classList.filter(a=>a=='modal-dialog').length>0){
      //   $event.preventDefault();
      //   return;
      // }

      this.modalClose.next($event);
      this.display='none';
      $("html").css({'overflow':'auto'});
      this.shared.modalOpened=false
      this.shared.closeModal();
      if($event==null)
      this.router.navigate([{outlets: {modal: null}}]);
    }

    onDialogClick(event){
      event.stopPropagation();
      event.cancelBubble = true;
    }
  }
