/*赋值测试代码，仅供演示使用 
 * */
//提示消息
$('#btn1').click(function() {
	layer.msg('卫宁健康欢迎你');
});
//弹出一个页面层
$('#btn2').on('click', function() {
	layer.open({
		type: 1,
		area: ['600px', '360px'],
		shadeClose: true, //点击遮罩关闭
		content: '\<div style="padding:20px;">我的弹窗，我做主\<\/div>'
	});
});
//弹出一个tips层
$('#btn3').on('click', function() {
	layer.tips('Hello tips!', '#btn3');
});
//加载层
$('#btn4').on('click', function() {
	var ii = layer.load();
	//此处用setTimeout演示ajax的回调
	setTimeout(function() {
		layer.close(ii);
	}, 1000);
});
//询问框
$('#btn5').on('click', function() {
	layer.confirm('想休息吗', {
		btn: ['重要', '奇葩']
	}, function() {
		layer.msg('的确很重要', {
			icon: 1
		});
	}, function() {
		layer.msg('也可以这样', {
			time: 20000, //20s后自动关闭
			btn: ['明白了', '知道了']
		});
	});
});
//自定义
$('#btn6').on('click', function() {
	layer.open({
		type: 1,
		skin: 'my',
		closeBtn: 1,
		shift: 2,
		shadeClose: true,
		content: '<div style="padding:20px;">我是自定义，添加属于你的内容了。<br>你怎么样给她整容都行<br><br><br>我是华丽的酱油==。</div>',
		title: '我是标题'
	});
});
//Loading
$('#btn7').on('click', function() {
	layer.load(1, {
		shade: false,
		time: 1000
	});
});
//小tips
$('#btn8').on('click', function() {
	layer.tips('模拟元素的属性', '#btn8', {
		tips: [1, '#3595CC'],
		time: 4000
	});
});

//prompt层
$('#btn9').on('click', function() {
	layer.prompt({
		title: '输入任何口令，并确认',
		formType: 1 //prompt风格，支持0-2
	}, function(pass) {
		layer.prompt({
			title: '随便写点啥，并确认',
			formType: 2
		}, function(text) {
			layer.msg('演示完毕！您的口令：' + pass + ' 您最后写下了：' + text);
		});
	});
});
//Tab
$('#btn10').on('click', function() {
	layer.tab({
		area: ['600px', '300px'],
		tab: [{
			title: 'TAB1',
			content: '内容1'
		}, {
			title: 'TAB2',
			content: '内容2'
		}, {
			title: 'TAB3',
			content: '内容3'
		}]
	});
});
//msg
$('#btn11').on('click', function() {
	layer.msg('你确定你很帅么？', {
		time: 0 //不自动关闭
			,
		btn: ['必须啊', '丑到爆'],
		yes: function(index) {
			layer.close(index);
			layer.msg('卫宁健康', {
				icon: 6,
				btn: ['开始', '取消', '确定']
			});
		}
	});
});
//抖一下
$('#btn12').on('click', function() {
	layer.msg('扭一下', function() {
		//关闭后的操作
	});
});