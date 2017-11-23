;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-xmzk" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M904.533333 371.2c0-12.8-8.533333-21.333333-17.066666-25.6-8.533333-4.266667-21.333333-4.266667-34.133334 4.266667l-328.533333 234.666666L362.666667 426.666667c-12.8-12.8-34.133333-12.8-46.933334 0-12.8 12.8-12.8 34.133333 0 46.933333l179.2 170.666667c12.8 8.533333 29.866667 12.8 42.666667 4.266666l298.666667-213.333333c-12.8 123.733333-81.066667 277.333333-320 418.133333-68.266667-42.666667-362.666667-234.666667-315.733334-558.933333l315.733334-106.666667 213.333333 68.266667c17.066667 4.266667 34.133333-4.266667 42.666667-21.333333 4.266667-17.066667-4.266667-34.133333-21.333334-42.666667l-221.866666-76.8c-8.533333-4.266667-12.8-4.266667-21.333334 0l-341.333333 123.733333c-12.8 4.266667-21.333333 12.8-21.333333 25.6-76.8 422.4 358.4 652.8 362.666666 652.8 4.266667 4.266667 8.533333 4.266667 12.8 4.266667 4.266667 0 12.8 0 17.066667-4.266667 332.8-192 371.2-426.666667 366.933333-546.133333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-blsj" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M836.266667 119.466667H213.333333c-17.066667 0-34.133333 12.8-34.133333 34.133333v738.133333c0 17.066667 12.8 34.133333 34.133333 34.133334h422.4c17.066667 0 34.133333-12.8 34.133334-34.133334s-12.8-34.133333-34.133334-34.133333H247.466667V183.466667h558.933333v708.266666c0 17.066667 12.8 34.133333 34.133333 34.133334s34.133333-12.8 34.133334-34.133334V153.6c-4.266667-17.066667-21.333333-34.133333-38.4-34.133333z" fill="" ></path>'+
      ''+
      '<path d="M665.6 384c-12.8-12.8-34.133333-12.8-46.933333 0l-98.133334 98.133333L426.666667 384c-12.8-12.8-34.133333-12.8-42.666667 0s-12.8 34.133333 0 46.933333l98.133333 98.133334-89.6 89.6c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333l89.6-89.6 89.6 89.6c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333334-8.533333c12.8-12.8 12.8-34.133333 0-46.933333l-89.6-89.6 98.133333-98.133334c12.8-12.8 12.8-34.133333 0-46.933333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jgry" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M840.533333 729.6c-8.533333 0-17.066667 0-21.333333 4.266667L554.666667 469.333333V298.666667c42.666667-12.8 72.533333-51.2 72.533333-93.866667 0-55.466667-42.666667-98.133333-98.133333-98.133333S426.666667 145.066667 426.666667 200.533333c0 46.933333 29.866667 85.333333 72.533333 93.866667v170.666667l-264.533333 264.533333c-8.533333 0-12.8-4.266667-21.333334-4.266667-55.466667 0-98.133333 42.666667-98.133333 98.133334 0 55.466667 42.666667 98.133333 98.133333 98.133333 55.466667 0 98.133333-42.666667 98.133334-98.133333 0-29.866667-12.8-55.466667-29.866667-72.533334l221.866667-221.866666V725.333333c-42.666667 12.8-72.533333 51.2-72.533334 93.866667 0 55.466667 42.666667 98.133333 98.133334 98.133333s98.133333-42.666667 98.133333-98.133333c0-46.933333-29.866667-85.333333-72.533333-93.866667v-196.266666l221.866666 221.866666c-17.066667 17.066667-29.866667 42.666667-29.866666 72.533334 0 55.466667 42.666667 98.133333 98.133333 98.133333s98.133333-42.666667 98.133333-98.133333c-4.266667-46.933333-51.2-93.866667-102.4-93.866667z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-edit" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M797.866667 460.8c-17.066667 0-34.133333 12.8-34.133334 34.133333v221.866667c0 29.866667-25.6 51.2-51.2 51.2H311.466667c-29.866667 0-51.2-25.6-51.2-51.2V311.466667c0-29.866667 25.6-51.2 51.2-51.2h226.133333c17.066667 0 34.133333-12.8 34.133333-34.133334s-17.066667-29.866667-34.133333-29.866666H311.466667c-64 0-119.466667 51.2-119.466667 119.466666v401.066667c0 64 51.2 119.466667 119.466667 119.466667h401.066666c64 0 119.466667-51.2 119.466667-119.466667v-221.866667c-4.266667-21.333333-17.066667-34.133333-34.133333-34.133333z" fill="" ></path>'+
      ''+
      '<path d="M375.466667 640c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l375.466667-375.466667c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L375.466667 597.333333c-8.533333 12.8-8.533333 29.866667 0 42.666667z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jsgl" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M477.866667 571.733333c64 0 123.733333-25.6 170.666666-72.533333s72.533333-106.666667 72.533334-170.666667-25.6-123.733333-72.533334-170.666666-106.666667-72.533333-170.666666-72.533334-123.733333 25.6-170.666667 72.533334-72.533333 106.666667-72.533333 170.666666 25.6 123.733333 72.533333 170.666667c42.666667 46.933333 102.4 72.533333 170.666667 72.533333z m0-422.4c102.4 0 183.466667 81.066667 183.466666 183.466667s-81.066667 183.466667-183.466666 183.466667-183.466667-81.066667-183.466667-183.466667 81.066667-183.466667 183.466667-183.466667zM315.733333 567.466667c-51.2 21.333333-93.866667 51.2-132.266666 89.6-38.4 38.4-68.266667 85.333333-89.6 132.266666-12.8 34.133333-21.333333 68.266667-29.866667 102.4-4.266667 17.066667 12.8 34.133333 29.866667 34.133334 12.8 0 25.6-12.8 29.866666-25.6 4.266667-29.866667 12.8-59.733333 25.6-85.333334 17.066667-42.666667 42.666667-81.066667 76.8-115.2 29.866667-34.133333 68.266667-59.733333 110.933334-76.8 17.066667-8.533333 21.333333-25.6 17.066666-38.4-8.533333-17.066667-25.6-25.6-38.4-17.066666zM947.2 465.066667c-12.8-12.8-34.133333-8.533333-46.933333 4.266666l-311.466667 384-179.2-145.066666c-12.8-12.8-34.133333-8.533333-46.933333 4.266666-12.8 12.8-8.533333 34.133333 4.266666 46.933334l204.8 166.4c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 25.6-12.8l332.8-409.6c12.8-17.066667 12.8-34.133333-4.266667-46.933333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-ctms" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M378.88 390.826667h-56.32v40.96h56.32v143.36h40.96v-143.36h56.32v-40.96h-56.32zM645.12 390.826667l-56.32 109.226666-56.32-109.226666h-40.96v184.32h40.96v-95.573334l39.253333 73.386667 1.706667 6.826667 6.826667 10.24 1.706666 5.12H595.626667l3.413333-5.12 5.12-10.24 3.413333-6.826667 37.546667-73.386667v95.573334h40.96V390.826667h-40.96zM276.48 390.826667h-35.84c-51.2 0-92.16 40.96-92.16 92.16 0 51.2 40.96 92.16 92.16 92.16H307.2v-42.666667h-64.853333c-27.306667 0-51.2-22.186667-51.2-51.2 0-27.306667 22.186667-51.2 51.2-51.2H307.2v-42.666667H276.48zM815.786667 462.506667h-56.32c-8.533333 0-13.653333-6.826667-13.653334-15.36s6.826667-13.653333 13.653334-15.36h100.693333v-42.666667h-100.693333c-30.72 0-56.32 25.6-56.32 56.32 0 30.72 23.893333 56.32 54.613333 56.32h56.32c8.533333 0 13.653333 6.826667 13.653333 15.36s-6.826667 13.653333-13.653333 15.36h-102.4v42.666667h102.4c30.72 0 56.32-25.6 56.32-56.32 0-30.72-23.893333-56.32-54.613333-56.32z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-qxgl" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M520.533333 913.066667c-4.266667 0-8.533333 0-12.8-4.266667-8.533333 0-439.466667-230.4-366.933333-652.8 0-12.8 8.533333-21.333333 21.333333-25.6l345.6-119.466667c8.533333-4.266667 12.8-4.266667 21.333334 0l221.866666 76.8c17.066667 4.266667 25.6 25.6 21.333334 42.666667-4.266667 17.066667-25.6 25.6-42.666667 21.333333l-209.066667-72.533333-315.733333 106.666667c-46.933333 324.266667 247.466667 516.266667 315.733333 558.933333 277.333333-162.133333 324.266667-349.866667 320-477.866667 0-17.066667 12.8-34.133333 29.866667-34.133333 17.066667 0 34.133333 12.8 34.133333 29.866667 8.533333 123.733333-29.866667 354.133333-366.933333 546.133333-8.533333 4.266667-12.8 4.266667-17.066667 4.266667z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-lxys" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M896 221.866667c-12.8-12.8-34.133333-12.8-46.933333 0l-371.2 371.2-149.333334-149.333334c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l170.666667 170.666666c4.266667 4.266667 12.8 8.533333 21.333333 8.533334s17.066667-4.266667 21.333333-8.533334L896 268.8c12.8-12.8 12.8-34.133333 0-46.933333z" fill="" ></path>'+
      ''+
      '<path d="M819.2 550.4c-17.066667 0-34.133333 12.8-34.133333 34.133333v221.866667H166.4V247.466667h490.666667c17.066667 0 34.133333-12.8 34.133333-34.133334s-12.8-34.133333-34.133333-34.133333H136.533333c-17.066667 0-34.133333 17.066667-34.133333 34.133333v627.2c0 17.066667 12.8 34.133333 34.133333 34.133334h686.933334c17.066667 0 34.133333-12.8 34.133333-34.133334v-256c-4.266667-17.066667-21.333333-34.133333-38.4-34.133333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-pxgl" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M827.733333 192H149.333333c-17.066667 0-34.133333 12.8-34.133333 34.133333V768c0 17.066667 12.8 34.133333 34.133333 34.133333h290.133334c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333h-256V256h614.4v238.933333c0 17.066667 12.8 34.133333 34.133333 34.133334s34.133333-12.8 34.133333-34.133334V221.866667c-4.266667-17.066667-21.333333-29.866667-38.4-29.866667z" fill="" ></path>'+
      ''+
      '<path d="M490.666667 413.866667c-12.8-12.8-34.133333-12.8-46.933334 0s-12.8 34.133333 0 46.933333l328.533334 328.533333c4.266667 4.266667 12.8 8.533333 21.333333 8.533334s17.066667-4.266667 21.333333-8.533334c12.8-12.8 12.8-34.133333 0-46.933333l-324.266666-328.533333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-ryzz" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M469.333333 674.133333c4.266667 4.266667 12.8 8.533333 21.333334 8.533334 4.266667 0 12.8 0 17.066666-4.266667l379.733334-264.533333c8.533333-4.266667 12.8-17.066667 12.8-25.6 0-12.8-4.266667-21.333333-17.066667-25.6l-375.466667-221.866667c-8.533333-4.266667-21.333333-4.266667-34.133333 0l-341.333333 217.6c-8.533333 4.266667-17.066667 17.066667-17.066667 25.6 0 8.533333 4.266667 21.333333 12.8 25.6l341.333333 264.533333z m29.866667-473.6L810.666667 388.266667l-320 221.866666-285.866667-221.866666 294.4-187.733334z" fill="" ></path>'+
      ''+
      '<path d="M917.333333 614.4c-8.533333-12.8-29.866667-17.066667-42.666666-8.533333l-371.2 264.533333-349.866667-247.466667c-12.8-8.533333-34.133333-8.533333-42.666667 8.533334-8.533333 12.8-8.533333 34.133333 8.533334 42.666666l371.2 260.266667c4.266667 4.266667 12.8 4.266667 17.066666 4.266667 8.533333 0 12.8 0 17.066667-4.266667l388.266667-277.333333c8.533333-8.533333 12.8-29.866667 4.266666-42.666667z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-delete" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M844.8 302.933333H213.333333c-17.066667 0-34.133333 12.8-34.133333 34.133334s17.066667 29.866667 34.133333 29.866666h68.266667l46.933333 439.466667c0 17.066667 17.066667 29.866667 29.866667 29.866667h345.6c17.066667 0 29.866667-12.8 29.866667-29.866667l46.933333-439.466667h59.733333c17.066667 0 34.133333-12.8 34.133334-34.133333s-12.8-29.866667-29.866667-29.866667z m-170.666667 465.066667H388.266667l-42.666667-401.066667h371.2l-42.666667 401.066667zM392.533333 256h273.066667c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-29.866667-34.133333-29.866667H392.533333c-17.066667 0-34.133333 12.8-34.133333 34.133333s17.066667 29.866667 34.133333 29.866667z" fill="" ></path>'+
      ''+
      '<path d="M576 669.866667c21.333333 0 34.133333-12.8 34.133333-29.866667l21.333334-192c0-17.066667-8.533333-34.133333-29.866667-34.133333-17.066667-4.266667-34.133333 8.533333-34.133333 29.866666l-21.333334 192c0 17.066667 12.8 34.133333 29.866667 34.133334z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-list" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M378.88 394.24h261.12c20.48 0 30.72-10.24 30.72-25.6s-10.24-25.6-30.72-25.6H378.88c-20.48 0-30.72 10.24-30.72 25.6s15.36 25.6 30.72 25.6zM645.12 445.44H378.88c-20.48 0-30.72 10.24-30.72 25.6s10.24 25.6 30.72 25.6h261.12c20.48 0 30.72-10.24 30.72-25.6s-10.24-25.6-25.6-25.6zM645.12 547.84H378.88c-20.48 0-30.72 10.24-30.72 25.6s10.24 25.6 30.72 25.6h261.12c20.48 0 30.72-10.24 30.72-25.6s-10.24-25.6-25.6-25.6z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-sjzd" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M806.4 93.866667H183.466667c-21.333333 0-34.133333 17.066667-34.133334 34.133333v738.133333c0 17.066667 12.8 34.133333 34.133334 34.133334h422.4c17.066667 0 34.133333-12.8 34.133333-34.133334s-12.8-34.133333-34.133333-34.133333H213.333333V162.133333h558.933334v708.266667c0 17.066667 12.8 34.133333 34.133333 34.133333s34.133333-12.8 34.133333-34.133333V128c-4.266667-17.066667-17.066667-34.133333-34.133333-34.133333z" fill="" ></path>'+
      ''+
      '<path d="M610.133333 273.066667c-17.066667 0-34.133333 12.8-34.133333 34.133333v328.533333c0 17.066667 12.8 34.133333 34.133333 34.133334s34.133333-12.8 34.133334-34.133334V307.2c-4.266667-17.066667-17.066667-34.133333-34.133334-34.133333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-syjh" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M840.533333 294.4l-4.266666-4.266667h-4.266667l-4.266667-4.266666s-4.266667 0-4.266666-4.266667h-8.533334-4.266666c-4.266667 0-4.266667 0-4.266667 4.266667h-4.266667-4.266666-4.266667l-251.733333 234.666666-119.466667-115.2c-12.8-12.8-34.133333-12.8-46.933333 0L226.133333 554.666667c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333l128-128 119.466667 119.466667c12.8 12.8 29.866667 12.8 42.666666 0l243.2-226.133334c21.333333 46.933333 34.133333 98.133333 34.133334 149.333334 0 192-157.866667 349.866667-349.866667 349.866666S140.8 704 140.8 512c0-192 157.866667-349.866667 349.866667-349.866667 17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333c-230.4 0-413.866667 187.733333-413.866667 413.866666 0 230.4 187.733333 413.866667 413.866667 413.866667s413.866667-187.733333 413.866666-413.866667c0-72.533333-21.333333-149.333333-64-213.333333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-syjt" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M861.866667 294.4c0-4.266667 0-4.266667 0 0-4.266667-4.266667-4.266667-4.266667-4.266667-8.533333l-4.266667-4.266667s-4.266667 0-4.266666-4.266667h-4.266667-4.266667-4.266666s-4.266667 0-4.266667 4.266667h-4.266667-4.266666l-337.066667 290.133333-140.8-140.8c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l162.133333 162.133333c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s12.8-4.266667 21.333334-8.533333l328.533333-285.866667c21.333333 46.933333 34.133333 98.133333 34.133333 149.333334 0 192-157.866667 349.866667-349.866666 349.866666s-358.4-149.333333-358.4-341.333333S315.733333 162.133333 512 162.133333c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-29.866667-34.133333-29.866667c-230.4 0-413.866667 187.733333-413.866667 413.866667s187.733333 413.866667 413.866667 413.866667 413.866667-187.733333 413.866667-413.866667c0-76.8-21.333333-153.6-64-217.6z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-syqz" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M840.533333 294.4c-8.533333-17.066667-29.866667-21.333333-42.666666-8.533333-17.066667 8.533333-21.333333 29.866667-8.533334 42.666666 34.133333 55.466667 51.2 119.466667 51.2 183.466667 0 192-157.866667 349.866667-349.866666 349.866667S140.8 704 140.8 512c0-192 157.866667-349.866667 349.866667-349.866667 17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333c-230.4 0-413.866667 187.733333-413.866667 413.866666 0 230.4 187.733333 413.866667 413.866667 413.866667s413.866667-187.733333 413.866666-413.866667c0-72.533333-21.333333-149.333333-64-213.333333z" fill="" ></path>'+
      ''+
      '<path d="M490.666667 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="" ></path>'+
      ''+
      '<path d="M332.8 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="" ></path>'+
      ''+
      '<path d="M644.266667 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xmzk1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M904.533333 371.2c0-12.8-8.533333-21.333333-17.066666-25.6-8.533333-4.266667-21.333333-4.266667-34.133334 4.266667l-328.533333 234.666666L362.666667 426.666667c-12.8-12.8-34.133333-12.8-46.933334 0-12.8 12.8-12.8 34.133333 0 46.933333l179.2 170.666667c12.8 8.533333 29.866667 12.8 42.666667 4.266666l298.666667-213.333333c-12.8 123.733333-81.066667 277.333333-320 418.133333-68.266667-42.666667-362.666667-234.666667-315.733334-558.933333l315.733334-106.666667 213.333333 68.266667c17.066667 4.266667 34.133333-4.266667 42.666667-21.333333 4.266667-17.066667-4.266667-34.133333-21.333334-42.666667l-221.866666-76.8c-8.533333-4.266667-12.8-4.266667-21.333334 0l-341.333333 123.733333c-12.8 4.266667-21.333333 12.8-21.333333 25.6-76.8 422.4 358.4 652.8 362.666666 652.8 4.266667 4.266667 8.533333 4.266667 12.8 4.266667 4.266667 0 12.8 0 17.066667-4.266667 332.8-192 371.2-426.666667 366.933333-546.133333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-msg" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M798.72 926.72c-15.36 0-35.84-5.12-56.32-20.48-5.12 0-61.44-40.96-102.4-61.44-40.96 10.24-81.92 15.36-128 15.36-240.64 0-424.96-158.72-424.96-363.52 0-209.92 189.44-384 424.96-384s424.96 168.96 424.96 384c0 81.92-30.72 163.84-87.04 225.28V870.4c0 25.6-10.24 46.08-30.72 56.32h-20.48z m-148.48-138.24l10.24 5.12c40.96 25.6 107.52 71.68 112.64 71.68 20.48 15.36 30.72 10.24 30.72 10.24v-179.2l5.12-5.12c51.2-56.32 81.92-122.88 81.92-199.68 0-184.32-168.96-332.8-373.76-332.8S143.36 307.2 143.36 491.52c0 179.2 158.72 312.32 373.76 312.32 40.96 0 87.04-5.12 122.88-15.36h10.24z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yhzg" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M699.733333 345.6c0-64-25.6-123.733333-72.533333-170.666667s-106.666667-72.533333-170.666667-72.533333-123.733333 25.6-170.666666 72.533333S213.333333 281.6 213.333333 345.6s25.6 123.733333 72.533334 170.666667 106.666667 72.533333 170.666666 72.533333 123.733333-25.6 170.666667-72.533333 72.533333-106.666667 72.533333-170.666667z m-238.933333 183.466667c-102.4 0-183.466667-81.066667-183.466667-183.466667s81.066667-183.466667 183.466667-183.466667 183.466667 81.066667 183.466667 183.466667c-4.266667 98.133333-85.333333 183.466667-183.466667 183.466667zM755.2 669.866667c-38.4-38.4-81.066667-68.266667-132.266667-89.6-17.066667-4.266667-34.133333 0-38.4 17.066666-8.533333 17.066667 0 34.133333 17.066667 38.4 42.666667 17.066667 81.066667 42.666667 115.2 76.8 34.133333 34.133333 59.733333 72.533333 76.8 115.2 12.8 29.866667 21.333333 55.466667 25.6 85.333334 4.266667 12.8 12.8 25.6 29.866667 25.6 17.066667 0 34.133333-17.066667 29.866666-34.133334-4.266667-34.133333-12.8-68.266667-29.866666-102.4-25.6-51.2-55.466667-93.866667-93.866667-132.266666zM298.666667 580.266667c-51.2 21.333333-93.866667 51.2-132.266667 89.6-38.4 38.4-68.266667 85.333333-89.6 132.266666-12.8 34.133333-21.333333 68.266667-29.866667 102.4-4.266667 17.066667 12.8 34.133333 29.866667 34.133334 12.8 0 25.6-12.8 29.866667-25.6 4.266667-29.866667 12.8-59.733333 25.6-85.333334 17.066667-42.666667 42.666667-81.066667 76.8-115.2 34.133333-34.133333 72.533333-59.733333 115.2-76.8 12.8-8.533333 17.066667-25.6 12.8-38.4-8.533333-17.066667-25.6-25.6-38.4-17.066666zM785.066667 533.333333c123.733333-260.266667-17.066667-388.266667-21.333334-396.8-17.066667-8.533333-34.133333-8.533333-46.933333 4.266667-12.8 12.8-8.533333 34.133333 4.266667 46.933333 4.266667 4.266667 119.466667 110.933333-8.533334 345.6-4.266667 8.533333-4.266667 17.066667 0 25.6 4.266667 8.533333 12.8 17.066667 21.333334 17.066667 0 0 166.4 55.466667 187.733333 217.6 4.266667 17.066667 17.066667 25.6 29.866667 25.6h4.266666c17.066667-4.266667 29.866667-17.066667 25.6-34.133333-21.333333-149.333333-136.533333-221.866667-196.266666-251.733334z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yjjz" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M832 136.533333H209.066667c-17.066667 0-34.133333 12.8-34.133334 34.133334v738.133333c0 17.066667 12.8 34.133333 34.133334 34.133333h422.4c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333H243.2V200.533333h558.933333v708.266667c0 17.066667 12.8 34.133333 34.133334 34.133333s34.133333-12.8 34.133333-34.133333V166.4c-8.533333-17.066667-21.333333-29.866667-38.4-29.866667z" fill="" ></path>'+
      ''+
      '<path d="M401.066667 742.4c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l196.266667-196.266667c8.533333-8.533333 12.8-21.333333 8.533333-34.133333s-17.066667-21.333333-29.866666-21.333333h-110.933334l115.2-115.2c12.8-12.8 12.8-34.133333 0-46.933334s-34.133333-12.8-46.933333 0l-166.4 166.4c-8.533333 8.533333-12.8 21.333333-8.533333 34.133334s12.8 25.6 25.6 25.6h110.933333l-140.8 140.8c-8.533333 12.8-8.533333 34.133333 4.266667 46.933333z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yhgl" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M499.2 588.8c-64 0-123.733333-25.6-170.666667-72.533333-46.933333-42.666667-72.533333-106.666667-72.533333-170.666667s25.6-123.733333 72.533333-170.666667 106.666667-72.533333 170.666667-72.533333 123.733333 25.6 170.666667 72.533333 72.533333 106.666667 72.533333 170.666667-25.6 123.733333-72.533333 170.666667-106.666667 72.533333-170.666667 72.533333z m0-422.4c-102.4 0-183.466667 81.066667-183.466667 183.466667s81.066667 183.466667 183.466667 183.466666S682.666667 452.266667 682.666667 349.866667c-4.266667-102.4-85.333333-183.466667-183.466667-183.466667zM793.6 669.866667c-38.4-38.4-81.066667-68.266667-132.266667-89.6-17.066667-4.266667-34.133333 0-38.4 17.066666-8.533333 17.066667 0 34.133333 17.066667 38.4 42.666667 17.066667 81.066667 42.666667 115.2 76.8 34.133333 34.133333 59.733333 72.533333 76.8 115.2 12.8 29.866667 21.333333 55.466667 25.6 85.333334 4.266667 12.8 12.8 25.6 29.866667 25.6 17.066667 0 34.133333-17.066667 29.866666-34.133334-4.266667-34.133333-12.8-68.266667-29.866666-102.4-25.6-46.933333-55.466667-93.866667-93.866667-132.266666zM170.666667 827.733333c17.066667-42.666667 42.666667-81.066667 76.8-115.2 34.133333-34.133333 72.533333-59.733333 115.2-76.8 17.066667-8.533333 21.333333-25.6 17.066666-38.4-8.533333-17.066667-25.6-21.333333-38.4-17.066666-51.2 21.333333-93.866667 51.2-132.266666 89.6-38.4 38.4-68.266667 85.333333-89.6 132.266666-12.8 34.133333-21.333333 68.266667-29.866667 102.4-8.533333 21.333333 8.533333 34.133333 25.6 34.133334 12.8 0 25.6-12.8 29.866667-25.6 4.266667-29.866667 12.8-55.466667 25.6-85.333334z" fill="" ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)