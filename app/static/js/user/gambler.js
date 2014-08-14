(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(assetInfo);
  });

  function assetInfo(i){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children('.name').text();

    i.preventDefault();

    console.log(id,asset);
  }
})();

