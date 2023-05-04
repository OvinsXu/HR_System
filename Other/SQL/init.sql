# mysql -u admin -p hr < init.sql
SET foreign_key_checks = 0;

source org.sql
source user.sql
source recruit.sql
source develop.sql
source attendance.sql
source wage.sql

SET foreign_key_checks = 1;




