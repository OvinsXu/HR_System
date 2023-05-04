### 【员工管理】
create or replace table user
(
    id           int auto_increment primary key,
    pid          int(64)          null comment '岗位编号',
    username     varchar(64)      not null comment '账号',
    password     varchar(64)      not null comment '密码',
    status       char default 'Z' not null comment '用户状态',
    cash         char default 'C' not null comment '工资结算方式',
    avatar       int(64)          null comment '头像(fid)',
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
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'admin', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null,
        '阿伟',
        DEFAULT, 18, '广东肇庆', '广东肇庆', '110', '110@x.com', '110', '110', 1, '2022-01-01 00:00:00', 1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (1, 'xu', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '老许',
        DEFAULT, 21, '广东普宁', '博学书院', '110001', '110001@x.com', '110001', '110001', 1, '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'liao', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null,
        '老廖',
        DEFAULT, 22, '广东河源', '博学书院一楼', '110002', '110002@x.com', '110002', '110002', 1,
        '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'wu', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '老吴',
        DEFAULT, 23, '广东恩平', '力行书院', '110003', '110003@x.com', '110003', '110003', 1, '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (2, 'tao', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '涛哥',
        DEFAULT, 38, '广东肇庆', '广东肇庆', '110004', '110004@x.com', '110004', '110004', 1, '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'long', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null,
        '龙哥',
        DEFAULT, 40, '广东肇庆', '广东肇庆', '110005', '110005@x.com', '110005', '110005', 1, '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
INSERT INTO hr.user (pid, username, password, status, cash, avatar, truename, sex, age, native_place, address,
                     phone,
                     email, card, id_card, create_by, create_time, update_by, update_time)
VALUES (null, 'jia', '$2a$10$AV62PexHltLWkYVz97oGz.vzh3fJ7RDgPzdMiByhp7ri6/qkaXsuC', DEFAULT, DEFAULT, null, '嘉哥',
        DEFAULT, 36, '广东肇庆', '广东肇庆', '110006', '110006@x.com', '110006', '110006', 1, '2022-01-01 00:00:00',
        1,
        '2022-01-01 00:00:00');
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
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('admin', '管理员 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('hr', '人事部 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.role (code, name, status, create_by, create_time, update_by, update_time)
VALUES ('common', '普通员工 ', DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
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
INSERT INTO hr.user_role (uid, rid, status, create_by, create_time, update_by, update_time)
VALUES (1, 1, DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
INSERT INTO hr.user_role (uid, rid, status, create_by, create_time, update_by, update_time)
VALUES (2, 2, DEFAULT, 1, '2022-01-01 00:00:00', 1, '2022-01-01 00:00:00');
create or replace table agreement
(
    id           int auto_increment
        primary key,
    uid          int(64)      null comment '用户编号',


    status       char         not null comment '合同状态'   default 'Y',

    wage         int unsigned not null comment '基本工资'   default 0,
#     endowment    int unsigned not null comment '养老保险'  default 0,
#     medicalint   int unsigned not null comment '医疗保险'  default 0,
#     unemployment int unsigned not null comment '失业保险'  default 0,
#     employment   int unsigned not null comment '工伤保险'  default 0,
#     maternity    int unsigned not null comment '生育保险'  default 0,
    insurance    double(15,2) not null comment '社保金额' default 0,
#    housing_fund int unsigned not null comment '住房公积金' default 0,

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
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (1, 1, 'Y', 10000, 2000,  '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0',
        1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (2, 2, 'Y', 8000, 1500,  '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0',
        1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (3, 3, 'Y', 8000, 1000,  '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0',
        1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (4, 4, 'Y', 8000, 1000,  '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0',
        1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (5, 5, 'Y', 8000, 1000,  '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0',
        1,
        '2020-06-01 00:00:00.0');
INSERT INTO hr.agreement (id, uid, status, wage, insurance, begin_time, end_time, create_by,
                          create_time,
                          update_by, update_time)
VALUES (6, 6, 'Y', 7500, 800, '2020-06-01 00:00:00.0', '2025-06-01 00:00:00.0', 1, '2020-06-01 00:00:00.0', 1,
        '2020-06-01 00:00:00.0');