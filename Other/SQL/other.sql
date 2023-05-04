###暂时不启用


# CREATE PROCEDURE count_wage(IN year INTEGER, IN month INTEGER)
# BEGIN
#     INSERT INTO wage (id, department, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month,
#                       create_by, create_time, update_by, update_time);
#         END;
#
# -- 每个月的一号凌晨1 点执行
#     DROP EVENT IF EXISTS event_count_wage;
#     CREATE EVENT event_count_wage
#         ON schedule every 1 month starts date_add(
#                 date_add(date_sub(curdate(), interval day(curdate()) - 1 day), interval 1 month), interval 1 hour)
#         DO call count_wage();

### 【系统模块】
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