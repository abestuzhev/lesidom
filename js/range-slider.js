$(document).ready(function(){


    /* слайдер цен */
function rangeSlider(slide, minValue, maxValue, maxDefault){
    $(slide).slider({
        min: 0,
        max: maxDefault,
        values: [0,maxDefault],
        range: true,
        stop: function(event, ui) {
            $(minValue).val($(slide).slider("values",0));
            $(maxValue).val($(slide).slider("values",1));

        },
        slide: function(event, ui){
            $( minValue).val($(slide).slider("values",0));
            $(maxValue).val($(slide).slider("values",1));
        }
    });

    $("input#minCost").change(function(){

        var value1=$(minValue).val();
        var value2=$(maxValue).val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $(minValue).val(value1);
        }
        $(slide).slider("values",0,value1);
    });


    $(maxValue).change(function(){

        var value1=$(minValue).val();
        var value2=$(maxValue).val();

        if (value2 > maxDefault) { value2 = maxDefault; $(maxValue).val(maxDefault)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $(maxValue).val(value2);
        }
        $(slide).slider("values",1,value2);
    });



// фильтрация ввода в поля
    $('input').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;

        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);

        if(!/\d/.test(keyChar))	return false;

    });
}

    rangeSlider('#slider-price', '#minCost-price', '#maxCost-price', 9999);
    rangeSlider('#slider-power', '#minCost-power', '#maxCost-power', 10);

});


