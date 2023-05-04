### 【招聘管理】
create or replace table recruit
(
    id          int auto_increment primary key,
    pid         int          not null comment '岗位编号',
    wage        varchar(64)  not null comment '工资',
    details     varchar(256) not null comment '待遇详情',
    request     varchar(256) not null comment '工作要求',
    content     varchar(256) null comment '工作内容',
    contact     varchar(128) null comment '联系方式',
    num         int          not null default 0 comment '招聘人数',
    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint recruit_id_uindex
        unique (id),
    constraint recruit_post_id_fk_c
        foreign key (pid) references post (id),
    constraint recruit_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint recruit_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '招聘信息表';
INSERT INTO hr.recruit(pid, wage, details, request, content, contact, num, create_by, create_time, update_by,
                       update_time)
VALUES (3, '8~13K',
        '薪资范围：8000-13000元/月<br/>
        底薪：5000元/月<br/>
        社保类型：六险一金<br/>
        提成方式：销售额提成；<br/>
        奖金补贴：餐补，绩效奖金',
        '1、3年以上互联网产品交互设计经验，成熟的交互方法论、数据观察能力和一定的产品能力；<br/>
        2、统招本科以上学历，交互、设计、心理学相关专业；<br/>
        3、有独立思考能力，能独立输出产品交互原型，关注产品体验；<br/>
        4、有用户研究能力优先。',
        '1、参与BOSS直聘店长直聘、看准等各产品线的产品需求构思和梳理，能分析出用户的核心诉求和用户目标；<br/>
        2、能够独立设计产品的结构、功能、界面、操作流程等，输出完整的交互设计原型，能对产品方案进行可用性测试和分析，并提出改进方案；<br/>
        3、跟踪产品开发各环节（产品、UI、开发），并推动设计方案落实；<br/>
        4、制定并输出相关设计规范，和设计师默契配合，并推进落地。',
        '电话:111110000',
        1, 3, '2022-01-01 00:00:00', 3, '2022-01-01 00:00:00');
INSERT INTO hr.recruit(pid, wage, details, request, content, contact, num, create_by, create_time, update_by,
                       update_time)
VALUES (4, '10~13K',
        '薪资范围：10000-13000元/月<br/>
        社保类型：六险一金<br/>
        提成方式：销售额提成；<br/>
        奖金补贴：餐补，绩效奖金',
        '1、在AI基础平台团队，负责分布式训练框架研发，服务于公司核心业务(包括搜索推荐/NLP/CV/语音等业务方向)。<br/>
        2、对平台上大规模稀疏模型、CV/NLP/语音模型训练进行性能优化，改善模型训练效率，充分挖掘硬件特性。<br/>
        3、紧跟业内前沿，持续优化框架。',
        '- 精通C++/Python，有良好的数据结构和算法基础，熟悉CUDA编程。<br/>
        - 具备丰富的模型训练加速经验，熟悉多种训练框架、分布式训练方案(Pytorch/TF，PS/AllReduce、DP/MP)，有实际落地经验。<br/>
        - 了解深度学习常用模型和算法，有大规模稀疏模型、预训练模型训练优化经验优先。<br/>
        - 有容器、K8S等云原生技术实践者优先。',
        '电话:111110000',
        2, 3, '2022-01-01 00:00:00', 3, '2022-01-01 00:00:00');
INSERT INTO hr.recruit(pid, wage, details, request, content, contact, num, create_by, create_time, update_by,
                       update_time)
VALUES (3, '8~13K',
        '薪资范围：8000-13000元/月<br/>
        底薪：5000元/月<br/>
        社保类型：六险一金<br/>
        提成方式：销售额提成；<br/>
        奖金补贴：餐补，绩效奖金',
        '1、本科（全日制）及以上学历，1 年以上工作经验，有同行业经验优先<br/>
        2、做过电销、具备 B 端销售经验<br/>
        3、有活力，愿意扎根互联网行业，对人力资源行业有热情<br/>
        4、具备优秀的沟通能力和较强的学习能力，抗压，不玻璃心<br/>
        5、高效、积极、勤奋、爱分享<br/>
        6、热爱销售工作，进取心、责任心强，有强烈成功欲望和抗压能力',
        '1、本科（全日制）及以上学历，1 年以上工作经验，有同行业经验优先<br/>
        2、做过电销、具备 B 端销售经验<br/>
        3、有活力，愿意扎根互联网行业，对人力资源行业有热情<br/>
        4、具备优秀的沟通能力和较强的学习能力，抗压，不玻璃心<br/>
        5、高效、积极、勤奋、爱分享<br/>
        6、热爱销售工作，进取心、责任心强，有强烈成功欲望和抗压能力',
        '电话:111110000',
        0, 3, '2022-01-01 00:00:00', 3, '2022-01-01 00:00:00');