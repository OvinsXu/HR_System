#设计表
SET foreign_key_checks = 0;

create or replace table department
(
    id          int auto_increment
        primary key,
    did         int              null comment '父级部门',
    uid         int              not null comment '部门主任',

    name        varchar(64)      not null comment '部门名称',
    status      char default 'Y' not null comment '部门状态',

    create_by   int              not null comment '创建者',
    create_time datetime         not null comment '创建时间',
    update_by   int              not null comment '更改者',
    update_time datetime         not null comment '更改时间',

    constraint department_id_uindex
        unique (id),
    constraint department_name_uindex
        unique (name),

    constraint department_check_status
        check (`status` = 'Y' OR `status` = 'N' OR status = 'D'),

    constraint department_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint department_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '部门表';

create or replace table login_log
(
    id       int auto_increment
        primary key,
    username varchar(64) not null comment '账号',
    ipaddr   varchar(64) null comment '登录IP',
    location varchar(64) not null comment 'IP定位',
    browser  varchar(64) not null comment '浏览器',
    os       varchar(64) not null comment '操作系统',
    status   char        not null comment '登录状态',
    time     datetime    not null comment '登录时间',
    constraint login_log_id_uindex
        unique (id)
)
    comment '登录登记表';



create or replace table wage
(
    id           int auto_increment
        primary key,
    department   varchar(64)  not null comment '部门',
    truename     varchar(64)  not null comment '姓名',
    id_card      varchar(64)  null comment '身份证号码',

    base         int unsigned not null comment '基本工资' default 0,
    bonus        int unsigned not null comment '奖金'   default 0,
    pre_tax      int unsigned not null comment '税前工资' default 0,
    post_tax     int unsigned not null comment '税后工资' default 0,

    bonus_detail text comment '奖金详情',

    year         int unsigned not null comment '发放年份',
    month        int unsigned not null comment '发放月份',

    constraint wage_id_uindex
        unique (id)
)
    comment '工资记录表';

create or replace table operate_log
(
    id     int auto_increment
        primary key,
    uid    int         not null comment '用户编号',
    title  varchar(64) not null comment '模块标题',
    type   varchar(64) not null comment '操作类型',
    method varchar(64) not null comment '方法名称',
    param  varchar(64) null comment '操作参数',
    status char        not null comment '操作状态',
    time   datetime    not null comment '登录时间',
    constraint operate_log_id_uindex
        unique (id),
    constraint operate_log_user_id_fk
        foreign key (uid) references department (id)
)
    comment '操作日志表';

create or replace table notice
(
    id          int auto_increment
        primary key,

    title       varchar(64) not null comment '标题',
    content     text        not null comment '内容',
    status      char(1)     not null comment '状态' default 'Y',

    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',
    constraint notice_id_uindex
        unique (id),
    constraint notice_check_status
        check ( status = 'Y' OR status = 'D' ),
    constraint notice_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint notice_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '公告表';


create or replace table train
(
    id          int auto_increment
        primary key,

    title       varchar(64) not null comment '培训标题',
    brief       text        not null comment '培训简介',
    content     text        null comment '培训内容',

    sum         int         not null              default 0 comment '培训人数',

    begin_time  datetime    not null comment '开始时间',
    end_time    datetime    not null comment '结束时间',

    status      char(1)     not null comment '状态' default 'T',

    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',

    constraint train_id_uindex
        unique (id),
    constraint train_check_status
        check ( status = 'T' OR status = 'P' OR status = 'J' OR status = 'W' OR status = 'D'),
    constraint train_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint train_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '培训表';


# create or replace table train
# (
#     id          int auto_increment
#         primary key,
#
#     title       varchar(64) not null comment '培训标题',
#     brief       text        not null comment '培训简介',
#     content     text        null comment '培训内容',
#
#     status      char(1)     not null comment '状态' default 'T',
#
#     create_by   int         not null comment '创建者',
#     create_time datetime    not null comment '创建时间',
#     update_by   int         not null comment '更改者',
#     update_time datetime    not null comment '更改时间',
#
#     constraint train_id_uindex
#         unique (id),
#     constraint train_check_status
#         check ( status = 'T' OR status = 'P' OR status = 'J' OR status = 'W' OR status = 'D'),
#     constraint train_user_id_fk_c
#         foreign key (create_by) references user (id),
#     constraint train_user_id_fk_u
#         foreign key (update_by) references user (id)
# )
#     comment '培训表';

# create or replace table train_user
# (
#     id          int auto_increment
#         primary key,
#     uid         int      not null comment '用户编号',
#     tid         int      not null comment '培训计划编号',
#
#     status      char(1)  not null comment '状态' default 'S',
#
#     create_by   int      not null comment '创建者',
#     create_time datetime not null comment '创建时间',
#     update_by   int      not null comment '更改者',
#     update_time datetime not null comment '更改时间',
#
#     constraint train_user_id_uindex
#         unique (id),
#     constraint train_user_check_status
#         check ( status = 'T' OR status = 'S' ),
#     constraint train_user_user_id_fk_c
#         foreign key (create_by) references user (id),
#     constraint train_user_user_id_fk_u
#         foreign key (update_by) references user (id)
# )
#     comment '培训人员表';
#
# create or replace table train_log
# (
#     id          int auto_increment
#         primary key,
#     tuid        int         not null comment '培训用户编号',
#
#
#     title       varchar(64) not null comment '记录标题',
#     content     text        not null comment '记录内容',
#
#     create_by   int         not null comment '创建者',
#     create_time datetime    not null comment '创建时间',
#     update_by   int         not null comment '更改者',
#     update_time datetime    not null comment '更改时间',
#
#     constraint train_log_id_uindex
#         unique (id),
#
#     constraint train_log_user_id_fk_c
#         foreign key (create_by) references user (id),
#     constraint train_log_user_id_fk_u
#         foreign key (update_by) references user (id)
# )
#     comment '培训记录表';

create or replace table role
(
    id          int auto_increment
        primary key,


    code        varchar(64) not null comment '角色编号',
    name        varchar(64) not null comment '角色名称',

    status      char        not null comment '角色状态' default 'Y',

    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',

    constraint role_id_uindex
        unique (id),
    constraint role_code_uindex
        unique (code),
    constraint role_name_uindex
        unique (name),
    constraint role_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),

    constraint role_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint role_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '角色表';

create or replace table user_role
(
    id          int auto_increment
        primary key,
    uid         int      not null comment '用户编号',
    rid         int      not null comment '角色编号',

    status      char     not null comment '关联状态' default 'Y',

    create_by   int      not null comment '创建者',
    create_time datetime not null comment '创建时间',
    update_by   int      not null comment '更改者',
    update_time datetime not null comment '更改时间',

    constraint user_role_id_uindex
        unique (id),

    constraint user_role_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),

    constraint user_role_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint user_role_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '用户角色表';

# create or replace table api
# (
#     id     int auto_increment
#         primary key,
#
#
#     url    varchar(64) not null comment '接口路径',
#
#     method varchar(8)  not null comment '访问方式',
#
#     constraint api_id_uindex
#         unique (id),
#     constraint api_check_method
#         check (method = 'GET' OR method = 'POST' OR method = 'PUT' OR method = 'DELETE')
# )
#     comment '接口表';


# create or replace table role_api
# (
#     id          int auto_increment
#         primary key,
#
#     rid         int      not null comment '角色编号',
#     aid         int      not null comment '接口编号',
#
#     status      char     not null comment '关联状态' default 'Y',
#
#     create_by   int      not null comment '创建者',
#     create_time datetime not null comment '创建时间',
#     update_by   int      not null comment '更改者',
#     update_time datetime not null comment '更改时间',
#
#     constraint role_api_id_uindex
#         unique (id),
#
#     constraint role_api_check_status
#         check (status = 'Y' OR status = 'N' OR status = 'D'),
#
#     constraint role_api_role_id_fk
#         foreign key (aid) references api (id),
#
#     constraint role_api_user_id_fk_c
#         foreign key (create_by) references user (id),
#     constraint role_api_user_id_fk_u
#         foreign key (update_by) references user (id)
# )
#     comment '角色接口(授权)表';


create or replace table post
(
    id          int auto_increment
        primary key,
    did         int         null comment '所属部门',

    code        varchar(64) not null comment '岗位编号',
    name        varchar(64) not null comment '岗位名称',

    status      char        not null comment '部门状态' default 'Y',
    recruit     int         not null comment '招聘人数' default 0,

    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',

    constraint post_id_uindex
        unique (id),
    constraint post_code_uindex
        unique (code),
    constraint post_name_uindex
        unique (name),
    constraint post_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),
    constraint post_department_id_fk
        foreign key (did) references department (id)
            on delete set null,
    constraint post_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint post_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '部门表';

create or replace table user
(
    id           int auto_increment
        primary key,
    pid          int(64)          null comment '岗位编号',
    username     varchar(64)      not null comment '账号',
    password     varchar(64)      not null comment '密码',
    status       char default 'Z' not null comment '用户状态',
    cash         char default 'C' not null comment '工资结算方式',
    avatar       int              null comment '头像(fid)',
    truename     varchar(64)      not null comment '姓名',
    sex          char default 'M' not null comment '性别',
    age          int unsigned     not null comment '年龄',
    native_place varchar(64)      not null comment '籍贯',
    address      varchar(64)      not null comment '住址',
    phone        varchar(16)      not null comment '手机号码',
    email        varchar(64)      not null comment '电子邮箱',
    card         varchar(64)      not null comment '银行卡号',
    id_card      varchar(64)      not null comment '身份证号',
    create_by    int              not null comment '创建者',
    create_time  datetime         not null comment '创建时间',
    update_by    int              not null comment '更改者',
    update_time  datetime         not null comment '更改时间',
    constraint user_card_uindex
        unique (card),
    constraint user_email_uindex
        unique (email),
    constraint user_id_card_uindex
        unique (id_card),
    constraint user_id_uindex
        unique (id),
    constraint user_phone_uindex
        unique (phone),
    constraint user_check_age
        check (`age` >= 18 and `age` <= 65),
    constraint user_check_cash
        check (`cash` = 'C' or `cash` = 'M'),
    constraint user_check_sex
        check (`sex` = 'M' or `sex` = 'W'),
    constraint user_check_status
        check (`status` = 'S' or `status` = 'J' or `status` = 'Z' or `status` = 'T' or `status` = 'L' or
               `status` = 'D'),
    constraint user_id_fk_c
        foreign key (create_by) references user (id),
    constraint user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '用户表';

create or replace table agreement
(
    id           int auto_increment
        primary key,
    uid          int(64)      null comment '用户编号',


    status       char         not null comment '合同状态'  default 'Y',

    wage         int unsigned not null comment '基本工资'  default 0,
#     endowment    int unsigned not null comment '养老保险'  default 0,
#     medicalint   int unsigned not null comment '医疗保险'  default 0,
#     unemployment int unsigned not null comment '失业保险'  default 0,
#     employment   int unsigned not null comment '工伤保险'  default 0,
#     maternity    int unsigned not null comment '生育保险'  default 0,
    insurance    int unsigned not null comment '五险'    default 0,
    housing_fund int unsigned not null comment '住房公积金' default 0,

    begin_time   datetime     not null comment '开始时间',
    end_time     datetime     not null comment '结束时间',

    create_by    int          not null comment '创建者',
    create_time  datetime     not null comment '创建时间',
    update_by    int          not null comment '更改者',
    update_time  datetime     not null comment '更改时间',

    constraint agreement_id_uindex
        unique (id),
    constraint agreement_check_time
        check ( end_time > agreement.begin_time ),
    constraint agreement_check_status
        check (`status` = 'Y' or `status` = 'N' or `status` = 'R' or `status` = 'D'),
    constraint agreement_id_fk_c
        foreign key (create_by) references user (id),
    constraint agreement_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '合同表';

create or replace table bonus_type
(
    id          int auto_increment
        primary key,
    name        varchar(64)  not null comment '奖金名称',
    gap         int unsigned not null comment '间隔月份' default 1,

    status      char(1)      not null comment '状态'   default 'Y',

    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint bonus_type_id_uindex
        unique (id),
    constraint bonus_type_name_uindex
        unique (name),
    constraint bonus_type_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),
    constraint bonus_type_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint bonus_type_user_id_fk_u
        foreign key (update_by) references user (id)

)
    comment '奖金类型表';

create or replace table file
(
    id          int auto_increment
        primary key,
    uid         int         not null comment '用户编号',


    name        varchar(64) not null comment '文件名',
    suffix      varchar(64) not null comment '后缀名',
    path        varchar(64) not null comment '文件路径',

    status      char(1)     not null comment '文件状态',


    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',

    constraint file_id_uindex
        unique (id),
    constraint file_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),
    constraint file_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint file_user_id_fk_u
        foreign key (update_by) references user (id)

) comment '文件表';

create or replace table file_bind
(
    id          int auto_increment
        primary key,
    fid         int      not null comment '文件编号',
    bid         int      not null comment '关联编号',


    status      char(1)  not null comment '文件状态',


    create_by   int      not null comment '创建者',
    create_time datetime not null comment '创建时间',
    update_by   int      not null comment '更改者',
    update_time datetime not null comment '更改时间',

    constraint file_bind_id_uindex
        unique (id),
    constraint file_bind_check_status
        check (status = 'Y' OR status = 'N' OR status = 'D'),
    constraint file_bind_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint file_bind_user_id_fk_u
        foreign key (update_by) references user (id)

) comment '文件关联表';

create or replace table skill
(
    id          int auto_increment
        primary key,
    uid         int                 not null comment '用户编号',

    name        varchar(64)         not null comment '证书名称',

    status      char(1) default 'N' not null comment '文件状态',

    begin_time  datetime            not null comment '开始时间',
    end_time    datetime            not null comment '结束时间',


    create_by   int                 not null comment '创建者',
    create_time datetime            not null comment '创建时间',
    update_by   int                 not null comment '更改者',
    update_time datetime            not null comment '更改时间',

    constraint skill_id_uindex
        unique (id),
    constraint skill_check_time
        check (end_time > skill.begin_time),
    constraint skill_check_status
        check (status = 'Y' OR status = 'N' OR status = 'R' OR status = 'D'),
    constraint skill_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint skill_user_id_fk_u
        foreign key (update_by) references user (id)

) comment '技能证书表';


create or replace table transfer
(
    id          int auto_increment
        primary key,
    uid         int      not null comment '用户编号',
    pid         int      not null comment '岗位编号',

    status      char(1)  not null comment '受理状态' default 'N',

    create_by   int      not null comment '创建者',
    create_time datetime not null comment '创建时间',
    update_by   int      not null comment '更改者',
    update_time datetime not null comment '更改时间',

    constraint transfer_id_uindex
        unique (id),
    constraint transfer_check_status
        check (status = 'Y' OR status = 'N' OR status = 'R' OR status = 'D'),
    constraint transfer_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint transfer_user_id_fk_u
        foreign key (update_by) references user (id)

) comment '调动申请表';



create or replace table bonus
(
    id          int auto_increment
        primary key,
    uid         int          not null comment '用户编号',
    btid        int          not null comment '奖金类型',

    sum         int          not null comment '金额' default 0,
    year        int unsigned not null comment '发放年份',
    month       int unsigned not null comment '发放月份',


    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint bonus_id_uindex
        unique (id),

    constraint bonus_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint bonus_user_id_fk_u
        foreign key (update_by) references user (id)

)
    comment '奖金表';


create or replace table config
(
    id          int auto_increment
        primary key,
    name        varchar(64) not null comment '键',
    value       varchar(64) null comment '值',
    remark      varchar(64) null comment '备注',
    create_by   int         not null comment '创建者',
    create_time datetime    not null comment '创建时间',
    update_by   int         not null comment '更改者',
    update_time datetime    not null comment '更改时间',
    constraint config_id_uindex
        unique (id),
    constraint config_name_uindex
        unique (name),
    constraint config_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint config_user_id_fk_u
        foreign key (update_by) references user (id)

)
    comment '系统配置表';

create or replace table attendance
(
    id      int auto_increment
        primary key,
    uid     int unsigned not null comment '用户编号',


    absence int unsigned not null comment '缺勤天数' default 0,
    leaves  int unsigned not null comment '请假天数' default 0,

    year    int unsigned not null comment '发放年份',
    month   int unsigned not null comment '发放月份',

    constraint attendance_id_uindex
        unique (id)
)
    comment '考勤记录表';


SET foreign_key_checks = 1;

#表数据

##用户表
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'admin', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '阿伟',
        DEFAULT, 18, '广东肇庆', '广东肇庆', '110', '110@x.com', '110', '110', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (1, 'xu', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '老许',
        DEFAULT, 21, '广东普宁', '博学书院', '110001', '110001@x.com', '110001', '110001', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'liao', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '老廖',
        DEFAULT, 22, '广东河源', '博学书院一楼', '110002', '110002@x.com', '110002', '110002', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'wu', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '老吴',
        DEFAULT, 23, '广东恩平', '力行书院', '110003', '110003@x.com', '110003', '110003', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (2, 'tao', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '涛哥',
        DEFAULT, 38, '广东肇庆', '广东肇庆', '110004', '110004@x.com', '110004', '110004', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'long', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '龙哥',
        DEFAULT, 40, '广东肇庆', '广东肇庆', '110005', '110005@x.com', '110005', '110005', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address, phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'jia', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '嘉哥',
        DEFAULT, 36, '广东肇庆', '广东肇庆', '110006', '110006@x.com', '110006', '110006', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');

##部门表
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 2, '人事部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 3, '财务部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 4, '销售部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 5, '车间', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 6, '后勤部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 7, '经济运营部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.department (did, uid, name, status, create_by, create_time, update_by, update_time)
VALUES (null, 6, '质检部', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');

##岗位表
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'head', '人事主任', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'hd', '人力开发员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'hp', '人力规划员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'w&i', '工资及保险管理员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 't&b', '职称管理、工资奖惩员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'plan', '劳动计划统计员兼定员定额员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'org', '劳动组织工资调配员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'train', '教育培训管理员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'arch', '档案管理员', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'econ', '经济责任制管理员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (1, 'check', '考核管理员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');

INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (2, 'fina', '财务部员工', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (3, 'sales', '销售部员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (4, 'ws', '车间员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (5, 'rear', '后勤部员工', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (6, 'busin', '经济运营部员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.post (did, code, name, status, create_by, create_time, update_by, update_time)
VALUES (7, 'qc', '质检部员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');

##角色表
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('admin', '管理员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('hr', '人事部 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('common', '普通员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');

##用户角色表
INSERT INTO hr.user_role (uid, rid, status, create_by, create_time, update_by, update_time)
VALUES (1, 1, DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.user_role (uid, rid, status, create_by, create_time, update_by, update_time)
VALUES (2, 1, DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');

## 调动申请表
INSERT INTO hr.transfer (uid, pid, status, create_by, create_time, update_by, update_time)
VALUES (5, 3, DEFAULT, 5, '2022-01-01 00:00:00', 5, '2022-01-01 00:00:00');

## 合同表
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (1, 1, 'Y', 10000, 2000, 2000, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (2, 2, 'Y', 8000, 1500, 1500, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (3, 3, 'Y', 8000, 1000, 1000, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (4, 4, 'Y', 8000, 1000, 1000, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (5, 5, 'Y', 8000, 1000, 1000, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, housing_fund, begin_time, end_time, create_by, create_time,
                          update_by, update_time)
VALUES (6, 6, 'Y', 7500, 800, 800, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');

## 技能证书审核表
INSERT INTO hr.skill (uid, name, status, begin_time, end_time, create_by, create_time, update_by, update_time)
VALUES (3, '普通话一甲证书', DEFAULT, '2020-01-01 00:00:00', '2025-01-01 00:00:00', 3, '2022-01-01 00:00:00', 3,
        '2022-01-01 00:00:00');

## 奖金类型表
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (1, '月全勤奖', 1, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (2, '月度绩效奖金', 1, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (3, '季度绩效奖金', 3, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (4, '年度绩效奖金', 12, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');

## 奖金表
INSERT INTO hr.bonus (id, uid, btid, sum, year, month, create_by, create_time, update_by, update_time)
VALUES (1, 1, 1, 1, 2022, 10, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');

## 工资记录表
INSERT INTO hr.wage (id, department, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month)
VALUES (1, '人事部', '涛哥', '110004', 8000, 1000, 9000, 8000, '无', 2020, 1);
INSERT INTO hr.wage (id, department, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month)
VALUES (2, '人事部', '涛哥', '110004', 8000, 2000, 10000, 9000, '全勤奖+1000,', 2020, 1);
INSERT INTO hr.wage (id, department, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month)
VALUES (3, '人事部', '涛哥', '110004', 8000, 3000, 11000, 10000, '全勤奖+1000,绩效+1000', 2020, 2);

## 考勤记录表
INSERT INTO hr.attendance (id, uid, absence, leaves, year, month)
VALUES (1, 3, 1, 0, 2020, 1);
INSERT INTO hr.attendance (id, uid, absence, leaves, year, month)
VALUES (2, 3, 0, 2, 2020, 1);
INSERT INTO hr.attendance (id, uid, absence, leaves, year, month)
VALUES (3, 4, 1, 0, 2020, 1);
INSERT INTO hr.attendance (id, uid, absence, leaves, year, month)
VALUES (4, 5, 1, 0, 2020, 2);




