ALTER TABLE `userapiendpoints` MODIFY COLUMN `provider` varchar(64) NOT NULL;
ALTER TABLE `userapiendpoints` MODIFY COLUMN `name` varchar(256) NOT NULL;
ALTER TABLE `userapiendpoints` MODIFY COLUMN `userId` varchar(256) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `userId` varchar(256) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `userAuthId` varchar(256) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `name` varchar(256) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `email` varchar(256) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `password` varchar(256) NOT NULL;