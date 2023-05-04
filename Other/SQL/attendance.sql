### 【考勤管理】
create or replace table clocks
(
    id          int auto_increment
        primary key,
    uid         int unsigned not null comment '用户编号',

    clockin     DATETIME     null comment '上班时间',
    clockout    DATETIME     null comment '下班时间',

    status      char(1)      not null comment '状态' default 'Y',

    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint clocks_id_uindex
        unique (id),
    constraint clocks_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint clocks_user_id_fk_u
        foreign key (update_by) references user (id),
    constraint clocks_check_clockin#当天8~9点可以签到
        check (clockin >= DATE_ADD(DATE(clockin), INTERVAL 8 Hour) and
               clockin <= DATE_ADD(DATE(clockin), INTERVAL 9 Hour)),
    constraint clocks_check_clockout#上班达到8小时,或者19点前可以打卡下班
        check (clockout >= DATE_ADD(clockin, INTERVAL 9 Hour) and
               clockout <= DATE_ADD(DATE(clockin), INTERVAL 19 Hour)),
    constraint clocks_check_status
        check (status = 'Y' OR status = 'N' OR status = 'P' OR status = 'L') #正常/异常/补卡/缺勤
)
    comment '打卡记录表';
INSERT INTO hr.clocks (uid, clockin, clockout, create_by, create_time, update_by, update_time)
VALUES (3, '2023-04-01 08:30:00.0', '2023-04-01 17:40:00.0', 1, '2023-04-01 08:30:00.0', 1,
        '2023-04-01 08:30:00.0');
INSERT INTO hr.clocks (uid, clockin, clockout, status, create_by, create_time, update_by, update_time)
VALUES (3, '2023-04-02 08:30:00.0', null, 'N', 1, '2023-04-02 08:30:00.0', 1, '2023-04-02 08:30:00.0');
INSERT INTO hr.clocks (uid, clockin, clockout, create_by, create_time, update_by, update_time)
VALUES (5, '2023-04-01 08:30:00.0', '2023-04-01 17:40:00.0', 1, '2023-04-01 08:30:00.0', 1,
        '2023-04-01 08:30:00.0');
INSERT INTO hr.clocks (uid, clockin, clockout, create_by, create_time, update_by, update_time)
VALUES (2, '2023-04-07 08:30:00.0', '2023-04-07 17:40:00.0', 1, '2023-04-07 08:30:00.0', 1,
        '2023-04-07 08:30:00.0');
INSERT INTO hr.clocks (uid, clockin, clockout, create_by, create_time, update_by, update_time)
VALUES (2, '2023-04-08 08:30:00.0', '2023-04-08 17:40:00.0', 1, '2023-04-08 08:30:00.0', 1,
        '2023-04-08 08:30:00.0');

create or replace table leaves_type
(
    id          int auto_increment primary key,

    name        varchar(32)  not null comment '名称',
    #days        int unsigned not null default 0 comment '合理天数',

    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint leaves_type_id_uindex
        unique (id),
    constraint leaves_type_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint leaves_type_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '假期类型表';
INSERT INTO hr.leaves_type (id, name,  create_by, create_time, update_by, update_time)
VALUES (1, '年假', 1,  '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.leaves_type (id, name, create_by, create_time, update_by, update_time)
VALUES (2, '事假',  1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.leaves_type (id, name, create_by, create_time, update_by, update_time)
VALUES (3, '病假',  1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
-- 其他类型
create or replace table leaves
(
    id          int auto_increment primary key,
    uid         int unsigned not null comment '用户编号',
    hid         int unsigned not null comment '请假类型',
    begin_date        DATETIME         not null comment '开始日期',
    end_date        DATETIME         not null comment '结束日期',
    details     varchar(128) null comment '详细信息',
    status      char(1) default 'P' not null comment '状态',

    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint leaves_id_uindex
        unique (id),
    constraint leaves_check_status
        check (status = 'Y' OR status = 'N' OR status = 'R' OR status = 'P'),# (通过)带薪/(通过)不带薪/拒绝/审核中
    constraint leaves_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint leaves_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '请假表';
INSERT INTO hr.leaves (id, uid,hid, begin_date,end_date, create_by, create_time, update_by, update_time)
VALUES (1, 1 ,1 , '2023-04-08 08:30:00.0', '2023-04-08 18:30:00.0', 1,'2023-04-08 08:30:00.0', 1, '2023-04-08 08:30:00.0');

create or replace table attendance
(
    id          int auto_increment
        primary key,
    uid         int unsigned not null comment '用户编号',


    leaves     int unsigned not null comment '请假天数' default 0,
    holiday     int unsigned not null comment '带薪天数' default 0,
    #leaves      int unsigned not null comment '请假天数' default 0,

    year        int unsigned not null comment '年份',
    month       int unsigned not null comment '月份',

    create_by   int          not null comment '创建者',
    create_time datetime     not null comment '创建时间',
    update_by   int          not null comment '更改者',
    update_time datetime     not null comment '更改时间',

    constraint attendance_id_uindex
        unique (id),
    constraint attendance_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint attendance_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '考勤记录表';
INSERT INTO hr.attendance (id, uid, leaves,  year, month, create_by, create_time, update_by, update_time)
VALUES (1, 3, 1,  2020, 1, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves,  year, month, create_by, create_time, update_by, update_time)
VALUES (2, 3, 1,  2020, 1, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves,  year, month, create_by, create_time, update_by, update_time)
VALUES (3, 4, 1,  2020, 1, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves, year, month, create_by, create_time, update_by, update_time)
VALUES (4, 5, 1,  2020, 2, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');

INSERT INTO hr.attendance (id, uid, leaves, holiday, year, month, create_by, create_time, update_by, update_time)
VALUES (5, 3, 21,20,  2023, 4, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves, holiday, year, month, create_by, create_time, update_by, update_time)
VALUES (6, 4, 22,22,  2023, 4, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves,holiday,  year, month, create_by, create_time, update_by, update_time)
VALUES (7, 5, 21,20,  2023, 4, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.attendance (id, uid, leaves,holiday, year, month, create_by, create_time, update_by, update_time)
VALUES (8, 6, 21,20,  2023, 4, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');