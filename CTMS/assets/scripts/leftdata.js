function leftInit() {
    var menuHtml ='<div style="width:195px;float:left">'
    +'<a class="navbar-brand" href="index.html">'
    +'<img src="assets/img/logo.png" alt="logo" class="img-responsive pull-left margin-top-5" />'
    +'</a></div>'
    +'<div class="sidebar-toggler hidden-phone none-bg relative">'
    +'<i class="iconfont icon-list"></i></div>'
    +'<a href="javascript:;" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
    +'<img src="assets/img/menu-toggler.png" alt="" />'
    +'</a>' 
    + '<ul id="topmenu" class="nav navbar-nav nav-menu topmeau"><li><a href="制度管理.html" id="a1" >制度管理</a></li>' 
    + '<li><a href="项目基本信息.html" id="a2" >项目管理</a></li>' 
    + '<li><a href="专业组-药物机构质控表.html" id="a3" >质量管理</a></li>' 
    + '<li><a href="基本信息维护.html" id="a4" >药物管理</a></li>' 
    + '<li><a href="档案管理.html" id="a5" >档案管理</a></li>' 
    + '<li><a href="院内人员信息.html" id="a6" >人员管理</a></li>' 
    + '<li><a href="系统消息.html" id="a7" >系统管理</a></li>'
    +'</ul>'
    + '<ul id="msgbox" class="nav navbar-nav pull-right">'
    + '<li class="dropdown" id="header_inbox_bar"><a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">' 
    + '<i class="iconfont icon-msg font-20"></i><span class="badge">6</span> </a>' 
    + '<ul class="dropdown-menu extended inbox">' 
    + '<li>' 
    + '<ul class="dropdown-menu-list scroller" style="height: 250px;">' 
    + '<li><a data-toggle="modal" data-target="#myModal"><span class="subject"><span class="new"></span> <span class="from">新消息名称</span></span><span class="message">请确认一下最新会议日程...</span></a></li>' 
    + '<li><a data-toggle="modal" data-target="#myModal"><span class="subject"><span class="readed"></span><span class="from">新消息名称</span></span><span class="message">请确认一下最新会议日程...</span></a></li>' 
    + '<li><a data-toggle="modal" data-target="#myModal"><span class="subject"><span class="readed"></span><span class="from">新消息名称</span></span><span class="message">请确认一下最新会议日程...</span></a></li>' 
    + '<li><a data-toggle="modal" data-target="#myModal"><span class="subject"><span class="readed"></span><span class="from">新消息名称</span></span><span class="message">请确认一下最新会议日程...</span></a></li>' 
    + '</ul>' 
    + '<li><p class="margin-top-10">您有<span style="color:#4b91ea;">6</span>条未读消息</p><p style="color:#4b91ea;">查看全部消息</p></li>' 
    + '</ul></li>' 
    + '<li class="dropdown user" ><a onclick="$(' + "'#offsidebar'" + ').toggleClass(' + "'closed'" 
    + ');" class="dropdown-toggle"><em class="user-icon"></em></a></li></ul>';
    var rightHtml = '<nav><div role="tabpanel"><div class="tab-content"><div id="app-settings" role="tabpanel">' 
    + ' <div class="tab-title"> 用户</div>' + ' <div class="user-info">' 
    + ' <span class="userinfobox username">王铁蛋</span> <span class="userinfobox userposition">主任医师 教授</span>' 
    + ' <span class="usericonbox">' 
    + '<a class="userbox-revise" data-toggle="modal" href="#revise"></a>' 
    + '<a class="userbox-exit margin-left-45" data-toggle="modal" href="#exit"></a>' 
    + '</span></div>' 
    + '<div id="accordion2">' 
    + '<div id="panelbox" class="panel">' 
    + '<div class="tab-title">皮肤</div>' 
    + '<div class="theme-panel">' 
    + '<div class="theme-options">' 
    + ' <div class="theme-option theme-colors clearfix">' 
    + '<ul>' 
    + '<li data-style="default-head">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-blue"></div>' 
    + '<div class="themebox-right tcorlor-bluesp"></div>' 
    + '<div class="themebox-bottom tcorlor-white"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="blue-head">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-wathet"></div>' 
    + '<div class="themebox-right tcorlor-wathetsp"></div>' 
    + '<div class="themebox-bottom tcorlor-white"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="green-head">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-green"></div>' 
    + '<div class="themebox-right tcorlor-greensp"></div>' 
    + '<div class="themebox-bottom tcorlor-white"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="purple-head">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-purple"></div>' 
    + '<div class="themebox-right tcorlor-purplesp"></div>' 
    + '<div class="themebox-bottom tcorlor-white"></div>' 
    + '</div>' 
    + '</li></ul>'
    + '<ul class="margin-top-20">' 
    + '<li data-style="default">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-blue"></div>' 
    + '<div class="themebox-right tcorlor-bluesp"></div>' 
    + '<div class="themebox-bottom tcorlor-black"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="blue">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-wathet"></div>' 
    + '<div class="themebox-right tcorlor-wathetsp"></div>' 
    + '<div class="themebox-bottom tcorlor-black"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="green">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-green"></div>' 
    + '<div class="themebox-right tcorlor-greensp"></div>' 
    + '<div class="themebox-bottom tcorlor-black"></div>' 
    + '</div>' 
    + '</li>' 
    + '<li data-style="purple">' 
    + '<div class="themebox">' 
    + '<div class="themebox-left tcorlor-purple"></div>' 
    + '<div class="themebox-right tcorlor-purplesp"></div>' 
    + '<div class="themebox-bottom tcorlor-black"></div>' 
    + '</div>'
    + '</li></ul>' 
    + '</div>' 
    + '<div class="theme-option"><span>盒子布局</span><input type="checkbox" class="ch_t" id="ch1"/><label class="ch_label" for="ch1"></label></div>' 
    + '<div class="theme-option"><span>头部悬浮</span><input type="checkbox" class="ch_t" id="ch2"/><label class="ch_label" for="ch2"></label></div>' 
    + ' <div class="theme-option"><span>工具栏悬浮</span><input type="checkbox" class="ch_t" id="ch3"/><label class="ch_label" for="ch3"></label></div>' 
    + '<div class="theme-option"><span>底部悬浮</span><input type="checkbox" class="ch_t" id="ch4"/><label class="ch_label" for="ch4"></label></div>' 
    + '</div> </div></div></div></div></div></div>' 
    + '</nav>';
    var secHtml = '<div class="form-group has-feedback pull-width">' + '<input type="text" placeholder="请输入搜索内容后按下回车 ..." style="height:60px; border-bottom:1px solid #e0e0e0 !important;" class="form-control searchbox pull-height pull-width">' + '<div onclick="$(' + "'#searchDiv'" + ').toggleClass(' + "'searchShow'" + ');" class="fa fa-times form-control-feedback"></div>' + ' </div><button type="submit" class="hidden btn btn-default">提交</button>';
    //质量管理左菜单
    var qualityleftHtml = '<ul class="page-sidebar-menu">' + '<li>' + '<a href="javascript:;"><i class="iconfont icon-lxys"></i> <span class="title">质量管理</span><span class="arrow "></span></a>' + '<ul class="sub-menu" >' + '<li><a href="专业组-药物机构质控表.html">专业组-药物机构质控表</a></li>' + '<li><a href="秘书质控表.html">秘书质控表 </a></li>' + '<li><a href="不良事件管理.html">不良事件管理</a></li>' + '<li><a href="项目流程确认单.html">项目流程确认单</a></li>' + '<li><a href="临床质控表.html">临床质控表</a></li>' + '<li><a href="质控核查纪录表.html">质控核查纪录表</a></li>' + '<li><a href="监察反馈.html">监察反馈</a></li>' + '<li><a href="质控表单模板管理.html">质控表单模板管理</a></li></ul>' + '</li></ul>';
    //人员管理左菜单
    var memberleftHtml = '<ul class="page-sidebar-menu">' + '<li>' + '<a href="javascript:;"><i class="iconfont icon-lxysp"></i> <span class="title">人员管理</span><span class="arrow "></span></a>' + '<ul class="sub-menu" >' + '<li><a href="院内人员信息.html">院内人员信息 </a></li>' + '<li><a href="申办人员信息.html">申办人员信息 </a></li>' + '<li><a href="受试者信息.html">受试者信息</a></li></ul>' + '</li></ul>'
    //药物管理左菜单       
    var medicineleftHtml = '<ul class="page-sidebar-menu">' + '<li>' + '<a href="javascript:;"><i class="iconfont icon-lxysp"></i> <span class="title">药物管理</span><span class="arrow "></span></a>' + '<ul class="sub-menu" >' + '<li><a href="基本信息维护.html">基本信息维护 </a></li>' + '<li><a href="验收入库.html">验收入库 </a></li>' + '<li><a href="发药.html">发药 </a></li>' + '<li><a href="药物回收.html">药物回收(厂商) </a></li>' + '<li><a href="药物退还.html">药物退还(机构) </a></li>' + '<li><a href="药物有效期提醒.html">药物有效期提醒 </a></li>' + '<li><a href="药库库存.html">药库库存</a></li></ul>' + '</li></ul>';
    //系统管理左菜单
    var sysleftHtml = '<ul class="page-sidebar-menu">' + '<li>' + '<a href="javascript:;"><i class="iconfont icon-lxysp"></i> <span class="title">系统管理</span><span class="arrow"></span></a>' + '<ul class="sub-menu" >' + '<li><a href="系统消息.html">系统消息 </a></li>' + '<li><a href="系统通知.html">系统通知 </a></li>' + '<li><a href="用户管理.html">用户管理 </a></li>' + '<li><a href="用户组管理.html">用户组管理 </a></li>' + '<li><a href="角色管理.html">角色管理 </a></li>' + '<li><a href="权限管理.html">权限管理 </a></li>' + '<li><a href="数据字典.html">数据字典 </a></li>' + '<li><a href="操作日志管理.html">操作日志管理</a></li></ul>' + '</li></ul>';
    //项目管理左菜单
    var leftmenuHtml = '<ul class="page-sidebar-menu">' 
    + '<li>' 
    + '<a href="javascript:;"><i class="iconfont icon-lxys"></i> <span class="title">立项与审批</span><span class="arrow"></span></a>' 
    + '<ul class="sub-menu">' 
    + '<li><a href="项目基本信息.html">项目基本信息 </a></li>' 
    + '<li><a href="项目人员信息.html">项目人员信息 </a></li>' 
    + '<li><a href="项目研究阶段.html">项目研究阶段 </a></li>' 
    + '<li><a href="研究阶段详细信息.html">研究阶段详细信息 </a></li>'
    + '<li><a href="研究进展报告.html">研究进展报告</a></li>' 
    + '<li><a href="立项初审申请.html">立项初审申请 </a></li>' 
    + '<li><a href="立项复审申请.html">立项复审申请 </a></li>' 
    + '<li><a href="立项修改申请.html">立项修改申请 </a></li>' 
    + '<li><a href="伦理审查信息查询.html">伦理审查信息查询 </a></li>'
    + '<li><a href="伦理批件有效期提醒.html">伦理批件有效期提醒 </a></li>' 
    + '<li><a href="立项审查汇总查询.html">立项审查汇总查询 </a></li></ul>' 
    + '</li>'
    + '<li>' 
    + '<a href="javascript:;"><i class="iconfont icon-syqz"></i><span class="title">试验前准备</span><span class="arrow"></span></a>' 
    + '<ul class="sub-menu">' 
    + '<li><a href="CRA管理.html">CRA管理 </a></li>' 
    + '<li><a href="CRC管理.html">CRC管理 </a></li>' 
    + '<li><a href="合同管理.html">合同管理 </a></li>' 
    + '<li><a href="物资交接.html">物资交接 </a></li>' 
    + '<li><a href="项目资料交接.html">项目资料交接 </a></li></ul>' 
    + '</li>'
    + '<li>' 
    + '<a href="javascript:;"><i class="iconfont icon-syjh"></i></i> <span class="title">试验计划实施</span><span class="arrow"></span></a>' 
    + '<ul class="sub-menu">' 
    + '<li><a href="受试者管理.html">受试者管理 </a></li>'
    + '<li><a href="受试者信息查询.html">受试者信息查询</a></li>'
    + '<li><a href="项目计划实施-药物.html">项目计划实施 </a></li>' 
    + '<li><a href="项目终止申请.html">项目终止申请 </a></li></ul>' 
    + '</li>'
    + '<li>' 
    + '<a href="javascript:;"><i class="iconfont icon-syjt"></i><span class="title">试验结题</span><span class="arrow"></span></a>' 
    + '<ul class="sub-menu">' 
    + '<li><a href="项目生命周期信息.html">项目生命周期信息 </a></li></ul>' 
    + '</li></ul>';
    var reviseHtml = '<div class="modal-dialog revisedialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>' + '<h4 class="modal-title">密码变更</h4>' + '</div>' + '<div class="modal-body revisebody">' + '<div class="row">' + '<div class="col-md-3 reviselable textalign-r">当前密码</div>' + '<div class="col-md-9 reviselable">' + ' <input class="form-control reviseinput" placeholder="请输出原密码" type="text">' + '</div>' + '<div class="col-md-3 reviselable textalign-r">新密码</div>' + '<div class="col-md-9 reviselable">' + '<input class="form-control reviseinput" placeholder="请输出新密码" type="text">' + '</div>' + '<div class="col-md-3 reviselable textalign-r">确认密码</div>' + ' <div class="col-md-9 reviselable">' + ' <input class="form-control reviseinput" placeholder="请确认新密码" type="text">' + ' </div></div></div>' + ' <div class="modal-footer revisefooter">' + ' <button class="btn btn-primary margin-left-10">确认</button>' + ' <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' + ' </div> </div></div></div>';
    var exitHtml = ' <div class="modal-dialog exitdialog">' + '<div class="modal-content exitcontent">' + ' <div class="exitrow margin-top-20"><p>是否注销当前用户？</p></div>' + ' <div class="exitbtn">' + ' <i class="fa fa-check exitbtn-y" data-dismiss="modal"></i>' + ' <i class="fa fa-times exitbtn-n" data-dismiss="modal"></i>' + ' </div></div>';
    var msgHtml = '<div class="modal-dialog modal-wide wp70">' + '<div class="modal-content" >' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + '<h4 class="modal-title" id="myModalLabel">我的消息</h4></div>' + ' <div class="modal-body pop-window" style="min-height:500px;">' + ' <ul class="left" id="msg-tab">' + ' <li data-key="writ" class="active"><a href="#"><i class="fa fa-pencil margin-right-10"></i>写邮件</a></li>' + '  <li data-key="rece"><a href="#"> <i class="fa fa-envelope margin-right-10"></i>收件箱</a></li>' + ' <li><a href="#"> <i class="fa fa-external-link margin-right-10"></i>已发送</a></li>' + '  <li><a href="#"> <i class="fa fa-trash-o margin-right-10"></i>已删除</a></li>' + '  <li><a href="#"> <i class="fa fa-file-o margin-right-10"></i>草稿箱</a></li>' + '  <li><a href="#"> <i class="fa fa-briefcase margin-right-10"></i>已归档</a></li></ul>' + '  <div class="right">' + ' <div class="writ-msg">' + ' <div class="msg-head margin-bottom-20">' + ' <button type="button" class="btn btn-primary btn-sm margin-left-10">' + ' <i class="fa fa-external-link margin-right-10"></i><span>发送</span></button>' + ' <button type="button" class="btn btn-default btn-sm margin-left-5">' + ' <i class="fa fa-save margin-right-10"></i><span>保存草稿</span></button>' + ' <button type="button" class="btn btn-default btn-sm margin-left-5"><i class="fa fa-times-circle margin-right-10"></i><span>取消</span></button>' + ' </div>' + ' <div class="form-group">' + ' <label class="col-sm-2 control-label">收件人</label>' + ' <div class="col-sm-10"> <input class="form-control form-control-rounded input-xlarge" type="text" /></div></div>' + '  <div class="form-group"> <label class="col-sm-2 control-label">主题</label> <div class="col-sm-10">' + '   <input class="form-control form-control-rounded input-xlarge" type="text" /></div></div>' + '<div class="add-file"> <a href="#"><i class="fa fa-chain margin-right-10"></i>添加附件</a></div>' + '  <div class="word-edit">' + ' <textarea class="ckeditor form-control" name="editor2" rows="6" data-error-container="#editor2_error"></textarea>' + ' <div id="editor2_error"></div>' + '</div></div>' + '  <div class="rece-msg hide">' + '  <div class="msg-head">' + '  <button type="button" class="btn btn-default btn-sm margin-left-10"><i class="fa fa-trash-o margin-right-10"></i><span>删除</span></button>' + ' </div>' + ' <div class="rece-body">' + ' <div class="rece-body-left">' + ' <div class="panel-group accordion" id="accordion1">' + ' <div class="panel panel-default no-radius noborder-l noborder-r">' + ' <div class="panel-heading textalign-c" data-toggle="collapse" data-parent="#accordion1" href="#collapse_1">' + ' <h4 class="panel-title"> <a class="accordion-toggle">今天</a></h4></div>' + ' <div id="collapse_1" class="panel-collapse in" style="height: auto;">' + ' <div class="panel-body">' + ' <div class="pull-left margin-right-10"> <input type="checkbox"> </div>' + ' <div class="pull-left margin-right-10" style="min-width:150px">' + ' <div class="font-14" style="color:#666;">关于药品审查流程的相关通知</div>' + ' <div  style="color:#ccc; margin-top:5px;">发件人：张卫东</div> </div>' + ' <div class="pull-right margin-right-10" style="color:#ccc;">09-26 17:30</div>' + ' </div></div></div>' + '  <div class="panel panel-default no-radius noborder-l noborder-r">' + '  <div class="panel-heading textalign-c"  data-toggle="collapse" data-parent="#accordion1" href="#collapse_2">' + ' <h4 class="panel-title"> <a class="accordion-toggle collapsed">昨天</a> </h4></div>' + '  <div id="collapse_2" class="panel-collapse collapse" style="height: 0px;">' + '  <div class="panel-body">' + ' <div class="pull-left margin-right-10"><input type="checkbox"> </div>' + ' <div class="pull-left margin-right-10" style="min-width:150px">' + '  <div class="font-14" style="color:#666;">关于药品审查流程的相关通知</div>' + ' <div  style="color:#ccc; margin-top:5px;">发件人：张卫东</div>' + '  <div class="pull-right margin-right-10" style="color:#ccc;">09-26 17:30</div>' + ' </div> </div> </div>' + '  <div class="panel panel-default no-radius noborder-l noborder-r">' + '  <div class="panel-heading textalign-c" data-toggle="collapse" data-parent="#accordion1" href="#collapse_3">' + ' <h4 class="panel-title"><a class="accordion-toggle collapsed">更久</a></h4>' + ' </div>' + '<div id="collapse_3" class="panel-collapse collapse" style="height: 0px;">' + '  <div class="panel-body">' + ' <div class="pull-left margin-right-10"><input type="checkbox"> </div>' + ' <div class="pull-left margin-right-10" style="min-width:150px">' + '  <div class="font-14" style="color:#666;">关于药品审查流程的相关通知</div>' + ' <div  style="color:#ccc; margin-top:5px;">发件人：张卫东</div>' + '  <div class="pull-right margin-right-10" style="color:#ccc;">09-26 17:30</div>' + ' </div>' + ' </div> </div> </div></div></div></div>' + '<div class="rece-body-right">' + '<div class="section1">' + '  <strong>药品审查流程通知</strong> <time>2016-09-26 16:27</time>' + '  <div class="section2">' + '  <p>人民网9月30日电 据台湾《联合报》报道，大陆“十一”长假即将到来，不过陆客来台数量恐将腰斩。陆委会昨（29）日表示，9月截至25日，陆客入境总人数比去年同期，其中团客减少65.4%，创单月最大减幅。</p>' + '  <p>邱垂正指出，若以520至9月25日计算，陆客入境人数减少27.2%，其中团客减少44%，自由行减少0.3%，台当局将持续努力打造优质、安全、友善的旅游环境，也持续欢迎陆客来台。邱垂正指出，若以520至9月25、友善的旅游环境，也持续欢迎陆客来台。</p>' + '  <p>邱垂正指出，若以520至9月25日计算，陆客入境人数减少27.2%，其中团客减少44%，自由行减少0.3%，台当局将持续努力打造优质、安全、友善的旅游环境，也持续欢迎陆客来台。邱垂正指出，若以520至9月25、友善的旅游环境，也持续欢迎陆客来台。</p>' + '  <p>邱垂正指出，若以520至9月25日计算，陆客入境人数减少27.2%，其中团客减少44%，自由行减少0.3%，台当局将持续努力打造优质、安全、友善的旅游环境，也持续欢迎陆客来台。邱垂正指出，若以520至9月25、友善的旅游环境，也持续欢迎陆客来台。</p>' + '  <p>邱垂正指出，若以520至9月25日计算，陆客入境人数减少27.2%，其中团客减少44%，自由行减少0.3%，台当局将持续努力打造优质、安全、友善的旅游环境，也持续欢迎陆客来台。邱垂正指出，若以520至9月25、友善的旅游环境，也持续欢迎陆客来台。</p>' + ' </div>' + ' </div></div></div></div></div></div></div>';

    $('#topmenu').html(menuHtml);
    $('#leftmenu').html(leftmenuHtml); //项目管理
    $('#qualitymenu').html(qualityleftHtml); //质量管理
    $('#medicinemenu').html(medicineleftHtml); //药物管理
    $('#membermenu').html(memberleftHtml); //人员管理
    $('#sysmenu').html(sysleftHtml); //系统管理
    $('#offsidebar').html(rightHtml);
    $('#revise').html(reviseHtml);
    $('#exit').html(exitHtml);
    $('#myModal').html(msgHtml);532511299

    /*user manage menu*/
    //$('#ummenu').html(ummHtml);
}
