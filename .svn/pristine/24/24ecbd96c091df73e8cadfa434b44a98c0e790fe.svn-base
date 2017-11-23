/**
 * 卫宁健康--CTMS交互事件
 * @Author winning
 * @Data 2016-10-08
 * 
 */
var _common = {
    //初始化
    init: function () {
    	this.cclDefault();
    },
    //取消空链接
    cclDefault: function () {
        $(document).on('click', 'a[href=""]', function (e) {
            e.preventDefault();
        });
    },
    /*获取批量被选中的ID
     *@selector:事件源；
     *@scrop：范围
     * */
    getDeleteChk:function(selector,scrop){
    	$(selector).on("click",function(){
    		$("input:checked",scrop).each(function(index,ele){
    			alert(index);
    		});
    	});
    },
     /*全选
     *@selector:事件源,必须是复选框；
     *@scrop：范围
     * */
    checkedAll:function(element,scrop){
    	$(element).on("click","th>input[type='checkbox']",function(){
           	$("#pageContent input[type='checkbox']").prop("checked",$(this).prop("checked"));
      	});
    }
    
}
