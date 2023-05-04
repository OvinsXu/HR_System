### 【人才培养】
create or replace table train
(
    id          int auto_increment
        primary key,

    title       varchar(64) not null comment '培训标题',
    brief       text        not null comment '培训简介',
    content     text        null comment '培训内容',

    sum         int         not null                default 0 comment '培训人数',

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
INSERT INTO hr.skill (uid, name, status, begin_time, end_time, create_by, create_time, update_by, update_time)
VALUES (3, '普通话一甲证书', DEFAULT, '2020-01-01 00:00:00', '2025-01-01 00:00:00', 3, '2022-01-01 00:00:00', 3,
        '2022-01-01 00:00:00');