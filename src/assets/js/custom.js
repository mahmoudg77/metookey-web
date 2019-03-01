(function() {
 
  var loadDefaultCarousel=function(){
    $('.product-single-default .product-single-carousel').owlCarousel($.extend(true, {}, sliderDefaultOptions, {
        nav: true,
        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
        dotsContainer: '#carousel-custom-dots',
        autoplay: false,
        onInitialized: function() {
            var $source = this.$element;
            
            if( $.fn.elevateZoom) {
                $source.find('img').each(function() {
                    var $this = $(this),					
                        zoomConfig = {
                            responsive: true,
                            zoomWindowFadeIn: 350,
                            zoomWindowFadeOut: 200,
                            borderSize: 0,
                            zoomContainer: $this.parent(),
                            zoomType: 'inner',
                            cursor: 'grab'
                        };
                    $this.elevateZoom(zoomConfig);
                });
            }
        },
    }));
}
   // Your code goes here 
   //loadDefaultCarousel();
}());