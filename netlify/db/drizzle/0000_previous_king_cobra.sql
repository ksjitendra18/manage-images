CREATE TABLE `userapikeys` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`userId` varchar(256));

CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(256),
	`userAuthId` varchar(256),
	`name` varchar(256),
	`email` varchar(256),
	`password` varchar(256));
