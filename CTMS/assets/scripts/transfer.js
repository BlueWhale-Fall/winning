var _transfer = {
	//初始化
	init: function() {
		this.cclDefault();
	},
	//取消空链接
	cclDefault: function() {
		$(document).on('click', 'a[href="#"]', function(ev) {
			_ev=ev||window.event;
			_ev.preventDefault();
		});
	},
	/*全选
	  * @ele:操作源；
	  * @scope:范围;
	  * @hideValue：存值元素;
	  * 
	*/
	selectAll:function(ele,scope,hideValue){
		//全选，遍历，赋值
		$("div.transfer").on("click",ele,function(){
			var _chkAll=$(this).prop("checked"),_arr="";
			if(!_chkAll){
				$(hideValue).val("");
			}else{
				$(scope).each(function(index,cur){
					_arr+=$(cur).data("index")+",";
				})
				$(hideValue).val(_arr);
			}
			$(scope).prop("checked",_chkAll);
		});
	},
	/*文本框的事件
	  * @ele:操作源；
	  * @hideEle:存值元素;
	  * @selAll:全选;
	  * @tbody:范围内文本框
	  * 
	*/
	chkEvent:function (ele,hideEle,selAll,tbody){
		$("div.transfer").on("click",ele,function(){
			var _this=$(this),_data=_this.data("index"),_tbody=$(tbody),_chkVaue=$(hideEle).val();
			//存在添加，反之移除
			if(_chkVaue.indexOf(_data)==-1){
				_chkVaue+=_data+",";
			}else{
				_chkVaue=_chkVaue.replace(_data+",","");
			}
			$(hideEle).val(_chkVaue);
			//自动全选
			if(_tbody.find("input").length==_tbody.find("input:checked").length){
				$(selAll).prop("checked",true);
			}else{
				$(selAll).prop("checked",false);
			}
		});
	},
	/*移动另一端
	  * @ele:操作源；
	  * @scope:范围;
	  * @hideValue:存放隐藏值;
	  * @appendTo:添加位置;
	  * 
	*/
	toAside:function(ele,scope,hideValue,appendTo){
		var _arr=[];
		$("div.transfer").on("click",ele,function(){
			//恢复全选状态
			$("input[class^='selectAll']").prop("checked",false);
			//遍历添加，删除，赋值
			$(scope).each(function(index,cur){
				var _chkTr=$(cur).parents("tr");
				$(cur).prop("checked",false);
				$(appendTo).append(_chkTr.clone());
				_arr.push($(cur).data("index"));
				_chkTr.remove();
				$(cur).parents("tr").remove(); 
			});
			$(hideValue).val(_arr);
		});
	},
	myalert:function(msg){
		alert(msg);
	}
}