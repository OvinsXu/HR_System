### 【薪资管理】
create or replace table wage
(
    id           int auto_increment
        primary key,
    days   int unsigned  not null comment '薪水天数' default 0,
    truename     varchar(64)  not null comment '姓名',
    id_card      varchar(64)  null comment '身份证号码',

    base         double(15,2) not null comment '基本工资' default 0,
    bonus        double(15,2) not null comment '奖金'     default 0,
    pre_tax      double(15,2) not null comment '税前工资' default 0,
    post_tax     double(15,2) not null comment '税后工资' default 0,

    bonus_detail text comment '奖金详情',

    year         int unsigned not null comment '发放年份',
    month        int unsigned not null comment '发放月份',


    create_by    int          not null comment '创建者',
    create_time  datetime     not null comment '创建时间',
    update_by    int          not null comment '更改者',
    update_time  datetime     not null comment '更改时间',

    constraint wage_id_uindex
        unique (id),
    constraint wage_user_id_fk_c
        foreign key (create_by) references user (id),
    constraint wage_user_id_fk_u
        foreign key (update_by) references user (id)
)
    comment '工资记录表';
INSERT INTO hr.wage (id, days, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month,
                     create_by, create_time, update_by, update_time)
VALUES (1, 20, '涛哥', '110004', 8000, 1000, 9000, 8000, '无', 2020, 1, 1, '2022-06-26 00:00:00.0', 1,
        '2022-06-26 00:00:00.0');
INSERT INTO hr.wage (id, days, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month,
                     create_by, create_time, update_by, update_time)
VALUES (2, 20, '涛哥', '110004', 8000, 2000, 10000, 9000, '全勤奖+1000,', 2020, 1, 1, '2022-06-26 00:00:00.0',
        1,
        '2022-06-26 00:00:00.0');
INSERT INTO hr.wage (id, days, truename, id_card, base, bonus, pre_tax, post_tax, bonus_detail, year, month,
                     create_by, create_time, update_by, update_time)
VALUES (3, 20, '涛哥', '110004', 8000, 3000, 11000, 10000, '全勤奖+1000,绩效+1000', 2020, 2, 1,
        '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
create or replace table bonus_type
(
    id          int auto_increment
        primary key,
    name        varchar(64)  not null comment '奖金名称',
    gap         int unsigned not null comment '间隔月份' default 1,

    status      char(1)      not null comment '状态'     default 'Y',

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
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (1, '月全勤奖', 1, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (2, '月度绩效奖金', 1, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (3, '季度绩效奖金', 3, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
INSERT INTO hr.bonus_type (id, name, gap, status, create_by, create_time, update_by, update_time)
VALUES (4, '年度绩效奖金', 12, 'Y', 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');
create or replace table bonus
(
    id          int auto_increment
        primary key,
    uid         int          not null comment '用户编号',
    btid        int          not null comment '奖金类型',

    sum         double(15,2)          not null comment '金额' default 0,
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
INSERT INTO hr.bonus (id, uid, btid, sum, year, month, create_by, create_time, update_by, update_time)
VALUES (1, 1, 1, 1, 2022, 10, 1, '2022-06-26 00:00:00.0', 1, '2022-06-26 00:00:00.0');