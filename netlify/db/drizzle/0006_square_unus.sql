ALTER TABLE `userapiendpoints` MODIFY COLUMN `folderName` varchar(256) NOT NULL;
ALTER TABLE `userapiendpoints` ADD `storageName` varchar(256) NOT NULL;