### 【组织管理】

create or replace table department
(
    id          int auto_increment primary key,
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
INSERT INTO hr.transfer (uid, pid, status, create_by, create_time, update_by, update_time)
VALUES (5, 3, DEFAULT, 5, '2022-01-01 00:00:00', 5, '2022-01-01 00:00:00');
