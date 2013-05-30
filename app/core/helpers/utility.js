define(function(require) {

    var utils = {};
    /*
     * Helper function for JQueryUI Sliders Create event
     */
    utils.JQSliderCreate = function()
    {
        $(this)
            .removeClass('ui-corner-all ui-widget-content')
            .wrap('<span class="ui-slider-wrap"></span>')
            .find('.ui-slider-handle')
            .removeClass('ui-corner-all ui-state-default');
    }


    utils.JQVSlider = function( jqElement, observable, val_min, val_max, val_step, stop_callback ){
        jqElement.each(function()
        {
            //var value = parseInt( $( this ).text(), 10 );
            var ret = $( this ).empty().slider({
                create: utils.JQSliderCreate,
                value: observable(),
                range: "min",
                min: val_min,
                max: val_max,
                step: val_step,
                animate: true,
                stop: stop_callback,
                orientation: "vertical"
            });
            observable.subscribe(function(newVal){
                ret.slider("value",newVal);
            });
        });
    }

    utils.noEmit = function( origFn ) {
        return _.wrap(origFn, function(func){ try{func();} catch(e){} } );
    };



    ko.extenders.withScratch = function(target,opts) {

        target.defaultValue = target();

        target.Scratch = ko.observable(target.defaultValue);
        target.SaveScratch = function() {target(target.Scratch());};
        target.ResetScratch = function() {target.Scratch(target());};
        target.Default = function() {target(target.defaultValue);};

        target.subscribe(function(newval){
            target.ResetScratch();
        });

        return target;
    }


    return utils;
});
