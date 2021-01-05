create table auths
(
    id varchar(100) not null,
    username varchar(50) not null,
    password varchar(300) null,
    constraint auths_id_uindex
        unique (id),
    constraint auths_username_uindex
        unique (username)
);

alter table auths
    add primary key (id);

create table users
(
    id varchar(100) not null,
    name varchar(100) null,
    username varchar(100) null,
    constraint users_id_uindex
        unique (id),
    constraint users_auths__fk
        foreign key (id) references auths (id)
);

alter table users
    add primary key (id);

create table follows
(
    user_from varchar(100) not null,
    user_to varchar(100) not null,
    primary key (user_from, user_to),
    constraint follows_user_from_uindex
        unique (user_from),
    constraint follows_user_to_uindex
        unique (user_to),
    constraint follows_user_from__fk
        foreign key (user_from) references users (id),
    constraint follows_user_to__fk
        foreign key (user_to) references users (id)
);

