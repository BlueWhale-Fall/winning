/**
 * 卫宁健康--表格操作
 * @Author winning
 * @Data 2016-11-17
 * 
 */
var _tableEdit={
	//初始化
	init:function(){
	},
	/*在尾部追加行
	  * @selector:选择器，字符串；
	  * 
	*/
	addLastTr:function (selector){
		var _index=$(selector+" tbody tr").length+1;
		//拼接字符串
		$(selector+" tbody").append("<tr><td class='flag'>" + _index + "</td><td class='text-left'><input class='table-input' type='text' disabled='disabled'/></td><td><input class='table-input' type='radio'name='name" + _index + "'/></td><td><input type='radio' name='name" + _index + "'/></td><td><input type='radio' name='name" + _index + "'/></td></tr>");
	},
	/*设置当前行
	  * @selector:选择器，字符串；
	  * 
	*/
	setCurrentTr:function (selector){
		$(selector).on("click","tbody>tr",function(){
			$(this).addClass("active").siblings("tr").removeClass("active");
		});
	},
	/*编辑文本框失去焦点
	  * @selector:选择器，字符串；
	  * 
	*/
	inputLostFocus:function (selector){
		$(selector+" tbody").on("keydown","tr.active input[type='text']",function(event){
			if(event.keyCode==13){
				$(this).attr("disabled", "disabled").removeClass("eidt-state");
			}
		});
		$(selector+" tbody").on("blur","tr.active input[type='text']",function(){
			$(this).attr("disabled", "disabled").removeClass("eidt-state");
		});
	},
	/*编辑行内容
	  * @selector:选择器，字符串；
	  * 
	*/
	editTableTr:function (selector){
		var _cur=$(selector+" tbody tr.active");
		if (_cur.length==0) 
			return false;
		_cur.find("input[type='text']").removeAttr("disabled").addClass("eidt-state");
	},
	/*删除选择行
	  * @selector:选择器，字符串；
	  * 
	*/
	deleteTableTr:function (selector){
		$(selector+" tbody tr.active").remove();
		$("td.flag",$(selector)).each(function(index,ele){
			$(this).html(++index);
		})
	}
}






